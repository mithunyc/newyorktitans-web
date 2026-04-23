/**
 * lib/schemas/code-of-conduct.ts
 *
 * Schema for /content/code-of-conduct.json — structured summary metadata.
 * The actual prose body lives in /content/pages/code-of-conduct-full.mdx.
 *
 * Authority: NYT_FINAL_RECONCILED_PACK.md, Sections 12.7, 14.1.
 */

import { z } from "zod";

const SummarySection = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id must be kebab-case"),
  title: z.string().min(1).max(80),
  oneLiner: z.string().min(1).max(200),
});

export const CodeOfConductSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1).max(60),
    headline: z.string().min(1).max(120),
    sub: z.string().min(1).max(280),
  }),
  sections: z
    .array(SummarySection)
    .min(3, "Code of Conduct summary needs at least 3 sections.")
    .max(8, "Code of Conduct summary should not exceed 8 sections."),
  values: z
    .array(z.string().min(1).max(40))
    .min(3, "List at least 3 values.")
    .max(8, "List at most 8 values."),
  pdfDownload: z
    .object({
      label: z.string().min(1).max(60),
      href: z.string().regex(/^\/downloads\/.+\.pdf$/i, "PDF download must live under /downloads/"),
    })
    .optional(),
});

export type CodeOfConduct = z.infer<typeof CodeOfConductSchema>;
