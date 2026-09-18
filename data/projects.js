/**
 * Featured projects / case studies.
 *
 * STATUS: no source content exists yet (see docs/REUSE-AUDIT.md and
 * docs/ARCHITECTURE.md, Phase 0 findings). This file intentionally
 * exports an empty array. Do not populate with invented projects.
 *
 * Card/grid shape (required for a project to appear in Featured Work,
 * see components/portfolio/ProjectCard.js):
 * {
 *   slug: string,
 *   title: string,
 *   description: string,
 *   categories: string[],
 *   technologies: string[],
 *   image: string | null,
 *   github: string | null,
 *   demo: string | null,
 *   featured: boolean,
 * }
 *
 * Extended, all-optional case-study fields (Phase 6,
 * components/portfolio/CaseStudy.js at app/projects/[slug]/page.js) — each
 * renders its own section ONLY when present, nothing is required:
 * {
 *   ...card shape above,
 *   overview: string | null,
 *   problem: string | null,
 *   approach: string | null,
 *   architecture: string | null,       // prose description; see CaseStudy.js
 *                                       // header comment on diagram support
 *   implementation: string | null,
 *   decisions: string | null,
 *   experiments: string | null,
 *   results: string | null,
 *   lessons: string | null,
 * }
 */
const projects = [];

export default projects;
