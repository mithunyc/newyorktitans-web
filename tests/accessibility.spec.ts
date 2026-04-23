/**
 * tests/accessibility.spec.ts
 *
 * axe-core scan on every public route. Build fails on any violation.
 * Authority: AGENTS.md Section 10, NYT pack 18.1.
 */

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/team",
  "/sponsors",
  "/join",
  "/contact",
  "/code-of-conduct",
  "/privacy",
  "/accessibility",
  "/sponsors/thanks",
  "/join/thanks",
  "/contact/thanks",
] as const;

for (const path of PUBLIC_ROUTES) {
  test(`a11y: ${path} has no axe violations`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      // WCAG 2.2 AA target. NYT pack DESIGN.md 11.11.
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      // Color contrast already enforced at the design-token level (7:1 on
      // dark). Keep axe's check too as a belt-and-braces gate.
      .analyze();

    if (results.violations.length > 0) {
      // Make CI logs actionable.
      console.error(
        `axe violations on ${path}:\n` +
          results.violations
            .map((v) => `  - [${v.id}] ${v.help} (${v.nodes.length} node(s))\n    ${v.helpUrl}`)
            .join("\n"),
      );
    }

    expect(results.violations).toEqual([]);
  });
}
