/**
 * app/robots.ts
 *
 * robots.txt. Allow all, disallow API and form thank-you pages.
 * Authority: NYT pack Section 21.
 */

import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://newyorktitans.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/sponsors/thanks", "/join/thanks", "/contact/thanks"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
