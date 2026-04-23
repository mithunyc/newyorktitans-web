/**
 * app/join/page.tsx
 *
 * Join page. Three pathways + General Interest form pre-set to "Player".
 * Authority: NYT pack Section 12.5.
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GeneralInterestForm } from "@/components/forms/GeneralInterestForm";

export const metadata: Metadata = {
  title: "Join Titans",
  description:
    "Players, coaches, mentors, and volunteers. Tell us how you want to be part of New York Titans.",
};

const PATHWAYS = [
  {
    title: "Player",
    body: "Whether you're an established cricketer or returning to the game, tell us about yourself and what you're looking for.",
  },
  {
    title: "Coach or Mentor",
    body: "Help develop the next generation of Titans players through coaching, mentoring, or skill-specific training.",
  },
  {
    title: "Volunteer or Supporter",
    body: "From match-day operations to organizational support, we welcome volunteers who share our standards.",
  },
] as const;

export default function JoinPage() {
  return (
    <>
      <Section variant="hero" surface="midnight" ariaLabel="Join Titans">
        <Container>
          <Eyebrow tone="gold">Join Titans</Eyebrow>
          <Heading level={1} className="mt-6 max-w-[20ch]">
            Find your place in the club.
          </Heading>
          <p className="mt-8 max-w-prose text-bodyLg text-mist">
            Titans is built around standards: skill, character, discipline, community. If those
            words mean something to you, there's a place here.
          </p>
        </Container>
      </Section>

      <Section surface="navy" ariaLabel="Pathways">
        <Container>
          <Heading level={2}>How to get involved</Heading>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {PATHWAYS.map((p) => (
              <div key={p.title}>
                <Heading level={3} size="sub">
                  {p.title}
                </Heading>
                <p className="mt-4 text-body text-mist">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="midnight" ariaLabel="Express interest">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow tone="gold">Express interest</Eyebrow>
              <Heading level={2} className="mt-4">
                Tell us about you.
              </Heading>
              <p className="mt-6 max-w-prose text-body text-mist">
                We'll respond within 3 business days. By submitting, you agree to follow our written{" "}
                <a
                  href="/code-of-conduct"
                  className="text-white underline decoration-gold decoration-2 underline-offset-4 hover:decoration-white"
                >
                  Code of Conduct
                </a>
                .
              </p>
            </div>
            <div>
              <GeneralInterestForm defaultCategory="Player" successPath="/join/thanks" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
