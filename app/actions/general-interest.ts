/**
 * app/actions/general-interest.ts
 *
 * Server action for the General Interest form (used on Join and Contact).
 * Pipeline: validate → honeypot → rate-limit → send → return.
 *
 * Authority: NYT pack Sections 10.6, 12.5, 12.6, 16.2.
 */

"use server";

import { headers } from "next/headers";
import { GeneralInterestSchema, type GeneralInterestInput } from "@/lib/validation";
import { ipFromHeaders, rateLimit } from "@/lib/rate-limit";
import { sendGeneralInterest } from "@/lib/email";

export type GeneralInterestActionResult =
  | { ok: true }
  | {
      ok: false;
      reason: "validation" | "rate_limited" | "send_failed" | "unexpected";
      fieldErrors?: Partial<Record<keyof GeneralInterestInput, string>>;
      retryAfterSeconds?: number;
      message?: string;
    };

export async function submitGeneralInterest(raw: unknown): Promise<GeneralInterestActionResult> {
  const parsed = GeneralInterestSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof GeneralInterestInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof GeneralInterestInput | undefined;
      if (key && !(key in fieldErrors)) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      ok: false,
      reason: "validation",
      fieldErrors,
      message: "Please fix the highlighted fields and try again.",
    };
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  const ip = ipFromHeaders(await headers());
  const rl = rateLimit(`general:${ip}`);
  if (!rl.ok) {
    return {
      ok: false,
      reason: "rate_limited",
      retryAfterSeconds: rl.retryAfterSeconds,
      message: `Please wait ${rl.retryAfterSeconds}s before submitting again.`,
    };
  }

  const send = await sendGeneralInterest({
    name: parsed.data.name,
    email: parsed.data.email,
    category: parsed.data.category,
    message: parsed.data.message,
    phone: parsed.data.phone || undefined,
  });

  if (!send.ok) {
    return {
      ok: false,
      reason: "send_failed",
      message:
        "We couldn't send your message right now. Please email inquiries@newyorktitans.org directly, or try again in a moment.",
    };
  }

  return { ok: true };
}
