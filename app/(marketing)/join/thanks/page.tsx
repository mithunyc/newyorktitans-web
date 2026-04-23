/**
 * app/join/thanks/page.tsx
 *
 * Confirmation page shown after a successful Join / General Interest
 * submission from the Join page.
 * Authority: NYT pack Section 12.8.
 */

import type { Metadata } from "next";
import { ThankYou } from "@/components/ui/ThankYou";

export const metadata: Metadata = {
  title: "Interest noted",
  description: "Thank you for expressing interest in joining New York Titans.",
  robots: { index: false, follow: false },
};

export default function JoinThanksPage() {
  return (
    <ThankYou
      eyebrow="Message received"
      headline="We've got your message."
      body="Thank you for reaching out. A confirmation has been sent to your email address. Someone from the Titans team will follow up within 3 business days to learn more about you and discuss next steps."
      nextStep="Check your inbox for a confirmation email. In the meantime, read our Code of Conduct so you know exactly what joining Titans means."
      fallbackEmail="inquiries@newyorktitans.org"
    />
  );
}
