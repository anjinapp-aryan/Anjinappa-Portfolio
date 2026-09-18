# Open-Source Reuse Audit

Scope: high-signal candidates only, per brief Section 6. Evaluated by license, maintenance, architecture fit, and code quality — not star count alone.

## Candidates Investigated

### A. Lightswind UI
- Repo: https://github.com/codewithMUHILAN/Lightswind-UI-Library
- Stars: 1,042 · Forks: 111 · Last push: 2026-07-24 · Active, not archived
- License: **MIT for the base library.** A separate **Pro tier** exists ("Lightswind Pro unlocks exclusive premium components, advanced page template blocks, and CLI + MCP authenticated delivery"), gated behind a paid license key (`sk_pro_...`). Pro components are **not** MIT and must not be copied without a paid license.
- What's actually in the free tier: 160+ components — animated text (typewriter, scroll reveal, shiny/aurora text), backgrounds (aurora shaders, blob particles, grid patterns, fluid/liquid), buttons (gradient, ripple, shine, confetti), navigation (sparkle navbar, sidebar, tabs, breadcrumb, morphing nav), 3D/hover effects, carousels/galleries, form/UI core (dialogs, modals, tooltips, cards, charts).
- Gap: no component in the public docs is explicitly named/marketed as a "hero section," "portfolio grid," "masonry layout," or "timeline" block. Those would need to be **composed** from primitives (cards, grid/carousel, scroll-reveal, backgrounds) rather than dropped in as a single portfolio-specific block. This needs direct source verification once we scaffold Phase 3+ (install the CLI, inspect the copy-pasted component source) before finalizing which primitives to pull in.
- Copy-paste/CLI ownership model ("you own the code") is a good fit for the brief's dependency-discipline requirement — it doesn't add a runtime package, it vendors source into the repo.

### B. Magic UI Portfolio
- Repo: https://github.com/magicuidesign/portfolio
- Stars: 1,492 · Forks: 425 · Last push: 2026-01-13 · Active, not archived
- License: **MIT**, full application template
- Stack: Next.js 14, TypeScript, Tailwind, shadcn/ui, Framer Motion, Magic UI
- Architecture: single config file (`src/data/resume.tsx`) drives all portfolio content — this is exactly the "data → UI" separation the brief requires and the current repo lacks entirely. Sections: hero, project showcase, experience/resume, blog. Component-based via shadcn/ui.
- Fit: strongest **architecture reference** — the config-driven content model and section composition pattern map closely to what Phase 1 (Data Contract) needs to produce for this project's own data. Individual visual components (project cards, section layout) are reusable/adaptable since it's MIT and not gated.

### C. NextGenPortfolio
- Repo: https://github.com/killcod3/NextGenPortfolio
- Stars: 21 · Forks: 5 · Last push: 2025-11-04 · Active, not archived
- License: **MIT**
- Stack: Next.js 13.5 (App Router), TypeScript, Tailwind, Framer Motion, shadcn/ui, Lucide React icons, react-tsparticles, Zod
- Architecture: **fully config-driven via JSON** — `config/personal.json`, `skills.json`, `projects.json`, `experience.json`, `social.json`, `themes.json`. This is the closest existing precedent to the brief's target `Project`/data model (Section 10) and to this repo's actual need (structured skills/experience/projects/social data, currently all hardcoded).
- Lower adoption (21 stars) than the other two, but architecture quality and direct relevance to a JSON-config personal-data portfolio (same problem this repo has) make it high-signal despite low popularity — consistent with the brief's instruction not to rank by stars alone.
- Fit: strongest **data-model reference** for Phase 1. `Zod` for runtime validation of the JSON config is a pattern worth adopting given this project has zero validation today.

### D. Other candidates
No additional repos were vendored or deep-audited in Phase 0. Section 6D scope ("search GitHub for other maintained animated portfolios") is deferred to the specific phase where a concrete unmet need appears (e.g., Phase 7 Architecture/Labs visualization) rather than collected speculatively now, per Section 2's "do not create speculative components" instruction. Reused only when Phase 5+ reveals shadcn/ui + Framer Motion + Lightswind's free tier can't cover a specific requirement.

## Decision Matrix

| Requirement | Existing Source | License | Reuse Type | Decision | Reason |
|---|---|---|---|---|---|
| Data model / content config | NextGenPortfolio (`config/*.json` + Zod) | MIT | REFERENCE | Adopt JSON-config + Zod validation pattern, write our own schema from real data | Closest precedent to the exact gap this repo has (zero structured data today); copying its literal JSON would import placeholder content we must not fabricate, so pattern only |
| App/data architecture | Magic UI Portfolio (`src/data/resume.tsx` → sections) | MIT | REFERENCE | Adopt config-driven section composition pattern | Same rationale — architecture is reusable, content is not ours to copy |
| Hero | Lightswind (text/background primitives) | MIT (free tier) | COMPOSE | Compose hero from Lightswind text-animation + background primitives once vendored via CLI in Phase 4 | No single "hero block" ships in free tier; primitives exist and are MIT, so compose rather than build from scratch |
| Portfolio grid / masonry | Lightswind (cards, grid/carousel primitives) + Magic UI Portfolio (project showcase pattern) | MIT | COMPOSE | Compose grid from Lightswind card/gallery primitives, structured per Magic UI's project-showcase layout pattern | No off-the-shelf masonry-with-filtering block confirmed free in Lightswind docs; needs source-level check in Phase 5, composing from confirmed-MIT primitives is the safe default |
| Portfolio filtering | *(none confirmed in any candidate's public docs)* | — | BUILD | Small custom filter (client-side array filter + layout animation), justify in Phase 5 | No mature filterable-portfolio component surfaced as clearly free/MIT in Phase 0 research; this is a small, low-risk piece of logic, not a reason to add a dependency |
| Project cards | Magic UI Portfolio pattern + Lightswind card primitives | MIT | ADAPT | Adapt Magic UI's card composition using Lightswind's free-tier card/hover-effect components | Both are MIT and directly on-topic; adapting avoids duplicating card styling logic from scratch |
| Navigation (navbar + mobile menu) | Existing `app/page.js` navbar | N/A (ours) | REUSE | Keep current sticky navbar + hamburger interaction pattern; restyle only | Brief Section 6 strength note: functional and correct today; no reason to replace working, simple logic — only visual/accessibility polish needed (aria attributes, icon swap) |
| Timeline (Experience) | Lightswind (no confirmed dedicated timeline component in free-tier docs) | — | BUILD | Small custom vertical timeline using Tailwind + Framer Motion (if adopted) reveal | Section 6A gap: no timeline block confirmed free; existing experience list is simple enough that a lightweight custom component is proportionate, not a reinvention of something substantial |
| Section reveal / stagger animation | Lightswind scroll-reveal primitives (free tier) | MIT | REUSE | Reuse Lightswind's scroll-reveal/text-animation primitives once vendored | Directly named as a free-tier component category; matches brief's "section animation" requirement without adding Framer Motion/GSAP if Lightswind's own primitives suffice |
| Backgrounds (hero/technical texture) | Lightswind (aurora/grid/blob backgrounds, free tier) | MIT | REUSE | Reuse one subtle background primitive for hero only, per brief's "subtle technical backgrounds" | Named free-tier category; avoids building custom shader/canvas work |
| Buttons / hover effects | Lightswind (gradient/shine/ripple buttons, free tier) | MIT | REUSE | Reuse sparingly for CTA buttons (resume download, contact) | Named free-tier category; low blast-radius, high polish return |
| Resume/personal data content | This repo's `app/page.js` + résumé PDF | N/A (ours) | REUSE | Extract as-is into structured data files in Phase 1; no content invention | Source of truth per brief Section 3 |
| Project/case-study content | *(does not exist yet in this repo)* | — | **BLOCKED — needs user input** | Cannot BUILD, ADAPT, or REUSE a Featured Work / Projects section (brief IA items 3 and 6) until real project data is provided | Brief explicitly forbids inventing projects, metrics, or technologies; no project data exists anywhere in the repo today |
| Architecture diagram / Engineering Labs visualization | Deferred — no candidate audited yet | — | DEFER | Investigate at Phase 7 against the actual content that exists then | Brief Section 2 forbids creating speculative components in Phase 0; premature to pick a diagram library before Phase 7 defines what needs visualizing |

## Primary / Secondary / Reference Sources (summary)

- **PRIMARY UI SOURCE**: Lightswind UI (free/MIT tier only) — text animation, backgrounds, buttons, cards, scroll-reveal primitives, vendored via its CLI (copy-paste, no added runtime dependency beyond what each component itself needs).
- **SECONDARY SOURCE**: Magic UI Portfolio — architecture/composition reference for section layout and project-card presentation; shadcn/ui as the underlying primitive layer if/when interactive UI primitives (dialogs, tabs) are needed.
- **REFERENCE-ONLY SOURCE**: NextGenPortfolio — JSON-config + Zod data-modeling pattern for Phase 1; not vendoring its code, only its schema shape as a template adapted to this project's real data.
- **CUSTOM-BUILD AREAS**: portfolio filtering logic, experience timeline component, and Engineering Labs/architecture visualization (Phase 7, pending investigation) — each justified above as either too small to warrant a dependency or not covered by a confirmed-free existing implementation.

## Open Item Before Phase 5/6

Lightswind's free-vs-Pro boundary is stated at the repo/docs level but individual component source has not yet been pulled and inspected line-by-line. **Before vendoring any specific Lightswind component in Phase 4+, re-verify that exact component ships in the free tier** (not just the category) by running its CLI/inspecting its published source — do not assume from the category list alone.
