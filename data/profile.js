/**
 * Core identity shown in the navbar, hero and about section.
 *
 * Phase 9: reconciled against the résumé
 * (data/Anjinappa_Professional_10PlusYearExpResume (2).pdf), which is the
 * authoritative source for role, tenure and focus.
 *
 * Title note: the résumé's banner line reads "Technical Lead | Senior Java
 * Developer | Cloud Native Architect | AI Agent Platform Builder", but its
 * PROFESSIONAL EXPERIENCE section states the actual employment title as
 * "Senior Software Engineer / Technical Lead" at JP Morgan Chase. The
 * employment title is what's used here — "Cloud Native Architect" is a
 * self-description in a résumé banner, not a job title, and presenting it
 * as one would imply an Architect role the source doesn't support.
 *
 * Tenure note: the résumé states "13+ years"; the pre-Phase-9 site said
 * "12+". The résumé wins.
 */
const profile = {
  name: "Anjinappa N",
  heroTitle: "Senior Software Engineer / Technical Lead",
  location: "Bangalore, India",
  photo: "/profile.jpg",
  heroSummary:
    "13+ years building enterprise Java and Spring Boot systems — " +
    "microservices, event-driven architecture on Kafka, and AWS migrations " +
    "for Corporate & Investment Banking at JP Morgan Chase. Currently " +
    "building agentic AI platforms with LangGraph and LLM engineering.",
  aboutSummary:
    "Technical Lead and Senior Software Engineer with 13+ years designing, " +
    "developing and deploying enterprise-scale applications across banking, " +
    "finance, telecommunications and retail. Works primarily in Java, Spring " +
    "Boot, microservices and AWS, with event-driven systems on Kafka and " +
    "large-scale data processing in Python and Apache Spark. Leads a team of " +
    "5 engineers at JP Morgan Chase, covering HLD/LLD design reviews, code " +
    "reviews and mentoring. Outside enterprise work, builds agentic AI " +
    "systems — LangGraph multi-agent platforms, LLM gateways and " +
    "AI-assisted developer tooling.",
};

export default profile;
