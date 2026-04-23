/**
 * lib/schemas/team.ts
 *
 * Schema for /content/team.json — leadership + roster.
 * Authority: NYT_FINAL_RECONCILED_PACK.md, Sections 12.3, 14.1.
 *
 * Enforces D-028 photography awareness and the minor-consent invariant
 * (cross-checked again in scripts/validate-content.ts for explicit CI logs).
 */

import { z } from "zod";

const PlayerRole = z.enum([
  "Batter",
  "Bowler",
  "All-Rounder",
  "Wicketkeeper",
]);

const Player = z
  .object({
    name: z.string().min(1).max(80),
    role: PlayerRole,
    battingStyle: z.string().max(40).optional(),
    bowlingStyle: z.string().max(40).optional(),
    bio: z.string().max(280).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    isCaptain: z.boolean().optional(),
    isViceCaptain: z.boolean().optional(),
    isMinor: z.boolean().optional(),
    consentRecorded: z.boolean().optional(),
  })
  .refine(
    (p) => !p.isMinor || p.consentRecorded === true,
    {
      message:
        "Minors require consentRecorded=true before being published. See operations.md.",
      path: ["consentRecorded"],
    },
  )
  .refine(
    (p) => !p.image || !!p.imageAlt,
    {
      message: "When image is provided, imageAlt is required.",
      path: ["imageAlt"],
    },
  );

const Leader = z.object({
  name: z.string().min(1).max(80),
  title: z.string().min(1).max(60),
  bio: z.string().max(400).optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

export const TeamSchema = z
  .object({
    leadership: z.array(Leader),
    roster: z.array(Player),
    cultureStatement: z.string().min(1).max(800),
  })
  .refine(
    (t) => {
      const captains = t.roster.filter((p) => p.isCaptain).length;
      return captains <= 1;
    },
    { message: "At most one captain may be set in the roster.", path: ["roster"] },
  )
  .refine(
    (t) => {
      const vice = t.roster.filter((p) => p.isViceCaptain).length;
      return vice <= 1;
    },
    {
      message: "At most one vice-captain may be set in the roster.",
      path: ["roster"],
    },
  );

export type Team = z.infer<typeof TeamSchema>;
