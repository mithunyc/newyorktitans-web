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
});

export const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff2",
  display: "swap",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff2",
  display: "swap",
  variable: "--font-geist-mono",
  weight: "100 900",
});

/** Combined className for <html>. */
export const fontVariables = `${fraunces.variable} ${geistSans.variable}`;
