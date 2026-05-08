/**
 * lib/metadata.ts
 *
 * Shared metadata helpers. Ensures OG/Twitter image URLs always resolve
 * to the canonical production domain, regardless of the deployment host
 * (Vercel preview, localhost, etc.).
 *
 * Authority: NYT pack Section 7.2 (OG/social preview images),
 *            AGENTS.md Section 10 (deployment model, canonical domain).
 */

/** Canonical production origin — never changes per deployment. */
export const SITE_URL = "https://www.newyorktitans.org";

/**
 * Returns an absolute URL for a site-relative path, anchored to the
 * canonical production domain. Use for og:image / twitter:image values
 * so crawlers always see the production URL, not a Vercel preview host.
 *
 * @param path - site-relative path starting with `/`, e.g. `/images/launch/team/hero.jpg`
 */
export function ogImageUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
