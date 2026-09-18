import { notFound } from "next/navigation";
import projects from "../../../data/projects";
import profile from "../../../data/profile";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import Container from "../../../components/layout/Container";
import Section from "../../../components/layout/Section";
import CaseStudy from "../../../components/portfolio/CaseStudy";

/**
 * data/projects.js is currently empty, so this returns no params — every
 * /projects/[slug] request is handled dynamically at request time (Next.js
 * default when `dynamicParams` isn't set to false), and the lookup below
 * calls notFound() for any slug, since none exist. As soon as
 * data/projects.js has entries, their slugs are statically generated here
 * automatically — no route code changes needed.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function findProject(slug) {
  return projects.find((project) => project.slug === slug) || null;
}

export function generateMetadata({ params }) {
  const project = findProject(params.slug);
  if (!project) {
    return { title: `Project not found | ${profile.name}` };
  }
  return {
    title: `${project.title} | ${profile.name}`,
    description: project.description || undefined,
  };
}

export default function ProjectPage({ params }) {
  const project = findProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <Container as="main" className="min-h-screen scroll-smooth pt-20">
        <Section>
          <a
            href="/#projects"
            className="mb-8 inline-block text-sm font-semibold text-accent hover:underline"
          >
            ← Back to Featured Work
          </a>
          <CaseStudy project={project} />
        </Section>
      </Container>
      <Footer />
    </>
  );
}
