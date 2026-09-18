"use client";

import { useEffect } from "react";

/**
 * Custom-built per docs/UI-REUSE-MAP.md — no Lightswind mobile-nav candidate
 * fit without pulling in gsap/framer-motion (banned this phase) or shipping
 * a decorative full-screen reveal effect not requested here.
 *
 * Renders only while `open`, so there is nothing focusable in the DOM while
 * closed (no separate aria-hidden toggling needed). Escape closes the menu
 * and returns focus to the toggle button that opened it.
 */
export default function MobileNavigation({ items, open, onClose, triggerRef }) {
  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        triggerRef?.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      id="mobile-navigation"
      role="menu"
      aria-label="Mobile navigation"
      className="md:hidden bg-white shadow px-6 py-4 space-y-2"
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          role="menuitem"
          className="block hover:text-blue-600"
          onClick={onClose}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
