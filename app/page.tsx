/**
 * app/page.tsx
 *
 * Home page. Reads from /content/home.json (typed via lib/schemas/home.ts).
 *
 * Authority: NYT pack Section 12.1 (Home wireframe).
 *
 * Section order (post-adversarial revision):
 *   Header → Hero → Mission → Pillars → Sponsor → Story → Split CTA → Footer
 */

import type { Metadata } from "next";
import { Image } from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RuleGold } from "@/components/ui/RuleGold";
import { Button } from "@/components/ui/Button";
import type { z } from "zod";
import type { HomeSchema } from "@/lib/schemas/home";
import homeData from "@/content/home.json";

const home = homeData as z.infer<typeof HomeSchema>;

export const metadata: Metadata = {
  title: "New York Titans — Cricket. Character. Community.",
  description:
    "A nonprofit/community-first cricket organization in New York. Built for talent, character, and community.",
};

export default function HomePage() {
  const { hero, missionStrip, pillars, sponsor, story, splitCta } = home;

  return (
    <>
      {/* HERO */}
      <Section variant="hero" surface="midnight" ariaLabel="Introduction">
        <Container>
          <div className="gap-10 grid items-center md:grid-cols-2 md:gap-12">
            <div>
              <Eyebrow tone="gold">{hero.eyebrow}</Eyebrow>
              <Heading level={1} className="mt-6 max-w-[20ch]">
                {hero.headline}
              </Heading>
              <p className="mt-8 max-w-prose text-bodyLg text-mist">{hero.sub}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={hero.primary.href} variant="primary" size="lg">
                  {hero.primary.label}
                </Button>
                {hero.secondary && (
                  <Button href={hero.secondary.href} variant="secondary" size="lg">
                    {hero.secondary.label}
                  </Button>
                )}
              </div>
            </div>
            {hero.mode === "image" && hero.image && hero.imageAlt && (
              <div>
                <Image
                  src={hero.image}
                  alt={hero.imageAlt}
                  width={2200}
                  height={1650}
                  sizes="(min-width: 768px) 50vw, calc(100vw - 3rem)"
                  quality={60}
                  priority
                  className="h-auto w-full rounded-lg"
                />
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* MISSION STRIP */}
      <Section surface="navy" ariaLabel="Our mission">
        <Container>
          <RuleGold className="mx-auto" />
          <p className="mx-auto mt-6 max-w-prose text-center text-bodyLg text-white">
            {missionStrip}
          </p>
        </Container>
      </Section>

      {/* PILLARS */}
      <Section surface="midnight" ariaLabel="Our pillars">
        <Container>
          <Eyebrow>What we stand for</Eyebrow>
          <Heading level={2} className="mt-4 max-w-[18ch]">
            Three commitments that shape every decision.
          </Heading>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title}>
                <Heading level={3}>{p.title}</Heading>
                <p className="mt-4 max-w-prose text-body text-mist">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SPONSOR — placed early per Section 27 adversarial probe 2 */}
      <Section surface="navy" ariaLabel="Partner with us">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <Eyebrow tone="gold">Partnership</Eyebrow>
              <Heading level={2} className="mt-4">
                {sponsor.heading}
              </Heading>
              <p className="mt-6 max-w-prose text-bodyLg text-mist">{sponsor.body}</p>
            </div>
            <div className="flex md:justify-end">
              <Button href={sponsor.cta.href} variant="primary" size="lg">
                {sponsor.cta.label}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* STORY */}
      <Section surface="midnight" ariaLabel="Our story">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>Our story</Eyebrow>
              <Heading level={2} className="mt-4">
                {story.heading}
              </Heading>
              <p className="mt-6 max-w-prose text-body text-mist">{story.body}</p>
            </div>
            {story.image && story.imageAlt ? (
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  sizes="(min-width: 768px) 45vw, 280px"
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/5] rounded-lg bg-graphite" aria-hidden="true" />
            )}
          </div>
        </Container>
      </Section>

      {/* SPLIT CTA */}
      <Section surface="navy" ariaLabel="Take the next step">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <Heading level={3}>{splitCta.join.heading}</Heading>
              <p className="mt-4 max-w-prose text-body text-mist">{splitCta.join.body}</p>
              <div className="mt-8">
                <Button href={splitCta.join.cta.href} variant="secondary" size="md">
                  {splitCta.join.cta.label}
                </Button>
              </div>
            </div>
            <div>
              <Heading level={3}>Standards on and off the field</Heading>
              <p className="mt-4 max-w-prose text-body text-mist">{splitCta.conduct.line}</p>
              <div className="mt-8">
                <Button href={splitCta.conduct.cta.href} variant="tertiary">
                  {splitCta.conduct.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
