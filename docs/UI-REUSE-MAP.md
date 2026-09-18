# UI Reuse Map — Application Shell (Phase 3)

Decisions below are based on inspecting actual component source (not just docs/marketing copy) from `codewithMUHILAN/Lightswind-UI-Library` (branch `Master`), via the GitHub API and raw file contents. Nothing is claimed as "reused" without having read the real `.tsx` source.

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
