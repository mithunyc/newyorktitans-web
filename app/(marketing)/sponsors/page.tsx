/**
 * app/sponsors/page.tsx
 *
 * Sponsors page. The commercial spine. Reads /content/sponsors.json.
 * Authority: NYT pack Section 12.4.
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SponsorForm } from "@/components/forms/SponsorForm";
import { SponsorsSchema } from "@/lib/schemas/sponsors";
import sponsorsData from "@/content/sponsors.json";

const sponsors = SponsorsSchema.parse(sponsorsData);

export const metadata: Metadata = {
  title: "Partner with us",
  description:
    "Support youth development, leadership, and a growing cricket culture in New York. Become a Titans partner.",
};

export default function SponsorsPage() {
  return (
    <>
      <Section variant="hero" surface="midnight" ariaLabel="Partner with us">
        <Container>
          <Eyebrow tone="gold">Partnership</Eyebrow>
          <Heading level={1} className="mt-6 max-w-[20ch]">
            {sponsors.hero.headline}
          </Heading>
          <p className="mt-8 max-w-prose text-bodyLg text-mist">
            {sponsors.hero.sub}
          </p>
        </Container>
      </Section>

      <Section surface="navy" ariaLabel="Why partner">
        <Container>
          <Heading level={2}>Why partner with Titans</Heading>
          <p className="mt-6 max-w-prose text-bodyLg text-mist">
            {sponsors.whyPartner}
          </p>
        </Container>
      </Section>

      <Section surface="midnight" ariaLabel="Partnership themes">
        <Container>
          <Eyebrow>Partnership themes</Eyebrow>
          <Heading level={2} className="mt-4">
            Choose how you want to support the club.
          </Heading>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {sponsors.themes.map((theme) => (
              <div
                key={theme.name}
                className="rounded-lg border border-mist/10 bg-graphite p-8"
              >
                <Heading level={3} size="sub">
                  {theme.name}
                </Heading>
                <p className="mt-4 text-body text-mist">{theme.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {sponsors.supporters.length > 0 && (
        <Section surface="navy" ariaLabel="Current supporters">
          <Container>
            <Eyebrow>Current supporters</Eyebrow>
            <Heading level={2} className="mt-4">
              Thank you to our partners.
            </Heading>
            <ul className="mt-12 flex flex-wrap items-center gap-8">
              {sponsors.supporters.map((s) => (
                <li key={s.name} className="text-body text-mist">
                  {s.name}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section surface="midnight" ariaLabel="Sponsor inquiry">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow tone="gold">Get in touch</Eyebrow>
              <Heading level={2} className="mt-4">
                Start a conversation.
              </Heading>
              <p className="mt-6 max-w-prose text-body text-mist">
                Tell us a little about your organization and what you have in
                mind. We respond within 3 business days.
              </p>
            </div>
            <div>
              <SponsorForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
