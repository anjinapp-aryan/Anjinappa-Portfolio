/**
 * Core identity content shown in the navbar and hero section.
 * Source: extracted verbatim from app/page.js (Phase 0 audit).
 *
 * NOTE: `heroTitle` and `aboutSummary` use slightly different phrasing
 * for the same role ("Senior Software Engineer | Java, AWS, ReactJS" vs.
 * "Software Engineer Developer"). Both are preserved as-authored rather
 * than reconciled, since picking one would be an editorial change, not
 * a data-extraction change. Flag for the user to confirm intended wording.
 */
const profile = {
  name: "Anjinappa N",
  heroTitle: "Senior Software Engineer | Java, AWS, ReactJS",
  photo: "/profile.jpg",
  aboutSummary:
    "I am a highly skilled and result-driven Software Engineer Developer " +
    "with 12+ years of experience in full-stack development. Proficient in " +
    "Java, Spring Boot, AWS, Microservices, and ReactJS. Known for " +
    "delivering high-quality code, solving complex problems, and exceeding " +
    "client expectations.",
};

export default profile;
