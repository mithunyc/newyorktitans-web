/**
 * app/layout.tsx
 *
 * Root layout. Loads fonts, sets default metadata, wires Header + Footer,
 * and includes the keyboard skip link.
 *
 * Authority: NYT pack Section 11 (DESIGN.md), Section 21 (SEO).
 */

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_URL, ogImageUrl } from "@/lib/metadata";
import { fontVariables } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "newyorktitans.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "New York Titans — Cricket. Character. Community.",
    template: "%s — New York Titans",
  },
  description:
    "New York Titans is building more than a cricket team. A home for cricket, character, leadership, and community in New York.",
  applicationName: "New York Titans",
  authors: [{ name: "New York Titans" }],
  keywords: [
    "New York Titans",
    "cricket",
    "New York cricket club",
    "youth cricket",
    "community cricket",
  ],
  openGraph: {
    type: "website",
    siteName: "New York Titans",
    title: "New York Titans — Cricket. Character. Community.",
    description: "A nonprofit/community-first cricket organization in New York.",
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: ogImageUrl("/images/launch/team/home-hero-team-2025.jpg"),
        width: 2200,
        height: 1650,
        alt: "New York Titans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New York Titans",
    description: "Cricket. Character. Community.",
    images: [ogImageUrl("/images/launch/team/home-hero-team-2025.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
  // schema.org structured data is added per-page in generateMetadata().
};

export const viewport: Viewport = {
  themeColor: "#0A1020",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Allow user-zoom; never disable for accessibility.
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      {/*
       * Manual Fraunces font preload.
       *
       * Next.js 14 App Router does NOT auto-emit <link rel="preload" as="font">
       * for Google variable fonts with custom axes (opsz). The .p. suffix file
       * exists but the preload link is silently omitted from the HTML head.
       *
       * Without this preload, the browser only discovers Fraunces after CSS
       * parsing — adding ~300-500ms to LCP under 4G throttling, which is the
       * proven dominant blocker for both Home (3031ms) and Sponsors (2732ms).
       *
       * The hash is content-addressed and stable across builds as long as the
       * fonts.ts Fraunces config (subsets, axes, display) doesn't change.
       * If fonts.ts changes, rebuild and update the hash here.
       *
       * Authority: NYT pack 16.5 (LCP ≤ 2.5s), AGENTS.md Section 11.
       */}
      <head>
        <link
          rel="preload"
          href="/_next/static/media/6e8c7cb283336a9d-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <Footer
          socials={
            {
              // Populated from content/site.json once available.
            }
          }
        />

        {/* Plausible — privacy-first, cookie-free analytics.
            Only loaded in production. lazyOnload defers until browser idle
            time so no <link rel="preload"> hint is emitted for the external
            plausible.io script during the critical rendering path. */}
        {process.env.NODE_ENV === "production" && PLAUSIBLE_DOMAIN && (
          <Script
            src="https://plausible.io/js/script.js"
            data-domain={PLAUSIBLE_DOMAIN}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
