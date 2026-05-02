/**
 * app/sponsors/page.tsx
 *
 * Sponsors page. The commercial spine. Reads /content/sponsors.json.
 * Authority: NYT pack Section 12.4.
 */

import type { Metadata } from "next";
import { Image } from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import dynamic from "next/dynamic";

// Defers the react-hook-form + zod bundle off the first-load critical path.
// ssr:false is intentional: the form is below the fold and requires JS to function.
// Serving the form as SSR HTML would force eager hydration bundle loading,
// which competes with the Fraunces font download on 4G and inflates LCP.
// The async chunk loads once the user scrolls to the form.
const SponsorForm = dynamic(
  () => import("@/components/forms/SponsorForm").then((m) => m.SponsorForm),
  { ssr: false },
);
import type { z } from "zod";
import type { SponsorsSchema } from "@/lib/schemas/sponsors";
import sponsorsData from "@/content/sponsors.json";

const sponsors = sponsorsData as z.infer<typeof SponsorsSchema>;

export const metadata: Metadata = {
  title: "Partner with us",
  description:
    "Support youth development, leadership, and a growing cricket culture in New York. Become a Titans partner.",
  openGraph: {
    title: "Partner with us — New York Titans",
    description:
      "Support youth development, leadership, and a growing cricket culture in New York. Become a Titans partner.",
    url: "https://www.newyorktitans.org/sponsors",
    images: [{ url: "/images/launch/community/sponsors-community-youth-volunteering.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner with us — New York Titans",
    description:
      "Support youth development, leadership, and a growing cricket culture in New York. Become a Titans partner.",
    images: ["/images/launch/community/sponsors-community-youth-volunteering.jpg"],
  },
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
          <p className="mt-8 max-w-prose text-bodyLg text-mist">{sponsors.hero.sub}</p>
        </Container>
      </Section>

      <Section surface="navy" ariaLabel="Why partner">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <Heading level={2}>Why partner with Titans</Heading>
              <p className="mt-6 max-w-prose text-bodyLg text-mist">{sponsors.whyPartner}</p>
            </div>
            {sponsors.communityImage && sponsors.communityImageAlt && (
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={sponsors.communityImage}
                  alt={sponsors.communityImageAlt}
                  width={576}
                  height={1024}
                  loading="lazy"
                  quality={60}
                  sizes="(min-width: 768px) 45vw, 280px"
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>
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
              <div key={theme.name} className="rounded-lg border border-mist/10 bg-graphite p-8">
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
                Tell us a little about your organization and what you have in mind. We respond
                within 3 business days.
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
