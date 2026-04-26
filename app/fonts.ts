/**
 * app/fonts.ts
 *
 * Self-hosted Fraunces (display) + Geist (body) fonts.
 * Fraunces loaded via next/font/google. Geist loaded via next/font/local
 * because next/font/google does not export Geist in Next.js 14.x.
 * Latin subset, swap display for fast first paint.
 *
 * Authority: AGENTS.md Section 3, NYT pack DESIGN.md 11.3.
 */

import { Fraunces } from "next/font/google";
import localFont from "next/font/local";

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  // opsz (optical-size) axis improves headline rendering at large sizes.
  // SOFT axis removed: it inflated the woff2 from ~40 kB to 117.9 kB with
  // no perceptible visual gain at headline sizes. Removal is the LCP fix.
  axes: ["opsz"],
  // preload enabled (default): Next.js injects a <link rel="preload"> in
  // the HTML head so the browser discovers Fraunces before CSS parsing.
  // This moves font discovery ~1-2 RTTs earlier under 4G throttling,
  // targeting the LCP repaint on text-heavy routes (Sponsors H1) and the
  // composite LCP on the Home hero (text + image).
  // Geist Sans stays at preload:false to avoid bandwidth contention with
  // Fraunces on the critical path.
});

export const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff2",
  display: "swap",
  variable: "--font-geist-sans",
  weight: "100 900",
  preload: false,
});

// geistMono removed: it was exported but never imported anywhere.
// The CSS variable was never applied to the <html> element, so the browser
// never downloaded the woff2. Dead code eliminated per AGENTS.md Section 17.

/** Combined className for <html>. */
export const fontVariables = `${fraunces.variable} ${geistSans.variable}`;
