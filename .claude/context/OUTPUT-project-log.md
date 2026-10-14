# Project Log

## 2026-04-02 — Project initialized

- **What:** Personal portfolio site scaffolded with Vite + React 19. Claude Code project structure (`.claude/` folder) configured for this project.
- **Tech stack:** Vite 7.2.4, React 19.2, vanilla CSS, React Compiler, ESLint 9.
- **Current state:** Single-page app with sidebar layout. Three content groups (Work Experience, Projects, Education/Certifications) using sample placeholder data. Components: `Profile`, `ProjectCard`, `ProjectDetails`. No routing, no backend, no external data source.
- **Decisions:** `.claude/` folder updated from a Shopify template to match this React + Vite project. Removed "never hardcode text" rule since portfolio content is currently hardcoded by design. Relaxed inline styles rule to allow during prototyping with approval.

## 2026-10-13 — First real project: Inspire Small Business

- **What:** Replaced placeholder "Project Alpha" (id `1`) in `src/data/projects.js` with Inspire Small Business, a Shopify app Andrew built solo as a contractor. Other two projects remain placeholders. Data-only change; no component edits.
- **Source:** Description paraphrased from the Shopify App Store listing (https://apps.shopify.com/inspire-small-business), reframed around Andrew's role. Stack per Andrew: React, TypeScript, Postgres, hosted on Railway.
- **Note:** App is an internal client portal (existing ISB clients only), so visitors can view the listing but not use the app. Copy says "internal client portal" to set that expectation. Andrew may add technical highlights later.

## 2026-10-14 — Testimonials section (branch `feature-testimonials`)

- **What:** New "Client Testimonials" section between Projects and Tools, with one entry: a video from Clayton Bates (Founder, Inspire Small Business). Files: `src/data/testimonials.js`, `src/components/TestimonialsSection.jsx` (new); `App.jsx`, `TopNav.jsx`, `App.css` (edited). Plan in `.claude/features/testimonials/`.
- **Decisions:** Embedded YouTube player (keeps visitors on-site) using `youtube-nocookie.com` + `loading="lazy"` (no cookies or player load until needed), with a "Watch on YouTube" fallback link. Data stores only `videoId`; URLs are built in the component. Nav label "Reviews" (short for the mobile tab bar) vs heading "CLIENT TESTIMONIALS".
- **Watch:** Mobile bottom bar now has 6 tabs — the practical limit; a 7th section will need a different mobile nav (e.g. a "More" menu). If the video's YouTube embed setting is disabled, the player breaks (the link still works).
