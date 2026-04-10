import { Resend } from 'resend'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateFields({ name, email, subject, message }) {
  const errors = []
  if (!name || name.trim().length < 1 || name.trim().length > 80) {
    errors.push('Name must be between 1 and 80 characters.')
  }
  if (!email || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email address is required.')
  }
  if (!subject || subject.trim().length < 1 || subject.trim().length > 120) {
    errors.push('Subject must be between 1 and 120 characters.')
  }
  if (!message || message.trim().length < 1 || message.trim().length > 2000) {
    errors.push('Message must be between 1 and 2000 characters.')
  }
  return errors
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { name, email, subject, message, website } = req.body || {}

  // Honeypot check — return 200 silently so bots don't know they were caught
  if (website) {
    return res.status(200).json({ success: true })
  }

  // Server-side validation
  const errors = validateFields({ name, email, subject, message })
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(' ') })
  }

  // Guard required environment variables
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !toEmail || !fromEmail) {
    return res.status(500).json({ error: 'Server misconfiguration. Please try again later.' })
  }

  const resend = new Resend(apiKey)

  const emailBody = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Subject: ${subject.trim()}`,
    '',
    message.trim(),
  ].join('\n')

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email.trim(),
      subject: `[Portfolio Contact] ${subject.trim()}`,
      text: emailBody,
    })

    if (error) {
      return res.status(500).json({ error: 'Failed to send message. Please try again.' })
    }

    return res.status(200).json({ success: true })
  } catch {
    return res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
}
