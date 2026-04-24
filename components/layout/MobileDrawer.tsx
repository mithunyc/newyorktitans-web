/**
 * components/layout/MobileDrawer.tsx
 *
 * Client component. Mobile navigation trigger + state host.
 * The hamburger button is always server-rendered via static import in Header.
 * The framer-motion DrawerPanel is lazy-loaded on first user tap so
 * framer-motion never ships in the critical path.
 *
 * Split rationale: framer-motion was the dominant shared-JS cost contributor.
 * MobileDrawerPanel owns all animation + focus management.
 *
 * Authority: NYT pack DESIGN.md 11.10, AGENTS.md Section 9.
 */

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { List as MenuIcon } from "@phosphor-icons/react/dist/ssr";

// Lazy-load the framer-motion-heavy panel. ssr:false is safe because:
// 1. The panel is only ever rendered post-tap (never on initial load)
// 2. The hamburger trigger is in this file and is always SSR'd
// 3. AnimatePresence exit animations are preserved via hasOpened gate below
const MobileDrawerPanel = dynamic(
  () => import("./MobileDrawerPanel").then((m) => m.MobileDrawerPanel),
  { ssr: false },
);

type NavItem = { label: string; href: string };

type MobileDrawerProps = {
  items: NavItem[];
  sponsorHref: string;
  sponsorLabel?: string;
};

export function MobileDrawer({
  items,
  sponsorHref,
  sponsorLabel = "Partner With Us",
}: MobileDrawerProps) {
  const [open, setOpen] = useState(false);
  // hasOpened: once true, the Panel stays mounted forever so AnimatePresence
  // can play the exit animation. It never resets to false.
  const [hasOpened, setHasOpened] = useState(false);

  // Lock body scroll when open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  function handleOpen() {
    setHasOpened(true);
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={handleOpen}
        className="focus-visible:ring-ring inline-flex items-center justify-center rounded-md p-2 text-white focus-visible:outline-none focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-midnight md:hidden"
      >
        <MenuIcon size={28} weight="regular" />
      </button>

      {/* Panel mounts only after first tap so the framer-motion chunk is not
          fetched on page load. Once mounted it stays to preserve exit animation. */}
      {hasOpened && (
        <MobileDrawerPanel
          open={open}
          onClose={() => setOpen(false)}
          items={items}
          sponsorHref={sponsorHref}
          sponsorLabel={sponsorLabel}
        />
      )}
    </>
  );
}
