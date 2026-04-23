/**
 * app/privacy/page.tsx
 *
 * Privacy policy page. Prose loaded from /content/pages/privacy.mdx.
 * Excluded from sitemap priority; indexed but not promoted.
 *
 * Authority: NYT pack Section 21 (SEO), Section 16.6 (privacy posture).
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Prose } from "@/components/ui/Prose";
import { loadMdxPage } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How New York Titans collects, uses, and protects information submitted through this site.",
  robots: {
    index: true,
    follow: false,
  },
};

export default async function PrivacyPage() {
  const { content } = await loadMdxPage("privacy");

  return (
    <Section variant="hero" surface="midnight" ariaLabel="Privacy policy">
      <Container>
        <Eyebrow>Privacy</Eyebrow>
        <Heading level={1} size="h2" className="mt-6 max-w-[22ch]">
          How we handle your information.
        </Heading>
        <div className="mt-12">
          <Prose>{content}</Prose>
        </div>
      </Container>
    </Section>
  );
}
