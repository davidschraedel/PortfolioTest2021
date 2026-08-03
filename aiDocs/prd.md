# Portfolio Website PRD

**Product:** Personal Developer Portfolio Site  
**Author:** David Schraedel  
**Version:** 3.2  
**Status:** Active  
**Last Updated:** June 30, 2026

---

## Problem statement

Tech recruiters and engineering hiring managers screening developer candidates in 2026 face near-identical portfolios — GitHub dumps, tutorial clones, and flashy sites that say nothing useful about how a developer thinks or delivers. Recruiters spend 60 seconds or less before moving on; most portfolios impress peers, not screeners.

This portfolio answers three questions in under a minute: _Can this person ship? Can they think? Can they communicate?_ — while sounding like a real person, not a LinkedIn summary.

---

## Product strategy

**Dual audience, one visit:**

| Audience                        | Needs                                    | How the site delivers                                                                     |
| ------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Recruiters (primary)**        | Role, stack, demos, GitHub, fast contact | Scannable project cards, hero copy with domain/stack signal, contact and resume reachable |
| **Hiring managers (secondary)** | Depth, judgment, repos                   | Problem/Solution on cards; optional case study pages when relevant context is available   |
| **Anyone reading for you**      | Genuine voice, memorable background      | Hero copy, about narrative, chronological timeline                                        |

**Link tiers** (content priority — not layout prescription):

- **Primary (hire/collaborate):** Email, LinkedIn, Resume — `person.email`, `person.resume`, `presence.linkedin`
- **Secondary (public presence):** GitHub, Substack — `presence.github`, `presence.substack`

Long-form writing stays on Substack (link out only). No on-site blog or post mirroring.

**Content maintenance:** All copy and facts live in **`profile.json`**. The site will use derived code modules at build time to type and expose that data to components — those modules are not hand-edited content sources. Agents must not edit `profile.json`.

---

## Target users

### Primary: Tech recruiter (screener)

- Spends 30–90 seconds; checks headline clarity, projects, demos, GitHub
- **Success:** Reaches out or passes profile to a hiring manager with confidence

### Secondary: Engineering hiring manager

- Spends 3–10 minutes; reads project detail, skims repos, looks for production thinking
- **Success:** Enough signal for an interview decision without a take-home

### Not for

- Freelance client acquisition, passive content marketing, portfolio design awards

---

## Goals and success metrics

### Primary goal

Convert recruiter visits into first-round interview requests — with copy that also reads as genuinely human.

### Hard validation — cold-read test

Before sharing with recruiters:

- Share URL with 3 contacts without context
- Ask: _"After 60 seconds, what do I do and which project stood out?"_
- **Pass:** All 3 describe **role/stack/domain**, name **one project**, find **demo or GitHub** without prompting
- **Fail:** Generic description or no project named → revise hero or project framing and retest

### Soft guidelines (spot-check, not pass/fail)

- Copy sounds human when read aloud
- Site is easy to read and navigate
- No large walls of text
- Avoid em-dashes

### Quantitative metrics (optional — when analytics added)

| Metric             | Target              | Notes           |
| ------------------ | ------------------- | --------------- |
| Demo click-through | ≥ 50% of card views | Link events     |
| GitHub engagement  | ≥ 30% of sessions   | Outbound clicks |
| LCP (mobile)       | < 1.5s              | PageSpeed       |
| Mobile usability   | Readable on phone   | Manual QA       |

Not required for launch. Track after deploy if useful.

---

## Anti-pattern guardrails

Hard disqualifiers — fix before public recruiter sharing:

| Anti-pattern                       | Launch gate                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| Tutorial/clone featured projects   | Zero in featured set                                                                        |
| Broken demo links                  | Every demo resolves in < 3s; no unhandled errors                                            |
| Single "initial commit" repo dumps | ≥ 15 commits, ≥ 3 named commits in top 10, ≥ 2 weeks span                                   |
| Portfolio site as featured project | Not in project section                                                                      |
| Unclear individual contribution    | Explicit on collaborative projects                                                          |
| Technology tourism                 | Featured projects should read as a coherent professional story, not unrelated stack hopping |
| Abandoned public GitHub repos      | Archive/delete repos with < 5 commits or no README                                          |

---

## Site story architecture

The site tells one story in four content beats. **Layout is flexible** — single scroll, multiple pages, or a mix. Visual design should be professional and distinctive; preserve each project's existing style when refactoring.

**Hook → Story → Projects → Contact**

| Beat     | Content from `profile.json`                                                                  |
| -------- | -------------------------------------------------------------------------------------------- |
| Hook     | `hero.contrastLead`, `hero.professionalSentence`, `person.name`                              |
| Story    | `about.paragraphs`, `about.heading`, `timeline`                                              |
| Projects | All projects — Problem, Solution, stack, outbound links                                      |
| Contact  | `person.resume`, `person.email`, `presence.linkedin`, `presence.github`, `presence.substack` |

Navigation labels and page structure may vary by design.

---

## Key features

### Must have

**1. Hero (Hook)**

- `hero.contrastLead` and `hero.professionalSentence` rendered on the site
- Professional sentence signals **role, domain, and stack** — not generic

**2. Story**

- `about.paragraphs` and `about.heading` available on the site
- `timeline` as a chronological list — credentials interleaved with human details

**3. Projects**

- All projects in `profile.json`
- Each card displays the problem and solution (sourced from `objective` and `impact` in JSON)
- Stack tags per project
- Live demo and GitHub links when URLs are set in `profile.json`

**4. Contact and links**

- Resume PDF reachable from the site
- Email, LinkedIn, GitHub, and Substack links reachable without hunting (`person.email`, `person.resume`, `presence.*`)
- No contact forms

**5. Stack and deploy**

- Astro static site, Tailwind v4, deployed to GitHub Pages via the "staging" branch.
- Working demos where `demoUrl` is provided

**6. Mobile-readable**

- Usable on a phone; no horizontal scroll; readable type

### Nice to have

- Case study pages with real depth — only when sufficient content exists; never hallucinate
- `handshakeLine` surfaced on the site
- JSON-LD, sitemap, `robots.txt`, canonicals, OG/Twitter meta, `llms.txt`
- Privacy-friendly analytics (Plausible/Fathom)
- One technical blog post on Substack (not mirrored on-site)
- Hidden creative easter-egg page (`noindex`, excluded from sitemap)

---

## User stories

**US-01 — First-pass recruiter scan**  
_As a recruiter with 60 seconds, I want role, stack, and real projects immediately, so I can decide whether to advance this profile._

- Professional sentence signals role/domain/stack without reading paragraphs
- Projects visible with stack tags and demo/GitHub links where available
- No tutorial clones in featured set

**US-02 — Hiring manager depth**  
_As a hiring manager, I want enough project detail to assess judgment._

- Problem and Solution on each card
- GitHub link on card or case study where applicable

**US-03 — Live demo verification**  
_As a hiring manager, I want working demos, so I can assess deployment ability._

- Demo links resolve in < 3s where provided

**US-04 — Contact action**  
_As a recruiter ready to reach out, I want contact and resume without hunting._

- Email, LinkedIn, Resume reachable in one click from the site

**US-05 — Mobile screening**  
_As a recruiter on my phone, I want a readable layout._

- Fast load; readable on mobile

**US-06 — GitHub credibility**  
_As a hiring manager, I want clean repos with meaningful history._

- Visible repos meet anti-pattern commit thresholds
- GitHub accessible from the site and project cards

**US-07 — Stack relevance**  
_As a recruiter matching stack, I want to scan tags on cards._

- Stack tags visible on each featured project card

**US-08 — Cold-read validation**  
_As the site owner, I want peers to describe my role and name a project after 60 seconds before I share with recruiters._

- 3-person test; all pass hard criteria (see Goals)

---

## Out of scope

- On-site blog, RSS sync, post cards, `posts.json`
- Client/freelance positioning
- CMS or WYSIWYG editor (use `profile.json`)
- Contact forms, testimonials, skill bars
- Multi-language, auth, e-commerce
- Portfolio codebase as a featured project
- Q&A-style visible headings for SEO

---

## Risks and mitigations

| Risk                             | Mitigation                                                             |
| -------------------------------- | ---------------------------------------------------------------------- |
| Live demos go down               | UptimeRobot; monthly link audit                                        |
| Looks like every other portfolio | Voice-first copy + Problem/Solution framing; distinctive visual design |
| Tutorial projects featured       | Hard gate — zero clones                                                |
| Copy buries recruiter signal     | Professional sentence + stack on cards; cold-read test                 |
| Content drift across files       | Single `profile.json` source of truth                                  |
| Over-engineered portfolio site   | No featured self-link; plain Astro                                     |
| AI-sounding copy                 | Read-aloud test; specific first-person voice                           |
| Broken GitHub links              | Full link audit before sharing                                         |

---

## Related documents

| Doc                                  | Role                            |
| ------------------------------------ | ------------------------------- |
| [mvp.md](./mvp.md)                   | Minimum feature set for success |
| [coding-style.md](./coding-style.md) | Code conventions                |

---

_This PRD is a living document. Update when product strategy changes; implementation order lives in created roadmaps, only._
