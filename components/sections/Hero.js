import Image from "next/image";
import profile from "../../data/profile";
import social from "../../data/social";
import resume from "../../data/resume";
import HeroBackground from "../ui/HeroBackground";

/**
 * Rebuilt per docs/UI-REUSE-MAP.md Phase 4 entry. No Lightswind hero block
 * exists in the free-tier registry (confirmed by listing the full registry —
 * no component named/shaped as a hero section). Its text-animation
 * primitives (typing-text, shiny-text, scroll-reveal) all import
 * framer-motion, which this phase's brief explicitly says not to introduce
 * without a concrete need — a CSS `@keyframes` entrance (Tailwind's
 * `animate-fade-in-up`, defined in tailwind.config.js) covers the "richer
 * one-time entrance" the design system allows for Hero, with zero JS.
 * HeroBackground is adapted from Lightswind (see that file's own comment).
 *
 * Content is exactly the data in data/profile.js, data/social.js and
 * data/resume.js — nothing here is invented. Phase 9 updated the copy to
 * the résumé-verified role and focus, and swapped the CTA set: "View Work"
 * now points at the (now populated) #projects section, and GitHub replaces
 * Facebook, since GitHub is now verified and Facebook is a personal rather
 * than engineering link.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden text-center"
    >
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center motion-safe:animate-fade-in-up">
        <Image
          src={profile.photo}
          alt={profile.name}
          width={144}
          height={144}
          priority
          className="rounded-full shadow-glow-accent"
        />

        <h1 className="mt-8 text-4xl font-bold text-foreground md:text-display">
          {profile.name}
        </h1>
        <p className="mt-3 text-body-lg font-medium text-foreground">
          {profile.heroTitle}
        </p>
        <p className="mt-4 max-w-2xl text-foreground-muted">{profile.heroSummary}</p>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 motion-safe:animate-fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          <a
            href={resume.downloadPath}
            download
            className="rounded-control bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-colors duration-base hover:bg-accent/90"
          >
            Download Resume
          </a>
          <a
            href="#projects"
            className="rounded-control border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-base hover:border-accent hover:text-accent"
          >
            View Work
          </a>
          <a
            href={social.github.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-control border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-base hover:border-accent hover:text-accent"
          >
            {social.github.label}
          </a>
          <a
            href={social.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-control border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-base hover:border-accent hover:text-accent"
          >
            {social.linkedin.label}
          </a>
        </div>
      </div>
    </section>
  );
}
