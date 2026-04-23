/**
 * components/ui/Section.tsx
 *
 * Page section wrapper. Handles vertical rhythm per DESIGN.md 11.4.
 *   - default: 96px mobile, 144px desktop
 *   - hero:    128px mobile, 192px desktop
 *
 * Use the `surface` prop to switch between dark (default) and light editorial bands.
 */

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  variant?: "default" | "hero";
  surface?: "midnight" | "navy" | "graphite" | "white";
  children: ReactNode;
  className?: string;
  /** ARIA label for the section, when no visible heading is in the section. */
  ariaLabel?: string;
};

const surfaceClasses = {
  midnight: "bg-midnight text-white",
  navy: "bg-navy text-white",
  graphite: "bg-graphite text-white",
  white: "bg-white text-midnight",
};

const padClasses = {
  default: "py-24 md:py-36",
  hero: "py-32 md:py-48",
};

export function Section({
  id,
  variant = "default",
  surface = "midnight",
  children,
  className,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(surfaceClasses[surface], padClasses[variant], className)}
    >
      {children}
    </section>
  );
}
