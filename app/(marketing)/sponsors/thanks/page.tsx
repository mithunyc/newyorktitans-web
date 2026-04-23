/**
 * app/sponsors/thanks/page.tsx
 *
 * Confirmation page shown after a successful Sponsor Inquiry submission.
 * Authority: NYT pack Section 12.8.
 */

import type { Metadata } from "next";
import { ThankYou } from "@/components/ui/ThankYou";

export const metadata: Metadata = {
  title: "Inquiry received",
  description: "Thank you for reaching out about partnering with New York Titans.",
  robots: { index: false, follow: false },
};

export default function SponsorsThanksPage() {
  return (
    <ThankYou
      eyebrow="Message received"
      headline="Thank you for reaching out."
      body="We have received your partnership enquiry and an auto-responder has been sent to your email address to confirm. A member of the Titans team will be in touch within 3 business days."
      nextStep="Check your inbox — including your spam folder — for a confirmation email from New York Titans."
      fallbackEmail="partnerships@newyorktitans.org"
    />
  );
}
