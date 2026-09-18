/**
 * Navigation configuration, single source of truth for Navbar + MobileNavigation.
 *
 * Only destinations that currently exist as real sections in app/page.js are
 * listed here. When a new section (Projects, Architecture, Labs, ...) gets
 * real content in a later phase, add one entry here — Navbar/MobileNavigation
 * render from this array and do not need to change.
 */
const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

export default navigationItems;
