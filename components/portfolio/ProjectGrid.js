"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";

/**
 * Category filter + responsive grid. No Lightswind/OSS masonry-with-filter
 * block was found to be a genuine fit (see docs/UI-REUSE-MAP.md Phase 5
 * entry) — this is plain array filtering + a CSS grid, not a rebuilt
 * masonry engine, kept intentionally small since there's no real project
 * data yet to prove out a heavier approach against.
 *
 * Client Component only because of the filter's `useState`; the cards
 * themselves (ProjectCard) have no interactivity of their own.
 */
export default function ProjectGrid({ projects }) {
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((project) => (project.categories || []).forEach((category) => set.add(category)));
    return Array.from(set);
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState(null);

  const visibleProjects = activeCategory
    ? projects.filter((project) => (project.categories || []).includes(activeCategory))
    : projects;

  return (
    <div>
      {categories.length > 1 ? (
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by category">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
            className={`rounded-chip border px-3 py-1.5 text-sm font-medium transition-colors duration-fast ${
              activeCategory === null
                ? "border-accent text-accent"
                : "border-border text-foreground-muted hover:text-accent"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-chip border px-3 py-1.5 text-sm font-medium transition-colors duration-fast ${
                activeCategory === category
                  ? "border-accent text-accent"
                  : "border-border text-foreground-muted hover:text-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
