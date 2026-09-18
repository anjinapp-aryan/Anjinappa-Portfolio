/**
 * AI / current exploration content.
 *
 * STATUS after the Phase 9 audit: intentionally still empty.
 *
 * This is not for lack of AI work — CareerPilot AI, DBPilot AI and
 * Code2Shorts are all AI engineering and are published in data/projects.js,
 * where they carry working demos and real code. A separate "AI Exploration"
 * section would duplicate that story rather than add to it.
 *
 * The one candidate that would have gone here is `Tunora` (AI music
 * studio, https://github.com/anjinapp-aryan/Tunora). It was inspected and
 * deliberately excluded: the repository currently contains no application
 * code at all — the GitHub languages endpoint reports zero bytes in any
 * language. What exists is 21 design documents (architecture principles,
 * reuse/licence/cost audits, MVP scope, phase decisions) plus a git
 * submodule pointing at the third-party ACE-Step-1.5 model. That is real
 * design work, but sending a portfolio visitor to a repository with no
 * implementation and no README weakens credibility rather than adding to
 * it. Add it here once implementation starts. See docs/PROJECT-AUDIT.md.
 *
 * Shape (for when real content is provided):
 * {
 *   slug: string,
 *   title: string,
 *   description: string,
 *   technologies: string[],
 *   link: string | null,
 * }
 */
const ai = [];

export default ai;
