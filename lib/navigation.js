/**
 * Navigation configuration, single source of truth for Navbar + MobileNavigation.
 *
 * Only destinations that currently exist as real sections in app/page.js are
 * listed here. Phase 9 added #projects and #labs because data/projects.js
 * and data/labs.js now hold verified content, so those sections actually
 * render. #ai and #github are still absent: data/ai.js is empty by design,
 * and the GitHub section is a single link rather than a nav destination.
 */
const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Labs", href: "#labs" },
  { label: "Skills", href: "#skills" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

export default navigationItems;
