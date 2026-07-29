# Changelog

A concise history of changes.

## 2026-07-29

- P2 data layer: `profile.json` in `src/data/`; typed adapters `site.ts` and `projects.ts` (featured filter, portfolio image map, `BASE_URL` resume path)
- Assets: `public/resume.pdf`, `src/assets/headshot.jpg`, seven portfolio PNGs in `src/assets/portfolio/`
- P1 fixes: derive GitHub Pages `site`/`base` from git remote; theme tokens use Tailwind `@apply` utilities; body text inherits default color on frosted cards (legacy `.body_text` pattern)
- P1 Astro scaffold: Astro 5 + Tailwind v4 via `@tailwindcss/vite`, GitHub Pages `site`/`base` config
- Legacy design tokens in `src/styles/global.css` (teal gradient, frosted cards, nav hover)
- Minimal `BaseLayout.astro` shell and placeholder `index.astro`
- CLI scripts: `scripts/dev.sh`, `build.sh`, `lint.sh`, `dev-legacy.sh` wrapping npm commands
