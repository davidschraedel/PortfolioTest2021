# Coding Style

**Stack:** Astro · Tailwind CSS v4 · React islands (when needed) · TypeScript at data boundaries  
**Last updated:** June 14, 2026

How code in this repo should be written — conventions, patterns, and quality bar. For project scope and feature decisions, see `prd.md` and `mvp.md`.

---

## General principles

- **Small, focused units** — one component, one job. Page files prepare data and compose; reusable markup lives in components and layouts.
- **Obvious over clever** — prefer readable data-in-template patterns over hooks, context, or client state when interactivity is not required.
- **Minimal diff** — solve the problem at hand. Do not add abstractions, helpers, or dependencies until a second use case exists.
- **Self-documenting** — names and structure should explain intent. Comments are for non-obvious constraints, not narration.
- **No dead code** — delete commented-out blocks and unused imports. Use git history, not the file, for old versions.

---

## Naming and files

| Item | Convention | Example |
| --- | --- | --- |
| Components & layouts | PascalCase | `ProjectCard.astro`, `BaseLayout.astro` |
| Pages | lowercase, match route | `index.astro`, `[slug].astro` |
| Data / config modules | camelCase | `projects.ts`, `site.ts` |
| React islands | PascalCase `.tsx` | `ContactForm.tsx` |
| CSS files | kebab-case | `global.css` |

**Exports:** `export default` for components and layouts.

**Imports:** group in this order, blank line between groups:

1. Astro / framework (`astro:assets`, `@astrojs/react`)
2. Layouts and components
3. Data and types
4. Assets

Aliasing is fine when disambiguating:

```astro
---
import { default as Hero } from "../components/Hero.astro";
---
```

---

## Astro conventions

### Frontmatter vs template

| Frontmatter (`---`) | Template (below) |
| --- | --- |
| Imports, data fetching, variable prep, `getStaticPaths` | HTML markup, Astro components, Tailwind classes |
| Runs at build time on the server | No client-side logic |

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import ProjectCard from "../components/ProjectCard.astro";
import { projects } from "../data/projects";

const featured = projects.filter((p) => p.featured);
---

<BaseLayout title="Page title">
  <section class="py-20">
    {featured.map((project) => (
      <ProjectCard {...project} />
    ))}
  </section>
</BaseLayout>
```

### Where files belong (Astro defaults)

- `src/pages/` — routed entry points. Keep thin: data in frontmatter, composition in template.
- `src/layouts/` — shared document shell (`<html>`, `<head>`, nav, footer).
- `src/components/` — reusable UI. Group by feature/section as the tree grows.
- `src/content/` + `content.config.ts` — markdown/MDX with typed, validated frontmatter.
- `src/data/` — shared typed data modules.
- `src/assets/` — images and SVGs imported by components.
- `public/` — static files served as-is (favicon, PDFs).
- Prefix a file or folder with `_` to exclude it from routing.

### `.astro` vs React

Default to `.astro`. Use a React island only when you can name the specific client-side behavior that requires it (state, form validation, browser APIs).

| `.astro` | React island (`.tsx`) |
| --- | --- |
| Static markup, layouts, content | Client state or event handlers |
| Build-time data | Browser-only APIs |
| Zero JS shipped | Third-party widgets that need hydration |

Pass only **serializable** props to hydrated components (no functions). Astro components cannot be imported inside framework components — the dependency flows one way.

### Hydration directives

Use the most conservative directive that works:

1. `client:visible` — below-the-fold
2. `client:idle` — non-critical enhancements
3. `client:load` — above-the-fold interactions that need immediate JS
4. `client:only="react"` — last resort

Do not put `client:*` on layouts or entire page sections.

### Props

Type props in frontmatter:

```astro
---
interface Props {
  name: string;
  stack: string[];
  demoUrl: string;
}

const { name, stack, demoUrl } = Astro.props;
---
```

---

## Data patterns

### List-and-map

Define data as a typed array, render with `.map()`. This matches the existing React codebase style:

```ts
export const projects = [
  {
    id: "stopwatch",
    name: "StopWatch",
    stack: ["React", "TypeScript"],
    demoUrl: "https://example.com",
  },
];
```

```astro
{projects.map((project) => (
  <ProjectCard key={project.id} {...project} />
))}
```

Use **stable string IDs** for keys — not `crypto.randomUUID()` at module scope.

### Single source of truth

Do not duplicate the same content in a page frontmatter and a data module. Pick one location.

### Content collections

For markdown-driven content, use Astro content collections with typed frontmatter in `content.config.ts`. Validate required fields at the schema level rather than checking in every page.

### Shared site values

Constants used in multiple places (site name, email, social URLs) belong in one module (e.g. `src/data/site.ts`), not repeated as magic strings.

### `profile.json` and `site.ts`

`profile.json` is the only hand-edited content file. All components import from `site.ts` (the typed adapter), never directly from `profile.json`. This keeps the JSON format-agnostic and centralizes any derivation logic (e.g. `BASE_URL` prefixing for `resumePath`).

`profile.json` is designed to be reused as a starting template across projects — copy and refine per site.

---

## Styling (Tailwind v4)

### Setup

- Tailwind v4 via the Vite plugin (`@tailwindcss/vite`) — not the legacy `@astrojs/tailwind` integration.
- Import Tailwind once in `src/styles/global.css`; load that file in the base layout.

```css
@import "tailwindcss";

@theme {
  --color-off-white: #fcfcfc;
  --color-dark-moss: #1d2019;
  --color-interior-designer: #3f3b31;
  --color-sepia: #896c55;
  --color-skin: #d1b49e;
}
```

Use theme tokens (`bg-off-white`) instead of raw hex in components.

### Button system

Buttons use a composable `@layer components` class system in `global.css`. Compose classes rather than writing one-off Tailwind strings for interactive elements:

```html
<!-- standard action button -->
<a class="btn btn-soft btn-soft-default">Live demo</a>

<!-- brand-specific hover -->
<a class="btn btn-soft btn-github">GitHub</a>

<!-- footer context -->
<a class="btn btn-footer btn-linkedin">LinkedIn</a>
```

| Class | Role |
| --- | --- |
| `btn` | Base sizing, flex centering, border-radius, focus ring |
| `btn-soft` | Text color + focus ring color for light-surface buttons |
| `btn-soft-default` | Hover: sepia fill + white text |
| `btn-footer` | White text with `mix-blend-soft-light`; hover drops blend |
| `btn-linkedin` / `btn-github` / `btn-substack` / `btn-gmail` | Brand hover colors |

Add new brand variants to `global.css` following the same `hover:bg-[hex] hover:text-[hex]` pattern.

### Rules

- **Utility-first** — style in the template. Use `@apply` only for patterns repeated many times.
- **Minimal global CSS** — Tailwind import, design tokens, base resets. Avoid large custom stylesheets.
- **Avoid scoped `<style>` blocks** unless Tailwind cannot express it.
- **Dark mode** — `dark:` variants, following `prefers-color-scheme` unless a manual toggle is added.
- **Mobile-first breakpoints** — base → `sm:` → `md:` → `lg:` → `xl:` → `2xl:`.
- **Readable text** — body copy at `text-base` (16px) or larger.
- **Touch targets** — interactive elements ≥ 44px via padding or `min-h-11`.

Existing layout habits to preserve when styling: centered content column, responsive horizontal padding, rounded container shell, restrained gradient accents on hero/footer regions.

---

## HTML and accessibility

Use semantic elements:

```astro
<header>…</header>
<nav aria-label="Main">…</nav>
<main>…</main>
<section aria-labelledby="section-heading">
  <h2 id="section-heading">Section title</h2>
</section>
<footer>…</footer>
```

- One `<h1>` per page. Do not nest block elements inside heading tags.
- External links: `target="_blank"` with `rel="noopener noreferrer"`.
- Informative images: meaningful `alt`. Decorative images: `alt=""`.
- Visible focus states on interactive elements.
- `aria-current="page"` on active nav links.

Page metadata (`<title>`, `<meta description>`, Open Graph tags) belongs in layouts, passed via props — not duplicated inline on every page.

---

## Images and assets

- Raster images: `astro:assets` `<Image />` for optimization, responsive sizes, and lazy loading.
- SVGs used in components: import from `src/assets/`.
- Static files that need a fixed URL: `public/`.
- Set explicit dimensions or use `<Image />` to prevent layout shift.

---

## TypeScript

- Typed frontmatter interfaces in `.astro` files.
- `.ts` / `.tsx` for data modules, content config, and React islands.
- Add types at data boundaries first (content config, shared modules), then expand outward.
- No `any` unless interfacing with an untyped third-party API — and isolate it.

---

## Performance (code-level)

These follow from Astro's static-first model:

- No client-side fetching for content available at build time.
- No React Router or SPA-style page hydration — Astro handles routing.
- No unnecessary `client:*` directives.
- No blocking animations or loading screens that delay first contentful paint.
- Run `npm run build && npm run preview` to verify production output before merging significant changes.

---

## Utilities and helpers

Keep helpers small and colocated until a second file needs them:

```ts
export function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
```

Do not add a general-purpose utils library or one-line wrappers that should stay inline.

---

## Environment and secrets

- Secrets in `.env` — never committed.
- Read env vars in server-side frontmatter via `import.meta.env`, not in client-bundled code.
- Do not pass secrets as props to hydrated components.

---

## Code anti-patterns

| Avoid | Do instead |
| --- | --- |
| Hydrating entire pages or layouts with React | `.astro` for static shell; small islands for interactivity |
| Client-side fetch for static content | `await` in frontmatter at build time |
| `crypto.randomUUID()` for list keys | Stable string IDs |
| Large commented-out blocks | Delete; rely on git |
| Magic strings repeated across files | Shared constants module |
| Mixing Tailwind v3 integration with v4 Vite plugin | One Tailwind setup only |
| Secrets in client code | Server frontmatter + env vars |
| Unused imports, state, or effects | Remove before committing |
| Over-abstracting for one use case | Inline until the pattern repeats |

---

## Pre-commit checklist

- [ ] Could this be plain `.astro` without a React island?
- [ ] Are list keys stable strings?
- [ ] Are external links using `rel="noopener noreferrer"`?
- [ ] Are Tailwind classes readable without unnecessary extraction into components?
- [ ] No commented-out code or unused imports?
- [ ] Does production build succeed (`npm run build`)?
