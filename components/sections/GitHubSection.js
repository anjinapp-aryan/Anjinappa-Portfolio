import social from "../../data/social";
import Section from "../layout/Section";

/**
 * Renders only when a GitHub URL exists AND is not flagged for
 * verification. Phase 9 verified the identity two ways (the résumé lists
 * github.com/anjinapp-aryan, and the GitHub API confirms that profile is
 * "Anjinappa N" at JP Morgan), so this section now renders for the first
 * time.
 *
 * Deliberately a single profile link rather than a repository listing:
 * the repositories worth showing are already published individually, with
 * verified links, in the Featured Work and Engineering Labs sections.
 * Repeating them here — or auto-listing all 21 public repositories,
 * several of which are empty or forks — would add volume, not credibility.
 */
export default function GitHubSection() {
  if (!social.github.url || social.github.needsVerification) {
    return null;
  }

  return (
    <Section id="github">
      <div className="rounded-card border border-border bg-background-surface p-8 text-center shadow-soft">
        <h2 className="text-heading-2 font-semibold text-foreground mb-3">
          Open Source &amp; Code
        </h2>
        <p className="mx-auto max-w-2xl text-foreground-muted">
          The projects and labs above link straight to their repositories. Everything
          else — experiments in progress, smaller explorations — lives on the profile.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={social.github.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-control border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-base hover:border-accent hover:text-accent"
          >
            GitHub Profile
          </a>
          <a
            href={social.youtube.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-control border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-base hover:border-accent hover:text-accent"
          >
            YouTube
          </a>
        </div>
      </div>
    </Section>
  );
}
