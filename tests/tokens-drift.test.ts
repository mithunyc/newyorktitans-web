/**
 * tests/tokens-drift.test.ts
 *
 * Asserts that lib/tokens.ts values match the DESIGN.md / reconciled-pack
 * specification. Drift between code and documentation is a CI failure.
 *
 * Authority: NYT pack Section 18.1 ("Token-vs-DESIGN.md drift check").
 *
 * If a token value legitimately needs to change:
 *   1. Update lib/tokens.ts.
 *   2. Update the corresponding DESIGN.md / reconciled-pack section.
 *   3. Update this test.
 *   4. Add a DECISION_LOG entry explaining the change.
 */

import { describe, it, expect } from "vitest";
import {
  colors,
  spacing,
  fontSize,
  letterSpacing,
  lineHeight,
  radii,
  motion,
  container,
} from "../lib/tokens";

describe("design tokens match the reconciled pack DESIGN.md", () => {
  describe("colors (Section 11.5)", () => {
    it("Titan Midnight", () => expect(colors.midnight).toBe("#0A1020"));
    it("Hudson Navy", () => expect(colors.navy).toBe("#111A33"));
    it("Graphite", () => expect(colors.graphite).toBe("#1A1F29"));
    it("City White", () => expect(colors.white).toBe("#F7F4EE"));
    it("Steel Mist", () => expect(colors.mist).toBe("#C8CEDA"));
    it("Titan Gold", () => expect(colors.gold).toBe("#D6A84F"));
    it("Electric Field Blue", () => expect(colors.blue).toBe("#3E7BFA"));
  });

  describe("spacing scale (Section 11.4)", () => {
    it("uses the documented px ladder", () => {
      // Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (+ 144, 192 for sections)
      expect(spacing["1"]).toBe("0.25rem"); // 4
      expect(spacing["2"]).toBe("0.5rem"); // 8
      expect(spacing["3"]).toBe("0.75rem"); // 12
      expect(spacing["4"]).toBe("1rem"); // 16
      expect(spacing["6"]).toBe("1.5rem"); // 24
      expect(spacing["8"]).toBe("2rem"); // 32
      expect(spacing["12"]).toBe("3rem"); // 48
      expect(spacing["16"]).toBe("4rem"); // 64
      expect(spacing["24"]).toBe("6rem"); // 96
      expect(spacing["32"]).toBe("8rem"); // 128
      expect(spacing["36"]).toBe("9rem"); // 144
      expect(spacing["48"]).toBe("12rem"); // 192
    });
  });

  describe("typography scale (Section 11.3)", () => {
    it("hero uses clamp(2.75rem, 8vw, 5.5rem)", () =>
      expect(fontSize.hero).toBe("clamp(2.75rem, 8vw, 5.5rem)"));
    it("h2 uses clamp(2rem, 5vw, 3.25rem)", () =>
      expect(fontSize.h2).toBe("clamp(2rem, 5vw, 3.25rem)"));
    it("body is 1.0625rem", () => expect(fontSize.body).toBe("1.0625rem"));
    it("bodyLg is 1.125rem", () => expect(fontSize.bodyLg).toBe("1.125rem"));
    it("caption is 0.875rem", () => expect(fontSize.caption).toBe("0.875rem"));

    it("hero tracking is -0.02em", () => expect(letterSpacing.hero).toBe("-0.02em"));
    it("heading tracking is -0.015em", () => expect(letterSpacing.heading).toBe("-0.015em"));

    it("hero leading is 0.95", () => expect(lineHeight.hero).toBe("0.95"));
    it("body leading is 1.6", () => expect(lineHeight.body).toBe("1.6"));
  });

  describe("radii (Section 11.8, 11.9)", () => {
    it("CTA radius is 12px", () => expect(radii.md).toBe("12px"));
    it("Card radius is 16px", () => expect(radii.lg).toBe("16px"));
  });

  describe("motion (Section 11.10)", () => {
    it("reveal duration is 600ms", () => expect(motion.duration.reveal).toBe(600));
    it("reveal easing is the documented cubic-bezier", () =>
      expect(motion.ease.reveal).toBe("cubic-bezier(0.16, 1, 0.3, 1)"));
    it("stagger is 80ms maximum", () => expect(motion.staggerMs).toBe(80));
  });

  describe("container (Section 11.6)", () => {
    it("max width is 1200px", () => expect(container.maxWidth).toBe("1200px"));
  });
});
