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
import { fontVariables } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://newyorktitans.org";
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
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "New York Titans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New York Titans",
    description: "Cricket. Character. Community.",
    images: ["/og/default.png"],
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
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
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
            Only loaded in production. */}
        {process.env.NODE_ENV === "production" && PLAUSIBLE_DOMAIN && (
          <Script
            src="https://plausible.io/js/script.js"
            data-domain={PLAUSIBLE_DOMAIN}
            strategy="afterInteractive"
            defer
          />
        )}
      </body>
    </html>
  );
}
