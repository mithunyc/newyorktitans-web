/**
 * tests/visual-regression.spec.ts
 *
 * Six baselines: Home, Sponsors, Join × {375px mobile, 1280px desktop}.
 * Authority: D-031, NYT pack 18.1.
 *
 * Update baselines intentionally with: pnpm test:visual:update
 * Never update baselines silently; any baseline change requires PR review
 * with screenshot diffs in the PR description.
 */

import { test, expect } from "@playwright/test";

const ROUTES = [
  { name: "home", path: "/" },
  { name: "sponsors", path: "/sponsors" },
  { name: "join", path: "/join" },
] as const;

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1280, height: 800 },
] as const;

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    test(`${route.name} @ ${vp.name} (${vp.width}px) matches baseline`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(route.path, { waitUntil: "networkidle" });

      // Wait for fonts to load (Fraunces + Geist) so screenshots are stable.
      await page.evaluate(() => document.fonts.ready);

      // Disable any remaining animations defensively. The Playwright config
      // already sets `reducedMotion: "reduce"` and `animations: "disabled"`.
      await page.addStyleTag({
        content: `*, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }`,
      });

      await expect(page).toHaveScreenshot(`${route.name}-${vp.name}.png`, {
        fullPage: true,
      });
    });
  }
}
