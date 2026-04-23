/**
 * lib/tokens.ts
 *
 * Single source of truth for design tokens. Imported by:
 *   - tailwind.config.ts (so tokens are usable as Tailwind classes)
 *   - components that need raw values (rare; prefer Tailwind classes)
 *   - tests/tokens-drift.spec.ts (asserts these values match DESIGN.md)
 *
 * Authority: docs/authority/NYT_FINAL_RECONCILED_PACK.md, Section 11 (DESIGN.md).
 *
 * NEVER hardcode color or spacing values elsewhere in the codebase.
 * Drift between this file and DESIGN.md fails CI.
 */

// ---------------------------------------------------------------------------
// Color
// ---------------------------------------------------------------------------

export const colors = {
  // Foundation
  midnight: "#0A1020", // Titan Midnight — primary background
  navy: "#111A33", // Hudson Navy — secondary background, header
  graphite: "#1A1F29", // Graphite — card and surface
  white: "#F7F4EE", // City White — primary text on dark, light-section bg
  mist: "#C8CEDA", // Steel Mist — secondary text on dark, hairlines

  // Accents
  gold: "#D6A84F", // Titan Gold — primary accent (CTAs, dividers)
  blue: "#3E7BFA", // Electric Field Blue — utility (focus, validation)
} as const;

export type ColorToken = keyof typeof colors;

// ---------------------------------------------------------------------------
// Spacing scale (px → rem; 1 rem = 16 px)
// ---------------------------------------------------------------------------

export const spacing = {
  "0": "0",
  "1": "0.25rem", // 4
  "2": "0.5rem", // 8
  "3": "0.75rem", // 12
  "4": "1rem", // 16
  "6": "1.5rem", // 24
  "8": "2rem", // 32
  "12": "3rem", // 48
  "16": "4rem", // 64
  "24": "6rem", // 96
  "32": "8rem", // 128
  "36": "9rem", // 144
  "48": "12rem", // 192
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const fonts = {
  display: "var(--font-fraunces)",
  body: "var(--font-geist-sans)",
  mono: "var(--font-geist-mono)",
} as const;

export const fontSize = {
  // Fluid scales using clamp().
  hero: "clamp(2.75rem, 8vw, 5.5rem)",
  h2: "clamp(2rem, 5vw, 3.25rem)",
  h3: "clamp(1.5rem, 3vw, 2rem)",
  sub: "1.5rem",
  bodyLg: "1.125rem",
  body: "1.0625rem",
  caption: "0.875rem",
  micro: "0.75rem",
} as const;

export const lineHeight = {
  hero: "0.95",
  heading: "1.1",
  body: "1.6",
  tight: "1.2",
} as const;

export const letterSpacing = {
  hero: "-0.02em",
  heading: "-0.015em",
  body: "0",
  eyebrow: "0.08em",
} as const;

// ---------------------------------------------------------------------------
// Radii, borders, shadows
// ---------------------------------------------------------------------------

export const radii = {
  none: "0",
  sm: "8px",
  md: "12px", // CTAs
  lg: "16px", // Cards
  full: "9999px",
} as const;

export const borderWidths = {
  hairline: "1px",
  ring: "2px",
} as const;

// Shadows are deliberately minimal. Cards do NOT use drop shadows.
// This object exists to keep the system small and explicit.
export const shadows = {
  focus: `0 0 0 2px ${colors.midnight}, 0 0 0 4px ${colors.blue}`,
} as const;

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------

export const motion = {
  ease: {
    reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
    out: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  duration: {
    fast: 150,
    base: 200,
    reveal: 600,
  },
  // Reveal pattern (used by every section enter animation).
  reveal: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  staggerMs: 80,
} as const;

// ---------------------------------------------------------------------------
// Breakpoints
// ---------------------------------------------------------------------------

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

export const container = {
  maxWidth: "1200px",
  paddingX: {
    base: spacing["6"], // 24px mobile
    md: spacing["8"], // 32px tablet
    lg: spacing["12"], // 48px desktop
  },
} as const;

// ---------------------------------------------------------------------------
// Section rhythm
// ---------------------------------------------------------------------------

export const section = {
  padY: {
    base: spacing["24"], // 96 mobile
    md: spacing["36"], // 144 desktop
  },
  heroPadY: {
    base: spacing["32"], // 128 mobile
    md: spacing["48"], // 192 desktop
  },
} as const;

// ---------------------------------------------------------------------------
// Frozen export (for runtime safety; some bundlers strip `as const`).
// ---------------------------------------------------------------------------

export const tokens = Object.freeze({
  colors,
  spacing,
  fonts,
  fontSize,
  lineHeight,
  letterSpacing,
  radii,
  borderWidths,
  shadows,
  motion,
  breakpoints,
  container,
  section,
});

export default tokens;
