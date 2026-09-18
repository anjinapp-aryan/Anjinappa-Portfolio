import site from "../data/site";
import projects from "../data/projects";

/**
 * Includes the homepage plus one entry per real project slug — currently
 * none, since data/projects.js is empty. Will pick up new slugs
 * automatically once project data exists; no changes needed here.
 */
export default function sitemap() {
  const routes = [
    {
      url: site.url,
      lastModified: new Date(),
    },
  ];

  const projectRoutes = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...projectRoutes];
}
