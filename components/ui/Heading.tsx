/**
 * components/ui/Heading.tsx
 *
 * Headings on the locked typographic scale from DESIGN.md 11.3.
 * The `level` prop controls the rendered HTML tag.
 * The `size` prop controls the visual scale and is independent of level
 * (so a visually-small H2 is possible when semantically required).
 *
 * One H1 per page. Enforce by code review.
 */

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Level = 1 | 2 | 3 | 4;
type Size = "hero" | "h2" | "h3" | "sub";

type HeadingProps = {
  level: Level;
  size?: Size;
  children: ReactNode;
  className?: string;
  id?: string;
  /** Optional balanced text wrapping for shorter headings. */
  balance?: boolean;
};

const sizeClasses: Record<Size, string> = {
  hero: "text-hero font-display font-semibold tracking-hero leading-hero",
  h2: "text-h2 font-display font-semibold tracking-heading leading-heading",
  h3: "text-h3 font-display font-medium tracking-heading leading-heading",
  sub: "text-sub font-sans font-medium leading-heading",
};

export function Heading({
  level,
  size,
  children,
  className,
  id,
  balance = true,
}: HeadingProps) {
  // Default size mirrors level when not specified.
  const resolvedSize: Size =
    size ?? (level === 1 ? "hero" : level === 2 ? "h2" : level === 3 ? "h3" : "sub");

  const Tag = `h${level}` as const;

  return (
    <Tag
      id={id}
      className={cn(
        sizeClasses[resolvedSize],
        balance && "[text-wrap:balance]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
