# Data Model

Phase 1 output. All content below was extracted verbatim from `app/page.js` (Phase 0 source of truth) into `data/*.js`. Nothing was invented, reworded, or embellished; wording/dates are preserved exactly as originally authored unless a note says otherwise.

## data/profile.js

Core identity shown in navbar + hero + about.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | |
| `heroTitle` | string | yes | Tagline shown under the hero photo |
| `photo` | string | yes | Path under `public/` |
| `aboutSummary` | string | yes | The About paragraph |

**Known issue, not fixed in Phase 1**: `heroTitle` ("Senior Software Engineer \| Java, AWS, ReactJS") and `aboutSummary` ("Software Engineer Developer") use different phrasing for the same role. Both are preserved as originally authored. Reconciling wording is an editorial decision for the user, not a data-extraction task.

## data/experience.js

Array of work history entries, most recent first.

| Field | Type | Required | Notes |
|---|---|---|---|
| `company` | string | yes | |
| `period` | string | yes | Preserved as free text (e.g. `"2018 - Present"`), not split into start/end dates — original data had no structured dates to split |
| `role` | string | yes | |
| `description` | string | yes | |

3 entries: JP Morgan India, Tangoe India Softek, Symphony Teleca Corp.

## data/skills.js

Flat array of skill-group label strings (e.g. `"Java, Spring Boot"`). The original UI never had per-skill proficiency levels or a category taxonomy beyond these grouped labels — that structure is preserved, not invented. 6 entries.

## data/awards.js / data/certifications.js

The original single "Awards & Certifications" list (3 lines) was split into two arrays of strings by content type:
- `awards.js`: 2 entries (Outstanding Performer Award, Hall of Fame Award)
- `certifications.js`: 1 entry (AWS DEV-C01 & CLF-C02 Certified)

Both are arrays of plain strings, matching the original list-item granularity (no attempt to parse issuer/date/ID out of the certification string, since that would require guessing structure not present in the source).

## data/social.js

| Field | Type | Notes |
|---|---|---|
| `linkedin.url` | string | `https://www.linkedin.com/Anjinappa` — **malformed**, not a standard `/in/<handle>` path |
| `linkedin.needsVerification` | boolean | `true` |
| `facebook.url` | string | `https://www.facebook.com/anjinappa.ansi` |
| `facebook.needsVerification` | boolean | `false` |
| `github.url` | string \| null | `null` — no GitHub link exists in any source content |
| `github.needsVerification` | boolean | `true` |
| `email` | string | `anjinapp.n@gmail.com` |
| `phone` | string | `+91 9591931497` |

`needsVerification` fields exist specifically so a future contributor (or the site itself, if ever surfaced) can flag unverified links without guessing a replacement value. Do not clear a `needsVerification` flag without an explicit corrected value from the user.

## data/resume.js

| Field | Type | Notes |
|---|---|---|
| `downloadPath` | string | `/Anjinappa_Resume.pdf` |

**Resume issue resolved in Phase 1**: the original code linked to `/Anjinappa_Resume.pdf`, which did not exist under `public/`. The only resume asset was `data/Anjinappa_Professional_10PlusYearExpResume (2).pdf`, which Next.js does not serve (only `public/` is statically served). Fix applied: that PDF's bytes were copied unmodified to `public/Anjinappa_Resume.pdf` — the filename the UI already referenced. No content was changed and no new filename was invented.

## data/projects.js, data/labs.js, data/ai.js

All three currently export an **empty array** (`[]`). No source content exists for Featured Projects, Engineering Labs, or AI Exploration anywhere in the repository (confirmed in Phase 0 audit). Each file documents its target shape in a comment for when real content is supplied, but nothing is rendered from them today — `app/page.js` does not reference these modules, per the brief's "do not render empty sections" rule.

### Future `projects.js` shape

```js
{
  slug: string,
  title: string,
  description: string,
  categories: string[],
  technologies: string[],
  image: string | null,
  github: string | null,
  demo: string | null,
  featured: boolean,
}
```

### Future `labs.js` shape

```js
{
  slug: string,
  title: string,
  description: string,
  technologies: string[],
  github: string | null,
  demo: string | null,
}
```

### Future `ai.js` shape

```js
{
  slug: string,
  title: string,
  description: string,
  technologies: string[],
  link: string | null,
}
```

## data/site.js (added Phase 8)

Site-level config, not personal content — separate from the pattern above on purpose.

| Field | Type | Notes |
|---|---|---|
| `url` | string | `https://anjinappa-portfolio.vercel.app` — the live deployment URL given at the start of this project, used for `metadataBase`/Open Graph/`sitemap.xml`/`robots.txt`. Not invented. |

## What was deliberately NOT done in Phase 1

- No TypeScript — kept as plain JS modules per explicit Phase 1 instruction (no technical blocker required it).
- No Zod or other validation library added — these are small, hand-authored modules; validation isn't a concrete need yet.
- No UI/visual changes — `app/page.js` renders identical markup/classes to before; only the data source changed from inline literals to imports.
- No renaming of IA sections (e.g. "About" → "Engineering Snapshot") — that's a Phase 2+/content decision, not extraction.
