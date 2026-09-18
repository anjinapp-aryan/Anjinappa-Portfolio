# UI Reuse Map

## Phase 7 — Architecture / Engineering Labs

`data/labs.js` and `data/ai.js` are both empty; `data/social.js`'s `github.url` is `null` with `needsVerification: true`. All three remain true at the start of this phase — no experiment, AI-exploration, or GitHub content was added to the repository. Per this phase's brief and the same rule already applied in Phase 5: build the reusable architecture, render nothing, don't fabricate.

**Reuse decision**: `Labs.js` and `AIExploration.js` both reuse `ProjectCard` (built in Phase 5) rather than new card components — a lab entry (`slug`/`title`/`description`/`technologies`/`github`/`demo`) is a strict subset of the project-card shape, and an AI entry's single `link` field maps onto `ProjectCard`'s `demo` prop. This avoids duplicating near-identical card JSX (brief Section 8.6: "check for duplicated JSX"). One known minor mismatch documented in `AIExploration.js`: `ProjectCard` always labels that link "Live Demo," which won't fit every possible AI entry (e.g. a paper/write-up) — left as a TODO for when real AI data exists and the link's actual nature is known, since the section doesn't render today regardless.

**No architecture-visualization library added**: per Phase 6, nothing exists yet to visualize. Re-searching now would still turn up nothing to evaluate against.

**GitHub/Open Source**: `GitHubSection.js` renders only if `social.github.url` is set AND `needsVerification` is `false` — a flagged-but-empty URL doesn't count as "safe to render," consistent with the rule already established for LinkedIn in Phase 1/3.

**Dependency added**: none.

**Sections built, currently unrendered**: `Labs` (`#labs`), `AIExploration` (`#ai`), `GitHubSection` (`#github`) — wired into `app/page.js` between `FeaturedWork` and `Awards`. No nav entries added for these (same reasoning as Phase 5 — Phase 3's rule against linking to a destination that doesn't render).

## Phase 6 — Project Case Studies

`app/projects/[slug]/page.js` uses the existing Next.js 13.4.19 App Router dynamic-segment convention already in use elsewhere in this project — no upgrade, no new routing pattern. `generateStaticParams` maps directly over `data/projects.js` (currently `[]`, so zero pages are statically generated); any request to `/projects/<anything>` is handled dynamically and calls `notFound()` since no project exists — verified to return HTTP 404 against the production build.

**Reuse search — architecture diagrams**: this phase's brief asks to search for a diagram/visualization library before any case study needs one. No project has architecture content to visualize yet, so no library was evaluated — picking one now would mean choosing a tool against a hypothetical shape rather than a real requirement. `CaseStudy.js` accepts an optional `architecture` field as prose for now; the actual reuse search (React/SVG diagram libraries) is deferred to Phase 7 or whenever real architecture content exists, per this project's own standing rule against speculative capability (see `docs/ARCHITECTURE.md` Section 2/Section 14 origin in the Phase 0 brief).

**Decision**: BUILD `CaseStudy.js` — a data-driven detail layout where each of 9 possible sections (Overview/Problem/Engineering Approach/Architecture/Implementation/Engineering Decisions/Experiments/Results/Lessons Learned) renders only if `project[field]` is truthy. No template/OSS case-study component was searched for beyond Lightswind (already established as having no portfolio-shaped blocks) — a conditional-section detail page is standard composition, not a capability worth sourcing externally.

**Dependency added**: none.

**Data model extended** (`data/projects.js` comment only — array is still `[]`): documented the 9 optional case-study fields alongside the existing card-shape fields, so real project data can be added once without a second migration later.

## Phase 5 — Featured Portfolio

`data/projects.js` is still empty — confirmed again at the start of this phase (no project content was added to the repository between Phase 4 and Phase 5). Per this phase's brief, the reusable architecture is built, but nothing fabricated and nothing rendered.

**Reuse search**: the full 195-file Lightswind registry listing (already fetched in Phase 4) has no `masonry`, `filter`, or `portfolio`-named component. `card.tsx` (189 loc) was inspected in Phase 4's session and found to depend on a shadcn-style `--card`/`--card-foreground` CSS variable pair this project doesn't have — adapting it 1:1 would mean a second color-token system, which this phase's brief explicitly forbids. `badge.tsx` depends on `class-variance-authority` (a new dependency) for something as small as a rounded label chip. `glowing-cards.tsx` (212 loc) offers a mouse-tracked glow-follow hover effect with no framer-motion dependency — a reasonable candidate, but investing motion complexity into a section with zero real content to prove it against isn't proportionate right now; the existing `shadow-glow-accent` CSS token (already defined, already used on Hero's photo) covers card hover with zero extra code.

**Decision**: BUILD `ProjectCard`/`ProjectGrid`/`FeaturedWork`, informed by Lightswind's `card.tsx` shape (bordered surface, optional hover lift) but wired to this project's own tokens, not its source. Filtering is a ~15-line `useState` + `Array.filter` — not a rebuilt masonry/animation engine, and it never activates today (single-project or zero-project data doesn't produce more than one category to filter by).

**Empty-state decision**: `FeaturedWork` returns `null` outright — no heading, no "coming soon" placeholder, nothing — when `data/projects.js` has zero entries. `ProjectGrid` (and its `useState` filter logic) is loaded via `next/dynamic` so its client JS isn't shipped to the browser at all while unused.

**Dependency added**: none.

**Still missing**: real project data. `FeaturedWork`/`ProjectGrid`/`ProjectCard` are fully built and wired into `app/page.js` (between Experience and Awards) — adding entries to `data/projects.js` in the documented shape (`docs/DATA-MODEL.md`) is the only remaining step to make this section appear. No nav entry was added to `lib/navigation.js` for `#projects` since the section doesn't render (Phase 3's rule: don't link to a destination that doesn't exist) — add one when real data lands.

## Phase 4 — Hero

Decisions below are based on inspecting actual component source (not just docs/marketing copy) from `codewithMUHILAN/Lightswind-UI-Library` (branch `Master`), via the GitHub API and raw file contents. Nothing is claimed as "reused" without having read the real `.tsx` source.

The full `registry/` listing (195 `.tsx` files) was fetched to check for a dedicated Hero or Portfolio component — **neither exists** by that name or shape in the free tier. This matches the Phase 0 finding. Candidates evaluated instead were text-animation and background primitives that a hero could compose from:

| Candidate | Source inspected | Import dependencies | Decision | Reason |
|---|---|---|---|---|
| `typing-text.tsx` (116 loc) | Full head read | `framer-motion`, internal `cn()` | **Rejected** | This master execution explicitly says not to introduce Framer Motion without a concrete requirement a CSS-only approach can't meet. A `motion-safe:animate-fade-in-up` Tailwind utility (new `tailwind.config.js` keyframe, zero JS) covers the one-time entrance the design system allows for Hero. |
| `shiny-text.tsx` (199 loc) | Full head read | `framer-motion`, internal `cn()` | **Rejected** | Same reason. |
| `scroll-reveal.tsx` (187 loc) | Full head read | `framer-motion`, internal `cn()` | **Rejected** | Same reason — also scoped for repeated scroll-triggered reveals, not a one-time hero entrance. |
| `dot-grid-background.tsx` (241 loc) | Full source read | None (canvas + pointer events) | **Rejected** | Draggable canvas grid with a perpetual `requestAnimationFrame` inertia loop that keeps scheduling frames even at rest — the opposite of "subtle," not `prefers-reduced-motion` aware, and a poor fit for a static portfolio hero (drag-to-pan makes sense in a demo, not here). |
| `aurora-background.tsx`, `cyber-hive-background.tsx`, `hell-background.tsx`, `neural-link-background.tsx`, `cosmic-singularity-background.tsx` | Names/category only (not fetched in full — rejected on fit before deeper inspection was worth the time) | Unknown | **Rejected on name/category** | These are exactly the "excessive neon"/"cyberpunk" aesthetic the brief says to avoid; a grid-line or dot backdrop matches "Engineering Intelligence" far better than an aurora/nebula/hell effect. |
| `grid-dot-backgrounds.tsx` (191 loc, exports `GridBackground` + `DotBackground`) | Full source read | Internal `cn()` only, no animation lib | **ADAPTED** | See `components/ui/HeroBackground.js` header comment for the exact adaptation (removed its client-side `.dark`-class `MutationObserver` detection — this project is dark-first with no toggle, so the color can be read straight from `--color-border`/`--color-accent-muted` CSS variables, turning it into a zero-JS Server Component). |

**Hero decision**: BUILD the layout/copy (`components/sections/Hero.js`) — no Lightswind hero block exists to reuse or adapt — but COMPOSE its background from the adapted Lightswind grid primitive, and use a plain Tailwind CSS keyframe (not a Lightswind or third-party text-animation component) for the entrance motion.

**Dependency added**: none. `HeroBackground` and the entrance animation are both zero-runtime-dependency (CSS/Server Component only).

**Sitewide token application**: Phase 4 also swapped the remaining light-theme utility classes (`bg-white`, `bg-gray-50`, `text-gray-900/600/700`, `bg-blue-600`/`bg-blue-500`/`bg-green-600`, plain `rounded-xl`/`rounded-2xl`) across `Navbar`, `MobileNavigation`, `Footer`, and the five existing content sections in `app/page.js` for the Phase 2 dark-first tokens. This goes beyond "just the Hero" because a dark Hero followed immediately by white legacy sections would look broken, not "premium" — the whole point of Phase 2's tokens was a coherent dark-first identity, and this was the first phase whose brief explicitly permitted a visual redesign (unlike Phase 3, which was shell-only by explicit instruction). No section's *content, structure, or data* changed — only color/radius utility classes.

**Bug found and fixed during this pass**: Phase 2's `borderRadius` tokens were originally named `sm`/`md`/`lg`/`xl`, which overrides (not extends) Tailwind's own default radius scale under `theme.extend`. The skill chips already used `rounded-xl` (default 0.75rem), so Phase 2 silently changed that to 1.5rem — a real visual change that Phase 2's build check didn't catch because it only compared JS bundle size, not rendered CSS. Renamed to `chip`/`control`/`card`/`feature` in `tailwind.config.js` and `docs/DESIGN-SYSTEM.md` so custom tokens can no longer collide with Tailwind's default key names.

## Phase 3 — Application Shell

## Candidates Inspected

Lightswind's `registry/` (its free-tier component source, confirmed via `all-components.json`) has no component named/shaped as a `Footer`, `Container`, or `Section` layout primitive — those three are BUILD by necessity, not a rejected-in-favor-of-custom choice.

For Navbar/mobile navigation, four candidates exist in the registry: `sparkle-navbar.tsx`, `hamburger-menu-overlay.tsx`, `navigation-menu.tsx`, `morphing-navigation.tsx`. All four were fetched and read in full or in relevant part:

| Candidate | Import dependencies found in source | Fit assessment |
|---|---|---|
| `sparkle-navbar.tsx` (301 lines) | `import { gsap } from "gsap"` | **Rejected.** Phase 3 brief explicitly bans introducing GSAP this phase. Also a decorative animated-beam active-state indicator — not "minimal." |
| `morphing-navigation.tsx` (278 lines) | `import { motion, AnimatePresence } from "framer-motion"` | **Rejected.** Phase 3 brief explicitly bans introducing Framer Motion this phase. |
| `navigation-menu.tsx` (286 lines) | No animation lib; uses `lucide-react` + an internal `cn()` class-merge util | **Rejected — wrong shape.** Built for multi-level dropdown/mega-menus (`NavigationMenuContext`, submenu open state per item). This site has 5 flat anchor links, no submenus — adopting this means stripping out most of its logic, which is more work and more risk than writing the 5-line map this project actually needs. |
| `hamburger-menu-overlay.tsx` (382 lines) | No banned animation lib; uses `lucide-react` (`Menu`, `X`) + internal `cn()` util | **Rejected — over-scoped for "minimal."** Implements a full-screen circular `clip-path` reveal animation with hardcoded default colors (`#6c8cff`/`#ffffff`), a hardcoded external Google Font import via CSS `@import` (`Krona One`) that bypasses this project's `next/font` self-hosting, and per-item stagger transitions. Phase 3 explicitly asks for "the smallest custom component required" and warns against "a complex animation system" — this is one. Its `MenuItem[]` prop shape (`label`/`href`/`onClick`/`icon`) is a reasonable pattern and **is** reflected in this project's own `lib/navigation.js` shape, but the component itself was not vendored. |

**Conclusion**: no Lightswind navigation component was reusable/adaptable within this phase's constraints (no GSAP/Framer Motion, minimal animation, small footprint). `Menu`/`X` icons from `lucide-react` — the icon set two of the four candidates independently use — were adopted directly as a small, focused, single-purpose dependency (see Decision Matrix).

## Decision Matrix

| Component | Source | Decision | Reason |
|---|---|---|---|
| `Navbar` | Existing `app/page.js` inline navbar (Phase 0) | **ADAPT** | Interaction pattern already worked (Phase 0 finding). Extracted to `components/layout/Navbar.js`, made config-driven via `lib/navigation.js`, added real `aria-expanded`/`aria-controls`/`aria-label`, fixed a duplicate-`<h1>` accessibility issue (site name demoted from `<h1>` to `<span>`, since Hero already has the page's one `<h1>`). Visual output otherwise unchanged (`bg-white shadow`, same hover colors). |
| `MobileNavigation` | None reusable (see table above) | **BUILD** | All 4 Lightswind candidates rejected — banned deps or over-scoped decorative animation. Built as `components/navigation/MobileNavigation.js`: same visual markup as the original inline dropdown, plus `role="menu"`/`role="menuitem"`, `Escape`-to-close with focus return to the trigger button. ~40 lines. |
| Toggle icon (`☰` → real icon) | `lucide-react` (`Menu`, `X`) | **REUSE** (dependency, not a Lightswind vendor) | Small, tree-shakeable, single-purpose SVG icon package; directly fixes a Phase 0-flagged accessibility gap (a bare glyph has no reliable semantics for assistive tech, unlike an `aria-hidden` icon paired with a labeled button). Independently used by 2 of the 4 Lightswind nav candidates, corroborating it as a reasonable choice. |
| `Container` | None exists in Lightswind registry | **BUILD** | Trivial (9 lines); centralizes `max-w-container` (Phase 2 token) + padding, replacing repeated `max-w-5xl mx-auto px-6`. |
| `Section` | None exists in Lightswind registry | **BUILD** | Trivial (9 lines); centralizes `section-y`/`section-y-sm` spacing tokens. Built now as shell infrastructure but **not yet wired into the 6 existing content sections** — doing so would change their padding (visual redesign), which is out of scope this phase. Ready for Phase 4+ sections to use directly. |
| `Footer` | Existing `app/page.js` inline footer (Phase 0) | **ADAPT** (near-identical extraction) | Moved from inside `<main>` to a sibling `<footer>` landmark (correct semantics per Phase 3 Section 15) with zero visual/content change. No new links added (see `components/layout/Footer.js` comment) — `data/social.js`'s `needsVerification` flags on LinkedIn/GitHub mean those still can't be rendered, and the one "safe" link (Facebook) already appears in the Hero, so adding it to the footer too would be new visible content beyond this phase's refactor scope, not a data-safety question. |
| Navigation config | None (project-specific) | **BUILD** | `lib/navigation.js` — 5-entry array matching the exact `#about`/`#skills`/`#experience`/`#awards`/`#contact` anchors that already exist. No link to a non-existent section was added. |

## Dependency Added

- `lucide-react` — icon set, MIT license, zero animation/runtime behavior beyond rendering inline SVGs. Used for exactly 2 icons (`Menu`, `X`) in `Navbar.js`. No Three.js/GSAP/Lenis/Matter.js/Lottie/Framer Motion introduced, per Phase 3 Section 17.

## Not Done This Phase (explicitly out of scope)

- Lightswind is still not installed/vendored via its CLI — none of its components passed the fit bar this phase (see table above). Re-evaluate once Hero/Portfolio phases need backgrounds/text-animation primitives, where the free-tier catalog is a stronger match (per `docs/REUSE-AUDIT.md`).
- The 6 existing content sections (`#home` Hero, `#about`, `#skills`, `#experience`, `#awards`, `#contact`) were **not** restyled or moved into the new `Section` component — only the outer shell (Navbar/Container/Footer) changed.
