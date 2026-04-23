/**
 * components/ui/RuleGold.tsx
 *
 * Thin gold divider, used as a quiet section accent above eyebrows or
 * mission strips. Per DESIGN.md, gold is reserved for premium emphasis;
 * use sparingly.
 */

import { cn } from "@/lib/cn";

type RuleGoldProps = {
  className?: string;
  /** Visible width of the rule. Defaults to 48px. */
  width?: "sm" | "md" | "lg";
};

const widths = {
  sm: "w-8",
  md: "w-12",
  lg: "w-16",
};

export function RuleGold({ className, width = "md" }: RuleGoldProps) {
  return <span aria-hidden="true" className={cn("h-px block bg-gold", widths[width], className)} />;
}
