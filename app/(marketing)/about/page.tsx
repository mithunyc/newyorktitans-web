/**
 * app/about/page.tsx
 *
 * About page. Long-form prose loaded from /content/pages/about.mdx.
 * Authority: NYT pack Section 12.2.
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Button } from "@/components/ui/Button";
import { loadMdxPage } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "About",
  description:
    "New York Titans is a nonprofit/community-first cricket organization. Our mission, values, and standards.",
  openGraph: {
    title: "About — New York Titans",
    description:
      "New York Titans is a nonprofit/community-first cricket organization. Our mission, values, and standards.",
    url: "https://www.newyorktitans.org/about",
    images: [{ url: "/images/launch/portraits/about-founder-portrait.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — New York Titans",
    description:
      "New York Titans is a nonprofit/community-first cricket organization. Our mission, values, and standards.",
    images: ["/images/launch/portraits/about-founder-portrait.jpg"],
  },
};

export default async function AboutPage() {
  const { content } = await loadMdxPage("about");
  return (
    <>
      <Section variant="hero" surface="midnight" ariaLabel="About New York Titans">
        <Container>
          <Prose>{content}</Prose>
        </Container>
      </Section>

      <Section surface="navy" ariaLabel="Take the next step">
        <Container>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/sponsors" variant="primary" size="lg">
              Partner With Us
            </Button>
            <Button href="/join" variant="secondary" size="lg">
              Join Titans
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
