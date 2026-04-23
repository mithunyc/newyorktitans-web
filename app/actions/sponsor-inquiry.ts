/**
 * app/actions/sponsor-inquiry.ts
 *
 * Server action for the Sponsor Inquiry form.
 * Pipeline: validate → honeypot → rate-limit → send → return.
 *
 * Authority: NYT pack Sections 10.6, 12.4, 16.2.
 */

"use server";

import { headers } from "next/headers";
import { SponsorInquirySchema, type SponsorInquiryInput } from "@/lib/validation";
import { ipFromHeaders, rateLimit } from "@/lib/rate-limit";
import { sendSponsorInquiry } from "@/lib/email";

export type SponsorInquiryActionResult =
  | { ok: true }
  | {
      ok: false;
      // The kind of failure helps the form decide what to render.
      reason: "validation" | "rate_limited" | "send_failed" | "unexpected";
      fieldErrors?: Partial<Record<keyof SponsorInquiryInput, string>>;
      retryAfterSeconds?: number;
      message?: string;
    };

export async function submitSponsorInquiry(raw: unknown): Promise<SponsorInquiryActionResult> {
  // Step 1: server-side re-validation. NEVER trust client validation.
  const parsed = SponsorInquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: SponsorInquiryActionResult extends infer R
      ? R extends { fieldErrors?: infer F }
        ? F
        : never
      : never = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof SponsorInquiryInput | undefined;
      if (key && fieldErrors && !(key in fieldErrors)) {
        (fieldErrors as Record<string, string>)[key] = issue.message;
      }
    }
    return {
      ok: false,
      reason: "validation",
      fieldErrors,
      message: "Please fix the highlighted fields and try again.",
    };
  }

  // Step 2: honeypot. The schema allows empty/undefined; non-empty is a bot.
  if (parsed.data.website && parsed.data.website.length > 0) {
    // Silently succeed so bots don't learn the trap. Do not actually send.
    return { ok: true };
  }

  // Step 3: rate limit by IP.
  const ip = ipFromHeaders(await headers());
  const rl = rateLimit(`sponsor:${ip}`);
  if (!rl.ok) {
    return {
      ok: false,
      reason: "rate_limited",
      retryAfterSeconds: rl.retryAfterSeconds,
      message: `Please wait ${rl.retryAfterSeconds}s before submitting again.`,
    };
  }

  // Step 4: send.
  const send = await sendSponsorInquiry({
    name: parsed.data.name,
    organization: parsed.data.organization,
    email: parsed.data.email,
    message: parsed.data.message,
    phone: parsed.data.phone || undefined,
  });

  if (!send.ok) {
    // Do NOT expose Resend error details to the client.
    return {
      ok: false,
      reason: "send_failed",
      message:
        "We couldn't send your message right now. Please email partnerships@newyorktitans.org directly, or try again in a moment.",
    };
  }

  return { ok: true };
}
