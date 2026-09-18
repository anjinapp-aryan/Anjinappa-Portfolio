/**
 * Reusable project detail layout. Each section is optional and renders
 * only when the corresponding field on `project` has real content — per
 * Phase 6: "ONLY render sections where real data exists. Do not create
 * fake content to fill sections."
 *
 * Architecture visualization: this phase's brief asks to search for an
 * existing diagram/visualization library before building one. No project
 * data exists yet with anything to visualize, so no diagram library was
 * evaluated or added here — doing so now would mean picking a tool against
 * a hypothetical shape rather than a real requirement (this project's own
 * Section 2/Section 14 rule: don't build speculative capability). The
 * `architecture` field is prose only for now; Phase 7's reuse search covers
 * visualization libraries for when real content needs one.
 */

const SECTIONS = [
  ["overview", "Overview"],
  ["problem", "Problem"],
  ["approach", "Engineering Approach"],
  ["architecture", "Architecture"],
  ["implementation", "Implementation"],
  ["decisions", "Engineering Decisions"],
  ["experiments", "Experiments"],
  ["results", "Results"],
  ["lessons", "Lessons Learned"],
];

export default function CaseStudy({ project }) {
  const { title, description, technologies = [], github, demo } = project;

  return (
    <article>
      <header className="mb-10">
        <h1 className="text-heading-1 font-bold text-foreground">{title}</h1>
        {description ? (
          <p className="mt-3 text-body-lg text-foreground-muted">{description}</p>
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

        {(github || demo) && (
          <div className="mt-5 flex gap-4 text-sm font-semibold">
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
      </header>

      <div className="space-y-10">
        {SECTIONS.filter(([field]) => Boolean(project[field])).map(([field, heading]) => (
          <section key={field}>
            <h2 className="text-heading-3 font-semibold text-foreground mb-3">{heading}</h2>
            <p className="text-foreground-muted whitespace-pre-line">{project[field]}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
