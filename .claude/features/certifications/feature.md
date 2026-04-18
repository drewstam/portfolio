# Certifications

## Brief

Add a Certifications section to the portfolio to showcase two professional certifications.

**Placement**
- Below the Home (Software Engineer description) section
- Above the Work Experience section
- New top nav button between "Home" and "Experience" labeled "Certifications"

**Cards**
- Similar look and feel to the Work Experience cards
- Two certification cards displayed

**Modal / Detail view**
- Clicking a card opens a detail view showing an image of the certification
- Images will be provided after the feature is created

**Reference material**
- None provided yet — images to be supplied later

---

## Scoping Questions

Generated: 2026-04-10
Chosen approach: Approach A — Image modal

### Q1: What information should appear on each certification card?

The experience cards show: job title, company, date, location badge, and tags. Certifications typically have different metadata. Which fields do you want on the card?

- [ ] a) Name + issuing organization + date issued only (minimal)
- [ ] b) Name + issuing organization + date issued + expiry date (if applicable)
- [x] c) Name + issuing organization + date issued + a "Verify Credential" link
- [ ] d) Name + issuing organization + date issued + expiry + credential ID + verify link (full)
- [ ] e) Custom — specify in notes

**Notes:**  

### Q2: Should the cards be single column or two columns?

You only have two certifications. The experience section uses a single column. Two options:

- [x] a) **Single column** — same layout as experience, cards stack vertically, consistent with the rest of the page
- [ ] b) **Two columns side-by-side** — both cards visible at once without scrolling, feels more like a showcase grid

**Notes:**  

### Q3: What should the image modal show besides the certificate image?

The modal opens when a card is clicked and displays the certificate image. Should it include anything else?

- [ ] a) Image only — clean and minimal, let the certificate speak for itself
- [x] b) Image + certification name as a title above or below the image
- [ ] c) Image + name + issuing organization + date
- [ ] d) Image + name + a "Verify Credential" button/link (opens issuer's verification page)

**Notes:**  

### Q4: Do your certifications have associated skills/tags to display?

The experience cards show tag pills (e.g. "Salesforce", "React", "CQRS"). Would you like to show relevant skills or technology tags on the certification cards?

- [ ] a) Yes — I'll provide the tags for each cert in notes
- [x] b) No — keep the cards clean without tags

**Notes:**  

### Q5: Placeholder state while images aren't uploaded yet

The images will be added later. In the meantime, when a card is clicked, the modal will open but have no image to show. How should it handle this?

- [ ] a) **Don't render the click target yet** — cards are not clickable until images are provided (simplest, no placeholder needed)
- [ ] b) **Show a placeholder** — a grey box with "Certificate image coming soon" text in the modal
- [x] c) **Build it fully now** — I'll add the images immediately after the feature is built

**Notes:**  
the images have been added to the features/certifications/reference folder.  mscert-az900.png is for the Microsoft Azure Fundamentals (AZ-900) certification, and python-cert.png is for the PCEP™ – Certified Entry-Level Python Programmer cerfitication.  For the verification links, use https://learn.microsoft.com/api/credentials/share/en-us/AndrewStam-6229/81161184FF0C249?sharingId=9A43886049085882 for the AZ-900 certification and https://verify.openedg.org/?id=keYp.kZeK.g9WM for the python certification.
---

## Extended Brief

Generated: 2026-04-10

### Chosen Approach

Image modal (Approach A) — clicking a certification card opens a centered overlay showing the certificate image with its name as a title, consistent with the existing Experience/Project modal pattern.

### Requirements

- New "Certifications" section rendered between the Home section and Work Experience section
- New "Certifications" nav button in TopNav, positioned between "Home" and "Experience"
- Two certification cards in a single column, styled to match Experience cards
- Each card shows: certification name (title), issuing organization (subtitle), date issued, and a "Verify Credential" link
- "Verify Credential" link opens the issuer's verification page in a new tab; clicking it does NOT open the image modal (stopPropagation)
- Clicking anywhere else on the card opens an image modal
- Image modal: dark backdrop overlay, certification name as title, certificate image below it sized to fit viewport while preserving aspect ratio, close button + Escape + backdrop click all dismiss
- No tags on cards
- Images copied from references folder into src/assets/

### Where It Lives

- New section between `<HomeSection />` and `<ExperienceSection />` in App.jsx
- Section ID: `certifications` (used by IntersectionObserver + scroll nav)
- Nav button inserted between "Home" and "Experience" in TopNav's button list

### Data Sources

Hardcoded in `src/data/certifications.js`:

| Field | AZ-900 | Python |
|---|---|---|
| id | 1 | 2 |
| name | Microsoft Certified: Azure Fundamentals | PCEP™ – Certified Entry-Level Python Programmer |
| issuer | Microsoft | Python Institute |
| date | April 17, 2026 | October 16, 2023 |
| verifyUrl | https://learn.microsoft.com/api/credentials/share/en-us/AndrewStam-6229/81161184FF0C249?sharingId=9A43886049085882 | https://verify.openedg.org/?id=keYp.kZeK.g9WM |
| image | mscert-az900.png | python-cert.png |

### User Interaction

1. Visitor scrolls to or clicks "Certifications" in the top nav → section comes into view, nav button highlights
2. Two cards visible, each showing name, issuer, date, and "Verify Credential" link
3. Clicking "Verify Credential" → opens issuer's verification page in a new tab (does not open modal)
4. Clicking anywhere else on the card → image modal opens, showing cert name as title and the certificate image
5. User closes modal via ×, Escape, or clicking the backdrop

### Admin / Configuration Settings

**Hardcoded (not configurable without code change):**
- All certification data (name, issuer, date, verify URLs)
- Image file paths
- Section heading "Certifications"
- Nav label "Certifications"

### Decisions Made

- **Single column layout** (Q2) — consistent with Experience section, scales to more certs later
- **Card fields: name + issuer + date + verify link** (Q1c) — enough context without clutter
- **Modal: image + name title** (Q3b) — clean, image-forward; verify link stays on the card
- **No tags** (Q4b) — keep cards clean
- **Images available now** (Q5c) — both PNG images provided in references folder, to be moved to src/assets/
- **Both images are landscape format** — modal will constrain by width, preserve aspect ratio

### Edge Cases to Handle

- Both images are landscape — modal max-width handles them; on mobile, image scales down responsively
- Verify link inside a clickable card — stopPropagation on the link prevents modal from also opening
- IntersectionObserver must include `certifications` in SECTION_IDS array
- Nav button order: Home → Certifications → Experience → Projects → Tools

### Out of Scope

- Tags / skill pills on cards
- Expiry dates or credential IDs on cards
- Anything in the modal beyond image + name (no issuer, no date, no verify link)
- Accessibility retrofit of existing modals (separate follow-up)

### Dependencies

- Certificate images: `mscert-az900.png` and `python-cert.png` — to be placed in `src/assets/`
- Existing modal CSS pattern (`.details-overlay`, `.details`)
- Existing card CSS patterns from ExperienceCard

### Notes

- Section heading and nav label: "Certifications"
- Verify links open in new tab with `rel="noreferrer"`

### Needs Client Clarification

*(All resolved — no open questions.)*

---

### Recommendations

A few things I want to flag before we build:

**Only two cards is a good constraint to start.** If you add more certifications later, the layout choice in Q2 matters — a 2-column grid scales well to 4, 6 cards; a single column scales to any number. Worth deciding with future growth in mind.

**Verify credential links are worth considering.** Many certification bodies (Salesforce, AWS, Microsoft, Credly) provide a public URL to verify a credential. If your certs have these, adding a link in the modal is a small touch that makes the section more credible to visitors — and lets them confirm the cert is real without you doing anything.

**Image format and sizing.** Certificate images vary — some are landscape (Credly badges are square, Salesforce certs are landscape PDFs). The modal will need to handle both gracefully. I'll build it to fit within the viewport regardless of aspect ratio, but it helps to know in advance if both images are the same format.

**Section heading.** I'll use "Certifications" as the section heading and nav label unless you want something different — let me know in notes if so.
