/**
 * app/contact/thanks/page.tsx
 *
 * Confirmation page shown after a successful General Interest submission
 * from the Contact page.
 * Authority: NYT pack Section 12.8.
 */

import type { Metadata } from "next";
import { ThankYou } from "@/components/ui/ThankYou";

export const metadata: Metadata = {
  title: "Message sent",
  description: "Thank you for getting in touch with New York Titans.",
  robots: { index: false, follow: false },
};

export default function ContactThanksPage() {
  return (
    <ThankYou
      eyebrow="Message received"
      headline="We'll be in touch."
      body="Your message has been received and a confirmation sent to your email. We read every enquiry and will get back to you within 3 business days."
      nextStep="Check your inbox for a confirmation. If your message is about a partnership, you can also visit our Sponsors page for more detail."
      fallbackEmail="inquiries@newyorktitans.org"
    />
  );
}
