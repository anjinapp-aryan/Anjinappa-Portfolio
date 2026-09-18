import dynamic from "next/dynamic";
import projects from "../../data/projects";
import Section from "../layout/Section";

// Dynamically imported so the (currently unused) filter/grid client-side
// JS is not shipped in the page bundle while data/projects.js is empty —
// a real performance cost for a feature with nothing to render yet.
const ProjectGrid = dynamic(() => import("../portfolio/ProjectGrid"));

/**
 * data/projects.js is empty (confirmed at repo inspection for this phase —
 * no project content exists anywhere in the repository). Per this phase's
 * brief: "avoid exposing a meaningless empty portfolio to visitors" — this
 * section renders nothing at all (not even a heading or an empty-state
 * message) until data/projects.js has at least one real entry. The
 * component architecture (this file + ProjectGrid + ProjectCard) is fully
 * built and wired so adding real project data is the only remaining step;
 * no further component work is needed. See docs/DATA-MODEL.md for the
 * exact shape data/projects.js expects.
 */
export default function FeaturedWork() {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <Section id="projects">
      <h2 className="text-heading-2 font-semibold text-foreground mb-8 text-center">
        Featured Engineering Work
      </h2>
      <ProjectGrid projects={projects} />
    </Section>
  );
}
