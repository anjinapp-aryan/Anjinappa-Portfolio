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

## 2. Stack Decisions

| Layer | Current | Proposed | Reason |
|---|---|---|---|
| Framework | Next.js 13.4.19, App Router | Upgrade to a current Next.js 14/15 LTS within the phase plan (validated at Phase 3) | Current version is dated; App Router is already in use so no routing migration needed, only a version bump — validate build/lint after |
| Language | JavaScript | TypeScript | Required by brief Section 10/14 for typed data models; low-risk incremental migration since app is tiny |
| Styling | Tailwind 3.3.2, default theme | Same Tailwind major version, extended theme (typography scale, color tokens, dark-first palette) defined in Phase 2 | No need to replace Tailwind — brief says prefer existing primitives; only the theme config is currently unused/default and needs extension |
| UI components | None | Lightswind UI (free tier, vendored via CLI) for text/background/button/card primitives | See REUSE-AUDIT.md — confirmed MIT, copy-paste model avoids adding a runtime dependency |
| Animation | None | Lightswind's own scroll-reveal/text-animation primitives first; only add Framer Motion if a specific Phase 5+ requirement (e.g. filter layout transitions) isn't covered | Brief Section 12 explicitly warns against stacking Framer Motion + GSAP + Lenis etc. without concrete need |
| Icons | None (raw ☰ glyph) | Lucide React (small, tree-shakeable, MIT, already used as a pattern in NextGenPortfolio reference) — only if Lightswind's own icon usage doesn't already cover it | Fixes the current accessibility/visual gap with the hamburger glyph; Lucide is a minimal, single-purpose addition, documented per Section 12 dependency discipline before adding |
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

- `app/layout.tsx` and `app/page.tsx`: Server Components by default (no interactivity needed for static content composition).
- Client Components limited to: mobile menu toggle (existing `useState`), any Lightswind primitive that requires client-side animation/interaction, and the portfolio filter control (Phase 5, once project data exists).
- This is a direct fix for the current state, where the *entire* page is marked `"use client"` unnecessarily (only the mobile menu needs it).

## 5. Implementation Order (Phase 1 → Phase 8)

1. **Data Contract** — type and extract existing content into `data/*.ts` + `lib/types.ts`, fix the broken resume link, resolve the About/Hero title inconsistency, flag LinkedIn URL for user confirmation. No information loss.
2. **Design System** — typography/spacing/color/radius/shadow/motion tokens in Tailwind config, dark-first, documented in `docs/DESIGN-SYSTEM.md`.
3. **Application Shell** — extract Navbar/Footer/Container/Section components, add accessibility attributes, keep existing interaction pattern.
4. **Hero** — compose from Lightswind free-tier primitives (text animation + background), validate mobile/a11y/performance.
5. **Featured Portfolio** — **blocked pending real project data from user**; once available, grid/filtering/cards composed per REUSE-AUDIT.md decisions.
6. **Project Case Studies** — **blocked pending real project data**.
7. **Architecture / Engineering Labs** — **blocked pending real content**; investigate diagram/visualization reuse only once actual content to visualize is known.
8. **Final Polish** — SEO/OG/sitemap/robots/a11y/performance/responsive QA across 1440/1280/1024/768/390px, lint/typecheck/build validation.

Phases 5–7 cannot proceed with real substance until the user supplies project, architecture/labs, AI-exploration, and GitHub content. Phases 1–4 and 8 (shell/design/hero/polish of existing sections) can proceed on existing data alone.
