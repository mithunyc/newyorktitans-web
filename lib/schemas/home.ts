/**
 * lib/schemas/home.ts
 *
 * Schema for /content/home.json.
 * Authority: NYT_FINAL_RECONCILED_PACK.md, Section 12.1, 14.
 */

import { z } from "zod";

const Cta = z.object({
  label: z.string().min(1).max(40),
  href: z.string().min(1),
});

const Hero = z.object({
  // Allow type-forward fallback for one hero (D-028).
  mode: z.enum(["image", "type"]).default("image"),
  eyebrow: z.string().min(1).max(60),
  headline: z.string().min(1).max(120),
  sub: z.string().min(1).max(280),
  primary: Cta,
  secondary: Cta.optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
}).refine(
  (h) => h.mode !== "image" || (h.image !== undefined && h.imageAlt !== undefined),
  { message: "When hero.mode is 'image', both image and imageAlt are required." },
);

const Pillar = z.object({
  title: z.string().min(1).max(40),
  body: z.string().min(1).max(280),
});

const StoryBlock = z.object({
  heading: z.string().min(1).max(120),
  body: z.string().min(1).max(800),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const SponsorBlock = z.object({
  heading: z.string().min(1).max(120),
  body: z.string().min(1).max(400),
  cta: Cta,
});

const SplitCta = z.object({
  join: z.object({
    heading: z.string().min(1).max(60),
    body: z.string().min(1).max(280),
    cta: Cta,
  }),
  conduct: z.object({
    line: z.string().min(1).max(160),
    cta: Cta,
  }),
});

export const HomeSchema = z.object({
  hero: Hero,
  missionStrip: z.string().min(1).max(200),
  pillars: z.array(Pillar).length(3, "Home requires exactly 3 pillars"),
  sponsor: SponsorBlock,
  story: StoryBlock,
  splitCta: SplitCta,
});

export type Home = z.infer<typeof HomeSchema>;
