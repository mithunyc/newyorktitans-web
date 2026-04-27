/**
 * components/layout/Header.tsx
 *
 * Persistent site header. Server Component.
 * Sponsor CTA is always visible on desktop, lives inside the mobile drawer.
 *
 * Authority: NYT pack DESIGN.md 11.6 (footer/header), Section 7 (sponsor funnel).
 */

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileDrawer } from "./MobileDrawer";

const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Join", href: "/join" },
  { label: "Contact", href: "/contact" },
] as const;

export function Header() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-30 border-b border-mist/10 bg-navy/90 backdrop-blur supports-[backdrop-filter]:bg-navy/75"
    >
      <Container>
        <div className="md:h-20 flex h-16 items-center justify-between gap-6">
          {/* D-032: horizontal web logo mark. */}
          <Link
            href="/"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            aria-label="New York Titans — home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-secondary.svg"
              alt="New York Titans"
              width={50}
              height={40}
              className="md:h-10 h-8 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-visible:ring-ring text-body text-mist transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Persistent sponsor CTA on desktop */}
          <div className="hidden md:block">
            <Button href="/sponsors" variant="primary" size="md">
              Partner With Us
            </Button>
          </div>

          {/* Mobile drawer trigger */}
          <MobileDrawer
            items={[...PRIMARY_NAV]}
            sponsorHref="/sponsors"
            sponsorLabel="Partner With Us"
          />
        </div>
      </Container>
    </header>
  );
}
