/**
 * lib/schemas/site.ts
 *
 * Schema for /content/site.json — global site config.
 * Authority: NYT_FINAL_RECONCILED_PACK.md, Section 14.1.
 */

import { z } from "zod";

const UrlOrEmpty = z.string().url().or(z.literal(""));

export const SiteSchema = z.object({
  name: z.string().min(1, "name is required"),
  shortName: z.string().min(1, "shortName is required"),
  tagline: z.string().min(1, "tagline is required"),
  url: z.string().url("url must be a valid URL"),

  contactEmail: z.string().email("contactEmail must be a valid email"),
  partnershipsEmail: z.string().email("partnershipsEmail must be a valid email"),

  socials: z.object({
    instagram: UrlOrEmpty,
    x: UrlOrEmpty,
    facebook: UrlOrEmpty,
    linkedin: UrlOrEmpty,
    youtube: UrlOrEmpty,
  }),

  footer: z.object({
    orgSummary: z.string().min(1, "footer.orgSummary is required"),
    address: z.string().or(z.literal("")),
  }),
});

export type Site = z.infer<typeof SiteSchema>;
