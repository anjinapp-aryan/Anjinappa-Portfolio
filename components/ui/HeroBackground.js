/**
 * Subtle technical backdrop for the Hero, per docs/DESIGN-SYSTEM.md Section 9
 * ("Hero background: Lightswind free-tier background primitive, hero-only,
 * low accent opacity").
 *
 * ADAPTED from Lightswind's `registry/grid-dot-backgrounds.tsx`
 * (`GridBackground` export) — see docs/UI-REUSE-MAP.md for the full
 * evaluation of Lightswind background candidates. That source uses
 * client-side `useState`/`useEffect` + a `MutationObserver` purely to
 * detect a `.dark` class toggle and pick between a light/dark grid color.
 * This project has no light/dark toggle (dark-first only, Phase 2), so all
 * of that runtime detection was removed — this version reads the color
 * straight from the `--color-border`/`--color-accent-muted` CSS variables
 * and needs no client JS at all, making it a Server Component.
 *
 * Rejected other Lightswind background candidates: `dot-grid-background.tsx`
 * (canvas, draggable, a perpetual requestAnimationFrame inertia loop even at
 * rest — the opposite of "subtle" and not reduced-motion aware),
 * `aurora-background.tsx`/`cyber-hive-background.tsx`/`hell-background.tsx`
 * (explicitly the "excessive neon"/"cyberpunk" look the brief says to avoid).
 */
export default function HeroBackground({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), " +
            "linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, var(--color-accent-muted), transparent 70%)",
        }}
      />
    </div>
  );
}
