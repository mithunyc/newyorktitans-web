/**
 * app/contact/page.tsx
 *
 * Contact page. Reuses GeneralInterestForm with category defaulting to
 * "General". Also surfaces a direct email and social links.
 *
 * Authority: NYT pack Section 12.6.
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GeneralInterestForm } from "@/components/forms/GeneralInterestForm";
import siteData from "@/content/site.json";
import { SiteSchema } from "@/lib/schemas/site";

const site = SiteSchema.parse(siteData);

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with New York Titans. Partnership, player, volunteer, or general enquiries welcome.",
};

export default function ContactPage() {
  const socialEntries = Object.entries(site.socials).filter(
    ([, v]) => v && v.length > 0,
  );

  return (
    <>
      <Section variant="hero" surface="midnight" ariaLabel="Contact us">
        <Container>
          <Eyebrow tone="gold">Contact</Eyebrow>
          <Heading level={1} className="mt-6 max-w-[20ch]">
            Get in touch.
          </Heading>
          <p className="mt-8 max-w-prose text-bodyLg text-mist">
            We read every message and respond within 3 business days. For
            partnership enquiries, visit our{" "}
            <a
              href="/sponsors"
              className="text-white underline decoration-gold decoration-2 underline-offset-4 hover:decoration-white"
            >
              Sponsors page
            </a>{" "}
            for a dedicated form.
          </p>
        </Container>
      </Section>

      <Section surface="navy" ariaLabel="Send a message">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
            {/* Direct contact details */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-micro uppercase tracking-eyebrow text-gold">
                  General enquiries
                </p>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="mt-3 block text-bodyLg text-white hover:text-gold"
                >
                  {site.contactEmail}
                </a>
              </div>

              <div>
                <p className="text-micro uppercase tracking-eyebrow text-gold">
                  Partnerships
                </p>
                <a
                  href={`mailto:${site.partnershipsEmail}`}
                  className="mt-3 block text-bodyLg text-white hover:text-gold"
                >
                  {site.partnershipsEmail}
                </a>
              </div>

              {socialEntries.length > 0 && (
                <div>
                  <p className="text-micro uppercase tracking-eyebrow text-gold">
                    Follow us
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
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
                </div>
              )}
            </div>

            {/* Form */}
            <div>
              <GeneralInterestForm
                defaultCategory="General"
                successPath="/contact/thanks"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
