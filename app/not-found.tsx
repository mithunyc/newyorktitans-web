/**
 * app/not-found.tsx
 *
 * 404 page. Honest, brief, brand-consistent. No clever copy.
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "We couldn't find that page on newyorktitans.org.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section variant="hero" surface="midnight" ariaLabel="Page not found">
      <Container>
        <Eyebrow tone="gold">404</Eyebrow>
        <Heading level={1} size="h2" className="mt-6 max-w-[20ch]">
          We couldn't find that page.
        </Heading>
        <p className="mt-6 max-w-prose text-bodyLg text-mist">
          The link may be old, or the page may have moved. Try one of the routes below.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/" variant="primary" size="md">
            Back to Home
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            Contact us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
