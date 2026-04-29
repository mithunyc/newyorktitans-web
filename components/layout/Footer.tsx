/**
 * components/layout/Footer.tsx
 *
 * Three columns desktop, stacked mobile. Includes the quiet
 * Code-of-Conduct trust line above the bottom row.
 *
 * Authority: NYT pack DESIGN.md 11.6, Section 22 (0.1% operator move).
 */

import Link from "next/link";
import { Image } from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { RuleGold } from "@/components/ui/RuleGold";

type FooterProps = {
  contactEmail?: string;
  partnershipsEmail?: string;
  socials?: {
    instagram?: string;
    x?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
};

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Join", href: "/join" },
  { label: "Contact", href: "/contact" },
];

const TRUST_LINKS = [
  { label: "Code of Conduct", href: "/code-of-conduct" },
  { label: "Privacy", href: "/privacy" },
  { label: "Accessibility", href: "/accessibility" },
];

export function Footer({
  contactEmail = "inquiries@newyorktitans.org",
  partnershipsEmail = "partnerships@newyorktitans.org",
  socials,
}: FooterProps) {
  const year = new Date().getFullYear();
  const socialEntries = Object.entries(socials ?? {}).filter(([, v]) => v && v.length > 0);

  return (
    <footer role="contentinfo" className="border-t border-mist/10 bg-navy text-white">
      {/* The quiet Code-of-Conduct trust line. NYT pack Section 22. */}
      <div className="border-b border-mist/10">
        <Container>
          <p className="py-6 text-center text-caption text-mist">
            We hold ourselves to a written standard.{" "}
            <Link
              href="/code-of-conduct"
              className="text-white underline decoration-gold decoration-2 underline-offset-4 hover:decoration-white"
            >
              Read it.
            </Link>
          </p>
        </Container>
      </div>

      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-3">
          {/* Org summary */}
          <div>
            {/* D-032: compact emblem mark. Decorative — text label follows. */}
            <Image
              src="/brand/logo-emblem.svg"
              alt=""
              decorative
              width={56}
              height={56}
              className="h-14 w-14"
            />
            <p className="mt-3 font-display text-sub font-semibold">New York Titans</p>
            <RuleGold className="mt-3" />
            <p className="mt-4 max-w-prose text-body text-mist">
              A nonprofit/community-first cricket organization in New York. Built for talent,
              character, and community.
            </p>
          </div>

          {/* Nav columns */}
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-micro uppercase tracking-eyebrow text-gold">Explore</p>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-body text-mist hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-micro uppercase tracking-eyebrow text-gold">Trust</p>
              <ul className="mt-4 space-y-3">
                {TRUST_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-body text-mist hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Contact + social */}
          <div>
            <p className="text-micro uppercase tracking-eyebrow text-gold">Contact</p>
            <ul className="mt-4 space-y-3 text-body">
              <li>
                <a href={`mailto:${contactEmail}`} className="text-mist hover:text-white">
                  {contactEmail}
                </a>
              </li>
              <li>
                <a href={`mailto:${partnershipsEmail}`} className="text-mist hover:text-white">
                  {partnershipsEmail}
                </a>
              </li>
            </ul>

            {socialEntries.length > 0 && (
              <ul className="mt-6 flex gap-4">
                {socialEntries.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body capitalize text-mist hover:text-white"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="border-t border-mist/10 py-6">
          <p className="text-caption text-mist">
            © {year} New York Titans Cricket Club. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
