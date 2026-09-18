/**
 * Reusable section layout primitive: centralizes vertical spacing using the
 * Phase 2 section-y tokens. Built now as shell infrastructure per Phase 3
 * Section 7, but NOT yet applied to the six existing content sections in
 * app/page.js (About/Skills/Experience/Awards/Contact/Hero) — swapping their
 * current py-12 spacing for section-y (6rem/96px) would visibly change
 * their layout, which is explicitly out of scope for this phase ("do not
 * redesign the existing sections yet"). It is ready for Phase 4+ sections
 * (Hero rebuild, Featured Portfolio, ...) to consume directly.
 */
export default function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`py-section-y-sm md:py-section-y ${className}`.trim()}>
      {children}
    </section>
  );
}
