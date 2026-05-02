/**
 * app/code-of-conduct/page.tsx
 *
 * Code of Conduct public summary. This is a first-class trust surface —
 * not legal boilerplate. Reads structured data from JSON and prose from MDX.
 *
 * Authority: NYT pack Section 12.7, Section 22 (0.1% operator move).
 */

import type { Metadata } from "next";
import { ogImageUrl } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RuleGold } from "@/components/ui/RuleGold";
import { Button } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";
import { loadMdxPage } from "@/lib/mdx";
import { CodeOfConductSchema } from "@/lib/schemas/code-of-conduct";
import conductData from "@/content/code-of-conduct.json";

const conduct = CodeOfConductSchema.parse(conductData);

export const metadata: Metadata = {
  title: "Code of Conduct",
  description:
    "The written standard every New York Titans player, coach, official, volunteer, and supporter is held to.",
  openGraph: {
    title: "Code of Conduct — New York Titans",
    description:
      "The written standard every New York Titans player, coach, official, volunteer, and supporter is held to.",
    url: "https://www.newyorktitans.org/code-of-conduct",
    images: [{ url: ogImageUrl("/images/launch/action/team-match-action-02.jpg") }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code of Conduct — New York Titans",
    description:
      "The written standard every New York Titans player, coach, official, volunteer, and supporter is held to.",
    images: [ogImageUrl("/images/launch/action/team-match-action-02.jpg")],
  },
};

export default async function CodeOfConductPage() {
  const { content } = await loadMdxPage("code-of-conduct-full");

  return (
    <>
      {/* Hero */}
      <Section variant="hero" surface="midnight" ariaLabel="Our standards">
        <Container>
          <Eyebrow tone="gold">{conduct.hero.eyebrow}</Eyebrow>
          <Heading level={1} className="mt-6 max-w-[22ch]">
            {conduct.hero.headline}
          </Heading>
          <p className="mt-8 max-w-prose text-bodyLg text-mist">{conduct.hero.sub}</p>
        </Container>
      </Section>

      {/* Values strip */}
      <Section surface="navy" ariaLabel="Our values">
        <Container>
          <Eyebrow>The values underneath the standard</Eyebrow>
          <ul className="mt-8 flex flex-wrap gap-4">
            {conduct.values.map((v) => (
              <li
                key={v}
                className="px-5 rounded-full border border-gold/40 py-2 text-body text-white"
              >
                {v}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Prose summary */}
      <Section surface="midnight" ariaLabel="Full standard">
        <Container>
          <Prose>{content}</Prose>

          <RuleGold className="mt-16" />

          {/* Document download if configured */}
          {conduct.documentDownload && (
            <div className="mt-10">
              <Button href={conduct.documentDownload.href} variant="secondary" size="md" external>
                {conduct.documentDownload.label}
              </Button>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section surface="navy" ariaLabel="Join Titans">
        <Container>
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <Heading level={2} size="h3">
                Ready to hold yourself to this standard?
              </Heading>
              <p className="mt-4 max-w-prose text-body text-mist">
                Every Titans member agrees to these standards before they join.
              </p>
            </div>
            <Button href="/join" variant="primary" size="lg">
              Join Titans
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
