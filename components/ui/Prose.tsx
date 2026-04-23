/**
 * components/ui/Prose.tsx
 *
 * Wraps MDX (or any rich content) with the Tailwind typographic defaults
 * specified in DESIGN.md 11.3. No dependency on @tailwindcss/typography —
 * we control every element with explicit classes so there's no surprise.
 *
 * Usage:
 *   <Prose>
 *     <MDXRemote source={mdx} />
 *   </Prose>
 */

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  className?: string;
  /** Defaults to readable max-prose width. Pass `wide` for full-width. */
  width?: "prose" | "wide";
};

export function Prose({ children, className, width = "prose" }: ProseProps) {
  return (
    <div
      className={cn(
        // Layout
        width === "prose" ? "max-w-prose" : "max-w-none",

        // Body text
        "text-body leading-body text-mist",

        // Spacing
        "[&>*+*]:mt-6",

        // Headings
        "[&_h1]:mb-6 [&_h1]:mt-12 [&_h1]:font-display [&_h1]:text-h2 [&_h1]:font-semibold [&_h1]:leading-heading [&_h1]:tracking-heading [&_h1]:text-white",
        "[&_h2]:mb-6 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-h2 [&_h2]:font-semibold [&_h2]:leading-heading [&_h2]:tracking-heading [&_h2]:text-white",
        "[&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-display [&_h3]:text-h3 [&_h3]:font-medium [&_h3]:leading-heading [&_h3]:tracking-heading [&_h3]:text-white",

        // Body and inline
        "[&_p]:max-w-prose [&_p]:text-body [&_p]:leading-body [&_p]:text-mist",
        "[&_strong]:font-semibold [&_strong]:text-white",
        "[&_em]:italic",
        "[&_a]:text-white [&_a]:underline [&_a]:decoration-gold [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:decoration-white",

        // Lists
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-gold",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:marker:text-gold",
        "[&_li]:my-2 [&_li]:text-body [&_li]:leading-body [&_li]:text-mist",

        // Quotes
        "[&_blockquote]:border-l-2 [&_blockquote]:border-gold [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-white",

        // Horizontal rule
        "[&_hr]:my-12 [&_hr]:border-t [&_hr]:border-mist/15",

        // Code (rare)
        "[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:bg-graphite [&_code]:font-mono [&_code]:text-caption",

        className,
      )}
    >
      {children}
    </div>
  );
}
