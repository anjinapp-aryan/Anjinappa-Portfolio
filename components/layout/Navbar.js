"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Container from "./Container";
import MobileNavigation from "../navigation/MobileNavigation";
import navigationItems from "../../lib/navigation";
import profile from "../../data/profile";

/**
 * Extracted/adapted from the previous inline navbar in app/page.js (Phase 0
 * finding: the interaction pattern already worked, no reason to replace it).
 * Changes made here: config-driven links (lib/navigation.js) instead of
 * markup repeated twice for desktop/mobile, real aria-expanded/aria-controls/
 * aria-label on the toggle button, lucide-react icons replacing the raw "☰"
 * glyph, and the site name demoted from <h1> to a non-heading element (the
 * page previously had two <h1>s — one here, one in the Hero — which is an
 * accessibility/SEO anti-pattern; Hero's <h1> is now the only one on the page).
 *
 * A resume link is intentionally NOT added to this navbar — data/resume.js
 * already makes that path available to any shell component that wants it,
 * but adding a new visible nav button is a visual change beyond this
 * phase's refactor-only scope (brief Section 9 only requires the shell be
 * *able* to expose it eventually, not that it does so now).
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleButtonRef = useRef(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex justify-between items-center py-3">
        <a href="#home" className="flex items-center gap-3">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={36}
            height={36}
            className="rounded-full border border-border"
          />
          <span className="font-bold text-lg text-foreground">{profile.name}</span>
        </a>

        <div className="hidden lg:flex items-center gap-6 font-medium text-foreground-muted">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors duration-fast hover:text-accent">
              {item.label}
            </a>
          ))}
        </div>

        <button
          ref={toggleButtonRef}
          type="button"
          className="text-foreground-muted focus:outline-none lg:hidden"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </Container>

      <MobileNavigation
        items={navigationItems}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={toggleButtonRef}
      />
    </nav>
  );
}
