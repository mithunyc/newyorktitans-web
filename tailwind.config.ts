/**
 * tailwind.config.ts
 *
 * Tailwind theme is derived from lib/tokens.ts. Do NOT add color or spacing
 * values directly here. Add them to lib/tokens.ts first.
 *
 * Authority: AGENTS.md Section 6, NYT pack Section 11 (DESIGN.md).
 */

import type { Config } from "tailwindcss";
import {
  colors,
  spacing,
  fontSize,
  lineHeight,
  letterSpacing,
  radii,
  borderWidths,
  breakpoints,
  container,
} from "./lib/tokens";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.{mdx,md}"],
  // Force dark foundation as the default; light is opt-in per section.
  darkMode: "class",
  theme: {
    // Replace, not extend — the system is intentionally tight.
    screens: {
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      midnight: colors.midnight,
      navy: colors.navy,
      graphite: colors.graphite,
      white: colors.white,
      mist: colors.mist,
      gold: colors.gold,
      blue: colors.blue,
    },
    spacing,
    fontSize: {
      micro: [fontSize.micro, { lineHeight: lineHeight.body }],
      caption: [fontSize.caption, { lineHeight: lineHeight.body }],
      body: [fontSize.body, { lineHeight: lineHeight.body }],
      bodyLg: [fontSize.bodyLg, { lineHeight: lineHeight.body }],
      sub: [fontSize.sub, { lineHeight: lineHeight.heading }],
      h3: [fontSize.h3, { lineHeight: lineHeight.heading, letterSpacing: letterSpacing.heading }],
      h2: [fontSize.h2, { lineHeight: lineHeight.heading, letterSpacing: letterSpacing.heading }],
      hero: [fontSize.hero, { lineHeight: lineHeight.hero, letterSpacing: letterSpacing.hero }],
    },
    fontFamily: {
      display: ["var(--font-fraunces)", "Georgia", "serif"],
      sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
    },
    letterSpacing: {
      hero: letterSpacing.hero,
      heading: letterSpacing.heading,
      body: letterSpacing.body,
      eyebrow: letterSpacing.eyebrow,
    },
    lineHeight: {
      hero: lineHeight.hero,
      heading: lineHeight.heading,
      body: lineHeight.body,
      tight: lineHeight.tight,
    },
    borderRadius: {
      none: radii.none,
      sm: radii.sm,
      md: radii.md,
      lg: radii.lg,
      full: radii.full,
    },
    borderWidth: {
      DEFAULT: borderWidths.hairline,
      hairline: borderWidths.hairline,
      ring: borderWidths.ring,
    },
    extend: {
      maxWidth: {
        container: container.maxWidth,
        prose: "65ch",
      },
      // The single approved card style.
      boxShadow: {
        none: "none",
      },
      // Honor prefers-reduced-motion at the framework level by giving us a
      // class to target. See lib/motion.ts for the runtime hook.
      animation: {
        none: "none",
      },
    },
  },
  plugins: [],
};

export default config;
