import profile from "../data/profile";
import experience from "../data/experience";
import skills from "../data/skills";
import awards from "../data/awards";
import certifications from "../data/certifications";
import social from "../data/social";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Hero from "../components/sections/Hero";
import FeaturedWork from "../components/sections/FeaturedWork";
import Labs from "../components/sections/Labs";
import AIExploration from "../components/sections/AIExploration";
import GitHubSection from "../components/sections/GitHubSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <Container as="main" className="min-h-screen scroll-smooth pt-20">
        <Hero />

        {/* About */}
        <Section id="about">
          <div className="rounded-card border border-border bg-background-surface p-8 shadow-soft">
            <h2 className="text-heading-2 font-semibold text-foreground mb-4">About Me</h2>
            <p className="text-foreground-muted">{profile.aboutSummary}</p>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills">
          <div className="rounded-card border border-border bg-background-surface p-8 shadow-soft">
            <h2 className="text-heading-2 font-semibold text-foreground mb-8 text-center">
              Technical Expertise
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((group) => (
                <div key={group.category}>
                  <h3 className="text-eyebrow uppercase text-foreground-muted mb-3">
                    {group.category}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-chip border border-border bg-background-elevated px-2.5 py-1 text-sm text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience">
          <div className="rounded-card border border-border bg-background-surface p-8 shadow-soft">
            <h2 className="text-heading-2 font-semibold text-foreground mb-6">Experience</h2>
            <ul className="space-y-8">
              {experience.map((job, i) => (
                <li key={i}>
                  <h3 className="text-heading-3 font-bold text-foreground">{job.company}</h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {job.role} · {job.period}
                  </p>
                  <p className="mt-2 text-foreground-muted">{job.description}</p>
                  {job.highlights && job.highlights.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground-muted">
                      {job.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <FeaturedWork />
        <Labs />
        <AIExploration />
        <GitHubSection />

        {/* Awards */}
        <Section id="awards">
          <div className="rounded-card border border-border bg-background-surface p-8 shadow-soft">
            <h2 className="text-heading-2 font-semibold text-foreground mb-4 text-center">
              Awards &amp; Certifications
            </h2>
            <ul className="list-disc list-inside max-w-2xl mx-auto space-y-2 text-foreground-muted">
              {awards.map((item, i) => (
                <li key={`award-${i}`}>{item}</li>
              ))}
              {certifications.map((item, i) => (
                <li key={`cert-${i}`}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact">
          <div className="rounded-card border border-border bg-background-surface p-8 shadow-soft text-center">
            <h2 className="text-heading-2 font-semibold text-foreground mb-4">Contact</h2>
            <p className="text-foreground-muted">
              {profile.location} ·{" "}
              <a href={`mailto:${social.email}`} className="text-accent hover:underline">
                {social.email}
              </a>
            </p>
            {/* Phone deliberately not rendered — see data/social.js */}
            <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-semibold">
              <a
                href={social.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                {social.linkedin.label}
              </a>
              <a
                href={social.github.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                {social.github.label}
              </a>
              <a
                href={social.youtube.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                {social.youtube.label}
              </a>
            </div>
          </div>
        </Section>
      </Container>

      <Footer />
    </>
  );
}
