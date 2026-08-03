# Changelog

A concise history of changes.

## 2026-08-03 (P4 QA and launch)

- Production build and preview verified (`npm run build`, `npm run preview`)
- Link audit: all 15 external URLs in `profile.json` return 200 (LinkedIn returns 999 to bots — normal)
- QA fixes: `ContactLinks` now includes resume, GitHub, Substack; nav home href double-slash fixed; demo CTA labels restored; `overflow-x-hidden` on body for mobile
- Legacy visual parity confirmed against `legacy/` (gradient, photo shells, frosted layers, chevron icons, tooltip, divider, responsive breakpoints)
- Deploy: push `staging` branch to trigger GitHub Pages workflow

## 2026-07-29 (P3 corrections)

- Wire `about.tldr` on about page; `connect.heading` / `connect.paragraphs` in `ContactLinks.astro`
- Project demo CTA labels from `videoUrl` and URL type (`Watch demo`, `View deck`, `View dashboard`, `Live demo`)
- Build warning for unmapped `previewImageKey` on media layouts (`photo-book-generator`, `voice-first-portfolio`)
- Nav dropdown closes on Escape
- **Known content gap:** add `hero.professionalSentence` to `profile.json` before recruiter outreach (adapter still falls back to `home.tldr`)

## 2026-07-29 (P3 pages and UI)

- MVP pages: `/` (hero + featured projects + contact), `/about/` (story + timeline + headshot), `/portfolio/` (featured projects)
- Components: `Nav`, `Hero`, `ProjectCard`, `Timeline`, `ContactLinks`, `Footer`
- `BaseLayout` shell with nav, footer, favicon, meta props; legacy styling in `global.css`
- `aiDocs/architecture.md` rewritten for Astro structure

## 2026-07-29 (P2)

- P2 data layer: `profile.json` in `src/data/`; typed adapters `site.ts` and `projects.ts` (featured filter, portfolio image map, `BASE_URL` resume path)
- Assets: `public/resume.pdf`, `src/assets/headshot.jpg`, seven portfolio PNGs in `src/assets/portfolio/`
- P1 fixes: derive GitHub Pages `site`/`base` from git remote; theme tokens use Tailwind `@apply` utilities; body text inherits default color on frosted cards (legacy `.body_text` pattern)
- P1 Astro scaffold: Astro 5 + Tailwind v4 via `@tailwindcss/vite`, GitHub Pages `site`/`base` config
- Legacy design tokens in `src/styles/global.css` (teal gradient, frosted cards, nav hover)
- Minimal `BaseLayout.astro` shell and placeholder `index.astro`
- CLI scripts: `scripts/dev.sh`, `build.sh`, `lint.sh`, `dev-legacy.sh` wrapping npm commands
