# Proposed Architecture

Status: proposal for approval, nothing in this document is implemented yet.

## 1. Data Flow

**Implemented in Phase 1** (plain JS, no TypeScript — see below):

```
data/*.js (profile, experience, skills, awards, certifications, social, resume — hand-extracted from real content; projects/labs/ai currently empty, no source data)
   ↓
app/page.js (imports data modules directly, no intermediate type layer yet)
app/layout.js (imports data/profile.js for metadata)
```

`app/page.js` no longer contains hardcoded personal content — every string that was previously a literal (name, title, experience entries, skills, awards, social links, resume path) is now imported from `data/*.js`. Visual output and markup are unchanged from pre-Phase-1; only the content source moved.

Phase 1 kept plain JavaScript per explicit instruction — no technical blocker required a TypeScript migration for this step. The `lib/types.ts` shared-interfaces layer described below remains a **Phase 2+ proposal**, not yet implemented.

**Target flow once componentized (Phase 3+, not yet implemented):**

```
data/*.js (or *.ts, if a later phase migrates)
   ↓
lib/types.ts (shared interfaces — proposed, not yet created)
   ↓
components/sections/*.jsx (pure presentation, receives data as props/import)
   ↓
app/page.js (composes sections in order)
   ↓
app/projects/[slug]/page.js (BLOCKED — needs real project data)
```

No personal information should live inside a component file — Phase 1 already fixes this for the single-file `app/page.js`; Phase 3+ will carry the same discipline forward as the page is split into components.

**Implemented in Phase 3** (shell only — content sections still live in `app/page.js`):

```
data/*.js ─────────────────────┐
lib/navigation.js (nav config) ─┼─→ components/layout/Navbar.js ──┐
                                │   components/navigation/MobileNavigation.js
data/profile.js ───────────────┴─→ components/layout/Footer.js    │
                                                                    ▼
                                                     app/page.js (composes
                                                     Navbar + Container(main,
                                                     existing sections) + Footer)
```

`lib/` was introduced (new top-level dir) for structural/config data that isn't personal content — `lib/navigation.js` holds the nav link list. This is distinct from `data/`, which stays reserved for the person's real content (profile, experience, etc.) per Phase 1's convention.

## 2. Stack Decisions

| Layer | Current | Proposed | Reason |
|---|---|---|---|
| Framework | Next.js 13.4.19, App Router | Upgrade to a current Next.js 14/15 LTS within the phase plan (validated at Phase 3) | Current version is dated; App Router is already in use so no routing migration needed, only a version bump — validate build/lint after |
| Language | JavaScript | TypeScript | Required by brief Section 10/14 for typed data models; low-risk incremental migration since app is tiny |
| Styling | Tailwind 3.3.2, default theme | Same Tailwind major version, extended theme (typography scale, color tokens, dark-first palette) defined in Phase 2 | No need to replace Tailwind — brief says prefer existing primitives; only the theme config is currently unused/default and needs extension |
| UI components | None | Lightswind UI (free tier, vendored via CLI) for text/background/button/card primitives | See REUSE-AUDIT.md — confirmed MIT, copy-paste model avoids adding a runtime dependency |
| Animation | None | Lightswind's own scroll-reveal/text-animation primitives first; only add Framer Motion if a specific Phase 5+ requirement (e.g. filter layout transitions) isn't covered | Brief Section 12 explicitly warns against stacking Framer Motion + GSAP + Lenis etc. without concrete need |
| Icons | `lucide-react` (added Phase 3) | Continue using for any further icon needs | **Implemented**: fixes the Phase 0-flagged accessibility gap where the mobile menu toggle was a bare "☰" glyph with no reliable assistive-tech semantics. Two of the four Lightswind nav candidates inspected in Phase 3 (`docs/UI-REUSE-MAP.md`) independently depend on it, corroborating the choice. |
| Validation | None | Zod for parsing `data/*.ts` content at build time (pattern borrowed from NextGenPortfolio) | Catches malformed content early; small, focused dependency with a clear job |

Every dependency addition above will be re-justified individually at the phase where it's actually introduced, per Section 12 — this table is a direction, not a pre-approved install list.

## 3. Information Architecture — Proposed vs. Supported by Data

| Brief's target IA (Section 9) | Supported by existing data today? | Notes |
|---|---|---|
| 1. Hero | Yes | Name, title, photo, socials, resume link all exist (resume link is currently broken — see CURRENT-STATE.md) |
| 2. Engineering Snapshot | Partial | Can be derived from existing About paragraph + Experience years, but "snapshot" implies stats/highlights not currently present in any quantified form — needs user input for real numbers, not invented ones |
| 3. Featured Engineering Work | **No** | No project data exists anywhere in the repo (see REUSE-AUDIT.md, BLOCKED row) |
| 4. Architecture / Engineering Thinking | **No** | No architecture writeups, diagrams, or system-design content exist |
| 5. Experience | Yes | 3 roles with dates and descriptions exist |
| 6. Technical Expertise | Yes | Skills list exists, flat — no proficiency levels or categories beyond grouped strings |
| 7. Engineering Labs | **No** | No hands-on experiment/tooling content exists |
| 8. AI / Current Exploration | **No** | No AI/ML content exists anywhere in current data |
| 9. GitHub / Open Source | **No** | No GitHub username or open-source links exist in current data |
| 10. Contact | Yes | Email + phone exist; LinkedIn URL looks malformed (`linkedin.com/Anjinappa` rather than a standard `/in/...` path) and should be verified with the user, not assumed |

**Recommendation**: Sections 1, 5, 6, 10 can be implemented from real data immediately (Phase 1 onward). Sections 2, 3, 4, 7, 8, 9 require new information from the user before they can be built — implementing them now would mean inventing content, which the brief explicitly forbids. Phase 1 should include a concrete, short list of questions back to the user for this missing content rather than silently dropping those IA sections or silently fabricating them.

## 4. Rendering Strategy

- `app/layout.js` and `app/page.js`: Server Components (implemented Phase 3 — `app/page.js`'s `"use client"` directive was removed once its only stateful piece, the mobile menu, moved into `components/layout/Navbar.js`).
- Client Components, implemented: `components/layout/Navbar.js` (owns `menuOpen` state, toggle button) and `components/navigation/MobileNavigation.js` (`"use client"` for its `Escape`-key effect).
- Client Components, still to come: any Lightswind primitive that requires client-side animation/interaction (Phase 4+), and the portfolio filter control (Phase 5, once project data exists).
- This is a direct fix for the pre-Phase-3 state, where the *entire* page was marked `"use client"` even though only the mobile menu needed it — `app/page.js` and `app/layout.js` now ship zero client-side JS of their own.

## 5. Application Shell (Phase 3)

```
app/
  layout.js          Server Component — html/body shell, metadata
  page.js             Server Component — <Navbar /> + <Container as="main"> (existing
                       6 content sections, unchanged) </Container> + <Footer />

components/
  layout/
    Navbar.js          Client Component — config-driven links, mobile-menu toggle state
    Footer.js           Server Component — copyright only, matches pre-Phase-3 output exactly
    Container.js          Server Component — max-width + padding wrapper (max-w-container token)
    Section.js              Server Component — vertical-spacing wrapper (section-y tokens);
                             built but not yet consumed by any existing section (see below)
  navigation/
    MobileNavigation.js   Client Component — renders only while open, Escape-to-close

lib/
  navigation.js        Plain array — nav config, single source of truth for both
                        Navbar and MobileNavigation
```

**Component responsibilities**:
- `Navbar` owns open/closed state and the visible chrome (logo, desktop links, mobile toggle button); delegates the mobile dropdown's own markup to `MobileNavigation` and delegates *what links exist* to `lib/navigation.js`.
- `MobileNavigation` is a dumb renderer of `items`/`open`/`onClose`/`triggerRef` — it has no knowledge of what the links are, so adding a nav entry never touches this file.
- `Container`/`Section` are layout primitives with no data/behavior of their own.
- `Footer` reads `data/profile.js` directly (no props) since it's a one-off, page-level component, consistent with how `Navbar` also reads `data/profile.js` and `lib/navigation.js` directly rather than being passed everything via props.

**Navigation strategy**: `lib/navigation.js` is the only place that lists nav destinations. It currently has 5 entries matching the 5 real anchor IDs in `app/page.js` (`#about`, `#skills`, `#experience`, `#awards`, `#contact`). Adding "Projects"/"Architecture"/"Labs" later (once those sections have real content and real IDs) means adding one object to this array — `Navbar.js` and `MobileNavigation.js` do not change.

**Not yet done**: the 6 existing content sections (`#home` Hero, `#about`, `#skills`, `#experience`, `#awards`, `#contact`) still live inline in `app/page.js` with their pre-Phase-3 classNames, and do **not** yet use the new `Section` component — wiring them in would change their vertical spacing (`py-12` → the `section-y` token, 6rem), which is a visual change out of scope for a shell-only phase. `Section` is built and ready for Phase 4+ (Hero rebuild) to use.

## 6. Responsive Strategy

Breakpoints are Tailwind's unchanged defaults (Phase 2 decision, `docs/DESIGN-SYSTEM.md` Section 8) — no shell component introduces a new breakpoint. Verified at Phase 3 by build/manual review (see final report):
- **Container**: `max-w-container` (72rem/1152px) centers content on everything ≥1152px width including 1440px/1280px; below that it's `width: 100%` with `px-6` gutters — no horizontal scroll at 390px.
- **Navbar**: desktop link row (`hidden md:flex`) only renders ≥768px; the hamburger toggle (`md:hidden`) only renders <768px — same breakpoint boundary as before Phase 3, unchanged behavior, now just componentized.
- **MobileNavigation**: full-width dropdown (`md:hidden`), stacked links, no fixed widths that could overflow at 390px.
- **Footer**: single centered text line, no layout that could overflow at any width.

## 7. Implementation Order (Phase 1 → Phase 8)

1. **Data Contract** — DONE. Extracted existing content into `data/*.js` (kept JS, no blocker required TS), fixed the broken resume link, flagged the About/Hero title inconsistency and LinkedIn URL for user confirmation rather than guessing. No information loss.
2. **Design System** — DONE. Typography/spacing/color/radius/shadow/motion tokens in Tailwind config + `app/globals.css` CSS variables, dark-first, documented in `docs/DESIGN-SYSTEM.md`. Additive only, no rendered-output change.
3. **Application Shell** — DONE. Extracted Navbar/Footer/Container/Section/MobileNavigation components (Section 5 above), config-driven nav (`lib/navigation.js`), added accessibility attributes, kept existing interaction pattern and visual output for the 6 existing content sections unchanged.
4. **Hero** — DONE. `components/sections/Hero.js`, background composed from an adapted Lightswind primitive, CSS-only entrance motion (no framer-motion/gsap). Sitewide dark-token application (see Section 8 below).
5. **Featured Portfolio** — DONE (architecture only). `FeaturedWork`/`ProjectGrid`/`ProjectCard` built and wired in; renders nothing because `data/projects.js` is still empty.
6. **Project Case Studies** — DONE (architecture only). `app/projects/[slug]/page.js` + `CaseStudy.js`; zero pages generated, unknown slugs verified to 404.
7. **Architecture / Engineering Labs** — DONE (architecture only). `Labs`/`AIExploration`/`GitHubSection`; all render nothing because `data/labs.js`, `data/ai.js` are empty and no verified GitHub URL exists.
8. **Final Polish** — DONE. See Section 8 below.

Phases 5–7 remain content-blocked exactly as predicted here in Phase 0 — the component architecture for all three is complete and requires no further code changes once the user supplies real project/labs/AI/GitHub content; only `data/*.js` needs editing.

## 9. Phase 9 — Real Content

The content-blocked sections predicted in Phase 0 are now unblocked. `data/projects.js` (4 projects) and `data/labs.js` (2 labs) hold verified content, so Featured Work, Engineering Labs, the four `/projects/[slug]` case-study pages and the GitHub section all render for the first time. **No component was built and no dependency was added** — the Phase 4–7 architecture rendered real data without modification, which was the point of building it data-driven. See `docs/CONTENT-AUDIT.md`, `docs/PROJECT-AUDIT.md` and `docs/UI-REUSE-MAP.md` (Phase 9 entry).

Two sections remain deliberately unrendered: `#ai` (`data/ai.js` empty by design — the AI work is published as real projects instead) and any education section (the résumé's education line is truncated mid-sentence). The empty-state behaviour built in Phases 5–7 is doing exactly its job.

`lib/navigation.js` gained `#projects` and `#labs` entries, now that those destinations actually render. With seven nav items, the desktop/mobile nav breakpoint moved from `md` (768px) to `lg` (1024px) so the link row doesn't crowd at tablet width.

## 8. Phase 4–8 Master Execution Summary

**Sitewide dark-first reskin (Phase 4)**: applying Phase 2's tokens to only the Hero would have left a dark Hero next to five still-white legacy sections — visibly broken, not "premium." `Navbar`, `MobileNavigation`, `Footer`, and the five original content sections in `app/page.js` were reskinned in the same phase (color/radius utility classes only; no content, structure, or data changed). A real bug from Phase 2 was found and fixed in the process: the custom `borderRadius` tokens were named `sm`/`md`/`lg`/`xl`, which overrode (rather than extended) Tailwind's default scale and silently changed the already-in-use `rounded-xl` skill chips — renamed to `chip`/`control`/`card`/`feature`. See `docs/UI-REUSE-MAP.md` Phase 4 entry.

**Empty-data sections (Phases 5–7)**: `FeaturedWork`, `Labs`, `AIExploration`, and `GitHubSection` all follow the same rule — render `null` with zero markup (not a heading, not a "coming soon" placeholder) when their backing data is empty/unverified. Each is fully wired into `app/page.js` and requires no further component work once real data exists; adding entries to the relevant `data/*.js` file is the only remaining step. No nav entries were added for `#projects`/`#labs`/`#ai`/`#github` since Phase 3's own rule is not to link to a destination that doesn't render.

**Project detail routing (Phase 6)**: `app/projects/[slug]/page.js` uses the Next.js 13.4.19 App Router dynamic-segment convention already in the project — no framework upgrade. `generateStaticParams` currently returns `[]`; any slug 404s via `notFound()`, verified against the production build.

**SEO (Phase 8)**: added `metadataBase`, Open Graph and Twitter Card metadata (using the real profile photo and hero tagline — no invented copy), plus `app/robots.js` and `app/sitemap.js` using the App Router's native metadata-route convention (no new dependency). The site URL (`https://anjinappa-portfolio.vercel.app`) is the real deployment URL given at the start of this project, stored in the new `data/site.js`. **Not done**: a custom favicon/site icon — no real square logo/icon asset exists in the repo to use, and fabricating one is outside this execution's scope; Next's default icon remains until the user supplies one.

**Accessibility (Phase 8)**: verified (by reading rendered HTML, not a screenshot tool — see Responsive Strategy note) — exactly one `<h1>` per page, `aria-expanded`/`aria-controls`/`aria-label` on the mobile toggle, `Escape` closes the mobile menu and returns focus, filter buttons use real `<button>` elements with `aria-pressed`, links use `<a>`. Color contrast was calculated by hand against the WCAG relative-luminance formula for the three text/background pairs actually in use (`foreground-muted` on `background`, `accent` on `background`, `background` on `accent` for button text) — all three exceed 6:1, comfortably clearing the 4.5:1 AA threshold for normal text. `ProjectCard`'s project-image `alt` text was changed from decorative (`alt=""`) to the project title, since a project screenshot is informative content, not decoration.

**Dependency audit (Phase 8)**: only dependency added across all of Phases 4–8 combined is `lucide-react` (added Phase 3, unchanged since). No animation library (Framer Motion/GSAP/Lenis/Matter.js/Lottie/Three.js) was introduced at any point — every entrance/hover/filter interaction across Hero, Featured Work, and the mobile nav is plain CSS transitions/keyframes or small `useState` logic. `package.json`/`package-lock.json` reviewed at the end of this execution: `next`/`react`/`react-dom` unchanged from Phase 0, `lucide-react` is the only addition, nothing removed.

**Code quality**: `Labs.js` and `AIExploration.js` reuse `ProjectCard` rather than near-duplicate card components (see `docs/UI-REUSE-MAP.md` Phase 7 entry for the one documented shape mismatch this causes). `ProjectGrid` is loaded via `next/dynamic` from `FeaturedWork` so its filter-only client JS isn't shipped while `data/projects.js` is empty.
