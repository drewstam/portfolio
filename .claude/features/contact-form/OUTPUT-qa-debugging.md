# Contact Form — QA & Debugging

## Status: Round 2 — In Progress

---

## Round 2

**Testing environment:** Vercel preview deployment (required for `/api/contact` to be reachable)

**What changed since Round 1:** Fixed `reply_to` → `replyTo` in `api/contact.js` (Resend SDK uses camelCase).

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
- [ ] **Email "Reply-To" is the address entered in the form** ← this was the fix, verify this specifically
- [ ] Email subject contains the submitted subject (with `[Portfolio Contact]` prefix)
- [ ] Email body contains name, email, subject, and message

---

## Previous Rounds

### Round 1

#### [PASS] "Let's Connect" button appears in the Profile card, below the GitHub/LinkedIn/email icons
#### [PASS] Button is solid accent purple with white text
#### [PASS] Button is full-width within the Profile card
#### [PASS] Hovering the button gives a visual response (slight lift / opacity change)
#### [PASS] Clicking "Let's Connect" opens the contact modal
#### [PASS] Modal is centered on screen with a dark backdrop
#### [PASS] Modal title is "Reach Out"
#### [PASS] Subtitle text reads "Drop me a message and I'll get back to you securely to your inbox."
#### [PASS] Close button (×) is visible in the top-right corner
#### [PASS] Focus moves to the Name field automatically when the modal opens
#### [PASS] Name and Email Address fields are side-by-side in a 2-column row
#### [PASS] Subject field is full-width below
#### [PASS] "Your Message" textarea is full-width below Subject
#### [PASS] "Send Message" button is full-width at the bottom
#### [PASS] All fields stack to a single column (Name and Email no longer side-by-side)
#### [PASS] Submitting an empty form shows an error under every required field
#### [PASS] Errors appear only on submit (not while typing)
#### [PASS] Focus moves to the first invalid field after a failed submit
#### [PASS] Name: entering more than 80 characters triggers an error on submit
#### [PASS] Subject: entering more than 120 characters triggers an error on submit
#### [PASS] Message: entering more than 2000 characters triggers an error on submit
#### [PASS] Email: entering a value without `@` triggers an error on submit
#### [PASS] Filling in a previously invalid field and re-submitting clears the error for that field
#### [PASS] Clicking the × button closes the modal
#### [PASS] Clicking the dark backdrop closes the modal
#### [PASS] Pressing Escape closes the modal
#### [PASS] After closing, focus returns to the "Let's Connect" button in the Profile card
#### [PASS] Tab cycles through all interactive elements inside the modal without escaping to the page behind
#### [PASS] Shift+Tab cycles in reverse within the modal
#### [PASS] Pressing Enter while focused in any input submits the form
#### [PASS] Opening the modal shows all empty fields
#### [PASS] Partially filling in fields, closing, and reopening shows empty fields again
#### [PASS] After clicking "Send Message" with valid inputs, the button changes to "Sending..." with a spinner
#### [PASS] All form fields are disabled during submission
#### [PASS] The submit button is disabled during submission (no double-submit possible)
#### [PASS] After a successful submission, the form is replaced by "Thanks, I'll be in touch."
#### [PASS] A Close button is visible in the success view
#### [PASS] Clicking Close dismisses the modal and returns focus to "Let's Connect"
#### [PASS] If the API returns an error, an error banner appears at the top of the form
#### [PASS] Banner reads: "Something went wrong. Please try again or email me directly at j.andrew.stam@gmail.com."
#### [PASS] Form fields remain populated and re-enabled after an error so the user can retry
#### [PASS] The honeypot `website` field is not visible on screen
#### [PASS] The honeypot field is not reachable by Tab key
#### [PASS] Modal looks correct in dark mode
#### [PASS] Modal looks correct in light mode
#### [PASS] Switching theme while the modal is open updates colors immediately
#### [PASS] Email arrives at `j.andrew.stam@gmail.com` after a successful form submission
#### [PASS] Email "From" address is from `andrewstam.com`
#### [FAIL] Email "Reply-To" is the address entered in the form
**User feedback:** Clicking reply sent to `andrew@andrewstam.com` instead of the form submitter's email.
**Fix:** Changed `reply_to` to `replyTo` in `api/contact.js`. The Resend Node.js SDK uses camelCase — the snake_case key was silently ignored, causing Resend to fall back to the sender address.
#### [PASS] Email subject contains the submitted subject (with `[Portfolio Contact]` prefix)
#### [PASS] Email body contains name, email, subject, and message
