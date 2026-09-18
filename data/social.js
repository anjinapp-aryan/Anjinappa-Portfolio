/**
 * Social / contact links.
 * Source: extracted verbatim from app/page.js (Phase 0 audit).
 *
 * needsVerification: true marks values that are known/suspected to be
 * incorrect or incomplete. Do not "fix" these by guessing — confirm with
 * the user first, then update the value and flip the flag to false.
 */
const social = {
  linkedin: {
    url: "https://www.linkedin.com/Anjinappa",
    needsVerification: true,
    note:
      "Malformed — not a standard linkedin.com/in/<handle> path. " +
      "Preserved as originally authored; requires the correct profile URL " +
      "from the user before publishing.",
  },
  facebook: {
    url: "https://www.facebook.com/anjinappa.ansi",
    needsVerification: false,
  },
  github: {
    url: null,
    needsVerification: true,
    note: "No GitHub username/URL exists anywhere in current content. Requires user input.",
  },
  email: "anjinapp.n@gmail.com",
  phone: "+91 9591931497",
};

export default social;
