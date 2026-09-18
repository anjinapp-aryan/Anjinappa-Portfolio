/**
 * Technical skills, grouped into categories.
 *
 * Phase 9: restructured from a flat list of comma-joined strings into the
 * categories the résumé itself uses (Programming / Backend / Cloud & DevOps
 * / Messaging / Frontend / Architecture / AI-LLM / Monitoring). Every entry
 * below appears in the résumé's TECHNICAL SKILLS or CORE COMPETENCIES
 * section, with one documented exception:
 *
 * - Oracle and MySQL: not named in the current résumé (which lists "SQL"
 *   only), but present in the portfolio the user originally authored. Kept
 *   as the user's own prior claim rather than dropped. See
 *   docs/CONTENT-AUDIT.md.
 *
 * No proficiency levels or percentages — the source material supports
 * neither.
 *
 * Shape: { category: string, items: string[] }
 */
const skills = [
  {
    category: "Languages",
    items: ["Java 8/11/17", "Python", "JavaScript", "SQL"],
  },
  {
    category: "Backend",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Core",
      "Spring Cloud",
      "Hibernate",
      "REST APIs",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Terraform", "Docker", "Kubernetes", "Jenkins", "Spinnaker", "CI/CD"],
  },
  {
    category: "Messaging & Data",
    items: ["Kafka", "Redis", "Apache Spark"],
  },
  {
    category: "Databases",
    items: ["SQL", "Oracle", "MySQL"],
  },
  {
    category: "Architecture",
    items: [
      "Microservices",
      "Event-Driven Architecture",
      "Distributed Systems",
      "HLD / LLD",
    ],
  },
  {
    category: "AI Engineering",
    items: [
      "AI Agents / Agentic AI",
      "LangGraph",
      "RAG",
      "Prompt Engineering",
      "GitHub Copilot",
      "Claude",
    ],
  },
  {
    category: "Frontend",
    items: ["ReactJS", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Monitoring",
    items: ["Grafana", "SonarQube", "Autosys"],
  },
];

export default skills;
