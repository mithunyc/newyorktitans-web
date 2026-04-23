/**
 * components/ui/Image.tsx
 *
 * Thin wrapper around next/image that ENFORCES alt text via the type system.
 * Direct imports of `next/image` are banned by .eslintrc.json so the codebase
 * can never accidentally ship an image without alt.
 *
 * Decorative images: pass `alt=""` AND `decorative={true}` to make intent
 * explicit (and to prevent reviewers from thinking the alt is just missing).
 *
 * Authority: AGENTS.md Section 10, NYT pack DESIGN.md 11.11.
 */

/* eslint-disable no-restricted-imports */
import NextImage, { type ImageProps as NextImageProps } from "next/image";
/* eslint-enable no-restricted-imports */

import { cn } from "@/lib/cn";

type InformativeImageProps = Omit<NextImageProps, "alt"> & {
  alt: string;
  decorative?: false;
};

type DecorativeImageProps = Omit<NextImageProps, "alt"> & {
  alt: "";
  decorative: true;
};

export type ImageProps = InformativeImageProps | DecorativeImageProps;

export function Image(props: ImageProps) {
  const { className, decorative, alt, ...rest } = props;

  if (decorative) {
    return <NextImage {...rest} alt="" aria-hidden="true" className={cn(className)} />;
  }

  if (!alt || alt.trim().length === 0) {
    // Should be unreachable due to types, but guard at runtime in dev.
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "Image: informative images require non-empty alt text. " +
          'If the image is decorative, pass alt="" AND decorative={true}.',
      );
    }
  }

  return <NextImage {...rest} alt={alt} className={cn(className)} />;
}
