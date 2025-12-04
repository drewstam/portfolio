<!-- .github/copilot-instructions.md - guidance for AI coding agents working on this repo -->

# Copilot / AI Agent Instructions

Purpose: short, specific guidance for automated coding assistance in this repository.

Big picture
- This is a small React app bootstrapped with Vite. Entry flow: `index.html` → `src/main.jsx` → `src/App.jsx`.
- Uses React 19 and functional components with `.jsx` files (no router/state library by default).
- Static/public files served from `public/` (use absolute paths like `/vite.svg`). Project assets that need bundling live in `src/assets` and are imported by components (e.g., `import reactLogo from './assets/react.svg'`).

How to run / common tasks
- Install dependencies: `npm install` (or `pnpm`/`yarn` if you prefer, but package.json scripts assume npm).
- Dev server: `npm run dev` (runs `vite` — HMR enabled).
- Build: `npm run build` (Vite production build).
- Preview production bundle locally: `npm run preview` (runs `vite preview`).
- Lint: `npm run lint` (runs `eslint .`; see `eslint.config.js`).

Key files and where to look
- `package.json` — scripts and dependencies.
- `vite.config.js` — React plugin is configured and includes `babel-plugin-react-compiler`.
- `index.html` — root HTML; ensure the root element id matches `createRoot` in `src/main.jsx`.
- `src/main.jsx` — application bootstrap.
- `src/App.jsx` — the main app component (component-level CSS imports are used here: `import './App.css'`).
- `src/components/` — additional components belong here; prefer co-locating component CSS next to component files.
- `src/assets/` — images and importable assets.
- `public/` — static files served at root; reference them as `/filename` in code.

Project-specific conventions & patterns
- File extensions: use `.jsx` for React components unless the repo is migrated to TypeScript.
- Styling: components import CSS directly (e.g., `import './App.css'`). Follow that pattern rather than global CSS unless necessary.
- Assets: import assets from `src/assets` for module-backed usage; use `public/` for files that must be referenced by absolute path.
- No test runner configured: do not add tests unless requested. If tests are added, update README and CI accordingly.
- Linting: `eslint` is configured as a dev dependency; run `npm run lint` and follow rules from `eslint.config.js`.

Important notes for edits and PRs
- Keep changes minimal and focused. This repo is a lightweight Vite + React template — avoid adding large infra (e.g., new build systems, TS migration) without an explicit request.
- If you modify `vite.config.js` or Babel plugins (the repo currently uses `babel-plugin-react-compiler`), test both `npm run dev` and `npm run build` to ensure dev HMR and production builds still work.
- If adding assets that should be imported, place them in `src/assets` and import them (not in `public/`) unless they must be statically served.

What to avoid
- Don't assume a global state manager (Redux/MobX) or router exists — add them only when the feature requires it and after confirming with the developer.
- Don't convert JS → TS automatically; the repo has TypeScript types in devDependencies but source is JS. Ask before migrating.

When you need more context
- Inspect `vite.config.js`, `package.json`, and `eslint.config.js` for build/lint details.
- Run the dev server locally (`npm run dev`) to observe runtime behavior and HMR.

If unclear, ask the developer
- Should new features include tests? Which test runner do you prefer?
- Do you want TypeScript added and a full migration plan?
- Any preferred component styling conventions beyond the current CSS imports?

Last note: no existing `.github/copilot-instructions.md` was found when this file was created; if you already have other agent guidance to merge, paste it here and I will merge it intelligently.
