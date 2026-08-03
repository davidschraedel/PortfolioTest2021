# Architecture

How this Astro portfolio is structured — data flow, file responsibilities, and routing.

---

## Stack

| Layer            | Choice                                                         |
| ---------------- | -------------------------------------------------------------- |
| Framework        | Astro 5 (static output)                                        |
| Styling          | Tailwind CSS v4 via `@tailwindcss/vite`                        |
| Content          | `src/data/profile.json` (hand-edited; agents do not modify)    |
| Deploy           | GitHub Pages from `staging` branch, base `/PortfolioTest2021/` |
| Legacy reference | `legacy/` — read-only HTML/CSS/jQuery                          |

React islands are not used in MVP. All pages are static `.astro` components.

---

## Data flow

```
profile.json (single source of truth)
    ↓ import at build time
site.ts / projects.ts (typed adapters)
    ↓ frontmatter import
layouts + components + pages
    ↓ astro build
dist/ → GitHub Pages
```

**Rule:** Components and pages import from `site.ts` or `projects.ts`, never directly from `profile.json`.

### `site.ts`

Exports person, hero, about, timeline, presence, connect, resume path (with `BASE_URL` prefix), headshot import, and `heroProfessionalSentence` (falls back to `home.tldr` when `hero.professionalSentence` is absent).

### `projects.ts`

Maps all projects from profile, attaches `previewImage` from `astro:assets` imports keyed by `previewImageKey`, and exports `featuredProjects` via dynamic `featured: true` filter. Logs a build warning when a non-`text-only` project references an unmapped `previewImageKey` (currently `photo-book-generator`, `voice-first-portfolio`).

---

## Directory layout

```
src/
├── assets/
│   ├── headshot.jpg
│   └── portfolio/*.png
├── components/
│   ├── ContactLinks.astro   # Prominent resume / email / social CTAs
│   ├── Footer.astro         # Back-to-top, email copy, footer links
│   ├── Hero.astro           # Hook — contrastLead + professional sentence
│   ├── Nav.astro            # Legacy dropdown pattern
│   ├── ProjectCard.astro    # Problem / Solution / stack / demo / GitHub
│   └── Timeline.astro       # Chronological about timeline
├── data/
│   ├── profile.json
│   ├── site.ts
│   └── projects.ts
├── layouts/
│   └── BaseLayout.astro     # Document shell, font, gradient, nav, footer
├── pages/
│   ├── index.astro          # Hero + featured projects + contact
│   ├── about.astro          # Story — paragraphs, headshot, timeline
│   └── portfolio.astro      # All featured projects
└── styles/
    └── global.css           # Tailwind, legacy tokens, button system

public/
├── favicon.png
└── resume.pdf
```

---

## Routes

| Route         | Page              | MVP beat                               |
| ------------- | ----------------- | -------------------------------------- |
| `/`           | `index.astro`     | Hook, featured projects, contact       |
| `/about/`     | `about.astro`     | Story (paragraphs, headshot, timeline) |
| `/portfolio/` | `portfolio.astro` | Featured projects grid                 |

Nav dropdown links: LinkedIn (external), Portfolio, About.

---

## Content field mapping

| UI label       | JSON source                             | Notes                                                       |
| -------------- | --------------------------------------- | ----------------------------------------------------------- |
| Hero lead      | `hero.contrastLead`                     | Joined with `·`                                             |
| Hero sentence  | `hero.professionalSentence`             | Falls back to `home.tldr` in adapter until field is added   |
| About TL;DR    | `about.tldr`                            | Shown below headshot on about page                          |
| Contact copy   | `connect.heading`, `connect.paragraphs` | Rendered in `ContactLinks.astro`                            |
| Demo CTA label | `demoUrl`, `videoUrl`                   | `Watch demo` / `View deck` / `View dashboard` / `Live demo` |
| Problem        | `projects[].objective`                  |                                                             |
| Solution       | `projects[].impact`                     | PRD references `tradeOff`; profile uses `impact`            |
| Stack tags     | `projects[].stack`                      |                                                             |
| About gallery  | `about.images`                          | Omitted until real assets exist                             |

---

## Styling

Design tokens live in `@theme` inside `global.css`, mapped from the legacy teal radial-gradient palette. Reusable patterns:

- `shell-gradient` — page background
- `frosted-body` / `frosted-header` — legacy card boxes
- `content-shell` — centered column wrapper
- `btn` + brand variants — project and contact CTAs

---

## Client-side behavior (minimal)

| Feature              | Implementation                                        |
| -------------------- | ----------------------------------------------------- |
| Nav dropdown toggle  | Inline `<script>` in `Nav.astro` (Escape closes menu) |
| Email copy + tooltip | Inline `<script>` in `Footer.astro`                   |
| Back to top          | Anchor to `#topPageNav`                               |

No React hydration. Mouse-reactive gradient deferred post-MVP.

---

## Build and deploy

```bash
npm run build    # → dist/
npm run preview  # local production preview
```

CI (`.github/workflows/deploy.yml`) builds on push to `staging` and publishes `dist/` to GitHub Pages.

Scripts in `scripts/` wrap npm commands: `dev.sh`, `build.sh`, `lint.sh`, `dev-legacy.sh`.
