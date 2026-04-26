/**
 * app/team/page.tsx
 *
 * Team page. Reads /content/team.json. Renders gracefully with empty arrays.
 * Authority: NYT pack Section 12.3.
 */

import type { Metadata } from "next";
import { Image } from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { TeamSchema } from "@/lib/schemas/team";
import teamData from "@/content/team.json";

const team = TeamSchema.parse(teamData);

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind New York Titans — leadership, players, and culture.",
};

export default function TeamPage() {
  return (
    <>
      <Section variant="hero" surface="midnight" ariaLabel="The team">
        <Container>
          <Eyebrow tone="gold">The team</Eyebrow>
          <Heading level={1} className="mt-6 max-w-[20ch]">
            The people behind Titans.
          </Heading>
        </Container>
      </Section>

      {team.leadership.length > 0 && (
        <Section surface="midnight" ariaLabel="Leadership">
          <Container>
            <Heading level={2}>Leadership</Heading>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.leadership.map((leader) => (
                <div key={leader.name}>
                  <Heading level={3} size="sub">
                    {leader.name}
                  </Heading>
                  <p className="mt-2 text-caption uppercase tracking-eyebrow text-gold">
                    {leader.title}
                  </p>
                  {leader.bio && <p className="mt-4 text-body text-mist">{leader.bio}</p>}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {team.roster.length > 0 && (
        <Section surface="navy" ariaLabel="Roster">
          <Container>
            <Heading level={2}>Roster</Heading>
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {team.roster.map((player) => (
                <li key={player.name} className="rounded-lg border border-mist/10 bg-graphite p-8">
                  <p className="text-caption uppercase tracking-eyebrow text-gold">{player.role}</p>
                  <Heading level={3} size="sub" className="mt-2">
                    {player.name}
                  </Heading>
                  {(player.battingStyle || player.bowlingStyle) && (
                    <p className="mt-2 text-caption text-mist">
                      {[player.battingStyle, player.bowlingStyle].filter(Boolean).join(" • ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section surface="midnight" ariaLabel="Culture">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <Heading level={2}>Our culture</Heading>
              <p className="mt-6 max-w-prose text-bodyLg text-mist">{team.cultureStatement}</p>
              <div className="mt-10">
                <Button href="/join" variant="primary" size="lg">
                  Join Titans
                </Button>
              </div>
            </div>
            {team.cultureImage && team.cultureImageAlt && (
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={team.cultureImage}
                  alt={team.cultureImageAlt}
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 50vw, calc(100vw - 3rem)"
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
