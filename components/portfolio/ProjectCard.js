/**
 * BUILD, informed by (not vendored from) Lightswind's registry/card.tsx —
 * that file is a thin `hoverable`/`bordered`/`compact` wrapper around a
 * shadcn-style `--card`/`--card-foreground` CSS variable pair that doesn't
 * exist in this project's token system. Adapting it 1:1 would mean running
 * two parallel color-token systems, which this phase's brief explicitly
 * forbids ("Do NOT introduce a second color system"). This component keeps
 * the same shape/spirit (a bordered surface, optional hover lift) but is
 * wired directly to this project's own tokens (rounded-card, shadow-soft,
 * shadow-glow-accent, border-border, background-surface).
 *
 * No project data exists yet (data/projects.js is empty) — this component
 * is exercised by nothing in production until real project data is added,
 * but is built now so Phase 6 (case studies) and any future data can
 * render immediately without new component work.
 */
// Narrative fields that make a /projects/[slug] page worth linking to. A
// project with none of them (e.g. one that only has a title, stack and
// links) would render a case-study page with nothing on it, so the card
// doesn't offer the link. Labs and AI entries reuse this component and
// have no slug-backed route at all, hence the `href` guard too.
const CASE_STUDY_FIELDS = [
  "overview",
  "problem",
  "approach",
  "architecture",
  "implementation",
  "decisions",
  "results",
  "lessons",
];

export default function ProjectCard({ project, href }) {
  const { title, description, technologies = [], github, demo, image } = project;
  const hasCaseStudy = CASE_STUDY_FIELDS.some((field) => Boolean(project[field]));

  return (
    <article className="group rounded-card border border-border bg-background-surface p-6 shadow-soft transition-all duration-base hover:-translate-y-0.5 hover:shadow-glow-accent">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          className="mb-4 aspect-video w-full rounded-chip object-cover"
        />
      ) : null}

      <h3 className="text-heading-3 font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-foreground-muted">{description}</p>
      ) : null}

      {technologies.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-chip border border-border px-2.5 py-1 text-xs font-medium text-foreground-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      {(github || demo || (href && hasCaseStudy)) && (
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
          {href && hasCaseStudy ? (
            <a href={href} className="text-accent hover:underline">
              Case study →
            </a>
          ) : null}
          {github ? (
            <a href={github} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              GitHub
            </a>
          ) : null}
          {demo ? (
            <a href={demo} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              Live Demo
            </a>
          ) : null}
        </div>
      )}
    </article>
  );
}
