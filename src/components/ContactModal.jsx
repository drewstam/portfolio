import { useEffect, useRef, useState } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY_FIELDS = { name: '', email: '', subject: '', message: '', website: '' }
const EMPTY_ERRORS = { name: '', email: '', subject: '', message: '' }

function validateFields(fields) {
  const errors = { ...EMPTY_ERRORS }
  if (!fields.name.trim() || fields.name.trim().length > 80) {
    errors.name = 'Name is required (max 80 characters).'
  }
  if (!fields.email.trim() || !EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = 'A valid email address is required.'
  }
  if (!fields.subject.trim() || fields.subject.trim().length > 120) {
    errors.subject = 'Subject is required (max 120 characters).'
  }
  if (!fields.message.trim() || fields.message.trim().length > 2000) {
    errors.message = 'Message is required (max 2000 characters).'
  }
  return errors
}

function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}

export default function ContactModal({ onClose, triggerRef }) {
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [errors, setErrors] = useState(EMPTY_ERRORS)
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorBanner, setErrorBanner] = useState('')

  const modalRef = useRef(null)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const subjectRef = useRef(null)
  const messageRef = useRef(null)

  const fieldRefs = { name: nameRef, email: emailRef, subject: subjectRef, message: messageRef }

  // Focus first field on open
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  function handleClose() {
    onClose()
    triggerRef?.current?.focus()
  }

  // Focus trap + Escape key
  useEffect(() => {
    function getFocusable() {
      return Array.from(
        modalRef.current?.querySelectorAll(
          'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
        ) || []
      )
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      if (e.key === 'Tab') {
        const focusable = getFocusable()
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorBanner('')

    const newErrors = validateFields(fields)
    if (hasErrors(newErrors)) {
      setErrors(newErrors)
      // Focus first invalid field
      for (const key of ['name', 'email', 'subject', 'message']) {
        if (newErrors[key]) {
          fieldRefs[key].current?.focus()
          break
        }
      }
      return
    }

    setErrors(EMPTY_ERRORS)
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: fields.subject.trim(),
          message: fields.message.trim(),
          website: fields.website,
        }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorBanner(
          'Something went wrong. Please try again or email me directly at j.andrew.stam@gmail.com.'
        )
      }
    } catch {
      setStatus('error')
      setErrorBanner(
        'Something went wrong. Please try again or email me directly at j.andrew.stam@gmail.com.'
      )
    }
  }

  const isLoading = status === 'loading'
  const titleId = 'contact-modal-title'

  return (
    <div className="details-overlay" onClick={handleClose}>
      <div
        className="details"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="details-close" onClick={handleClose} aria-label="Close">
          &times;
        </button>

        <h2 id={titleId} className="contact-modal-title">Reach Out</h2>
        <p className="contact-modal-subtitle">
          Drop me a message and I'll get back to you securely to your inbox.
        </p>

        {status === 'success' ? (
          <div className="contact-success">
            <p className="contact-success-message">Thanks, I'll be in touch.</p>
            <button className="contact-success-close" onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {errorBanner && (
              <p className="contact-error-banner" role="alert">
                {errorBanner}
              </p>
            )}

            <div className="contact-form-row">
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  ref={nameRef}
                  className={`contact-input${errors.name ? ' error' : ''}`}
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p id="contact-name-error" className="contact-error-text" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  ref={emailRef}
                  className={`contact-input${errors.email ? ' error' : ''}`}
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p id="contact-email-error" className="contact-error-text" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                ref={subjectRef}
                className={`contact-input${errors.subject ? ' error' : ''}`}
                type="text"
                name="subject"
                value={fields.subject}
                onChange={handleChange}
                disabled={isLoading}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && (
                <p id="contact-subject-error" className="contact-error-text" role="alert">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                ref={messageRef}
                className={`contact-input${errors.message ? ' error' : ''}`}
                name="message"
                value={fields.message}
                onChange={handleChange}
                disabled={isLoading}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p id="contact-message-error" className="contact-error-text" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot — hidden from humans, visible to bots */}
            <div className="honeypot-field" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                type="text"
                name="website"
                value={fields.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={isLoading}
            >
              {isLoading && <span className="contact-spinner" aria-hidden="true" />}
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
