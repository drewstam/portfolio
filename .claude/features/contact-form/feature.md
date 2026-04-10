# Contact Form

## Brief

Add a contact form to the portfolio site so visitors can reach out to me directly.

**Trigger**
- A new "Let's Connect" button in the Profile card, positioned underneath the existing GitHub / LinkedIn / email icons.
- Clicking the button opens a modal contact form.

**Modal**
- Same look and feel as the existing Experience Details and Project Details modals (centered overlay, dark backdrop, close button, theme-aware colors, max-width 760px).
- Reference for layout/feel: the contact modal at https://www.devakshay.app/home (triggered from their "Let's Connect" / "Contact me" card) or look at the screenshot in features/contact-form/references/ContactMeForm.png for a local version.

**Form fields**
- Name (required)
- Email (required, must be a valid email)
- Subject (required)
- Message (required)

**Validation**
- Inline validation errors that appear on submit (not as the user types).
- Each invalid field shows an error message below it.

**Success state**
- After a successful submission, the modal swaps its content to a success message: "Thanks, I'll be in touch."
- The user manually closes the modal from the success state.

**Submission backend**
- The site is hosted on Vercel.
- Two real options on the table:
  - **Option B — Third-party form service** (e.g. Formspree). Form POSTs to their endpoint, I receive submissions as email. No backend code, no dependencies, no env vars. Free tier covers personal use easily.
  - **Option D — Vercel Function + Resend.** Add an `api/contact.js` serverless function that posts to the Resend email API. Adds the `resend` npm package and a `RESEND_API_KEY` environment variable in Vercel. More "real engineer" feel, more control, no third-party form service in the middle.
- Final choice will be confirmed during scoping (Round 1).

**Reference material**
- None provided yet beyond the link above.

---

## Scoping Questions

Generated: 2026-04-07
Chosen approach: Vercel Function + Resend

### Q1: Where should contact form submissions be delivered?

The serverless function needs a destination email address. This will be stored as a Vercel environment variable (`CONTACT_TO_EMAIL`), not committed to the repo.

- [x] a) j.andrew.stam@gmail.com (the address already shown in the profile email icon)
- [ ] b) A different address (please specify in notes)

**Notes:**  


### Q2: Sending domain — how should the "From" address be set up?

Resend requires a verified sender. Two paths:

**Option a — Use Resend's test/onboarding domain (`onboarding@resend.dev`)**
- ✅ Zero setup, works immediately
- ❌ Emails come from `onboarding@resend.dev` which looks unprofessional and is more likely to land in spam
- ❌ Limited to sending to the email you signed up with — fine for personal contact form, not for general use
- Good for: getting it working today, deciding on a domain later

**Option b — Verify a domain you own with Resend**
- ✅ Emails come from a real address like `contact@andrewstam.dev` (or whatever domain you own)
- ✅ Better deliverability, looks professional
- ❌ Requires owning a domain and adding DNS records (SPF, DKIM) — 5-10 minutes if you have access to your DNS panel
- Question: do you own a domain you'd want to use? If you have a custom domain pointed at your Vercel deployment already, that's the natural choice.

- [ ] a) Use Resend's onboarding domain for now (can upgrade later)
- [x] b) Verify a domain — I'll provide the domain name in notes
- [ ] c) Not sure yet — start with onboarding domain, plan to upgrade

**Notes:**  
andrewstam.com

### Q3: Spam protection — what level of protection do we add?

Public contact forms attract bot spam. Options, in order of effort:

- [ ] a) **None** — rely only on Resend's reputation. Lowest effort. You'll likely get some spam.
- [x] b) **Honeypot field** — a hidden form field that bots fill in but humans don't. Submissions with the field filled get silently dropped. Catches ~80% of bot spam, zero UX cost, no extra services. **Recommended baseline.**
- [ ] c) **Honeypot + simple rate limiting** — also limit submissions per IP (e.g., max 3/hour) inside the serverless function using Vercel's edge config or in-memory map. Catches the rest.
- [ ] d) **Honeypot + Cloudflare Turnstile (CAPTCHA)** — adds an invisible challenge widget. Very effective but adds a third-party script and one more thing in the UI.

**Notes:**  


### Q4: What should the loading and error states look like?

**Loading state (while request is in flight):**

- [ ] a) Disable the submit button and change its text to "Sending..."
- [ ] b) Show an inline spinner next to/inside the button
- [x] c) Both — disabled button with "Sending..." text and a small spinner

**Error state (if submission fails — network error, Resend down, etc.):**

- [x] a) Show an error banner inside the modal: "Something went wrong. Please try again or email me directly at [email]." Form fields stay filled so the user can retry.
- [ ] b) Replace modal content with full error screen, similar to the success screen
- [ ] c) Other (specify in notes)

**Notes:**  


### Q5: Form behavior on close and reopen

If the user fills out the form, then closes the modal without submitting (or after submitting), and later reopens it:

- [x] a) **Reset every time** — fields always start empty when modal opens
- [ ] b) **Remember in-session** — keep field values until page reload, but reset between sessions
- [ ] c) **Always reset, except after successful submission** — clear after success, otherwise preserve

**Notes:**  


### Q6: Validation rules — specific limits

The brief says fields are required. Should I also enforce length limits to prevent abuse / improve UX?

- [x] a) **Recommended defaults:** Name 1–80 chars, Subject 1–120 chars, Message 1–2000 chars, Email valid format
- [ ] b) **Looser:** required-only, no length limits (let the email field handle format only)
- [ ] c) **Custom limits** — specify in notes

**Notes:**  


### Q7: "Let's Connect" button styling in the Profile card

The button sits below the GitHub/LinkedIn/email icon row in the profile card. Visually, should it:

- [x] a) Be a **filled accent-color button** ("Let's Connect" in white text on purple background) — stands out as the primary CTA
- [ ] b) Be an **outlined accent button** (purple border, transparent fill, purple text) — more understated, matches the overall minimal aesthetic
- [ ] c) Be a **subtle text button** like the social icons — same muted color, hover to accent
- [ ] d) Match an existing button style — specify which one in notes

**Notes:**  


---

### Recommendations

A few things I noticed during scoping that I want to flag:

**Accessibility — I'll handle this without asking.** The modal needs:
- Focus trap (Tab cycles within modal, doesn't escape to background page)
- Escape key closes the modal
- Focus returns to the "Let's Connect" button when the modal closes
- Proper `aria-modal`, `role="dialog"`, and `aria-labelledby`/`aria-describedby` attributes
- All form inputs have associated `<label>` elements

The existing Experience/Project Details modals don't currently implement these (they should — that's a separate small improvement). I'll either build this modal correctly *and* retrofit the existing ones, or build this one correctly in isolation. Which do you prefer? **My recommendation: build this one correctly and retrofit the others as a small follow-up task — don't bundle the retrofit into this feature.**  yes, go ahead with your recommendation.

**Local development testing.** Vercel serverless functions don't run under `npm run dev` (Vite). To test the function locally you'll need one of:
- `vercel dev` (requires installing the Vercel CLI globally — `npm i -g vercel`, free, your call)
- Manual cURL test against the deployed preview URL
- Stub the endpoint in a Vite middleware (more code, more to maintain)

I recommend `vercel dev` — it's the standard tool for this stack and one global npm install. If you'd rather not install it, we can test against Vercel preview deployments instead.

**Submitting on Enter key.** Standard form UX: pressing Enter inside any field submits the form. I'll wire this up by default — flag it here if you want different behavior.

**Profile card height.** Adding a button to the profile card will make the card taller. Since the profile is sticky on desktop, this is fine. On mobile (where the profile stacks on top of content), it adds a bit of vertical scroll. Negligible, but flagging.

**Resume download in modal?** Some contact modals also include a "Download Resume" link/button. You already have `Andrew_Stam.pdf` in `src/assets/`. Worth considering — but I'd skip it for this feature to keep scope tight, and add it as a separate small enhancement if you want it later.

**Rate limiting persistence.** If you pick option (c) for Q3 (honeypot + rate limiting), note that without an external store (Vercel KV, Upstash Redis, etc.), the rate limit counter is per-instance and resets on cold starts. That's fine for casual spam defense; if you wanted bulletproof, that's another dependency. I'd stay with in-memory / honeypot-only for a personal portfolio.

## Extended Brief

Generated: 2026-04-07

### Chosen Approach

A Vercel serverless function (`api/contact.js`) sends form submissions to `j.andrew.stam@gmail.com` via the Resend API, sending from a verified `andrewstam.com` address. The trigger is a new "Let's Connect" button in the Profile card that opens a modal contact form styled to match the existing Experience/Project Details modals.

### Requirements

**Frontend — trigger button**
- New "Let's Connect" button in the Profile card, positioned below the GitHub/LinkedIn/email icon row
- Filled accent-purple primary CTA (white text on solid purple background) — uses existing site CSS, no gradient
- Clicking opens the contact modal

**Frontend — contact modal**
- Centered overlay with dark backdrop, same wrapper styling as existing Experience/Project Details modals (`details-overlay` + `details` patterns, theme-aware via CSS variables)
- Title: **"Reach Out"** (large, bold)
- Subtitle: **"Drop me a message and I'll get back to you securely to your inbox."**
- Close button (×) in the top-right corner
- Form layout: Name and Email side-by-side in a 2-column grid on desktop; Subject and Message stack full-width below; all fields stack to a single column on mobile
- Submit button: full width inside the modal, solid accent purple, label **"Send Message"**
- Accessibility: focus trap, Escape closes, focus returns to "Let's Connect" button on close, `role="dialog"`, `aria-modal`, `aria-labelledby` pointing at the title, all inputs paired with visible `<label>` elements
- Submitting via Enter key while focused in any field works

**Form fields**
- **Name** — required, 1–80 characters
- **Email** — required, valid format (HTML5 + simple regex), max length applied
- **Subject** — required, 1–120 characters
- **Message** — required, 1–2000 characters
- **Honeypot** — hidden field (e.g. `website`), `tabindex="-1"`, `autocomplete="off"`, hidden via off-screen CSS (not `display:none`); submissions where it's filled are silently dropped server-side

**Validation**
- All validation runs on submit (not while typing)
- Inline error messages appear below each invalid field
- First invalid field receives focus on submit failure

**Loading state**
- Submit button disabled, label changes to "Sending..." with a small inline spinner
- All form fields disabled during the request

**Success state**
- Modal content swaps to a centered success view: **"Thanks, I'll be in touch."**
- Includes a Close action — user manually dismisses
- Form fields are cleared (not preserved)

**Error state**
- Error banner at the top of the modal: *"Something went wrong. Please try again or email me directly at j.andrew.stam@gmail.com."*
- Form fields stay populated and re-enabled so the user can retry
- No automatic retry

**Reset behavior**
- Every time the modal opens, fields start empty (no in-session persistence)

**Backend — `api/contact.js` (Vercel serverless function)**
- Accepts POST only; returns 405 for other methods
- Reads `name`, `email`, `subject`, `message`, and the honeypot field from the JSON body
- Server-side validation: re-validates required fields and length limits (never trust the client)
- Honeypot check: if non-empty, return 200 silently (don't reveal to bots that they were caught)
- Calls Resend API:
  - `from`: configured via `CONTACT_FROM_EMAIL` (e.g. `contact@andrewstam.com`)
  - `to`: configured via `CONTACT_TO_EMAIL` (`j.andrew.stam@gmail.com`)
  - `reply_to`: the user's email so replies go directly to them
  - `subject`: the user's subject (with optional `[Portfolio Contact]` prefix)
  - body: plain text containing the form data and metadata
- Returns `{ success: true }` on success or appropriate error status + message on failure
- Reads all secrets from environment variables — nothing hardcoded
- Fails loudly with 500 if required env vars are missing (don't silently send to nowhere)

### Where It Lives

**New files**
- `api/contact.js` — Vercel serverless function (project root, sibling to `src/`)
- `src/components/ContactModal.jsx` — Contact form modal component
- *(possibly)* `src/components/icons/SendIcon.jsx` — if needed; can also inline as SVG

**Modified files**
- `src/components/Profile.jsx` — Add the "Let's Connect" button below the social icons; calls a passed-in `onOpenContact` handler
- `src/App.jsx` — Adds `contactOpen` state, renders `<ContactModal>` at the root level (same pattern as `selectedExperience` / `selectedProject`)
- `src/App.css` — Adds styles for the Let's Connect button, contact modal layout, 2-column form grid, form inputs, validation error states, loading spinner, success/error views
- `package.json` — Adds `resend` dependency
- `.gitignore` — Verify `.env`/`.env.local` files are excluded (likely already covered)

**Vercel environment variables** (set in Vercel dashboard, never committed)
- `RESEND_API_KEY` — Resend API key
- `CONTACT_TO_EMAIL` — `j.andrew.stam@gmail.com`
- `CONTACT_FROM_EMAIL` — verified address on `andrewstam.com`

### Data Sources
- **Form state:** local React `useState` inside `ContactModal.jsx`
- **Submission destination:** `/api/contact` endpoint (Vercel function)
- **Email delivery:** Resend API
- **All configuration:** Vercel environment variables

### User Interaction
1. Visitor sees the "Let's Connect" button in the Profile card
2. Clicks it → modal opens, focus moves into the Name field
3. Fills in fields. Mistakes only surface after pressing Submit.
4. Clicks "Send Message"
5. Submit button becomes "Sending..." with a spinner; all fields disabled
6. **Success path:** Modal swaps to "Thanks, I'll be in touch." → user clicks Close → modal closes → focus returns to "Let's Connect" button
7. **Error path:** Error banner appears at top, fields remain populated and re-enabled, user can retry
8. Pressing Escape at any time closes the modal (allowed even mid-submission — the in-flight request still completes server-side)

### Admin / Configuration Settings

**Configurable via Vercel env vars (not committed):**
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

**Hardcoded (not configurable without code change):**
- Field validation rules and length limits
- All UI copy ("Reach Out", subtitle, "Send Message", success/error messages)
- Spam protection mechanism (honeypot only)
- Modal layout and styling

### Decisions Made
- **Backend approach: Vercel Function + Resend** (Round 1) — fits the engineering portfolio narrative, full control, minimal added complexity
- **Recipient: j.andrew.stam@gmail.com** (Q1)
- **Sending domain: andrewstam.com** (Q2) — DNS records already configured by user
- **Spam protection: honeypot only** (Q3) — sufficient for a personal portfolio, zero UX cost
- **Loading state: disabled button + "Sending..." text + inline spinner** (Q4)
- **Error state: inline error banner, fields stay populated** (Q4)
- **Form reset: every time modal opens** (Q5)
- **Validation limits: Name 1–80, Subject 1–120, Message 1–2000, Email format** (Q6)
- **Button style: filled solid accent purple** (Q7) — matches existing site CSS, no gradient
- **Modal copy verbatim from screenshot** — "Reach Out" / "Drop me a message and I'll get back to you securely to your inbox." / "Send Message"
- **Field count: 4 fields including Subject** — preserves brief, deviates from screenshot (which had 3)
- **Form layout: 2-column grid for Name + Email on desktop**, Subject + Message full-width below — borrowed from screenshot
- **Modal state ownership: lift to App.jsx** — same pattern as existing details modals; Profile.jsx receives `onOpenContact` handler
- **Accessibility: build this modal correctly; retrofit existing modals as a separate follow-up** — user-confirmed in feature.md notes
- **Local dev: plain `npm run dev`** — accept that `/api/contact` won't be reachable locally; submission testing happens on Vercel preview deployments

### Edge Cases to Handle
- **Slow network:** Loading state stays visible until response. No timeout in v1.
- **Function returns non-200:** Show error banner with the user-friendly message
- **Network failure / offline / DNS error:** Caught by `fetch` error handler → same error banner
- **Double-submit:** Disabled button during loading prevents this
- **User closes modal mid-submission:** Allowed; in-flight request still completes server-side
- **Mobile keyboard pushing modal off-screen:** Existing modal CSS uses `max-height: 85vh` with internal scroll
- **Browser autofill:** Standard inputs, autofill works naturally
- **Theme switch with modal open:** CSS variables update live, modal updates with theme
- **JS disabled:** Button does nothing — acceptable for an SPA
- **Honeypot caught by browser autofill:** Use `tabindex="-1"`, `autocomplete="off"`, name like `website` (not `url`/`email`), hidden via off-screen CSS
- **Empty `CONTACT_TO_EMAIL` env var:** Function fails loudly with 500
- **Missing `RESEND_API_KEY`:** Function fails loudly with 500
- **Email longer than DB column / SMTP limit:** Validation catches it before submission
- **First-render focus management:** When modal opens, programmatically focus first field; when modal closes, return focus to the trigger button

### Out of Scope
- Saving submissions to a database
- Auto-reply email to the sender
- Rate limiting beyond honeypot
- CAPTCHA (Turnstile, reCAPTCHA, etc.)
- File uploads / attachments
- Multiple recipients
- Custom HTML email templates (function sends a clean text email; HTML can be added later)
- "Download Resume" link inside the modal
- Retrofitting accessibility into existing Experience/Project Details modals (separate follow-up task)
- Internationalization / multiple languages
- Form analytics / tracking
- Local function emulation via `vercel dev` or Vite middleware mock (testing happens on Vercel previews)
- Persistent in-session form state across modal close/reopen

### Dependencies
- **New npm package:** `resend` (requires user approval per CLAUDE.md no-go list)
- **Resend account** — free tier, user already signed up implied by DNS step
- **DNS records on andrewstam.com** — SPF, DKIM, DMARC configured (✅ user confirmed)
- **Vercel environment variables** — to be set in Vercel dashboard during deploy:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
- **Existing project pieces:**
  - CSS variables / theme tokens (light/dark)
  - Existing modal pattern (`details-overlay`, `details`)
  - Profile component
  - App.jsx state lifting pattern

### Notes
- After this feature ships, the existing Experience/Project Details modals should get an accessibility retrofit (focus trap, Escape, ARIA, focus return) as a separate small follow-up task.
- If casual bot spam ever defeats the honeypot, the next step is rate limiting (in-memory in the function) or Turnstile — neither requires architectural changes.
- The honeypot field uses off-screen CSS rather than `display:none` so screen readers don't announce it but bots still see it in the DOM.
- Local testing: UI iteration via `npm run dev`; end-to-end submission testing via Vercel preview deployments.
- The deviation from the reference screenshot (4 fields with Subject vs the screenshot's 3) is intentional — confirmed by user in Round 3.
- Field labels should match the screenshot's casing where applicable: "Name", "Email Address", "Your Message", and (added) "Subject".

### Needs Client Clarification
*(All resolved during Round 3 — no open questions.)*
