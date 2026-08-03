# Project Context

Personal developer portfolio — recruiter-scannable and voice-first. One-line pitch: [description.md](./description.md)

**Status:** P4 complete — QA passed; deploy via push to `staging` branch. Active roadmap: [2026-07-01_portfolio-astro-refactor_roadmap.md](../ai/roadmaps/2026-07-01_portfolio-astro-refactor_roadmap.md) · Plan: [2026-07-01_portfolio-astro-refactor_plan.md](../ai/roadmaps/2026-07-01_portfolio-astro-refactor_plan.md) · Analysis: [project-starting-state.md](../ai/notes/project-starting-state.md)

**Post-MVP (not blocking launch):** Case study routes can exist as “coming soon” stubs; `handshakeLine` is in data but not rendered; PRD nice-to-haves (JSON-LD, sitemap, analytics, etc.) not built. **Before recruiter outreach:** add `hero.professionalSentence` to `profile.json` (adapter currently falls back to `home.tldr`) — see [mvp.md](./mvp.md) §5.

**Product docs:** [prd.md](./prd.md) v3.2 · [mvp.md](./mvp.md) v2.2 · Content model: `src/data/profile.json` (single source of truth; import via `site.ts` / `projects.ts` only)

**Stack (target):** Astro · Tailwind v4 · React islands only if required · GitHub Pages

**Current (legacy):** Static HTML/CSS/jQuery in `legacy/` — read-only reference

**Deploy:** branch `staging` · GitHub Pages · URL `https://davidschraedel.github.io/[repo name]/` (project site — derive from git remote)

---

## aiDocs/ — permanent knowledge (tracked)

| File                                 | What's in it                                                    |
| ------------------------------------ | --------------------------------------------------------------- |
| [prd.md](./prd.md)                   | Product requirements — features, users, success criteria (v3.2) |
| [mvp.md](./mvp.md)                   | Minimum product for success — validation gates (v2.2)           |
| [coding-style.md](./coding-style.md) | How to write code in this repo                                  |
| [architecture.md](./architecture.md) | Data layer, layout shell, pages                                 |
| [changelog.md](./changelog.md)       | Concise change history — update with every commit               |

---

## ai/ — working space (gitignored)

| Folder                       | Use                                                                                                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [notes/](../ai/notes/)       | Research and brainstorming — start with [2026-07-01_initial-agent-instructions.md](../ai/notes/2026-07-01_initial-agent-instructions.md) for new refactor context |
| [roadmaps/](../ai/roadmaps/) | Plans and implementation checklists                                                                                                                               |
| [guides/](../ai/guides/)     | Library docs and external research output                                                                                                                         |

---

## scripts/ — CLI entry points

`dev.sh` · `dev-legacy.sh` · `build.sh` · `lint.sh` — wrap npm commands (`dev:legacy` runs the preserved app in `legacy/`).

---

## Tool config (gitignored, personal)

- `claude.md` — Claude Code config
- `.cursorrules` — Cursor config
