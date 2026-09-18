/**
 * Work history, most recent first.
 *
 * Phase 9: JP Morgan and Tangoe entries were expanded from the résumé
 * (titles, exact date ranges and responsibility bullets are verbatim in
 * substance, only lightly condensed for the web).
 *
 * CONFLICT — documented, not silently resolved (see docs/CONTENT-AUDIT.md):
 * the Symphony Teleca Corp. (2011–2015) entry exists in the original
 * portfolio the user authored, but does NOT appear in the current résumé,
 * which lists only JP Morgan (2018–) and Tangoe (2015–2018). The résumé's
 * own "13+ years" claim is only consistent with employment starting before
 * 2015, which supports the Symphony Teleca entry being real but omitted
 * from a condensed résumé. It is kept, unchanged from what the user
 * originally wrote, rather than deleted on the strength of an omission.
 *
 * Shape:
 * {
 *   company: string,
 *   period: string,
 *   role: string,
 *   description: string,          // one-line summary
 *   highlights: string[],         // optional detail bullets
 * }
 */
const experience = [
  {
    company: "JP Morgan Chase",
    period: "Aug 2018 - Present",
    role: "Senior Software Engineer / Technical Lead",
    description:
      "Leads a team of 5 engineers building enterprise applications for Corporate & Investment Banking.",
    highlights: [
      "Architects and implements Spring Boot microservices and distributed systems.",
      "Leads AWS cloud migration using Terraform, Docker, Kubernetes and Spinnaker.",
      "Builds event-driven architectures on Kafka for high-volume business processing.",
      "Implements secure REST APIs and enterprise integrations, and builds ReactJS front ends.",
      "Processes large-scale datasets with Python and Apache Spark; uses Redis caching to reduce latency.",
      "Designs CI/CD pipelines with Jenkins and Spinnaker.",
      "Participates in HLD/LLD design activities; mentors engineers and runs code reviews.",
    ],
  },
  {
    company: "Tangoe India Softek Services Pvt Ltd",
    period: "Jul 2015 - Aug 2018",
    role: "Software Engineer",
    description:
      "Built enterprise applications and backend services using Java and Spring technologies.",
    highlights: [
      "Implemented Spring Security solutions; recognised for technical excellence (Hall of Fame award).",
      "Built scalable backend services and enterprise integrations.",
    ],
  },
  {
    company: "Symphony Teleca Corp.",
    period: "2011 - 2015",
    role: "Associate Software Engineer",
    description: "Java, Spring, Hibernate.",
    highlights: [],
  },
];

export default experience;
