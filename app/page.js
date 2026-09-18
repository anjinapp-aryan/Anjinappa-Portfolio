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
            <h2 className="text-heading-2 font-semibold text-foreground mb-6 text-center">
              Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="rounded-chip border border-border bg-background-elevated p-3 text-center font-medium text-foreground"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience">
          <div className="rounded-card border border-border bg-background-surface p-8 shadow-soft">
            <h2 className="text-heading-2 font-semibold text-foreground mb-6">Experience</h2>
            <ul className="space-y-6">
              {experience.map((job, i) => (
                <li key={i}>
                  <h3 className="text-heading-3 font-bold text-foreground">
                    {job.company} ({job.period})
                  </h3>
                  <p className="text-foreground-muted">
                    {job.role} | {job.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

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
              Email:{" "}
              <a href={`mailto:${social.email}`} className="text-accent hover:underline">
                {social.email}
              </a>
            </p>
            <p className="text-foreground-muted">Phone: {social.phone}</p>
          </div>
        </Section>
      </Container>

      <Footer />
    </>
  );
}
