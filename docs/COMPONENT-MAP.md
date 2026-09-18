# Component Map

## Current State (as-is)

Single file, no component boundaries:

```
app/
  layout.js        RootLayout — html/body shell, Inter font, static metadata
  page.js           Home — everything below lives in this one client component
    ├─ Navbar (inline)       — fixed nav, logo+name, desktop links, mobile hamburger + dropdown
    ├─ Hero (inline)         — #home — photo, name, title, social/resume buttons
    ├─ About (inline)        — #about — one paragraph
    ├─ Skills (inline)       — #skills — grid of skill-group chips
    ├─ Experience (inline)   — #experience — vertical list of 3 roles
    ├─ Awards (inline)       — #awards — bullet list
    ├─ Contact (inline)      — #contact — email + phone
    └─ Footer (inline)       — copyright line
```

No `components/`, `data/*.ts`, `lib/`, or `hooks/` directories exist. Everything is hardcoded JSX + string literals.

## Target Component Map (proposed, for approval — not implemented in Phase 0)

```
data/
  profile.ts            name, title, photo, socials, resume file ref
  experience.ts          Experience[]
  skills.ts               SkillGroup[]
  awards.ts               Award[]
  projects.ts              Project[]   (BLOCKED — no source data yet, see REUSE-AUDIT.md)
  contact.ts               ContactInfo

lib/
  types.ts                shared TS interfaces (Profile, Experience, SkillGroup, Award, Project, ContactInfo)

components/
  layout/
    Navbar.tsx             restyled current navbar, adds aria-expanded/aria-label
    MobileMenu.tsx          extracted dropdown
    Container.tsx            max-width wrapper (replaces repeated max-w-5xl mx-auto)
    Section.tsx               shared section wrapper (id, heading, spacing, reveal animation hook)
    Footer.tsx

  ui/                       vendored Lightswind free-tier primitives (CLI copy-paste), only what's used:
    AnimatedText.tsx
    ScrollReveal.tsx
    GradientButton.tsx
    Card.tsx
    HeroBackground.tsx

  sections/
    Hero.tsx                 composes AnimatedText + HeroBackground + GradientButton
    About.tsx                 (renamed "Engineering Snapshot" pending IA approval)
    Skills.tsx                 (renamed "Technical Expertise" pending IA approval)
    Experience.tsx               timeline, custom-built per REUSE-AUDIT.md
    Awards.tsx
    Projects.tsx                  BLOCKED until project data exists
    Contact.tsx

app/
  layout.js → layout.tsx (TS migration)
  page.tsx                    composes sections/* only, no inline content
  projects/[slug]/page.tsx    BLOCKED — Phase 6, needs project data
```

## Migration Notes

- Existing navbar/hero/about/skills/experience/awards/contact logic is **extracted, not rewritten** — Phase 1–3 moves content to `data/*`, Phase 3–4 splits `page.js` into `components/sections/*`, restyling happens component-by-component per phase, not as a big-bang rewrite.
- `Projects.tsx` and `app/projects/[slug]/page.tsx` are placeholders in this map only — brief Section 3 forbids inventing project content, so these are not built until real data is supplied.
- IA renames (e.g. "About" → "Engineering Snapshot") are proposals for Phase 1 discussion, not decisions — see `ARCHITECTURE.md` Section on Information Architecture.
