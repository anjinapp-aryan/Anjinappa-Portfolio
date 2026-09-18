import profile from "../../data/profile";

/**
 * Matches the original inline footer in app/page.js exactly (copyright line
 * only) — moved out to a sibling <footer> landmark instead of living inside
 * <main>, which is the correct semantic placement (brief Section 15).
 *
 * data/resume.js and data/social.js are available for this component to
 * consume, but no new links are added here: data/social.js flags LinkedIn
 * and GitHub as needsVerification, and the brief (Section 8) says render a
 * flagged URL only if safe to do so — the only "safe" (unflagged) link is
 * Facebook, which already appears in the Hero, so repeating it here would
 * be new visible content rather than a refactor. Left for a later phase to
 * decide deliberately, not added here as a side effect of shell work.
 */
export default function Footer() {
  return (
    <footer className="border-t border-border py-6 text-center text-sm text-foreground-muted">
      © {new Date().getFullYear()} {profile.name}. All rights reserved.
    </footer>
  );
}
