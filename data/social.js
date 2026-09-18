/**
 * Social / contact links.
 *
 * Phase 9 verification:
 * - LinkedIn: explicitly confirmed by the user and matching the résumé
 *   (`linkedin.com/in/Anjinappan`). LinkedIn returns HTTP 999 to automated
 *   requests, which is its anti-bot response, not a missing page — the URL
 *   is user-confirmed, so it is treated as verified.
 * - GitHub: verified two ways — the résumé lists `github.com/anjinapp-aryan`,
 *   and the GitHub API confirms that profile is "Anjinappa N", company
 *   "JP Morgan pvt ltd", location India. It is also the account this
 *   repository is hosted under.
 * - YouTube: `@AskAIwithAryan` resolves (HTTP 200); the channel's own title
 *   renders as "Learn AI with Aryan" while the résumé calls it "Ask AI with
 *   Aryan" — the handle URL is used and the label kept neutral.
 *
 * `phone` is retained here because it is real and on the résumé, but it is
 * deliberately NOT rendered anywhere on the public site (Phase 9 privacy
 * rule: don't publish phone numbers). `email` is rendered because it was
 * already intentionally public in the existing portfolio.
 *
 * `facebook` is retained but no longer surfaced in the Hero — it is a
 * personal social account, not part of the engineering profile the résumé
 * presents (LinkedIn / GitHub / portfolio / YouTube).
 */
const social = {
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/anjinappan/",
    needsVerification: false,
  },
  github: {
    label: "GitHub",
    url: "https://github.com/anjinapp-aryan",
    needsVerification: false,
  },
  youtube: {
    label: "YouTube",
    url: "https://www.youtube.com/@AskAIwithAryan",
    needsVerification: false,
  },
  facebook: {
    label: "Facebook",
    url: "https://www.facebook.com/anjinappa.ansi",
    needsVerification: false,
  },
  email: "anjinapp.n@gmail.com",
  phone: "+91 9591931497",
};

export default social;
