import social from "../../data/social";
import Section from "../layout/Section";

/**
 * data/social.js has github.url: null (needsVerification: true) — no
 * GitHub/open-source link exists anywhere in the repository's source
 * content (Phase 0 finding, still true). Renders nothing until a real
 * URL is added and the needsVerification flag is deliberately cleared;
 * a flagged-but-unset URL is not "safe to render" per the data principle
 * established in Phase 1/Phase 3 (data/social.js, docs/DATA-MODEL.md).
 */
export default function GitHubSection() {
  if (!social.github.url || social.github.needsVerification) {
    return null;
  }

  return (
    <Section id="github">
      <div className="rounded-card border border-border bg-background-surface p-8 shadow-soft text-center">
        <h2 className="text-heading-2 font-semibold text-foreground mb-3">
          GitHub &amp; Open Source
        </h2>
        <a href={social.github.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
          {social.github.url}
        </a>
      </div>
    </Section>
  );
}
