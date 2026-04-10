# Contact Form — Implementation Plan

## Summary

Adds a "Let's Connect" button to the Profile card that opens a full-featured contact modal. The modal has 4 fields (Name, Email, Subject, Message), inline validation, a loading state, a success screen, and an error banner. Submissions are sent via a Vercel serverless function (`api/contact.js`) that calls the Resend API to deliver email to `j.andrew.stam@gmail.com` from a verified `andrewstam.com` address. Spam protection uses a honeypot field. The modal is fully accessible (focus trap, Escape key, ARIA attributes, focus return).

---

## Phase 1 — Dependency approval and environment setup

Before any code is written, we need one new package and three environment variables. This phase ensures those are in place and understood.

**Why first?** The serverless function won't work without the Resend package, and the Vercel env vars need to exist before testing a deployed preview. Getting these approved and documented now prevents surprises mid-build.

- [ ] 1. Approve adding the `resend` npm package. (Per CLAUDE.md, no dependencies added without approval. Confirm with user before running `npm install resend`.)
- [ ] 2. Run `npm install resend` once approved.
- [ ] 3. Document the three Vercel environment variables the user needs to set in the Vercel dashboard:
  - `RESEND_API_KEY` — Resend API key from the Resend dashboard
  - `CONTACT_TO_EMAIL` — `j.andrew.stam@gmail.com`
  - `CONTACT_FROM_EMAIL` — a verified address on `andrewstam.com` (e.g. `contact@andrewstam.com`)
- [ ] 4. Verify `.gitignore` covers `.env` and `.env.local` so secrets are never committed. (These files won't exist locally since we're using Vercel env vars, but confirm the protection is there.)

---

## Phase 2 — Vercel serverless function (`api/contact.js`)

This is the backend. It lives at the project root in an `api/` folder (Vercel convention). It handles the form POST, runs server-side validation, checks the honeypot, and calls Resend.

**Why a separate phase?** The function can be built and reviewed independently of the UI. It's also the riskiest part — it handles credentials and external API calls — so it's better to get this right and clear before wiring it to a form.

- [ ] 5. Create the `api/` folder at the project root (sibling to `src/`).
- [ ] 6. Create `api/contact.js`. The function must:
  - Accept POST requests only. Return HTTP 405 for all other methods.
  - Parse the JSON request body to extract: `name`, `email`, `subject`, `message`, and the honeypot field (`website`).
  - Check the honeypot: if `website` is non-empty, return HTTP 200 with `{ success: true }` silently (bots must not know they were caught).
  - Run server-side validation: name (1–80), email (valid format), subject (1–120), message (1–2000). Return HTTP 400 with a descriptive error message if any field fails.
  - Read `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` from `process.env`. If any are missing, return HTTP 500 with a clear error — never silently fail.
  - Call the Resend API using the `resend` package to send the email:
    - `from`: value of `CONTACT_FROM_EMAIL`
    - `to`: value of `CONTACT_TO_EMAIL`
    - `reply_to`: the submitter's email address (so replies go directly to them)
    - `subject`: the submitted subject (optionally prefixed with `[Portfolio Contact]`)
    - body: plain text containing name, email, subject, and message
  - Return HTTP 200 with `{ success: true }` on a successful send.
  - Catch errors from the Resend call and return HTTP 500 with a generic message.
- [ ] 7. Review the function for security: ensure no secrets are logged, no raw Resend error details are leaked to the client, and the response messages are safe to expose publicly.

---

## Phase 3 — CSS additions for the modal and form

Add all new styles to `App.css` before building the component. This way the component can be built against real styles from the start, not reflowed later.

**Why before the component?** Adding styles after the fact often leads to fighting specificity or discovering layout issues late. Writing targeted CSS first also documents the intended visual structure before JSX is written.

- [ ] 8. Add the "Let's Connect" CTA button style to `App.css`. It sits in the Profile card, below the social icons row. It should be full-width within the card, solid accent purple background, white text, rounded corners — using the existing `--accent` and CSS variable tokens. Class name: `lets-connect-btn`.
- [ ] 9. Add styles for the contact modal's internal layout to `App.css`. Reuse the existing `.details-overlay` and `.details` classes for the wrapper/backdrop (same as Experience/Project Details modals). New classes needed for:
  - `.contact-modal-title` — large bold heading ("Reach Out")
  - `.contact-modal-subtitle` — muted subtitle below the title
  - `.contact-form` — the `<form>` element wrapper
  - `.contact-form-row` — a 2-column grid container for Name + Email side-by-side on desktop; collapses to single column at `max-width: 600px`
  - `.contact-field` — a single field group (label + input/textarea + error message)
  - `.contact-label` — the visible `<label>` text
  - `.contact-input` — shared style for `<input>` and `<textarea>` fields (border, background using `--card`, color using `--text`, focus ring using `--accent`, border-radius, padding)
  - `.contact-input.error` — red/error border state for invalid fields
  - `.contact-error-text` — the small inline error message below an invalid field (red/error color, small font)
  - `.contact-error-banner` — the top-of-modal error message shown on submission failure (styled as a warning callout, not the same as `.contact-error-text`)
  - `.contact-submit-btn` — full-width solid accent button, same purple as `lets-connect-btn`, includes layout for label + spinner side by side
  - `.contact-spinner` — a small CSS keyframe spinning ring/circle (pure CSS, no image); hidden by default, shown when loading class is active
  - `.contact-success` — the centered success state view shown after submission; contains the "Thanks, I'll be in touch." message
  - `.honeypot-field` — positions the honeypot input off-screen (e.g. `position: absolute; left: -9999px;`) — not `display:none` so screen readers don't announce it but bots still see the DOM element
- [ ] 10. Add the responsive override so `.contact-form-row` collapses to a single column at `max-width: 600px` (inside the existing mobile breakpoint block at the bottom of `App.css`).

---

## Phase 4 — `ContactModal.jsx` component

The full contact modal. This is the largest piece of the feature. Build it incrementally: structure first, then validation, then submission, then the success/error states.

**Why a dedicated component?** Consistent with the existing `ExperienceDetails.jsx` and `ProjectDetails.jsx` pattern. Keeps `App.jsx` lean — App only manages whether the modal is open; all form logic lives inside `ContactModal.jsx`.

- [ ] 11. Create `src/components/ContactModal.jsx`. Start with the structural shell only (no submission logic yet):
  - Accept props: `onClose` (function called when the modal should close)
  - Render the `.details-overlay` backdrop and `.details` inner panel (reuse existing modal wrapper classes)
  - Render the close button (`×`) in the top-right corner, wired to `onClose`
  - Render the title "Reach Out" and subtitle "Drop me a message and I'll get back to you securely to your inbox."
  - Render the `<form>` with the 4 visible fields (Name, Email, Subject, Message) and the honeypot field
  - Each visible field has: a `<label>`, an `<input>` (or `<textarea>` for Message), and a placeholder `<span>` for validation error text
  - Honeypot field: `<input>` named `website`, `tabIndex={-1}`, `autoComplete="off"`, wrapped in `.honeypot-field`
  - Render the submit button labeled "Send Message"
  - No state wired up yet — just the skeleton
- [ ] 12. Add local state to `ContactModal.jsx`:
  - `fields` — object with `name`, `email`, `subject`, `message`, `website` (honeypot); initialized to empty strings
  - `errors` — object with the same keys, initialized to empty strings
  - `status` — one of `'idle'` | `'loading'` | `'success'` | `'error'`; initialized to `'idle'`
  - `errorBanner` — string for the submission error banner message; initialized to `''`
- [ ] 13. Wire field values and `onChange` handlers to the input elements. Changes update the corresponding key in `fields`. No validation on change — only on submit.
- [ ] 14. Add submit-time validation logic. On form submit:
  - Run all field validations: name (1–80), email (valid format), subject (1–120), message (1–2000)
  - Populate the `errors` object with any failure messages
  - If any errors exist: do not submit, instead focus the first invalid field programmatically
  - Only proceed to submission if all fields pass
- [ ] 15. Add the submission `fetch` call. When validation passes:
  - Set `status` to `'loading'` (disables the submit button, shows "Sending..." + spinner, disables all fields)
  - `POST` to `/api/contact` with a JSON body: `{ name, email, subject, message, website }`
  - On HTTP 200 response: set `status` to `'success'`
  - On any non-200 response or network error: set `status` to `'error'` and set `errorBanner` to `"Something went wrong. Please try again or email me directly at j.andrew.stam@gmail.com."`, re-enable the form
- [ ] 16. Wire the UI states to `status`:
  - `'loading'`: submit button shows "Sending..." + spinner, all inputs and the submit button are `disabled`
  - `'success'`: replace the entire form content with the success view ("Thanks, I'll be in touch." + a Close button wired to `onClose`)
  - `'error'`: show the `.contact-error-banner` at the top of the form; form fields remain populated and enabled
  - `'idle'`: default state, normal form
- [ ] 17. Add accessibility wiring:
  - The modal `<div>` gets `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title element's `id`
  - On mount (when modal opens): focus the Name input using a `useEffect` with a `ref`
  - On close (when `onClose` is called): the focus return to the trigger button is handled by the parent (App.jsx) — no action needed here
  - Implement a focus trap: a `keydown` event listener on the modal that intercepts Tab and Shift+Tab to cycle focus only within the modal's focusable elements
  - Escape key listener: `keydown` listener that calls `onClose` when `key === 'Escape'`
  - Wire up both listeners in a single `useEffect` that returns a cleanup function

---

## Phase 5 — Profile card updates

Add the "Let's Connect" button to the Profile component and thread the handler through App.jsx.

**Why a separate phase?** Small and isolated. Doing this after the modal is built means we can immediately test the trigger → open flow without juggling partial implementations.

- [ ] 18. Add an `onOpenContact` prop to `Profile.jsx`.
- [ ] 19. Render a `<button className="lets-connect-btn" onClick={onOpenContact}>Let's Connect</button>` below the `.profile-socials` div in `Profile.jsx`.
- [ ] 20. In `App.jsx`, add a `contactOpen` boolean state: `const [contactOpen, setContactOpen] = useState(false)`.
- [ ] 21. Pass `onOpenContact={() => setContactOpen(true)}` to the `<Profile>` component in `App.jsx`.
- [ ] 22. Add a `ref` in `App.jsx` pointing to the Profile's "Let's Connect" button — this ref is passed to `ContactModal` so focus can return to the trigger on close. The simplest approach: add `const contactTriggerRef = useRef(null)`, pass it to `Profile` as a `triggerRef` prop, and attach it to the button element via `ref={triggerRef}`. In `ContactModal`, call `triggerRef.current?.focus()` inside the close handler.
- [ ] 23. Import `ContactModal` in `App.jsx` and render it conditionally (after the existing modals pattern):
  ```
  {contactOpen && (
    <ContactModal
      onClose={() => setContactOpen(false)}
      triggerRef={contactTriggerRef}
    />
  )}
  ```

---

## Phase 6 — Focus return wiring and final review

Close the accessibility loop and do a final readthrough of all touched files before testing.

- [ ] 24. In `ContactModal.jsx`, update the `onClose` callback sequence: before calling `onClose`, call `props.triggerRef?.current?.focus()` so keyboard and screen reader users are returned to their place in the page.
- [ ] 25. Read through `api/contact.js` one final time and verify: no console logs with sensitive data, correct HTTP status codes, honeypot check fires before Resend call, and all env var reads are guarded.
- [ ] 26. Read through `ContactModal.jsx` one final time and verify: all field labels are associated with their inputs via matching `htmlFor` / `id` pairs, error messages are referenced by inputs via `aria-describedby`, and no inline styles were introduced.
- [ ] 27. Read through `App.css` and confirm all new classes use `--` CSS variable tokens (not hardcoded colors), and all new mobile overrides are inside the existing `@media` blocks.

---

## Files to Create

| File | Action |
|------|--------|
| `api/contact.js` | Create |
| `src/components/ContactModal.jsx` | Create |

## Files to Modify

| File | What changes |
|------|--------------|
| `src/components/Profile.jsx` | Add `onOpenContact` prop + "Let's Connect" button |
| `src/App.jsx` | Add `contactOpen` state, `contactTriggerRef`, import + render `<ContactModal>` |
| `src/App.css` | Add button, form, modal, spinner, success/error styles |
| `package.json` | Add `resend` dependency (requires approval) |

## Dependencies

| Dependency | Type | Notes |
|------------|------|-------|
| `resend` | npm package | Requires user approval per CLAUDE.md before installing |
| Resend account + API key | External service | User already has DNS configured, implying account exists |
| Vercel env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) | Infra config | Set in Vercel dashboard, never committed |

## Risks and Open Questions

- **`resend` package approval** — The first step blocks everything. Phase 1 must be confirmed before Phase 2 starts.
- **Local testing limitation** — `/api/contact` only runs on Vercel deployments (not under `npm run dev`). End-to-end testing requires pushing to a Vercel preview branch. UI-only iteration (layout, validation, states) can be done locally; submission testing cannot.
- **Resend API key and `CONTACT_FROM_EMAIL`** — These must be set in the Vercel dashboard before a deployed test works. Remind the user to do this before testing a preview.
- **Focus trap implementation** — The focus trap needs to enumerate all focusable elements inside the modal at runtime (inputs, textarea, buttons, close button). This is a small but fiddly piece of code — take care with edge cases like disabled elements.
- **`api/contact.js` module format** — Vercel Node.js serverless functions use CommonJS (`module.exports`) by default unless the project has `"type": "module"` in `package.json`. Check `package.json` before writing the function to confirm which format to use.
- **Resend `from` address** — The address set in `CONTACT_FROM_EMAIL` must exactly match a verified domain/address in the Resend dashboard. If it doesn't match, Resend will return a 400 error. Remind the user to confirm the verified address before the first test.
