/**
 * app/page.tsx
 *
 * Home page. Reads from /content/home.json (typed via lib/schemas/home.ts).
 * This file is the agent's reference for how a page should consume content.
 *
 * Authority: NYT pack Section 12.1 (Home wireframe).
 *
 * Section order (post-adversarial revision):
 *   Header → Hero → Mission → Pillars → Sponsor → Story → Split CTA → Footer
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RuleGold } from "@/components/ui/RuleGold";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "New York Titans — Cricket. Character. Community.",
  description:
    "A nonprofit/community-first cricket organization in New York. Built for talent, character, and community.",
};

export default function HomePage() {
  // NOTE: This is a STUB. The agent must wire this to read from
  // /content/home.json via the HomeSchema-validated import:
  //
  //   import home from "@/content/home.json";
  //   import { HomeSchema } from "@/lib/schemas/home";
  //   const data = HomeSchema.parse(home);
  //
  // Then map data.hero, data.pillars, data.sponsor, data.story, data.splitCta
  // onto the matching sections below.

  return (
    <>
      {/* HERO */}
      <Section variant="hero" surface="midnight" ariaLabel="Introduction">
        <Container>
          <Eyebrow tone="gold">New York Titans Cricket Club</Eyebrow>
          <Heading level={1} className="mt-6 max-w-[20ch]">
            Built in New York. Driven by purpose.
          </Heading>
          <p className="mt-8 max-w-prose text-bodyLg text-mist">
            We are building more than a cricket team. A home for talent, character,
            leadership, and belonging through the game we love.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/sponsors" variant="primary" size="lg">
              Partner With Us
            </Button>
            <Button href="/join" variant="secondary" size="lg">
              Join Titans
            </Button>
          </div>
        </Container>
      </Section>

      {/* MISSION STRIP */}
      <Section surface="navy" ariaLabel="Our mission">
        <Container>
          <RuleGold className="mx-auto" />
          <p className="mx-auto mt-6 max-w-prose text-center text-bodyLg text-white">
            Talent. Character. Community. That is what Titans is built to grow.
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
            {[
              {
                title: "Compete",
                body: "We play to win, never at the cost of integrity, respect, or sportsmanship.",
              },
              {
                title: "Develop",
                body: "We invest in growth on and off the field through discipline, teamwork, and leadership.",
              },
              {
                title: "Serve",
                body: "We use cricket to build community and create a place people are proud to belong to.",
              },
            ].map((p) => (
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
                Partner with a club building real impact.
              </Heading>
              <p className="mt-6 max-w-prose text-bodyLg text-mist">
                Sponsoring Titans is more than logo placement. It is an opportunity
                to support youth development, leadership, and a growing cricket
                culture in New York.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Button href="/sponsors" variant="primary" size="lg">
                Become a Partner
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
                Building something bigger than match day.
              </Heading>
              <p className="mt-6 max-w-prose text-body text-mist">
                Cricket can develop skill, confidence, character, and community.
                That is why Titans is not just about competition. It is about
                creating a standard, building pride, and giving players and
                families a place where they feel they belong.
              </p>
            </div>
            <div className="aspect-[4/5] rounded-lg bg-graphite" aria-hidden="true">
              {/* Placeholder until launch photo (D-028) is in place. */}
            </div>
          </div>
        </Container>
      </Section>

      {/* SPLIT CTA */}
      <Section surface="navy" ariaLabel="Take the next step">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <Heading level={3}>Join Titans</Heading>
              <p className="mt-4 max-w-prose text-body text-mist">
                Whether you are a player, coach, volunteer, or supporter, there
                is a place for people who believe in discipline, growth, and
                community.
              </p>
              <div className="mt-8">
                <Button href="/join" variant="secondary" size="md">
                  Express Interest
                </Button>
              </div>
            </div>
            <div>
              <Heading level={3}>Standards on and off the field</Heading>
              <p className="mt-4 max-w-prose text-body text-mist">
                We hold ourselves to a written standard of conduct.
              </p>
              <div className="mt-8">
                <Button href="/code-of-conduct" variant="tertiary">
                  Read the Code of Conduct
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
