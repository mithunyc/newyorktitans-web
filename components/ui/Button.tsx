/**
 * components/ui/Button.tsx
 *
 * The locked 3-variant CTA system. No additional variants permitted.
 * Authority: NYT pack DESIGN.md 11.9.
 *
 *   primary   → filled gold on midnight text
 *   secondary → transparent with white border
 *   tertiary  → text link with animated underline
 *
 * Renders as <a> when `href` is provided, <button> otherwise.
 * Use with Next.js <Link> by passing `asChild` and wrapping a <Link>.
 */

import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps & {
  href: string;
  // For external links.
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

type ButtonProps = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: ComponentProps<"button">["onClick"];
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center font-sans font-semibold transition-[transform,background-color,border-color,color] duration-200 ease-out select-none disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "rounded-md bg-gold text-midnight hover:bg-[#C29844] active:-translate-y-px focus-visible:ring-ring focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-midnight",
  secondary:
    "rounded-md border border-white/60 bg-transparent text-white hover:border-white active:-translate-y-px focus-visible:ring-ring focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-midnight",
  tertiary:
    "relative bg-transparent p-0 text-white underline decoration-gold decoration-2 underline-offset-4 hover:decoration-white focus-visible:ring-ring focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-midnight",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-body",
  lg: "px-8 py-4 text-bodyLg",
};

function isAnchorProps(p: AnchorProps | ButtonProps): p is AnchorProps {
  return typeof (p as AnchorProps).href === "string";
}

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", size = "md", children, className } = props;

  // Tertiary ignores size padding (it's a text link, not a button).
  const sizeClass = variant === "tertiary" ? "text-body" : sizes[size];

  const classes = cn(base, variants[variant], sizeClass, className);

  if (isAnchorProps(props)) {
    const { href, external, variant: _v, size: _s, children: _c, className: _cl, ...rest } = props;

    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, onClick, ariaLabel } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
