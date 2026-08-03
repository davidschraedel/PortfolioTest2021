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

Maps all projects from profile, attaches `previewImage` from `astro:assets` imports keyed by `previewImageKey`, exports:

- **`projects`** — every entry in `profile.json` (used on `/projects/`)
- **`featuredProjects`** — `featured: true` only (used on home)

Logs a build warning when a project references an unmapped `previewImageKey`.

**`featured` field:** Home page filter only. All projects always render on `/projects/`.

---

## Directory layout

```
src/
├── assets/
│   ├── headshot.jpg
│   └── portfolio/*.png
├── components/
│   ├── ContactLinks.astro   # Home only — connect copy + Email / LinkedIn
│   ├── Footer.astro         # Back-to-top, email copy, footer links
│   ├── Hero.astro           # Hook — contrastLead + professional sentence
│   ├── Nav.astro            # Legacy dropdown pattern
│   ├── ProjectCard.astro    # objective / impact / stack / demo / GitHub
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
│   └── projects.astro       # All projects
└── styles/
    └── global.css           # Tailwind, legacy tokens, button system

public/
├── favicon.png
├── images/                  # Signature background photo for CSS
└── resume.pdf
```

---

## Routes

| Route         | Page              | MVP beat                               |
| ------------- | ----------------- | -------------------------------------- |
| `/`           | `index.astro`     | Hook, featured projects, home contact (`ContactLinks`) |
| `/about/`     | `about.astro`     | Story (paragraphs, headshot, timeline)               |
| `/projects/`  | `projects.astro`  | All projects                                         |

Nav links: Home, Projects, About.

---

## Content field mapping

| UI label       | JSON source                             | Notes                                                       |
| -------------- | --------------------------------------- | ----------------------------------------------------------- |
| Hero lead      | `hero.contrastLead`                     | Joined with `, `                                            |
| Hero sentence  | `hero.professionalSentence`             | Falls back to `home.tldr` in adapter until field is added   |
| About TL;DR    | `about.tldr`                            | Shown below headshot on about page                          |
| Contact copy   | `connect.heading`, `connect.paragraphs` | Home page only — `ContactLinks.astro`                       |
| Contact CTAs   | Email, LinkedIn                         | Home page only; footer has full link set site-wide          |
| Demo CTA       | `demoUrl`, `videoUrl`                   | Button label: `Take a look`; image links to same URL        |
| Objective      | `projects[].objective`                  | First paragraph on card                                     |
| Impact         | `projects[].impact`                     | Second paragraph on card                                    |
| Stack tags     | `projects[].stack`                      |                                                             |
| Home projects  | `projects[].featured === true`          | Subset on `/` only                                          |
| About gallery  | `about.images`                          | Omitted until real assets exist                             |

---

## Styling

Design tokens live in `@theme` inside `global.css`, mapped from the legacy teal radial-gradient palette. Reusable patterns:

- `shell-gradient` — page background
- `hero-badge` + `frosted-header` — page titles (h1)
- `section-heading` + `section-heading-inner` — section titles (h2)
- `frosted-body` / `body-copy` — text blocks
- `content-shell` — centered column wrapper
- `btn` + brand variants — project and contact CTAs

---

## Client-side behavior (minimal)

| Feature              | Implementation                                        |
| -------------------- | ----------------------------------------------------- |
| Nav dropdown toggle  | Inline `<script>` in `Nav.astro` (Escape closes menu) |
| Email copy + tooltip | Inline `<script>` in `Footer.astro`                   |
| Back to top          | Anchor to `#topPageNav`                               |
| Mouse-reactive gradient | Inline `<script>` in `BaseLayout.astro`           |

No React hydration.

---

## Build and deploy

```bash
npm run build    # → dist/
npm run preview  # local production preview
```

CI (`.github/workflows/deploy.yml`) builds on push to `staging` and publishes `dist/` to GitHub Pages.

Scripts in `scripts/` wrap npm commands: `dev.sh`, `build.sh`, `lint.sh`, `dev-legacy.sh`.
