/**
 * vitest.config.ts
 *
 * Unit-test runner. Used for token drift checks and any pure-function tests.
 * Component and page testing happens via Playwright (visual + a11y).
 */

import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts", "lib/**/*.test.ts"],
    // Playwright specs live alongside but use a different runner.
    exclude: ["**/*.spec.ts", "node_modules", ".next"],
    globals: false,
    reporters: process.env.CI ? ["default", "github-actions"] : ["default"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@/lib": path.resolve(__dirname, "lib"),
      "@/components": path.resolve(__dirname, "components"),
      "@/content": path.resolve(__dirname, "content"),
      "@/app": path.resolve(__dirname, "app"),
    },
  },
});
