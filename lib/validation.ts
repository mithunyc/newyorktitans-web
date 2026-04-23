/**
 * lib/validation.ts
 *
 * Zod schemas for FORM INPUT. Distinct from /lib/schemas/* which validates
 * /content/* on the build side. These run on every form submission both
 * client-side (RHF resolver) and server-side (re-validation in actions).
 *
 * Authority: NYT pack Sections 10.6, 16.2.
 *
 * Field count discipline:
 *   - Sponsor Inquiry: 5 fields (name, organization, email, message + optional phone).
 *   - General Interest: 6 fields (name, email, category, message + optional phone + honeypot).
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const Name = z.string().trim().min(2, "Name is too short.").max(80, "Name is too long.");

const Email = z.string().trim().toLowerCase().email("That doesn't look like a valid email.");

const Phone = z
  .string()
  .trim()
  .max(40)
  // Loose pattern: digits, spaces, +, -, parentheses. International-friendly.
  .regex(/^[0-9+\-\s().]*$/, "Phone may only contain digits, spaces, and + - ( ).")
  .optional()
  .or(z.literal(""));

const Message = z
  .string()
  .trim()
  .min(10, "Please tell us a little more (at least 10 characters).")
  .max(2000, "Message is too long. Please keep it under 2000 characters.");

const Organization = z.string().trim().min(2, "Organization name is too short.").max(120);

// Honeypot: a hidden field that real users will not fill in. Submissions
// where this is non-empty are silently dropped.
const Honeypot = z.string().max(0, "Bot detected.").optional().or(z.literal(""));

// ---------------------------------------------------------------------------
// Sponsor Inquiry
// ---------------------------------------------------------------------------

export const SponsorInquirySchema = z.object({
  name: Name,
  organization: Organization,
  email: Email,
  phone: Phone,
  message: Message,
  // Honeypot field. Must be named something that looks plausible to bots.
  website: Honeypot,
});

export type SponsorInquiryInput = z.infer<typeof SponsorInquirySchema>;

// ---------------------------------------------------------------------------
// General Interest
// ---------------------------------------------------------------------------

export const GeneralInterestCategory = z.enum(["Player", "Coach/Mentor", "Volunteer", "General"]);

export const GeneralInterestSchema = z.object({
  name: Name,
  email: Email,
  phone: Phone,
  category: GeneralInterestCategory,
  message: Message,
  website: Honeypot,
});

export type GeneralInterestInput = z.infer<typeof GeneralInterestSchema>;
