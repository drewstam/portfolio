# Testimonials — Implementation Plan

## Summary

New single-column "Client Testimonials" section between Projects and Tools. Each testimonial is a card with the author, their role, a short summary, and an embedded YouTube video. Content lives in `src/data/testimonials.js`, following the one-data-file-per-section convention. No new dependencies.

## Human-First Breakdown

- **Admin setup:** None. The video must stay public or unlisted with embedding allowed on YouTube, or the player shows an error.
- **Code preparation:** New data file and section component; small edits to nav, App, and CSS.
- **Live behavior:** A "Reviews" nav button scrolls to the new section. The card shows Clayton Bates' testimonial with a playable video. On phones it appears as a 6th tab in the bottom bar.

## Build Steps

1. **`src/data/testimonials.js`** (new): array of `{ id, author, role, company, summary, videoId }`. Store only the YouTube video ID; build the embed and watch URLs from it in one place.
2. **`src/components/TestimonialsSection.jsx`** (new): section `id="testimonials"`, two-tone heading "CLIENT / TESTIMONIALS", list of cards. Each card has:
   - `<iframe>` from `youtube-nocookie.com/embed/{id}` (privacy-enhanced mode, no cookies until play), `loading="lazy"`, a descriptive `title` for screen readers, `allowFullScreen`.
   - Author name, role and company, summary text, and a "Watch on YouTube" link.
3. **`src/components/TopNav.jsx`:** add `{ key: 'testimonials', label: 'Reviews', icon }` between Projects and Tools, with a speech-bubble icon matching existing icon style.
4. **`src/App.jsx`:** add `'testimonials'` to `SECTION_IDS` (scroll-spy) and render `<TestimonialsSection />` between Projects and Tools.
5. **`src/App.css`:** card styles that reuse existing tokens (`--card`, `--border-soft`, `--muted`, `--accent`). Use `aspect-ratio: 16 / 9` on the video wrapper so it stays responsive. Not clickable, so no hover lift.

## Verification

- `npm run lint` and `npm run build` pass.
- Manual: video plays in both themes; nav highlights "Reviews" while scrolling; mobile bottom bar fits 6 tabs at ~375px.

## Risks

- Mobile bottom bar goes from 5 to 6 tabs; labels are already ellipsis-safe, but check on a real phone width.
- If the video's embedding setting is turned off on YouTube, the embed breaks. The fallback link still works.
