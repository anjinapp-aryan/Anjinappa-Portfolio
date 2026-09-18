/**
 * Work history, most recent first.
 * Source: extracted verbatim from app/page.js (Phase 0 audit).
 *
 * Shape:
 * {
 *   company: string,
 *   period: string,        // preserved as originally written, not split into start/end
 *   role: string,
 *   description: string,
 * }
 */
const experience = [
  {
    company: "JP Morgan India",
    period: "2018 - Present",
    role: "Senior Software Engineer",
    description:
      "Designed and implemented CIB applications, AWS migration with " +
      "Terraform, Microservices, React JS UI development.",
  },
  {
    company: "Tangoe India Softek",
    period: "2015 - 2018",
    role: "Software Engineer",
    description: "Spring Boot, Spark, Microservices, Awarded Hall of Fame.",
  },
  {
    company: "Symphony Teleca Corp.",
    period: "2011 - 2015",
    role: "Associate Software Engineer",
    description: "Java, Spring, Hibernate.",
  },
];

export default experience;
