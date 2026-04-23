/**
 * components/ui/Eyebrow.tsx
 *
 * Small-caps label that sits above headings. Per DESIGN.md, Titan Gold
 * eyebrows are reserved for premium emphasis (hero, sponsor block).
 * Mist eyebrows are the default for general structure.
 */

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  tone?: "gold" | "mist";
  className?: string;
};

const toneClasses = {
  gold: "text-gold",
  mist: "text-mist",
};

export function Eyebrow({ children, tone = "mist", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-micro font-sans font-medium uppercase tracking-eyebrow",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}
