/**
 * lib/email.ts
 *
 * Resend wrapper. Two send paths: sponsor inquiry, general interest.
 * Both fire an inquiry email to the operator inbox AND an auto-responder
 * to the submitter.
 *
 * Authority: NYT pack Sections 10.6, 16.3, 16.4.
 *
 * Sender domain MUST be mail.newyorktitans.org with SPF/DKIM/DMARC verified.
 * Reply-To on auto-responders is set to the operator inbox so a hit-Reply
 * from the submitter goes to a human, not /dev/null.
 */

import "server-only";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing required env var: ${name}. See .env.example.`);
  }
  return v;
}

const RESEND_API_KEY = requireEnv("RESEND_API_KEY");
const NOREPLY_SENDER =
  process.env.NOREPLY_SENDER ?? "New York Titans <noreply@mail.newyorktitans.org>";
const INQUIRIES_INBOX =
  process.env.INQUIRIES_INBOX ?? "inquiries@newyorktitans.org";
const PARTNERSHIPS_INBOX =
  process.env.PARTNERSHIPS_INBOX ?? "partnerships@newyorktitans.org";

// Lazy-init so envs are read once per process, not per request.
let _resend: Resend | null = null;
function client(): Resend {
  if (!_resend) _resend = new Resend(RESEND_API_KEY);
  return _resend;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SponsorInquiryPayload = {
  name: string;
  organization: string;
  email: string;
  message: string;
  // Optional. Used in the auto-responder if provided.
  phone?: string;
};

export type GeneralInterestPayload = {
  name: string;
  email: string;
  category: "Player" | "Coach/Mentor" | "Volunteer" | "General";
  message: string;
  // Optional.
  phone?: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "send_failed"; details?: string };

// ---------------------------------------------------------------------------
// Plain-text + HTML helpers
// ---------------------------------------------------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlShell(bodyHtml: string): string {
  // Email-safe HTML: inline styles, table-friendly, tested in Gmail/Outlook/iOS Mail.
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#0A1020;font-family:Geist,Helvetica,Arial,sans-serif;color:#F7F4EE;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A1020;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111A33;border-radius:16px;padding:32px;">
        <tr><td>
          <p style="margin:0 0 16px 0;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:#D6A84F;">New York Titans</p>
          ${bodyHtml}
          <hr style="border:none;border-top:1px solid rgba(200,206,218,0.15);margin:32px 0;">
          <p style="margin:0;font-size:12px;color:#C8CEDA;line-height:1.6;">New York Titans Cricket Club &middot; <a href="https://newyorktitans.org" style="color:#D6A84F;text-decoration:none;">newyorktitans.org</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Sponsor flow
// ---------------------------------------------------------------------------

function sponsorInquiryEmail(p: SponsorInquiryPayload) {
  const text = [
    `New sponsor inquiry from ${p.name} (${p.organization}).`,
    ``,
    `From: ${p.name} <${p.email}>`,
    `Organization: ${p.organization}`,
    p.phone ? `Phone: ${p.phone}` : null,
    ``,
    `Message:`,
    p.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = htmlShell(`
    <h1 style="margin:0 0 16px 0;font-family:Fraunces,Georgia,serif;font-size:24px;line-height:1.2;color:#F7F4EE;">New sponsor inquiry</h1>
    <p style="margin:0 0 8px 0;color:#F7F4EE;"><strong>From:</strong> ${escapeHtml(p.name)} &lt;${escapeHtml(p.email)}&gt;</p>
    <p style="margin:0 0 8px 0;color:#F7F4EE;"><strong>Organization:</strong> ${escapeHtml(p.organization)}</p>
    ${p.phone ? `<p style="margin:0 0 8px 0;color:#F7F4EE;"><strong>Phone:</strong> ${escapeHtml(p.phone)}</p>` : ""}
    <p style="margin:24px 0 8px 0;color:#C8CEDA;"><strong style="color:#F7F4EE;">Message</strong></p>
    <p style="margin:0;color:#F7F4EE;line-height:1.6;white-space:pre-wrap;">${escapeHtml(p.message)}</p>
  `);

  return { text, html };
}

function sponsorAutoresponder(p: SponsorInquiryPayload) {
  const text = [
    `Hi ${p.name.split(" ")[0] ?? p.name},`,
    ``,
    `Thank you for reaching out about partnering with New York Titans.`,
    `We have received your inquiry and will respond within 3 business days.`,
    ``,
    `In the meantime, our standards live publicly at:`,
    `https://newyorktitans.org/code-of-conduct`,
    ``,
    `— The Titans Partnerships Team`,
  ].join("\n");

  const html = htmlShell(`
    <h1 style="margin:0 0 16px 0;font-family:Fraunces,Georgia,serif;font-size:24px;line-height:1.2;color:#F7F4EE;">Thank you for reaching out</h1>
    <p style="margin:0 0 16px 0;color:#F7F4EE;line-height:1.6;">Hi ${escapeHtml(p.name.split(" ")[0] ?? p.name)},</p>
    <p style="margin:0 0 16px 0;color:#F7F4EE;line-height:1.6;">Thank you for reaching out about partnering with New York Titans. We have received your inquiry and will respond within <strong>3 business days</strong>.</p>
    <p style="margin:0 0 16px 0;color:#F7F4EE;line-height:1.6;">In the meantime, our standards live publicly at <a href="https://newyorktitans.org/code-of-conduct" style="color:#D6A84F;">newyorktitans.org/code-of-conduct</a>.</p>
    <p style="margin:32px 0 0 0;color:#C8CEDA;line-height:1.6;">— The Titans Partnerships Team</p>
  `);

  return { text, html };
}

export async function sendSponsorInquiry(
  payload: SponsorInquiryPayload,
): Promise<SendResult> {
  const inquiry = sponsorInquiryEmail(payload);
  const auto = sponsorAutoresponder(payload);

  try {
    // Inquiry to operators.
    await client().emails.send({
      from: NOREPLY_SENDER,
      to: PARTNERSHIPS_INBOX,
      replyTo: payload.email,
      subject: `Sponsor inquiry — ${payload.organization}`,
      text: inquiry.text,
      html: inquiry.html,
    });

    // Auto-responder to submitter. Reply-To is the operator inbox.
    await client().emails.send({
      from: NOREPLY_SENDER,
      to: payload.email,
      replyTo: PARTNERSHIPS_INBOX,
      subject: "We received your message — New York Titans",
      text: auto.text,
      html: auto.html,
    });

    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      reason: "send_failed",
      details: e instanceof Error ? e.message : String(e),
    };
  }
}

// ---------------------------------------------------------------------------
// General interest flow
// ---------------------------------------------------------------------------

function generalInquiryEmail(p: GeneralInterestPayload) {
  const text = [
    `New ${p.category} inquiry from ${p.name}.`,
    ``,
    `From: ${p.name} <${p.email}>`,
    `Category: ${p.category}`,
    p.phone ? `Phone: ${p.phone}` : null,
    ``,
    `Message:`,
    p.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = htmlShell(`
    <h1 style="margin:0 0 16px 0;font-family:Fraunces,Georgia,serif;font-size:24px;line-height:1.2;color:#F7F4EE;">New ${escapeHtml(p.category)} inquiry</h1>
    <p style="margin:0 0 8px 0;color:#F7F4EE;"><strong>From:</strong> ${escapeHtml(p.name)} &lt;${escapeHtml(p.email)}&gt;</p>
    <p style="margin:0 0 8px 0;color:#F7F4EE;"><strong>Category:</strong> ${escapeHtml(p.category)}</p>
    ${p.phone ? `<p style="margin:0 0 8px 0;color:#F7F4EE;"><strong>Phone:</strong> ${escapeHtml(p.phone)}</p>` : ""}
    <p style="margin:24px 0 8px 0;color:#C8CEDA;"><strong style="color:#F7F4EE;">Message</strong></p>
    <p style="margin:0;color:#F7F4EE;line-height:1.6;white-space:pre-wrap;">${escapeHtml(p.message)}</p>
  `);

  return { text, html };
}

function generalAutoresponder(p: GeneralInterestPayload) {
  const opener: Record<GeneralInterestPayload["category"], string> = {
    Player: "Thank you for your interest in playing for New York Titans.",
    "Coach/Mentor": "Thank you for your interest in coaching with New York Titans.",
    Volunteer: "Thank you for offering to volunteer with New York Titans.",
    General: "Thank you for reaching out to New York Titans.",
  };

  const text = [
    `Hi ${p.name.split(" ")[0] ?? p.name},`,
    ``,
    opener[p.category],
    `We have received your message and will respond within 3 business days.`,
    ``,
    `Our standards: https://newyorktitans.org/code-of-conduct`,
    ``,
    `— The Titans Team`,
  ].join("\n");

  const html = htmlShell(`
    <h1 style="margin:0 0 16px 0;font-family:Fraunces,Georgia,serif;font-size:24px;line-height:1.2;color:#F7F4EE;">Thank you for reaching out</h1>
    <p style="margin:0 0 16px 0;color:#F7F4EE;line-height:1.6;">Hi ${escapeHtml(p.name.split(" ")[0] ?? p.name)},</p>
    <p style="margin:0 0 16px 0;color:#F7F4EE;line-height:1.6;">${escapeHtml(opener[p.category])} We have received your message and will respond within <strong>3 business days</strong>.</p>
    <p style="margin:0 0 16px 0;color:#F7F4EE;line-height:1.6;">Our standards live at <a href="https://newyorktitans.org/code-of-conduct" style="color:#D6A84F;">newyorktitans.org/code-of-conduct</a>.</p>
    <p style="margin:32px 0 0 0;color:#C8CEDA;line-height:1.6;">— The Titans Team</p>
  `);

  return { text, html };
}

export async function sendGeneralInterest(
  payload: GeneralInterestPayload,
): Promise<SendResult> {
  const inquiry = generalInquiryEmail(payload);
  const auto = generalAutoresponder(payload);

  try {
    await client().emails.send({
      from: NOREPLY_SENDER,
      to: INQUIRIES_INBOX,
      replyTo: payload.email,
      subject: `[${payload.category}] inquiry from ${payload.name}`,
      text: inquiry.text,
      html: inquiry.html,
    });

    await client().emails.send({
      from: NOREPLY_SENDER,
      to: payload.email,
      replyTo: INQUIRIES_INBOX,
      subject: "We received your message — New York Titans",
      text: auto.text,
      html: auto.html,
    });

    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      reason: "send_failed",
      details: e instanceof Error ? e.message : String(e),
    };
  }
}
