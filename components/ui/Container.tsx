/**
 * components/ui/Container.tsx
 *
 * One container, used everywhere. 1200px max, padded responsively.
 * Authority: NYT pack DESIGN.md 11.4, BUILD_SPEC 10.4.
 */

import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Container({ as: Tag = "div", children, className }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-container px-6 md:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
