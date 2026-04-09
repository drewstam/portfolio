# Contact Form — QA & Debugging

## Status: Round 1 — In Progress

---

## Round 1

**Testing environment:** Vercel preview deployment (required for `/api/contact` to be reachable)

**Before testing:** Confirm the following Vercel environment variables are set in your Vercel dashboard:
- `RESEND_API_KEY` — your Resend API key
- `CONTACT_TO_EMAIL` — `j.andrew.stam@gmail.com`
- `CONTACT_FROM_EMAIL` — a verified address on `andrewstam.com` (e.g. `contact@andrewstam.com`)

---

### Trigger button

- [ ] "Let's Connect" button appears in the Profile card, below the GitHub/LinkedIn/email icons
- [ ] Button is solid accent purple with white text
- [ ] Button is full-width within the Profile card
- [ ] Hovering the button gives a visual response (slight lift / opacity change)

### Modal opens

- [ ] Clicking "Let's Connect" opens the contact modal
- [ ] Modal is centered on screen with a dark backdrop
- [ ] Modal title is "Reach Out"
- [ ] Subtitle text reads "Drop me a message and I'll get back to you securely to your inbox."
- [ ] Close button (×) is visible in the top-right corner
- [ ] Focus moves to the Name field automatically when the modal opens

### Form layout (desktop)

- [ ] Name and Email Address fields are side-by-side in a 2-column row
- [ ] Subject field is full-width below
- [ ] "Your Message" textarea is full-width below Subject
- [ ] "Send Message" button is full-width at the bottom

### Form layout (mobile — resize to < 600px)

- [ ] All fields stack to a single column (Name and Email no longer side-by-side)

### Validation

- [ ] Submitting an empty form shows an error under every required field
- [ ] Errors appear only on submit (not while typing)
- [ ] Focus moves to the first invalid field after a failed submit
- [ ] Name: entering more than 80 characters triggers an error on submit
- [ ] Subject: entering more than 120 characters triggers an error on submit
- [ ] Message: entering more than 2000 characters triggers an error on submit
- [ ] Email: entering a value without `@` triggers an error on submit
- [ ] Filling in a previously invalid field and re-submitting clears the error for that field

### Closing the modal

- [ ] Clicking the × button closes the modal
- [ ] Clicking the dark backdrop closes the modal
- [ ] Pressing Escape closes the modal
- [ ] After closing, focus returns to the "Let's Connect" button in the Profile card

### Keyboard / accessibility

- [ ] Tab cycles through all interactive elements inside the modal (Name → Email → Subject → Message → Send Message → close ×) without escaping to the page behind
- [ ] Shift+Tab cycles in reverse within the modal
- [ ] Pressing Enter while focused in any input submits the form

### Reset behavior

- [ ] Opening the modal shows all empty fields
- [ ] Partially filling in fields, closing, and reopening shows empty fields again

### Loading state (requires Vercel preview)

- [ ] After clicking "Send Message" with valid inputs, the button changes to "Sending..." with a spinner
- [ ] All form fields are disabled during submission
- [ ] The submit button is disabled during submission (no double-submit possible)

### Success state (requires Vercel preview + env vars set)

- [ ] After a successful submission, the form is replaced by "Thanks, I'll be in touch."
- [ ] A Close button is visible in the success view
- [ ] Clicking Close dismisses the modal and returns focus to "Let's Connect"

### Error state (requires Vercel preview)

- [ ] If the API returns an error, an error banner appears at the top of the form
- [ ] Banner reads: "Something went wrong. Please try again or email me directly at j.andrew.stam@gmail.com."
- [ ] Form fields remain populated and re-enabled after an error so the user can retry

### Spam / honeypot

- [ ] The honeypot `website` field is not visible on screen
- [ ] The honeypot field is not reachable by Tab key

### Theming

- [ ] Modal looks correct in dark mode
- [ ] Modal looks correct in light mode
- [ ] Switching theme while the modal is open updates colors immediately

### Email delivery (requires Vercel preview + env vars set)

- [ ] Email arrives at `j.andrew.stam@gmail.com` after a successful form submission
- [ ] Email "From" address is from `andrewstam.com` (e.g. `contact@andrewstam.com`)
- [ ] Email "Reply-To" is the address entered in the form
- [ ] Email subject contains the submitted subject (with `[Portfolio Contact]` prefix)
- [ ] Email body contains name, email, subject, and message
