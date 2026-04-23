/**
 * playwright.config.ts
 *
 * Two projects:
 *   - visual-regression: 6 baselines (Home, Sponsors, Join × 375px, 1280px)
 *   - accessibility: axe-core scan on every public route
 *
 * Authority: D-031, NYT pack 18.1.
 */

import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT ?? "3000";
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  // Fail CI fast if a snapshot is missing — we want intentional updates.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  fullyParallel: true,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    // Visual regression: 0.2% pixel difference tolerance is intentional.
    // Tighter than this fails on antialiasing noise; looser hides drift.
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.002,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    colorScheme: "dark",
  },
  webServer: {
    command: "pnpm start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      RESEND_API_KEY: "ci-stub",
      NEXT_PUBLIC_SITE_URL: baseURL,
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "newyorktitans.org",
    },
  },
  projects: [
    {
      name: "visual-regression",
      testMatch: /visual-regression\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "accessibility",
      testMatch: /accessibility\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
