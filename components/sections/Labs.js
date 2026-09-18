import labs from "../../data/labs";
import Section from "../layout/Section";
import ProjectCard from "../portfolio/ProjectCard";

/**
 * data/labs.js is empty — no hands-on experiment/tooling content exists in
 * the repository. Renders nothing (not even a heading) until real entries
 * are added, same empty-state rule as FeaturedWork.
 *
 * Reuses ProjectCard rather than a new LabCard component: a lab entry
 * (slug/title/description/technologies/github/demo) is a strict subset of
 * the project card shape (ProjectCard already treats `categories`/`image`
 * as optional), so a second near-identical card component would just be
 * duplicated JSX. No grid/filter wrapper (ProjectGrid) is reused here since
 * labs have no `categories` field to filter by — a plain grid is enough.
 */
export default function Labs() {
  if (!labs || labs.length === 0) {
    return null;
  }

  return (
    <Section id="labs">
      <h2 className="text-heading-2 font-semibold text-foreground mb-8 text-center">
        Engineering Labs
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <ProjectCard key={lab.slug} project={lab} />
        ))}
      </div>
    </Section>
  );
}
