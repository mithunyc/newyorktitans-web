/**
 * components/ui/ThankYou.tsx
 *
 * Shared thank-you layout. Used by the three post-form confirmation pages.
 * No auto-redirect. Gives a clear next step and a direct contact fallback.
 *
 * Authority: NYT pack Section 12.8.
 */

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RuleGold } from "@/components/ui/RuleGold";
import { Button } from "@/components/ui/Button";

type ThankYouProps = {
  eyebrow: string;
  headline: string;
  body: string;
  /** Fallback email shown if they don't receive a response. */
  fallbackEmail: string;
  /** What to do next — one actionable sentence. */
  nextStep: string;
};

export function ThankYou({
  eyebrow,
  headline,
  body,
  fallbackEmail,
  nextStep,
}: ThankYouProps) {
  return (
    <Section variant="hero" surface="midnight" ariaLabel="Message received">
      <Container>
        <div className="max-w-[56ch]">
          <Eyebrow tone="gold">{eyebrow}</Eyebrow>

          <Heading level={1} size="h2" className="mt-6">
            {headline}
          </Heading>

          <p className="mt-8 text-bodyLg text-mist">{body}</p>

          <RuleGold className="mt-12" />

          <p className="mt-8 text-body text-mist">
            <strong className="font-medium text-white">Next step:</strong>{" "}
            {nextStep}
          </p>

          <p className="mt-4 text-body text-mist">
            If you don't hear from us within 3 business days, email us directly
            at{" "}
            <a
              href={`mailto:${fallbackEmail}`}
              className="text-white underline decoration-gold decoration-2 underline-offset-4 hover:decoration-white"
            >
              {fallbackEmail}
            </a>
            .
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/" variant="primary" size="md">
              Back to home
            </Button>
            <Button href="/code-of-conduct" variant="secondary" size="md">
              Read our standards
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
