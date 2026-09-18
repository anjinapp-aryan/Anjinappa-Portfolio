
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Design tokens defined in docs/DESIGN-SYSTEM.md. CSS-variable backed
      // so they can later pick up Lightswind's own theme tokens (Phase 3+)
      // without renaming classes here. Not yet referenced by any component —
      // additive only, no visual change until Phase 3 application shell wires
      // them in.
      colors: {
        background: {
          DEFAULT: "var(--color-background)",
          surface: "var(--color-surface)",
          elevated: "var(--color-surface-elevated)",
        },
        foreground: {
          DEFAULT: "var(--color-foreground)",
          muted: "var(--color-foreground-muted)",
        },
        border: {
          DEFAULT: "var(--color-border)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          muted: "var(--color-accent-muted)",
        },
        "accent-secondary": {
          DEFAULT: "var(--color-accent-secondary)",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "heading-1": ["2.5rem", { lineHeight: "1.15", fontWeight: "700" }],
        "heading-2": ["1.875rem", { lineHeight: "1.25", fontWeight: "600" }],
        "heading-3": ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        eyebrow: [
          "0.75rem",
          { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.08em" },
        ],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0, 0, 0, 0.24), 0 8px 24px rgba(0, 0, 0, 0.24)",
        "glow-accent": "0 0 0 1px var(--color-accent-muted), 0 8px 32px -8px var(--color-accent-muted)",
      },
      spacing: {
        "section-y": "6rem",
        "section-y-sm": "4rem",
      },
      maxWidth: {
        container: "72rem",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
}
