/**
 * app/accessibility/page.tsx
 *
 * Accessibility statement. Required by DESIGN.md 11.11 and
 * NYT pack Section 20 (Accessibility Rules).
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Prose } from "@/components/ui/Prose";
import { loadMdxPage } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "New York Titans accessibility statement. Our standard, what we test, and how to report issues.",
  robots: {
    index: true,
    follow: false,
  },
};

export default async function AccessibilityPage() {
  const { content } = await loadMdxPage("accessibility");

  return (
    <Section variant="hero" surface="midnight" ariaLabel="Accessibility statement">
      <Container>
        <Eyebrow>Accessibility</Eyebrow>
        <Heading level={1} size="h2" className="mt-6 max-w-[22ch]">
          Built to be usable by everyone.
        </Heading>
        <div className="mt-12">
          <Prose>{content}</Prose>
        </div>
      </Container>
    </Section>
  );
}
