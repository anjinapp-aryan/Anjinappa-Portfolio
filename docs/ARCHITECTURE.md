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
4. **Hero** — compose from Lightswind free-tier primitives (text animation + background), validate mobile/a11y/performance.
5. **Featured Portfolio** — **blocked pending real project data from user**; once available, grid/filtering/cards composed per REUSE-AUDIT.md decisions.
6. **Project Case Studies** — **blocked pending real project data**.
7. **Architecture / Engineering Labs** — **blocked pending real content**; investigate diagram/visualization reuse only once actual content to visualize is known.
8. **Final Polish** — SEO/OG/sitemap/robots/a11y/performance/responsive QA across 1440/1280/1024/768/390px, lint/typecheck/build validation.

Phases 5–7 cannot proceed with real substance until the user supplies project, architecture/labs, AI-exploration, and GitHub content. Phases 1–4 and 8 (shell/design/hero/polish of existing sections) can proceed on existing data alone.
