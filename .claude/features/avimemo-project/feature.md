# Aviary Memo Project Card + Static Landing Page

## Brief

Add Andrew's published iOS app, **Aviary Memo** (a birdwatching journal app), as a 4th entry in the Projects section. Unlike the other project cards — which open the existing `ProjectDetails` modal — this card links directly to a new standalone landing page at `/avimemo/index.html` that advertises the app and links to the App Store.

This feature was planned and built in a single Plan Mode session rather than through the full `/scope-feature` interview, since the key decisions were made directly with Andrew during planning. No Scoping Questions / Extended Brief sections below — see Decisions Made instead.

## Decisions Made

- **Landing page is plain static HTML/CSS**, not React — lives in `public/avimemo/` so Vite copies it untouched to `dist/avimemo/`, reachable at `/avimemo/index.html` with zero `vite.config.js` changes and no new dependencies. The site has no router today; a one-off marketing page doesn't need one.
- **Card click skips the modal entirely** — a new `landingPageUrl` field on the project data makes `ProjectCard.jsx` render a real `<a>` instead of the usual `<article onClick>`, navigating straight to the landing page like every other card does *not*.
- **The explicit `/avimemo/index.html` path is used (not the bare `/avimemo/`)** — Vite's dev server doesn't resolve directory-style URLs to a nested `public/` `index.html` (it falls back to the SPA's own `index.html` instead), even though the production build/preview server does. Using the explicit filename works identically in dev, preview, and any static host, and is also more resistant to ever being swallowed by a future catch-all SPA rewrite rule.
- **App's logo (`src/assets/AviMemo_logo.png`, added by Andrew) is shown only on the Projects card**, as a small 28px icon next to the title — not on the landing page, which stays text-only for now. Resized from 1254×1254 (1.17MB) down to 128×128 (~21KB) with macOS's built-in `sips` before importing, since the original was needlessly heavy for a thumbnail-sized use.
- **App name is "Aviary Memo," not "AviMemo"** — confirmed against the app's actual splash screen (found in a later batch of real screenshots Andrew added to `src/assets/avimemo/`), which reads "Aviary Memo — Your field journal companion." All user-visible text was corrected; internal technical naming (the `avimemo` URL slug, the asset folder, the logo filename) was left as-is since Andrew had already independently used that lowercase form for the folder he created.
- **Real screenshots exist but are explicitly out of scope for now** — Andrew added 16 real in-app screenshots to `src/assets/avimemo/` (Journal list, Map, Field Guide, Stats Dashboard, Settings, splash screens, etc.) showing the app's actual dark forest-green + gold, serif-logotype branding. Andrew chose to keep today's placeholder landing page and design the real one as a separate follow-up, since picking screenshots/copy/matching the brand is a real design task deserving its own pass.

## Out of Scope (this round)

- Real landing page design/copy using the actual screenshots and brand colors — placeholder stays in place; revisit as a follow-up feature.
- Real App Store URL — landing page CTA uses a clearly-marked placeholder href (`#APP-STORE-URL-PLACEHOLDER`) with a TODO comment.
- Real card copy/tags/release date — `summary`, `date`, and `tags` in `src/data/projects.js` are still marked `PLACEHOLDER` pending Andrew's input.
- SEO/Open Graph meta tags on the landing page — worth adding once real content/assets are in place.
- Any router or vite.config.js changes — intentionally avoided.

## Files Touched

- `public/avimemo/index.html` (new) — placeholder static landing page
- `public/avimemo/styles.css` (new)
- `src/assets/AviMemo_logo.png` (resized in place via `sips`, 1254px → 128px)
- `src/data/projects.js` — new 4th entry with `landingPageUrl` + `icon` fields
- `src/components/ProjectCard.jsx` — conditional `<a>` vs `<article>` rendering, optional icon
- `src/App.css` — `.project-card-link`, `.project-title-row`, `.project-icon` rules (additive only)

## Verification Performed

Ran on branch `feature-ios-app-avimemo`: `npm run lint` (clean), `npm run build` (confirmed `dist/avimemo/index.html` + `styles.css` emitted, logo bundled at ~21KB), and a headless-browser pass (Playwright, installed temporarily and removed afterward — not a project dependency) against `npm run dev`: card renders correctly with icon in both dark and light theme, hover lift still works, clicking navigates to `/avimemo/index.html` with no modal flash and no console errors, and the other 3 placeholder cards still open the modal as before (regression check).
