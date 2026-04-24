/**
 * components/layout/MobileDrawerPanel.tsx
 *
 * The framer-motion-heavy portion of the mobile drawer.
 * Lazy-loaded by MobileDrawer only after the user first taps the
 * hamburger trigger, so framer-motion never ships in the critical path.
 *
 * Authority: NYT pack DESIGN.md 11.10, AGENTS.md Section 9.
 */

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X as CloseIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

type NavItem = { label: string; href: string };

type MobileDrawerPanelProps = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  sponsorHref: string;
  sponsorLabel: string;
};

export function MobileDrawerPanel({
  open,
  onClose,
  items,
  sponsorHref,
  sponsorLabel,
}: MobileDrawerPanelProps) {
  const reduced = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Move focus into the drawer on open for keyboard users.
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-midnight/80 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduced ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduced ? { x: "100%" } : { x: "100%" }}
            transition={{
              duration: reduced ? 0 : 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "fixed right-0 top-0 z-50 flex h-[100dvh] w-full max-w-sm flex-col bg-navy text-white shadow-none md:hidden",
            )}
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-display text-sub">Menu</span>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="focus-visible:ring-ring inline-flex items-center justify-center rounded-md p-2 text-white focus-visible:outline-none focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                <CloseIcon size={24} weight="regular" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-6 pb-6">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="focus-visible:ring-ring rounded-md py-3 font-display text-h3 text-white hover:text-gold focus-visible:outline-none focus-visible:ring-blue"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-8">
                <Button href={sponsorHref} variant="primary" size="lg" className="w-full">
                  {sponsorLabel}
                </Button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
