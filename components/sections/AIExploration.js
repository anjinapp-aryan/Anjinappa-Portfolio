import ai from "../../data/ai";
import Section from "../layout/Section";
import ProjectCard from "../portfolio/ProjectCard";

/**
 * data/ai.js is empty — no AI/current-exploration content exists in the
 * repository. Renders nothing until real entries are added.
 *
 * Reuses ProjectCard by mapping the ai.js entry's single `link` field to
 * ProjectCard's `demo` prop. Known minor mismatch: ProjectCard always
 * labels that link "Live Demo", which may not fit every AI entry (a paper
 * or write-up isn't a "demo") — acceptable to leave for now since this
 * section renders nothing today; revisit the label once real data exists
 * and it's clear what the link actually points to.
 */
export default function AIExploration() {
  if (!ai || ai.length === 0) {
    return null;
  }

  return (
    <Section id="ai">
      <h2 className="text-heading-2 font-semibold text-foreground mb-8 text-center">
        AI &amp; Current Exploration
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ai.map((item) => (
          <ProjectCard
            key={item.slug}
            project={{ ...item, github: null, demo: item.link }}
          />
        ))}
      </div>
    </Section>
  );
}
