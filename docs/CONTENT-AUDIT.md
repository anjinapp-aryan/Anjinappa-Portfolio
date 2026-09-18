# Content Audit — Phase 9

Every claim now published on the site traces back to one of two sources:

1. **The résumé** — `data/Anjinappa_Professional_10PlusYearExpResume (2).pdf`, read in full during this phase. Authoritative for role, tenure, employers, skills, certifications.
2. **Verified public repositories** under `https://github.com/anjinapp-aryan` — inspected via the GitHub API (READMEs, language bytes, commit authorship), with every published URL requested and checked for an HTTP 200.

Nothing was written from memory, inference, or prior conversation.

## Identity verification

| Item | Status | Evidence |
|---|---|---|
| Name — Anjinappa N | **VERIFIED** | Résumé header; GitHub API profile `name` field |
| Location — Bangalore, India | **VERIFIED** | Résumé header; GitHub profile `location: India` |
| Employer — JP Morgan Chase | **VERIFIED** | Résumé PROFESSIONAL EXPERIENCE; GitHub profile `company: "JP Morgan pvt ltd"` |
| LinkedIn — `linkedin.com/in/anjinappan/` | **VERIFIED** | Explicitly confirmed by the user; matches the résumé's `linkedin.com/in/Anjinappan`. Returns HTTP 999 to automated requests — that is LinkedIn's anti-bot response, not a missing page |
| GitHub — `github.com/anjinapp-aryan` | **VERIFIED** | Listed on the résumé; GitHub API confirms the profile is "Anjinappa N" at JP Morgan; it is also the account hosting this repository |
| YouTube — `@AskAIwithAryan` | **VERIFIED** | Listed on the résumé; resolves HTTP 200 |

## Corrections made to previously-published content

| Field | Was | Now | Why |
|---|---|---|---|
| Certification code | "AWS DEV-C01 & CLF-C02 Certified" | "AWS Certified Developer – Associate (DVA-C02)" + "AWS Certified Cloud Practitioner (CLF-C02)" | **`DEV-C01` is not a real AWS exam code.** The résumé states DVA-C02. This was a factual error on the live site. |
| Tenure | "12+ years" | "13+ years" | Résumé states 13+. |
| Role | "Senior Software Engineer" | "Senior Software Engineer / Technical Lead" | The résumé's experience section gives this as the actual employment title. |
| Employer name | "JP Morgan India" | "JP Morgan Chase" | Résumé wording. |
| Employment dates | "2018 - Present", "2015 - 2018" | "Aug 2018 - Present", "Jul 2015 - Aug 2018" | Résumé precision. |
| About copy | "highly skilled and result-driven Software Engineer Developer… exceeding client expectations" | Factual summary of domains, stack, team size and current focus | The old copy was résumé-objective boilerplate with no information content. |

## Title decision (deliberate, not an oversight)

The résumé's banner line reads **"Technical Lead \| Senior Java Developer \| Cloud Native Architect \| AI Agent Platform Builder"**. The site does **not** use "Cloud Native Architect" or "AI Agent Platform Builder" as a title, because the same résumé's experience section states the actual employment title as *Senior Software Engineer / Technical Lead*. A self-description in a résumé banner is not a job title, and presenting it as one would imply an Architect role the source doesn't support.

## Documented conflict — Symphony Teleca Corp. (2011–2015)

The pre-existing site lists a third role: **Symphony Teleca Corp., Associate Software Engineer, 2011–2015**. The current résumé does **not** mention it — it lists only JP Morgan (2018–) and Tangoe (2015–2018).

Resolution: **kept, unchanged**, and flagged here rather than silently deleted or silently trusted.
- The résumé's own "13+ years" claim is not consistent with employment beginning in 2015 (that would be ~11 years), which supports the earlier role being real but omitted from a condensed résumé.
- The entry is content the user originally authored themselves.
- Deleting real career history on the strength of an omission is the more destructive error of the two.

**Action for the user:** confirm whether this role should stay, and whether the résumé should be updated to include it.

## Privacy decisions

- **Phone number removed from the rendered site.** `+91 9591931497` was previously published in the Contact section. It remains in `data/social.js` (it is real, and it is on the résumé) but is no longer rendered anywhere — verified absent from the built HTML. Phase 9's privacy rule lists phone numbers as not-to-publish.
- **Email kept.** `anjinapp.n@gmail.com` was already intentionally public in the existing portfolio, which the same rule explicitly permits.
- **Facebook de-emphasised.** The link is retained in `data/social.js` but no longer appears in the Hero. It is a personal account and is not part of the professional link set the résumé itself presents (LinkedIn / GitHub / portfolio / YouTube). Not deleted — one edit away if the user wants it back.

## Skills

`data/skills.js` was restructured from a flat list of comma-joined strings into the categories the résumé itself uses. Every entry is drawn from the résumé's TECHNICAL SKILLS or CORE COMPETENCIES sections, with one exception:

- **Oracle and MySQL** — not named in the current résumé (which lists "SQL" only), but present in the portfolio the user originally authored. Kept as the user's own prior claim. Worth confirming.

No proficiency percentages, levels, or "Expert/Intermediate" labels were added — the source material supports none.

## Still missing / intentionally left empty

| Area | Status | What would be needed |
|---|---|---|
| `data/ai.js` | **Empty by design** | The AI work is already published as real projects (CareerPilot, DBPilot, Code2Shorts). The one remaining candidate, Tunora, has no implementation code — see `docs/PROJECT-AUDIT.md`. |
| Education | **INCOMPLETE — omitted** | The résumé's education line is truncated mid-sentence: "Bachelor of Engineering (Computer Science" — no institution, no graduation year. Not published rather than guessed at. |
| Quantified impact | **UNKNOWN — omitted** | No source material documents a single latency, throughput, scale, cost or availability figure. No metric is published anywhere on the site. |
| Favicon / site icon | **Missing** | No square logo or icon asset exists in the repository. |
| ArchitectIQ | **Excluded** | On the résumé, but the linked repository is empty. See `docs/PROJECT-AUDIT.md`. |
