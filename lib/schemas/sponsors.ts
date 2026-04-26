/**
 * lib/schemas/sponsors.ts
 *
 * Schema for /content/sponsors.json.
 * Authority: NYT_FINAL_RECONCILED_PACK.md, Sections 12.4, 14.1.
 *
 * Tier names match the four approved partnership themes. Bronze/Silver/Gold
 * is rejected by AGENTS.md Section 5.
 */

import { z } from "zod";

const Theme = z.object({
  name: z
    .string()
    .min(1)
    .refine((n) => !/^(bronze|silver|gold|platinum)$/i.test(n), {
      message:
        "Themed tiers only (Founding, Community, Youth Development, Team Support). Bronze/Silver/Gold/Platinum are rejected.",
    }),
  description: z.string().min(1).max(400),
});

const Supporter = z.object({
  name: z.string().min(1).max(80),
  // Logo path is repo-relative under /public, e.g. "/images/sponsors/acme.svg".
  logo: z
    .string()
    .regex(
      /^\/images\/sponsors\/[a-z0-9._-]+\.(svg|png|webp|jpg|jpeg)$/i,
      "Logo path must look like /images/sponsors/<file>.<ext>",
    ),
  url: z.string().url().optional(),
  // Tier is optional; if provided, must be one of the four themes.
  tier: z.enum(["Founding", "Community", "Youth Development", "Team Support"]).optional(),
});

export const SponsorsSchema = z
  .object({
    hero: z.object({
      headline: z.string().min(1).max(120),
      sub: z.string().min(1).max(280),
    }),
    whyPartner: z.string().min(1).max(1200),
    communityImage: z.string().optional(),
    communityImageAlt: z.string().optional(),
    themes: z
      .array(Theme)
      .min(2, "Provide at least two partnership themes.")
      .max(6, "No more than six partnership themes."),
    // Empty array is valid. Pages must render gracefully when supporters is empty.
    // Never include placeholder, prospective, or unauthorized logos.
    supporters: z.array(Supporter),
  })
  .refine((s) => !s.communityImage || !!s.communityImageAlt, {
    message: "When communityImage is provided, communityImageAlt is required.",
    path: ["communityImageAlt"],
  });

export type Sponsors = z.infer<typeof SponsorsSchema>;
