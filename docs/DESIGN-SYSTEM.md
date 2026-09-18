# Design System — "Engineering Intelligence"

Phase 2 output. Defines tokens and component strategy for the visual migration. **Nothing in `app/page.js` renders differently after this phase** — tokens were added additively to `tailwind.config.js` and `app/globals.css` as CSS variables/theme extensions that no component references yet. Wiring them into markup starts in Phase 3 (Application Shell).

## 1. Lightswind Reuse Audit (design-token angle)

Extends the Phase 0 audit (`docs/REUSE-AUDIT.md`) with theming specifics:

- Lightswind themes via **CSS variables** registered by its own Tailwind plugin (`lightswindPlugin`), with 7 built-in color presets (`default`, `deep-ocean`, `crimson`, `emerald`, `amber`, `amethyst`, `mono`) and native `darkMode: "class"` support.
- It does not publish a fixed opinion on font stack, radius, or shadow values — those are left to the consuming project.
- **Decision**: do not adopt a Lightswind preset theme wholesale (none of the 7 match the specific "Engineering Intelligence" palette below, and adopting one would mean designing around their choices rather than this portfolio's). Instead, this project defines its own CSS-variable token set now (Section 2). When Lightswind is actually vendored (Phase 4+), its components will be restyled to consume *this* project's `--color-*` variables rather than installing its plugin and switching to its preset — keeping a single source of truth for color instead of two token systems.
- Lightswind's `darkMode: "class"` convention is adopted here now (`tailwind.config.js` sets `darkMode: "class"`) specifically so future Lightswind components drop in without a config mismatch.

## 2. Color

Dark-first, single confident accent, no neon, no gradient soup. Defined as CSS variables in `app/globals.css` and exposed as Tailwind tokens (`bg-background`, `text-foreground`, `bg-accent`, etc.) in `tailwind.config.js`.

| Token | Value | Usage |
|---|---|---|
| `--color-background` | `#0A0E14` | Page background (near-black, not pure black) |
| `--color-surface` | `#10151C` | Card/section surface, one step up from background |
| `--color-surface-elevated` | `#161C26` | Hover/elevated state, modals |
| `--color-foreground` | `#E6EAF0` | Primary text |
| `--color-foreground-muted` | `#9AA5B1` | Secondary text, captions |
| `--color-border` | `rgba(255,255,255,0.08)` | Hairline borders on dark surfaces |
| `--color-accent` | `#5B8CFF` | Primary signal color — links, primary CTA, active states |
| `--color-accent-muted` | `rgba(91,140,255,0.35)` | Accent glow/focus rings, low-opacity backgrounds |
| `--color-accent-secondary` | `#34D399` | Sparse use only — "featured" badges, success/positive states. Not a second primary color. |

**Rule**: one primary accent (`accent`) does almost all the work. `accent-secondary` appears in at most one or two places per screen. No third accent color is introduced without updating this table first.

A light theme is explicitly **out of scope** for now — the brief calls for dark-first, and `:root` holds the dark palette directly rather than behind a `.dark` class toggle. If a light mode is requested later, it becomes a `.light` override, not a rework of these tokens.

## 3. Typography

Font: **Inter** (already loaded via `next/font/google` in `app/layout.js` — no change, no new dependency).

Recommended addition (documented here, **not yet wired in** — a Phase 3 decision): a monospace face (`IBM Plex Mono`, referenced as `--font-mono` / `font-mono` utility) for section eyebrows, tags, and technical labels only (e.g. "ROLE", "STACK"), reinforcing the technical identity in small doses. Single additional font, self-hosted via `next/font`, latin subset only — flagged per Section 12 dependency discipline, decision deferred to whichever phase first needs it (likely Phase 3 shell or Phase 4 hero).

Type scale (added to `tailwind.config.js theme.extend.fontSize`):

| Token | Size / line-height / weight | Usage |
|---|---|---|
| `display` | 3.5rem / 1.1 / 700 | Hero name |
| `heading-1` | 2.5rem / 1.15 / 700 | Page-level heading (rare, hero only) |
| `heading-2` | 1.875rem / 1.25 / 600 | Section headings (About, Skills, Experience, ...) |
| `heading-3` | 1.25rem / 1.3 / 600 | Card/entry titles (experience role, project title) |
| `body-lg` | 1.125rem / 1.6 / 400 | Hero subtitle, lead paragraphs |
| `text-base` (Tailwind default) | 1rem / 1.6 / 400 | Body copy |
| `text-sm` (Tailwind default) | 0.875rem / 1.5 / 400 | Secondary/meta text |
| `eyebrow` | 0.75rem / 1.4 / 600, `letter-spacing: 0.08em` | Small uppercase labels above section headings |

Existing Tailwind default scale is kept for anything not listed — only additive tokens for the sizes this design needs were introduced, per Section 12 discipline (don't replace what isn't broken).

## 4. Spacing & Layout

- Base spacing scale: Tailwind's default (4px increments) — sufficient, not replaced.
- Added semantic tokens: `section-y` (6rem, desktop section vertical padding) and `section-y-sm` (4rem, mobile) — replaces the current flat `py-12` used identically on every section regardless of viewport.
- Added `max-w-container` (72rem / 1152px) — current layout uses `max-w-5xl` (64rem / 1024px) everywhere. 72rem gives more breathing room on large screens per the brief's "excellent whitespace" goal, still comfortably readable. To be applied when the shared `Container` component is built (Phase 3).
- Horizontal gutter: keep existing `px-6` (24px) on mobile; no change needed, already reasonable.

## 5. Radius

| Token | Value |
|---|---|
| `rounded-sm` | 0.375rem — chips, small buttons |
| `rounded-md` | 0.75rem — buttons, form inputs |
| `rounded-lg` | 1rem — cards (replaces current ad hoc `rounded-2xl`, which is 1rem in default Tailwind — this token makes that value explicit/nameable rather than a magic default) |
| `rounded-xl` | 1.5rem — hero image, large feature cards |

## 6. Shadow

Dark backgrounds make default Tailwind gray box-shadows invisible/wrong. Two custom shadow tokens added:

- `shadow-soft` — ambient elevation shadow (dual-layer, low-opacity black) for cards/surfaces sitting above the page background.
- `shadow-glow-accent` — accent-tinted glow (uses `--color-accent-muted`) for hover/focus states on interactive elements (buttons, project cards) — a restrained substitute for a literal border-color change, avoids introducing a second interaction language.

## 7. Motion Rules

Per brief Section 13 — animation must improve communication, never decorate for its own sake.

**Durations** (`transitionDuration` tokens): `fast` 150ms (hover/focus micro-interactions), `base` 250ms (default transitions), `slow` 400ms (section reveals only).

**Easing** (`transitionTimingFunction.standard`): `cubic-bezier(0.4, 0, 0.2, 1)` — standard "ease-out" deceleration curve, used for both entrances and hovers; no bounce/elastic/spring easings (those read as playful, not "sophisticated/technical").

**Micro-interactions**: color/shadow/transform transitions only, `fast`–`base` duration. Card hover: subtle `translateY(-2px)` + `shadow-glow-accent`, no rotation, no scale beyond 1.02.

**Section reveal**: fade + `translateY(8px)→0`, `slow` duration, triggered once on scroll-into-view (no repeat-on-every-scroll). Stagger children (e.g. skill chips, experience items) by 60–80ms, capped at ~6 staggered items before falling back to a single group fade (avoids a long cascading wait on longer lists).

**Hero**: allowed a richer one-time entrance treatment (per brief Section 13 exception) — composed from Lightswind's free-tier text/background primitives once vendored in Phase 4. No other section gets hero-level animation.

**`prefers-reduced-motion`**: when set, all transform/opacity entrance and scroll-triggered animations are disabled outright (content renders in final state immediately); simple color transitions on hover/focus may remain since they don't involve motion. This is a hard rule, not a "nice to have," and will be implemented via a shared hook/CSS media query when Section/reveal components are built (Phase 3+).

## 8. Responsive Rules

Tailwind's default breakpoints are kept unchanged (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px) — they already cover the brief's required QA widths (1440 falls in the `2xl`-adjacent range under the new 1152px container's centered max-width, 1280 = `xl`, 1024 = `lg`, 768 = `md`, 390 = base/mobile-first).

Rules for Phase 3+ implementation:
- Mobile-first authoring (unprefixed classes = mobile, override upward) — matches current codebase convention already.
- Container padding: `px-6` below `md`, stepping up only where a section specifically needs more breathing room (documented per-component, not globally).
- No new custom breakpoints introduced unless a concrete layout need in a later phase can't be met by the default scale.

## 9. Component Strategy

Maps the target component map (`docs/COMPONENT-MAP.md`) to a reuse source, using tokens defined above:

| Component | Source | Notes |
|---|---|---|
| `Container` | Custom (trivial) | Applies `max-w-container` + responsive padding |
| `Section` | Custom (trivial) + Lightswind scroll-reveal primitive | Wraps children, applies `section-y` spacing, hooks up reveal animation respecting reduced-motion |
| `Navbar` / `MobileMenu` | Adapt existing `app/page.js` markup | Keep current interaction logic (Phase 0 finding: it already works); restyle with tokens, add `aria-expanded`/`aria-label`, swap `☰` glyph for an icon (icon library choice deferred to Phase 3, see `ARCHITECTURE.md`) |
| Buttons (LinkedIn/Resume/CTA) | Lightswind free-tier button primitives (gradient/shine), themed to `--color-accent` | Replaces current flat `bg-blue-600`/`bg-green-600` per-button colors with one consistent accent-driven button style |
| Cards (skills, awards, future project cards) | Lightswind free-tier card/hover-effect primitives, themed to `shadow-soft` / `shadow-glow-accent` | |
| Hero background | Lightswind free-tier background primitive (subtle, single effect, low accent opacity) | Hero-only per Section 7 |
| Hero name/title text | Lightswind free-tier text-animation primitive, restrained (single entrance, no looping) | |
| Experience timeline | Custom (per `docs/REUSE-AUDIT.md` — no confirmed free timeline block) | Built with `Section`/token primitives, not a new dependency |

No component in this table is implemented yet — this is the assignment of source-per-component that Phase 3+ will follow.

## 10. What Changed in Code This Phase

- `tailwind.config.js`: added `darkMode: "class"`, `components/` to `content` globs (for when that directory exists), and the token extensions listed above (colors, font sizes, radius, shadow, spacing, container width, transition duration/easing).
- `app/globals.css`: added a `:root` block defining the dark-first CSS variables consumed by the new Tailwind color tokens.
- **No change to `app/page.js` or `app/layout.js`** — rendered output is identical to end of Phase 1. Verified via production build (see below).
