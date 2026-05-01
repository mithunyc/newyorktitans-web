# New York Titans — Final Reconciled Build Pack

This document supersedes both the original author pass and the Gemini adversarial review.
It is the single canonical reference for MVP. Where this document conflicts with prior drafts, this document wins.

---

## 1. Reconciliation Verdict

The Gemini critique correctly identified two structural failures in the author pass: operator fragility from raw TypeScript content modules, and a Support page that broadcasts incomplete compliance. Both are accepted and corrected. The IA was also too sprawling for a club at this scale; reduced.

The critique overreached on three fronts: (a) collapsing all forms to one would dilute the sponsor funnel, (b) authorizing direct commits to `main` would trade engineering safety for a non-problem (the JSON/MDX move solves the original concern), (c) removing visual regression entirely would expose the project to the highest-probability long-term failure mode (AI slop drift). All three rejections are based on the binding human decisions and stand.

Net result: the spec is leaner, lower-risk, and more buildable. It loses no design ambition. It gains operator durability, sponsor responsiveness, and a real photography gate.

---

## 2. Accepted Critiques

Each accepted critique maps to a binding decision (BD#) where applicable.

| #   | Critique                                                                                                        | Resolution                                                                                                                                                    | Maps to |
| --- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| A1  | TypeScript content modules are too fragile for non-technical Windows operators; a single missing comma fails CI | Move structured content to JSON validated by Zod at build time; long-form prose to MDX                                                                        | BD-1    |
| A2  | The Support page publishes a deferred promise and damages credibility                                           | Remove the Support page from MVP entirely; non-monetary support language folds into About and Sponsors                                                        | BD-2    |
| A3  | Eight primary nav items dilute the sponsor CTA and create empty surfaces for a small club                       | Reduce primary nav to six: Home, About, Team, Sponsors, Join, Contact. Community conditional, default off                                                     | BD-3    |
| A4  | Three forms triple maintenance and spam surface                                                                 | Consolidate to two: dedicated Sponsor Inquiry form + a General Interest form with a routing category selector (Player, Coach/Mentor, Volunteer, General)      | BD-4    |
| A5  | Typography-forward fallback at site-wide scale will read as a shell company                                     | Hard launch gate: minimum 3 authentic club photos. Typography-forward allowed only as a localized fallback for one hero or one section, not site-wide posture | BD-5    |
| A6  | Sponsor funnel ends in a black hole with no automated acknowledgment                                            | Add immediate auto-responder for both Sponsor and General Interest submissions, with verified sending domain and proper email authentication                  | BD-6    |
| A7  | Email deliverability is fragile without SPF, DKIM, DMARC alignment                                              | Mandatory: verified sending subdomain (mail.newyorktitans.org), SPF, DKIM, DMARC starting at p=none and escalating                                            | BD-6    |
| A8  | The author pack referenced fonts and palette but did not address logo asset state                               | Use current vectorized primary/full and emblem marks as interim approved assets. Logo work does not block IA, copy, or build                                  | BD-10   |
| A9  | Code of Conduct as primary trust artifact was identified as correct in both passes                              | Retained as a footer-linked public summary page. Treated as first-class trust surface despite footer placement                                                | BD-9    |
| A10 | The pillar carousel and 3-equal-card row patterns risk drift                                                    | Banned explicitly in DESIGN.md. Visual regression catches reintroduction                                                                                      | BD-8    |

---

## 3. Rejected Critiques

| #   | Critique                                                            | Reason for rejection                                                                                                                                                                                                                                                          | Maps to            |
| --- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| R1  | Collapse all three forms into one unified contact form              | A unified form weakens the sponsor funnel by signaling that a partnership inquiry is interchangeable with a general question. Sponsors are the primary commercial audience; their inquiry deserves a dedicated, premium-feeling surface. The compromise is two forms, not one | BD-4               |
| R2  | Authorize direct commits to `main` for simple Markdown copy edits   | The original concern was operator fragility with TypeScript files. That concern is fully addressed by moving to JSON + MDX with Zod validation. Authorizing direct commits would weaken governance to solve a problem that no longer exists                                   | BD-7               |
| R3  | Drop Playwright visual regression tests entirely as testing theater | Visual regression is the lowest-cost defense against the highest-probability long-term failure mode: design drift into AI slop. Six screenshots (three pages × two breakpoints) is not theater; it is a single config file. Removing it would be the wrong trade              | BD-8               |
| R4  | Use Fraunces only if it survives a "compelling rebuttal"            | No compelling rebuttal exists. Fraunces is variable, free, distinctive, and self-hostable via `next/font/google`. Geist for body is the same. Both are retained                                                                                                               | BD-9               |
| R5  | Pre-launch photo shoot as a procurement requirement                 | Accepted in spirit (BD-5) but reframed as a _gate_, not a _procurement plan_. The club may source photos from existing match archives, volunteer photographers, or a single targeted session. The spec mandates the gate, not the method                                      | Refinement of BD-5 |
| R6  | Add an "impact statement detailing where funds go"                  | The club is not currently fundraising publicly (donation deferred). An impact statement now would be premature and would expose claims that cannot yet be verified. Add only when public giving launches                                                                      | Scope discipline   |
| R7  | Treat reduced nav as a one-time IA decision                         | IA can evolve. Community is held conditional, not permanently deleted. If real content emerges, it can be promoted via DECISION_LOG entry                                                                                                                                     | BD-3               |
| R8  | Specify an invisible CAPTCHA as a "standby toggle"                  | Premature complexity. Honeypot + server-side rate limiting handles 99% of automated abuse. Add Cloudflare Turnstile or hCaptcha only if real abuse is observed in analytics                                                                                                   | Scope discipline   |

---

## 4. Decision Log

Append-only. Each entry references prior DECISION_LOG IDs where applicable. New entries continue the existing numbering convention from the project's `DECISION_LOG.md`.

### D-024 — Content format

- Status: Approved
- Decision: Structured content stored as JSON validated by Zod at build time. Long-form prose stored as MDX. Raw TypeScript content modules removed from the operator workflow.
- Rationale: Operator durability for Windows-based, non-engineering editors. A missing comma in TypeScript fails CI; a missing comma in JSON also fails, but the format is more familiar and editor tooling (GitHub web UI, VSCode for Web) provides better error highlighting. MDX gives prose editors a low-syntax surface.
- Maps to: BD-1
- Supersedes: implicit author-pass content model

### D-025 — Support page removed from MVP

- Status: Approved
- Decision: No public Support page in MVP. Donation language and surface are absent. Non-monetary support routes (volunteer, partnership, advocacy) are folded into About (volunteer/community language) and Sponsors (partnership language).
- Rationale: Publishing a Support page with deferred giving advertises incomplete compliance. The credibility cost outweighs any optionality benefit.
- Maps to: BD-2
- Supersedes: author-pass Section 10 inclusion of `/support`

### D-026 — Reduced primary navigation

- Status: Approved
- Decision: Primary nav contains six items: Home, About, Team, Sponsors, Join, Contact. Community is conditional and defaults off. Code of Conduct is footer-linked.
- Rationale: Information density and CTA clarity. A small club with limited content cannot credibly fill eight nav surfaces.
- Maps to: BD-3
- Supersedes: author-pass Section 9.1

### D-027 — Two-form architecture

- Status: Approved
- Decision: Two forms in MVP. (1) Sponsor Inquiry, dedicated, premium presentation, 5 fields. (2) General Interest, single form with category selector for Player, Coach/Mentor, Volunteer, General, used on Join and Contact pages.
- Rationale: Preserve sponsor funnel quality without tripling form maintenance.
- Maps to: BD-4
- Supersedes: author-pass three-form model

### D-028 — Photography gate

- Status: Approved
- Decision: Minimum 3 authentic Titans photographs required before public launch. Typography-forward layout permitted only as a localized fallback for one hero or one page section.
- Rationale: A cricket club without faces reads as fictional.
- Maps to: BD-5
- Refines: author-pass typography-forward mode

### D-029 — Sponsor and General Interest auto-responder

- Status: Approved
- Decision: Both forms send an immediate auto-responder confirming receipt and setting a response-time expectation. Sending domain is `mail.newyorktitans.org` with SPF, DKIM, and DMARC configured.
- Rationale: Sponsors evaluate responsiveness in seconds. Email deliverability requires authentication discipline from day one.
- Maps to: BD-6

### D-030 — PR-only governance preserved

- Status: Approved
- Decision: All changes to `main`, including content edits, ship via pull request with at least one reviewer approval. Direct commits to `main` are prohibited.
- Rationale: The fragility argument is resolved by the format change (D-024). Governance discipline is preserved.
- Maps to: BD-7

### D-031 — Visual regression preserved minimally

- Status: Approved
- Decision: Playwright screenshot baselines for Home, Sponsors, and Join (which renders the General Interest form) at mobile (375px) and desktop (1280px) breakpoints. Six baselines total. No expansion without DECISION_LOG entry.
- Rationale: Lowest-cost defense against design drift. Single config file. Maintenance cost negligible.
- Maps to: BD-8

### D-032 — Logo asset disposition

- Status: Approved
- Decision: Current vectorized primary/full mark and emblem mark used as interim approved assets. Logo refinement work is non-blocking and does not gate IA, copy, or implementation.
- Rationale: Avoid analysis paralysis. Logo can be refined post-launch without site changes if marks are SVG.
- Maps to: BD-10

### D-033 — Confirmation of stack and typography

- Status: Approved (promotes prior Provisional)
- Decision: Promote D-007 (Vercel) and D-008 (Next.js) from Provisional to Approved. Confirm Fraunces (display) + Geist (body) as the typographic system. No compelling rebuttal exists for any alternative.
- Rationale: Resolution stability prevents future agent drift.
- Maps to: BD-9

---

## 5. Final Positioning Statement

**Public-facing:**
New York Titans is building more than a cricket team. It is building a home for cricket, character, leadership, and community in New York.

**Internal positioning (do not publish):**
A New York nonprofit/community-first cricket club that uses the discipline of the game to develop players, strengthen families, and earn the credibility to become a serious civic institution.

**Three approved framing phrases (use sparingly, never together):**

- "More than a team. A home for cricket in New York."
- "Standards on the field. Character off it."
- "Built in New York. Built to last."

---

## 6. Final Sitemap

### 6.1 Primary navigation (6 items)

- Home `/`
- About `/about`
- Team `/team`
- Sponsors `/sponsors`
- Join `/join`
- Contact `/contact`

### 6.2 Conditional (default OFF for launch)

- Community `/community` — promoted only if real photographic and copy content exists. Otherwise, community pillars (Youth Development, Belonging, Leadership Through Sport) are folded into About.

### 6.3 Footer-only links

- Code of Conduct `/code-of-conduct`
- Privacy `/privacy`
- Accessibility `/accessibility`

### 6.4 Utility (no nav placement)

- 404 `/404`
- `/sponsors/thanks`
- `/join/thanks`
- `/contact/thanks`

### 6.5 Removed from MVP

- `/support` (D-025)
- `/updates` (default off pending publishing rhythm)

---

## 7. Final MVP Scope

### 7.1 Pages shipped

Home, About, Team, Sponsors, Join, Contact, Code of Conduct (public summary), Privacy, Accessibility, 404, three thank-you pages.

### 7.2 Functional surfaces

- Sponsor Inquiry form (dedicated; 5 fields).
- General Interest form (used on Join and Contact; 6 fields including category selector).
- Both forms route via Resend to a Titans-controlled inbox; both fire an immediate auto-responder.
- Static images served via `next/image`.
- Privacy-first analytics (Plausible).
- Domain canonical and redirects configured.
- OG/social preview images for the 6 navigable pages plus Code of Conduct.
- Sitemap, robots.txt, schema.org Organization markup.
- Code of Conduct PDF download (using existing source document).

### 7.3 Non-functional gates

- WCAG 2.2 AA baseline.
- Mobile-first; real-device QA on iOS Safari and Android Chrome.
- Lighthouse Mobile CI gates for Home and Sponsors:
  - **Hard CI gates (always enforced):** Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95, Performance ≥ 90.
  - **LCP enforcement:** During active development, LCP is enforced as a non-regression ratchet (must not exceed the current accepted baseline; baseline may only move downward, except by explicit Decision Log entry plus human approval for a surface-changing reset). Final launch requires LCP ≤ 2.5s median on 4G mobile for both Home and Sponsors. Current active-development baselines are recorded in DECISION_LOG.md. See D-034 through D-037.
- axe-core scan in CI for every public route.
- Playwright visual regression for Home, Sponsors, Join at 375px and 1280px.
- Build-time JSON schema validation via Zod.
- Minimum 3 authentic Titans photographs in production assets.
- Sponsor inquiry form tested end-to-end from a real mobile device with confirmed email receipt.

---

## 8. Final Deferred Scope

Each requires a DECISION_LOG entry to enter scope.

- Updates/news system.
- Public donation pathway and Support page.
- Sponsor deck PDF download surface.
- Donor or supporter campaign pages.
- Newsletter capture.
- Image gallery beyond hero and inline section moments.
- Event registration.
- Public fixtures or results module.
- Roster CMS migration.
- Multilingual rollout.
- Merchandise.
- Mobile app.
- Live scoring.
- Forum, comments, or reactions.
- AI features of any kind.
- Personalization or accounts.
- Community page (conditional promotion only).

---

## 9. Final PRD

### 9.1 Problem Statement

New York Titans needs a credible digital flagship that converts a small number of high-intent visitors (sponsors, parents, prospective players) without imposing operational burden the club cannot sustain. Existing club sites in this category are either generic templates that destroy sponsor trust, or over-engineered franchise platforms the club cannot maintain.

### 9.2 Solution

A six-page, mobile-first, statically generated marketing website built on Next.js + Vercel. Content lives as JSON (structured) and MDX (prose), validated at build time. Two forms route to a Titans-controlled inbox via Resend, with immediate auto-response. The site is deliberately small, intentionally beautiful, and operationally trivial to maintain. The Code of Conduct is surfaced as a public trust artifact, not buried in legal boilerplate.

### 9.3 User Stories

**Sponsor and partner.**

- I can identify the club's mission, values, and community focus within 30 seconds.
- I can find a partnership pathway from any major page in under two clicks.
- I can submit an inquiry in under 60 seconds without creating an account.
- I receive an immediate email confirming receipt and a response-time expectation.
- I can verify the club's seriousness by reading its public Code of Conduct summary.

**Player and family.**

- I can understand what joining Titans demands and offers in clear, non-corporate language.
- I can see the club's stated standards on conduct, drugs, alcohol, and respect.
- I can submit interest without uploading a resume, paying anything, or creating an account.

**Volunteer and coach.**

- I can understand the club's developmental philosophy and decide whether to contribute.
- I can submit interest with a single short form and a clear role pick.

**Operator.**

- I can edit roster, sponsor names, and contact details by editing a JSON file via GitHub web UI.
- I can edit page prose by editing an MDX file via GitHub web UI.
- I can preview every change before merge via the Vercel preview URL.
- I receive every form submission in a single inbox with the submitter's email as Reply-To.

**Mobile and accessibility.**

- Every page is comfortable to read one-handed on a 5.5-inch phone.
- Every interactive element is reachable by keyboard.
- A screen reader can navigate the structure and complete every form.

### 9.4 Implementation Decisions

- Stack: Next.js 14+ (App Router) + TypeScript strict + Tailwind CSS, deployed on Vercel.
- Rendering: Static generation for all public pages. Server actions only for form submission.
- Content: JSON validated by Zod for structured data; MDX for long-form prose. No CMS.
- Forms: React Hook Form + Zod, server action submission, Resend for transactional email.
- Auto-responders: Branded HTML + plain-text fallback, sent from `mail.newyorktitans.org` with SPF, DKIM, DMARC.
- Spam: Honeypot + server-side rate limit (1 submission per IP per 30 seconds). No CAPTCHA in MVP.
- Images: Local optimized assets in `/public/images/`, served via `next/image`. Minimum 3 authentic photos at launch.
- Fonts: Self-hosted Fraunces (display) and Geist (body) via `next/font/google`.
- Analytics: Plausible.
- Logo: Current vectorized primary and emblem marks (SVG).
- Code of Conduct: Public summary page at `/code-of-conduct`, full PDF available for download.

### 9.5 Testing Decisions

- CI gates (build fails on any failure):
  - TypeScript type-check.
  - ESLint.
  - Zod schema validation of all JSON content.
  - axe-core accessibility scan on every public route.
  - Lighthouse CI for Home and Sponsors (mobile profile, thresholds in Section 7.3).
  - Playwright visual regression for Home, Sponsors, Join at 375px and 1280px.
- Manual gates before each launch:
  - REVIEW_CHECKLIST.md run end to end.
  - Both forms submitted from a real mobile device with confirmed email receipt and confirmed auto-responder delivery.
  - Domain canonical and redirects verified.
  - OG previews verified on iMessage, WhatsApp, Slack, LinkedIn.
  - Code of Conduct summary verified to match source document accurately.

### 9.6 Out of Scope

See Section 8 and the project's `OUT_OF_SCOPE.md`. No exceptions without a DECISION_LOG entry.

### 9.7 Further Notes

- The Code of Conduct, surfaced honestly, is the highest-leverage trust artifact this club has and should be treated accordingly.
- The most likely failure mode is not feature shortage; it is design drift, content rot, and overbuild. The CI gates and binding decisions are designed to prevent each.

---

## 10. Final Build Spec

### 10.1 Recommended stack

- **Framework:** Next.js 14+ (App Router), TypeScript strict mode.
- **Styling:** Tailwind CSS 3.x. Custom design tokens in `/lib/tokens.ts` consumed by Tailwind config and components.
- **Components:** Hand-built primitives. shadcn/ui only for accessibility-critical primitives that benefit from headless foundations (Dialog for mobile drawer, Form primitives if useful), heavily restyled. No shadcn defaults.
- **Fonts:** Fraunces (display) + Geist (body), self-hosted via `next/font/google`.
- **Icons:** `@phosphor-icons/react` with single uniform stroke weight (1.5). No emoji.
- **Forms:** React Hook Form + Zod schema. Server actions for submission.
- **Email:** Resend (free tier sufficient for expected volume). Verified sending subdomain.
- **Animation:** Framer Motion only for hero reveals, section fade-in, and the mobile drawer. Zero ambient animation.
- **Analytics:** Plausible.
- **Spam control:** Honeypot field + server-side rate limit. CAPTCHA only if abuse appears.
- **Content validation:** Zod schemas in `/lib/schemas/`, executed at build time via a `scripts/validate-content.ts` script run in CI.

### 10.2 Rendering strategy

- Static generation for every public page. No ISR. No on-demand revalidation.
- Server actions only at the form submission boundary.
- Content updates ship via merge to `main`, which triggers a Vercel deploy.

### 10.3 Page structure

```
/app
  /(marketing)
    /page.tsx                         -> Home
    /about/page.tsx
    /team/page.tsx
    /sponsors/page.tsx
    /join/page.tsx
    /contact/page.tsx
    /code-of-conduct/page.tsx
    /privacy/page.tsx
    /accessibility/page.tsx
    /sponsors/thanks/page.tsx
    /join/thanks/page.tsx
    /contact/thanks/page.tsx
  /api/health/route.ts
  /sitemap.ts
  /robots.ts
  /not-found.tsx
/components
  /ui                                 -> Button, Container, Heading, Eyebrow, RuleGold, Image
  /layout                             -> Header, MobileDrawer, Footer
  /sections                           -> Hero, MissionStrip, ValuePillars, StoryBlock, SponsorCTA, SplitCTA, LeadershipRow, RosterGrid, PartnershipThemes, CodeSummaryBlock
  /forms                              -> SponsorForm, GeneralInterestForm, FormField, FormError, FormSuccess, Honeypot
/content
  /site.json                          -> name, urls, contact, socials, footer
  /home.json
  /team.json                          -> roster + leadership
  /sponsors.json                      -> page content + supporter list (may be empty)
  /code-of-conduct.json               -> structured summary blocks
  /pages                              -> long-form prose
    /about.mdx
    /join.mdx
    /contact.mdx
    /privacy.mdx
    /accessibility.mdx
    /code-of-conduct-full.mdx         -> public summary body
  /README.md                          -> operator editing instructions
/lib
  /schemas                            -> Zod schemas, one per JSON file
  /email.ts                           -> Resend wrapper
  /validation.ts                      -> Zod input validation for forms
  /analytics.ts                       -> Plausible event helpers
  /tokens.ts                          -> design tokens (colors, spacing, type scale)
/public
  /images
  /og
  /downloads                          -> code-of-conduct.pdf
/scripts
  /validate-content.ts                -> runs Zod validation against all JSON in CI
```

### 10.4 Component architecture

- Server Components by default.
- Client Components only for: forms, mobile drawer, motion-bearing leaf components.
- One `Container` (`max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12`) used everywhere.
- One CTA system with three variants: Primary (filled gold), Secondary (outlined white), Tertiary (text link).
- Cards used only when grouping parallel objects. Editorial blocks remain editorial.
- All MDX rendered through a single `<Prose>` component that applies typography rules consistently.

### 10.5 Content ownership model

- All structured content lives in `/content/*.json`. All long-form prose lives in `/content/pages/*.mdx`.
- Every JSON file has a matching Zod schema in `/lib/schemas/`. The `scripts/validate-content.ts` script runs in CI and fails the build on any schema violation.
- Editing flow:
  1. Operator opens GitHub web UI.
  2. Edits the relevant JSON or MDX file on a new branch.
  3. Opens a PR.
  4. Vercel generates a preview URL automatically.
  5. Reviewer verifies preview on mobile and desktop.
  6. Reviewer approves; merge to `main` triggers production deploy.
- A `/content/README.md` explains every field with an example for every file. A separate `/docs/operations.md` documents the editing workflow with screenshots.

### 10.6 Form handling approach

- React Hook Form for client state. Zod for input validation.
- Server action validates input, runs honeypot check, checks rate limit, sends to Resend.
- Two distinct sending paths:
  - **Sponsor Inquiry**: routes to `partnerships@newyorktitans.org` (alias to operator inbox), with sponsor-specific auto-responder.
  - **General Interest**: routes to `inquiries@newyorktitans.org` with category in subject line, with category-specific auto-responder text.
- Auto-responder details:
  - From: `New York Titans <noreply@mail.newyorktitans.org>`.
  - Reply-To: same operator-monitored inbox the inquiry was sent to.
  - Body: branded HTML + plain-text fallback. Confirms receipt, sets a 3-business-day response expectation, restates the club's contact details, links to Code of Conduct.
- Success state: redirect to `/{form}/thanks` with a clear next-step message.
- Failure state: inline message with retry guidance and direct contact email as fallback.

### 10.7 Image handling approach

- All images in `/public/images/{section}/`.
- All `<Image>` use explicit width/height; no layout shift permitted.
- Hard launch gate: minimum 3 authentic Titans photographs in production assets, distributed across Home, Team, and one of About or Sponsors.
- Typography-forward fallback permitted only as a localized substitute for one hero or one section, not as the site's primary posture.
- Image art direction brief in `/docs/IMAGE_BRIEF.md` for any future photographer.

### 10.8 Deployment model

- Vercel project linked to GitHub `main` branch.
- Preview deploys for every PR (mandatory for review).
- Production protected: only merges to `main` deploy to production. Direct commits to `main` prohibited via branch protection rules.
- Domains:
  - `www.newyorktitans.org` (canonical).
  - `newyorktitans.org` (apex, 308 to www).
- HTTPS enforced. HSTS enabled after 30-day burn-in.
- Email DNS: SPF, DKIM, DMARC configured for `mail.newyorktitans.org`. DMARC starts at `p=none`, escalates to `p=quarantine` after 30 days of clean reports.

### 10.9 Phased rollout

**Phase 0 — Foundations (week 1).**
Domain confirmation. Repo bootstrap. Design tokens, typography, color, base components (Container, Header, Footer, MobileDrawer, Button, Heading, Eyebrow, Image). Zod schemas for all content files. Empty content scaffolding.

**Phase 1 — MVP build (weeks 2 to 4).**
All six nav pages plus Code of Conduct, Privacy, Accessibility, 404, three thanks pages. Both forms wired and tested end-to-end with auto-responders. Analytics live. OG images shipped. CI gates passing. Three authentic photos integrated. REVIEW_CHECKLIST.md run end to end.

**Phase 2 — Tighten (week 5).**
Real photography pass. Copy refinement. Sponsor outreach prep. Visual regression baselines locked.

**Phase 3 — Conditional follow-ons (post-launch, only via DECISION_LOG approval).**
Updates page, donation pathway, Support page reintroduction, Community page promotion, sponsor deck PDF, expanded gallery.

### 10.10 Future extension path

- If a publishing rhythm proves real (≥1 update per 6 weeks for 3 months): introduce flat-file MDX-based Updates surface. No CMS.
- If donation is approved by counsel: add a single Donate page with one trusted processor (Stripe Climate or fiscal sponsor embed). Reintroduce a Support surface. No donor CRM.
- If roster grows beyond ~30 active players with frequent edits: migrate `/content/team.json` to Sanity free tier or Decap CMS. Not before.
- If sponsor program scales to >5 partners: add a single sponsor case study template. No sponsor portal.

---

## 11. Final DESIGN.md

### 11.1 Brand personality

Premium. Disciplined. Electric. Cinematic. Trustworthy. Welcoming. Community-rooted. Future-facing.
Never: cheap, generic, overanimated, startup-SaaS, template, cluttered, cold corporate.

### 11.2 Emotional tone

Pride without arrogance. Standards without coldness. Ambition without performance. Warmth without sentimentality.

### 11.3 Typography hierarchy

**Fonts (locked).**

- Display: **Fraunces** variable, self-hosted via `next/font/google`. Weights 500 to 700. Use the optical-size axis to enhance large headlines.
- Body and UI: **Geist Sans** self-hosted. Weights 400, 500, 600.
- Monospace: **Geist Mono**, only for technical labels if needed; likely unused in MVP.

**Banned:** Inter, Poppins, novelty sports fonts, faux-condensed display fonts.

**Scale (mobile-first, fluid).**

- Hero display: `clamp(2.75rem, 8vw, 5.5rem)`, tracking -0.02em, leading 0.95.
- Section heading: `clamp(2rem, 5vw, 3.25rem)`, tracking -0.015em.
- Subheading: 1.25rem to 1.5rem, weight 500.
- Body: 1.0625rem mobile, 1.125rem desktop, leading 1.6, max-width 65ch.
- Caption: 0.875rem, color Steel Mist on dark backgrounds.

**Rules.**

- Two font families maximum.
- No all-caps paragraphs.
- Never use Titan Gold for body text on dark backgrounds.
- Reading line length never exceeds 70 characters.

### 11.4 Spacing rhythm

- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.
- Section vertical padding: 96px mobile, 144px desktop. Hero sections: 128px mobile, 192px desktop.
- Container horizontal padding: 24px mobile, 32px tablet, 48px desktop.
- Card internal padding: 32px mobile, 40px desktop.
- Stack gap between paragraph and CTA cluster: 32px minimum.

### 11.5 Color system

**Foundation.**

- Titan Midnight `#0A1020` — primary background.
- Hudson Navy `#111A33` — secondary background, header.
- Graphite `#1A1F29` — card and surface.
- City White `#F7F4EE` — primary text on dark; primary background on light sections.
- Steel Mist `#C8CEDA` — secondary text on dark, hairlines.

**Accents.**

- Titan Gold `#D6A84F` — primary accent. CTAs, dividers, premium emphasis. Never for body text.
- Electric Field Blue `#3E7BFA` — reserved utility accent. Focus rings, link hover, validation states. Never decorative.

**Rules.**

- Dark foundation dominates; light sections are intentional editorial breaks.
- One gradient per page maximum; subtle and controlled.
- Never combine Gold and Electric Blue at equal visual weight.
- Body text contrast minimum 7:1 on dark backgrounds. Verify per shipped page.

### 11.6 Page composition rules

**Hero rules.**

- One dominant headline. One supporting sentence. Maximum two CTAs. One image, video, or texture.
- Banned: 4-CTA hero, hero bullet lists, autoplay video without static fallback, full-screen rotating carousels.
- Mobile hero: text first, image after; never overlay headline on a busy image.
- Use `min-h-[100dvh]` not `h-screen`.

**Section rules.**

- Each section does exactly one of: build trust, tell the story, prove community impact, drive action, clarify structure.
- One H2 per section. No competing equal-weight headings.

**Footer rules.**

- Three columns desktop; stacked mobile.
- Required: contact email, primary nav, sponsor CTA, social links, organization name, copyright, links to Code of Conduct, Privacy, Accessibility.

### 11.7 Imagery rules

- Real photography preferred. AI-generated people imagery banned.
- Art direction: warm light, real moments, controlled grain, no oversaturated edits.
- Image priorities: team identity, action, mentoring, community, families, environmental New York context.
- Hard gate: minimum 3 authentic photos at launch.
- Typography-forward fallback permitted only for one hero or one section, not the entire site.
- Banned: skyline stock, clip-art cricket bats, fluorescent stadium clichés.

### 11.8 Card rules

- Cards only when content is parallel and benefits from containment.
- Single card style across the site: Graphite background, 1px Steel Mist border at 10% opacity, 16px radius, 32px padding, no drop shadow.
- Never use cards for hero, story, or primary narrative blocks.
- Banned: 3-equal-card feature rows on Home or About. Use 2-up zigzag or asymmetric grids.

### 11.9 CTA rules

- Three styles only.
  - Primary: Titan Gold background, Titan Midnight text, weight 600, 12px radius, 16px/24px padding, hover slight darken, active translate-y -1px.
  - Secondary: transparent background, City White text, 1px City White border at 60% opacity, hover full opacity.
  - Tertiary: text link with animated underline.
- Primary CTA appears at most once per viewport on mobile.
- Sponsor CTA persists in global header on desktop; in the mobile drawer.

### 11.10 Motion rules

- Allowed: 200-400ms fade-up on first scroll into view, smooth header reveal, mobile drawer slide.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for reveals. Spring (stiffness 100, damping 20) for any interactive press.
- Banned: parallax abuse, infinite ambient animation, character-by-character typewriter on body copy, scroll hijacking, full-page locomotive scroll, magnetic cursors, custom cursors, glitch effects, hover-image-trail.
- Honor `prefers-reduced-motion`: disable all reveals; replace with instant final state.

### 11.11 Accessibility guardrails

- WCAG 2.2 AA target.
- Body text contrast minimum 7:1 on dark backgrounds.
- Visible focus ring using Electric Field Blue, 2px offset.
- All interactive elements reachable via keyboard in logical order.
- Forms: labels above inputs, helper text below, error text below input with `aria-describedby`.
- Informative images: meaningful alt text. Decorative: empty alt.
- One H1 per page. Logical heading hierarchy.
- Never convey meaning by color alone.
- Skip link on every page.

### 11.12 Forbidden patterns

- Generic AI gradient soup.
- Glassmorphism without functional reason.
- 3D tilt cards.
- Animated counters of fake stats.
- Fake sponsor dashboards.
- Holographic foil effects.
- Default shadcn theming.
- Inter font.
- Lila/violet brand glows.
- Pure black `#000000` backgrounds (use Titan Midnight).
- Fake percentages (99.9%, etc.).
- Carousels of more than 3 items on a marketing page.
- Hero overlays with low contrast text on busy imagery.
- Decorative noise filters on scrolling containers.
- Bronze/Silver/Gold sponsor tier branding.

---

## 12. Final Page-by-Page Wireframes

### 12.1 Home

1. Header (persistent Sponsor CTA on desktop; burger on mobile).
2. Hero: one headline, one supporting sentence, two CTAs (Partner With Us primary; Join Titans secondary), one strong image (one of the 3 authentic photos).
3. Mission strip: single sentence, quiet band, Titan Gold rule above.
4. Three pillars (Compete, Develop, Serve): asymmetric layout, not three equal cards.
5. **Sponsor block** (placed early to capture 90-second sponsors): strong heading, one paragraph, single Primary CTA, optional supporter strip if real.
6. Story block: editorial two-column on desktop, image left, copy right.
7. Split CTA: Join Titans (left) + Code of Conduct trust line (right). Replaces former Support CTA. The Code of Conduct line reads: _"We hold ourselves to a written standard. Read it."_ with a quiet underline link to `/code-of-conduct`.
8. Footer.

Banned on Home: rotating carousel hero, animated counters, 3-equal-card feature row, parallax sections, social embeds.

### 12.2 About

1. Hero: "About New York Titans".
2. Organization summary in long-form prose (max 65ch), rendered from `/content/pages/about.mdx`.
3. Mission and Vision: two-column editorial block.
4. Values block: six values, editorial list with short body for each. Not a 3x2 card grid.
5. **Community pillars (folded in from removed Community page):** brief Youth Development, Belonging, and Leadership Through Sport blocks, presented editorially.
6. Standards summary: 2-3 sentences pointing to `/code-of-conduct`.
7. Closing CTA strip: Partner With Us / Join Titans.

### 12.3 Team

1. Hero: "The People Behind Titans".
2. Leadership row: 2-4 named individuals if real and approved, with role and 1-sentence bio.
3. Roster grid: image, name, role, batting/bowling. Grouped by role (Batters, Bowlers, All-Rounders, Wicketkeepers).
4. Culture statement: editorial block.
5. CTA: Join Titans.

If photography is unavailable for the full roster at launch, ship Team with leadership only and a short "full roster coming soon" line. Never use silhouette placeholders.

### 12.4 Sponsors

1. Hero: sponsor-focused headline.
2. Why Partner: one-screen narrative.
3. Who We Reach / Why It Matters: honest framing of current scale and ambition. Includes folded-in non-monetary partnership language (volunteer partnerships, in-kind support).
4. Partnership themes: Founding, Community, Youth Development, Team Support. Editorial block per theme. Not Bronze/Silver/Gold.
5. Existing supporters strip if real; omitted if empty.
6. Sponsor Inquiry form embedded at bottom: 5 fields, one button, one sentence on response time.

### 12.5 Join

1. Hero.
2. What joining means: short prose from `/content/pages/join.mdx`.
3. Three pathways (Player, Coach/Mentor, Volunteer/Supporter): each a 1-paragraph description with a CTA scrolling to the form.
4. **General Interest form** with category selector (Player, Coach/Mentor, Volunteer, General).
5. Expectations summary referencing `/code-of-conduct`.

### 12.6 Contact

1. Hero.
2. **Same General Interest form** with category pre-set to "General" but switchable.
3. Direct email and social links.
4. Optional one-line New York reference if a public location is appropriate.

### 12.7 Code of Conduct (public summary)

1. Hero: "Our Standards".
2. Summary covering Behavior, Vilification, Substance Policy, Members Guidelines, Social Media. Rendered from `/content/pages/code-of-conduct-full.mdx`.
3. Quote of the values list with short framing.
4. Download link to the full PDF.
5. CTA: Join Titans.

### 12.8 Thank-you pages

- Single shared layout. Confirms receipt. States the response-time expectation. Provides a return-to-home link and a direct contact email as a fallback. Does not auto-redirect.

---

## 13. Final Component Inventory

Implement only what is listed.

**Layout.**

- `Header` (server, with Client trigger for mobile drawer).
- `MobileDrawer` (client).
- `Footer` (server).
- `Container`.
- `Section` (handles vertical padding rhythm).
- `PageHero`.

**Typography and primitives.**

- `Heading` (level prop: 1-4).
- `Eyebrow` (small caps label).
- `Prose` (wraps MDX with safe defaults).
- `RuleGold` (thin gold divider).
- `Image` (wraps `next/image`, enforces alt text).

**CTA.**

- `Button` (variant: primary | secondary | tertiary).
- `LinkArrow` (text link with animated underline).

**Sections.**

- `MissionStrip`.
- `ValuePillars`.
- `StoryBlock` (editorial two-column).
- `SponsorCTA`.
- `SplitCTA`.
- `LeadershipRow`.
- `RosterGrid`.
- `PartnershipThemes`.
- `CodeSummaryBlock`.
- `ConductTrustLine` (the small "we hold ourselves to a written standard" surface used on Home).

**Forms.**

- `SponsorForm`, `GeneralInterestForm`.
- `FormField`, `FormError`, `FormSuccess`.
- `Honeypot`.

**Utility.**

- `LogoStrip` (only if real supporters exist; renders nothing if list is empty).
- `SocialLinks`.

**Banned in MVP.**

- Carousel of any kind.
- Tabs.
- Accordion (Code of Conduct may use one only if document grows beyond a single readable scroll; not in MVP).
- StatsCounter.
- TestimonialSlider.
- VideoHero.
- Modal (except mobile drawer).

---

## 14. Final Content Model

All structured data in JSON. All long-form prose in MDX. Every JSON file has a Zod schema. The build fails on any schema violation.

### 14.1 Schemas (Zod, illustrative shapes)

```ts
// /lib/schemas/site.ts
export const SiteSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().url(),
  contactEmail: z.string().email(),
  partnershipsEmail: z.string().email(),
  socials: z.object({
    instagram: z.string().url().or(z.literal("")),
    x: z.string().url().or(z.literal("")),
    facebook: z.string().url().or(z.literal("")),
    linkedin: z.string().url().or(z.literal("")),
    youtube: z.string().url().or(z.literal("")),
  }),
  footer: z.object({
    orgSummary: z.string().min(1),
    address: z.string().or(z.literal("")),
  }),
});
```

```ts
// /lib/schemas/team.ts
const PlayerRole = z.enum(["Batter", "Bowler", "All-Rounder", "Wicketkeeper"]);

const Player = z
  .object({
    name: z.string().min(1),
    role: PlayerRole,
    battingStyle: z.string().optional(),
    bowlingStyle: z.string().optional(),
    bio: z.string().max(280).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    isCaptain: z.boolean().optional(),
    isViceCaptain: z.boolean().optional(),
    isMinor: z.boolean().optional(),
    consentRecorded: z.boolean().optional(),
  })
  .refine((p) => !p.isMinor || p.consentRecorded === true, {
    message: "Minors require recorded consent before publication.",
  });

const Leader = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  bio: z.string().max(400).optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

export const TeamSchema = z.object({
  leadership: z.array(Leader),
  roster: z.array(Player),
  cultureStatement: z.string().min(1),
});
```

```ts
// /lib/schemas/sponsors.ts
const Supporter = z.object({
  name: z.string().min(1),
  logo: z.string(),
  url: z.string().url().optional(),
  tier: z.enum(["Founding", "Community", "Youth Development", "Team Support"]).optional(),
});

export const SponsorsSchema = z.object({
  hero: z.object({
    headline: z.string(),
    sub: z.string(),
  }),
  whyPartner: z.string(),
  themes: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
  supporters: z.array(Supporter), // empty array = render nothing
});
```

Apply analogous schemas for `home.json` and `code-of-conduct.json`. Pages render gracefully when arrays are empty (omit the section; never display "Coming soon" placeholder text).

### 14.2 Long-form prose

- `/content/pages/about.mdx` — About body.
- `/content/pages/join.mdx` — Join page body.
- `/content/pages/contact.mdx` — Contact page intro.
- `/content/pages/privacy.mdx` — Privacy policy.
- `/content/pages/accessibility.mdx` — Accessibility statement.
- `/content/pages/code-of-conduct-full.mdx` — Code of Conduct public summary body.

MDX permits headings, paragraphs, lists, and a small number of approved components: `<Eyebrow>`, `<RuleGold>`, `<Button>`. No arbitrary HTML. No script tags.

### 14.3 Build-time validation

- `scripts/validate-content.ts` reads every JSON file, runs the matching Zod schema, exits non-zero on failure.
- Wired into the `prebuild` npm script. CI fails the build on any schema violation.
- This means the format remains operator-friendly (JSON in GitHub web UI), and the build remains type-safe.

---

## 15. Final Motion and Visual Rules

### 15.1 Motion (operational)

- One reveal pattern: opacity 0→1, translateY 16px→0, duration 0.6s, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Use Framer Motion `whileInView` with `viewport={{ once: true, margin: "-10%" }}`.
- Stagger children by 80ms maximum.
- Hover transitions: 150ms ease-out on color, 200ms on transform.
- Active press: scale 0.98 OR translateY -1px, never both.
- Honor `prefers-reduced-motion`: a single `useReducedMotion` hook used by every motion component, disables reveals, leaves hover/press untouched.
- Banned: `useEffect` scroll listeners, parallax, magnetic buttons, perpetual ambient animations, animated gradient blobs.

### 15.2 Visual (operational)

- Default page background: Titan Midnight. Light editorial sections are intentional, not the default.
- Use Titan Gold for: primary CTAs, section dividers, eyebrow accents, key emphasis. Never body text.
- Use Electric Field Blue only for: focus ring, link hover, validation indicators.
- Maximum two competing colors per viewport (foundation + accent).
- Whitespace is a feature, not a gap.
- No 3-equal-card feature rows.
- Avatar fallback: monogram in Titan Gold on Graphite. Never default user-icon glyph.
- All design tokens (colors, spacing, type scale) live in `/lib/tokens.ts` and are imported by both Tailwind config and components. The DESIGN.md numbers must match the tokens file. Drift between them is a CI failure (a small unit test can verify).

---

## 16. Final Technical Architecture

### 16.1 Top-level

- Next.js 14+ App Router, TypeScript strict.
- Static generation; server actions only for forms.
- Tailwind CSS with custom tokens.
- No database. No auth. No CMS. No backend services beyond Resend.

### 16.2 Forms architecture

- React Hook Form (client state) + Zod (input schema).
- On submit: client-side validation → server action → server-side Zod re-validation → honeypot check → rate-limit check → Resend dispatch (inquiry email + auto-responder) → redirect to thank-you page.
- Rate limit: in-memory LRU keyed by IP, 1 submission per IP per 30 seconds. Sufficient for expected volume; replace with Vercel KV only if traffic justifies it.
- Failure modes:
  - Validation error → inline message, retry permitted.
  - Rate-limit hit → friendly "we received your earlier submission" message.
  - Resend failure → inline retry message + direct contact email fallback.
- All form events instrumented for Plausible (`form_view`, `form_submit_attempt`, `form_submit_success`, `form_submit_error`).

### 16.3 Email architecture

- Sending domain: `mail.newyorktitans.org` (subdomain to isolate sending reputation from primary domain).
- DNS records before launch:
  - SPF: `v=spf1 include:_spf.resend.com ~all` on `mail.newyorktitans.org`.
  - DKIM: keys provided by Resend, two CNAME records.
  - DMARC: `v=DMARC1; p=none; rua=mailto:dmarc@newyorktitans.org` for the first 30 days, then escalate to `p=quarantine`.
- Two sender identities:
  - `New York Titans <noreply@mail.newyorktitans.org>` for auto-responders.
  - The Reply-To header on auto-responders is set to the inbox the original inquiry was routed to (`partnerships@newyorktitans.org` or `inquiries@newyorktitans.org`).
- Operator inbox is a Google Workspace or equivalent group address that fans out to the human operators.

### 16.4 Auto-responder content

- HTML + plain-text fallback.
- Sponsor auto-responder body (concise):
  > Thank you for reaching out about partnering with New York Titans.
  > We have received your inquiry and will respond within 3 business days.
  > In the meantime, our standards live publicly at newyorktitans.org/code-of-conduct.
  > — The Titans Partnerships Team
- General Interest auto-responder body adapts opening sentence to the selected category (Player / Coach / Volunteer / General).

### 16.5 Performance budget

- **Hard CI gates (always enforced):** Lighthouse Mobile — Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Gated in CI for Home and Sponsors.
- **LCP enforcement:** During active development, LCP is enforced as a per-route non-regression ratchet (must not exceed the current approved baseline for each route; baselines may only move downward, except by explicit Decision Log entry plus human approval for a surface-changing reset). Final launch requires LCP ≤ 2.5s median on 4G mobile for both Home and Sponsors. Current active-development baselines are recorded in DECISION_LOG.md. See D-034, D-035, D-036, and D-037.
- Total page weight: ≤ 800 KB Home, ≤ 600 KB other pages, excluding hero image.
- Hero image: ≤ 300 KB after Next/Image optimization (AVIF/WebP).
- JS shipped to client: ≤ 120 KB gzip Home, ≤ 80 KB other pages.
- CLS ≤ 0.05 every page.
- Third-party scripts: Plausible only (~1 KB).
- Fonts: 2 families, Latin subset, `font-display: swap`.

### 16.6 Security and privacy

- HTTPS enforced. HSTS after 30-day burn-in.
- Strict CSP allowing only self, Plausible, and Resend.
- No cookies set in MVP (Plausible is cookie-free).
- Privacy policy enumerates: form data flow (collected, sent via Resend, retained in operator inbox, not shared), analytics scope, cookie posture.

---

## 17. Final Deployment / Hosting Plan

- **Platform:** Vercel.
- **Plan:** Hobby for MVP. Move to Pro only when collaboration features (password-protected previews for sponsor reviews, larger build minutes) become necessary.
- **Cost ceiling (year one):** Soft cap $25/month combined hosting + email + analytics. If exceeded, raise as a DECISION_LOG entry.
  - Vercel Hobby: $0.
  - Resend free tier (3,000 emails/month): $0. Sufficient.
  - Plausible smallest plan: ~$9/month, or Vercel Web Analytics if cheaper.
  - Domain registration: ~$15/year per domain.
- **Domains:**
  - `www.newyorktitans.org` (canonical).
  - `newyorktitans.org` (apex, 308 to www). Confirm purchase status at project kickoff.
- **Branch protection:** `main` requires PR + 1 approval + green CI. No direct pushes.
- **Backups:** Source of truth is Git. No database. Vercel retains deployment history for one-click rollback.
- **Monitoring:** Vercel built-in. Free uptime ping (UptimeRobot or BetterStack free tier) on `/api/health`.
- **Rollback:** Vercel one-click rollback is the only required path.

---

## 18. Final Testing / QA Plan

### 18.1 CI gates (build fails on any failure)

- TypeScript type-check.
- ESLint.
- Zod validation of all `/content/*.json` via `scripts/validate-content.ts`.
- axe-core accessibility scan on every public route.
- Lighthouse CI for Home and Sponsors (mobile profile, thresholds in 7.3 and 16.5; LCP enforced per-route per D-034/D-037).
- Playwright visual regression for Home, Sponsors, Join at 375px and 1280px (six baselines).
- Token-vs-DESIGN.md drift check (lightweight unit test that asserts color/spacing values match documented tokens).

### 18.2 Manual gates before each launch

- REVIEW_CHECKLIST.md run end to end.
- Both forms submitted from a real iOS device and a real Android device. Confirm:
  - Email received in operator inbox.
  - Auto-responder received in submitter inbox (and not in spam).
  - Reply-To behavior works when operator hits Reply.
- Domain canonical and redirects verified (try `newyorktitans.org`, expect 308 to `www.newyorktitans.org`).
- OG previews verified on iMessage, WhatsApp, Slack, LinkedIn.
- Code of Conduct summary verified to match the source document accurately.
- Three authentic photos confirmed in production assets.
- Screen reader pass on Home, Sponsors, Join with NVDA on Windows.

### 18.3 Post-launch monitoring (first 30 days)

- Daily check on Plausible for form_submit_success counts.
- Weekly check on operator inbox for spam volume; escalate to CAPTCHA if >5 spam submissions per week.
- Weekly DMARC report review; escalate DMARC policy after 30 clean days.

---

## 19. Final Launch Plan

### 19.1 Launch readiness checklist

- All Section 7 MVP scope items shipped.
- All Section 18 gates pass.
- Three authentic photos in production assets (D-028).
- Auto-responders verified for both forms (D-029).
- Email DNS verified (SPF, DKIM, DMARC).
- Branch protection on `main` enforced (D-030).
- Visual regression baselines locked (D-031).
- Logo assets in repo (D-032).

### 19.2 Launch sequence

1. Final content review and merge to `main`.
2. Vercel production deploy.
3. DNS cutover for canonical domain.
4. Confirm HTTPS, redirects, OG previews live.
5. Internal soft-launch announcement to club leadership only; 48-hour observation window.
6. Public announcement to existing club channels.
7. Sponsor outreach using the live site.

### 19.3 Definition of Done

A first-time visitor on a 5.5-inch phone, in 90 seconds:

- Understands what New York Titans stands for.
- Understands this is a serious, values-driven club.
- Knows how to take the next action (Partner, Join, or Contact).
- Has no doubt the organization is real and credible.

If this is not true after the gates pass, the site is not ready.

---

## 20. Final Risk Register

| ID  | Risk                                              | Likelihood       | Impact | Mitigation                                                                                                                     |
| --- | ------------------------------------------------- | ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| R1  | Visual drift into AI-slop generic sports template | High             | High   | DESIGN.md binding. Visual regression baseline (D-031). PR review.                                                              |
| R2  | Form submissions land in spam                     | High             | High   | Verified sending subdomain. SPF/DKIM/DMARC. Auto-responder QA from real iOS/Android devices on launch (D-029, 18.2).           |
| R3  | Photography never materializes                    | Medium           | High   | Hard launch gate of 3 authentic photos (D-028). Image art-direction brief in repo.                                             |
| R4  | Operator breaks the build editing content         | Low (post-D-024) | High   | JSON + MDX with Zod validation. PR previews. Operations doc with screenshots.                                                  |
| R5  | Donation pathway launched before compliance ready | Low              | High   | Support page removed entirely from MVP (D-025). Reintroduction requires DECISION_LOG entry.                                    |
| R6  | Sponsor inquiry receives spam                     | Medium           | Medium | Honeypot + server-side rate limit. Add Cloudflare Turnstile or hCaptcha only if abuse appears.                                 |
| R7  | Coding agent overbuilds the stack                 | Medium           | High   | OUT_OF_SCOPE.md and this pack are binding. AGENTS.md in repo with dependency allowlist. PR review.                             |
| R8  | Roster includes minors without consent            | Low              | High   | Zod schema requires `consentRecorded: true` when `isMinor: true`. Build fails otherwise.                                       |
| R9  | Domain confusion or misconfigured redirects       | Low              | Medium | `www.newyorktitans.org` canonical; apex 308 to www (D-039). No secondary domain (D-038). Pre-launch verification step in 18.2. |
| R10 | Updates page reintroduced and goes stale          | Medium           | Medium | Default OFF. Reintroduction requires documented publishing rhythm and DECISION_LOG entry.                                      |
| R11 | Costs creep past ceiling                          | Low              | Low    | Soft cap $25/month tracked in operations doc; overrun triggers DECISION_LOG entry.                                             |
| R12 | Sole-developer bus factor                         | Medium           | High   | Stack is conventional (Next.js + Vercel). Operations doc + AGENTS.md make handover possible.                                   |
| R13 | Sponsor logo grid embarrassment                   | Medium           | Medium | `LogoStrip` renders nothing when supporter array is empty. Never use placeholder or filler logos.                              |
| R14 | Code of Conduct summary diverges from source PDF  | Low              | Medium | Manual gate at launch (18.2). Operator playbook flags this whenever the source document is updated.                            |

---

## 21. Kill List

Ideas explicitly rejected for MVP. None of these may be reintroduced without a DECISION_LOG entry.

- Public Support page with deferred donation messaging.
- Unified single contact form replacing the dedicated sponsor form.
- Direct commits to `main` for content edits.
- Removing visual regression testing.
- Updates / news page at launch.
- Newsletter signup at launch.
- Sponsor deck PDF download at launch.
- Bronze / Silver / Gold sponsor tier branding.
- Animated stat counters of any kind.
- Carousels of any kind on marketing pages.
- AI-generated imagery of people.
- 3-equal-card feature rows on Home or About.
- Glassmorphism without functional reason.
- Default shadcn theming.
- Inter font.
- Pure black `#000000` backgrounds.
- Custom cursors, magnetic cursors, glitch effects.
- Parallax scrolling.
- Locomotive scroll.
- Mobile app of any kind.
- Live scoring infrastructure.
- Forum, comments, reactions, or chat.
- Member portal of any kind.
- Database, auth, accounts.
- CAPTCHA at launch (added only on observed abuse).
- Cookie banner (Plausible is cookie-free).

---

## 22. Final Recommendation

Ship this. The site is small, sharp, honest, and built to maintain itself. The two-form architecture preserves sponsor funnel quality while halving the maintenance surface from the original three-form plan. The JSON + MDX content model resolves operator fragility without weakening governance. The Code of Conduct, surfaced as a public summary and quietly linked from the homepage, will outperform any feature, animation, or logo grid the site could have shipped. The photography gate prevents the site from feeling fictional at launch.

**0.1% operator move (preserved from the author pass):** A single quiet line above the footer reading _"We hold ourselves to a written standard. Read it."_ with an underline link to `/code-of-conduct`. This is the highest-leverage, lowest-cost trust signal available and costs nothing to implement.

**Tunnel-vision priorities for week 1:**

1. Confirm domains. Confirm Resend account and sending subdomain.
2. Lock design tokens, fonts, colors.
3. Build Header, Footer, Container, three CTA styles, type system.
4. Stand up both forms with auto-responders before any other section is polished.
5. Ship Home and Sponsors first. Everything else second.

**What to ignore:**

- Updates page.
- Newsletter capture.
- Donation pathway.
- Image gallery beyond hero and inline section moments.
- Sponsor tier branding.
- Any animation requiring a library beyond Framer Motion.
- CMS conversation until publishing rhythm is proven for three months.

---

## Final Self-Check

| Criterion                                   | Status | Notes                                                                                              |
| ------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| Sponsor-ready                               | PASS   | Dedicated Sponsor form, persistent CTA, early Home placement, auto-responder                       |
| Low-ops                                     | PASS   | No CMS, no DB, JSON + MDX content, two forms not three, Hobby-tier hosting                         |
| Mobile-first                                | PASS   | Mobile-first scale, real-device QA, 100dvh hero rule                                               |
| Not AI slop                                 | PASS   | Locked typography, banned-pattern enumeration, visual regression baseline                          |
| Nonprofit/community-authentic               | PASS   | Code of Conduct public summary as trust artifact, mission-rooted copy, no inflated metrics         |
| Future-ready without overbuild              | PASS   | Static today; CMS migration path documented but not built; donation reintroduction path defined    |
| Buildable by AI coding agent + human review | PASS   | Concrete stack picks, schema-validated content, AGENTS.md dependency allowlist, PR review required |
| Clear enough for implementation             | PASS   | Page wireframes, component inventory, content schemas, file tree all specified                     |
| Clear enough for design QA                  | PASS   | DESIGN.md operational, visual regression baseline, REVIEW_CHECKLIST integration                    |
| Clear enough for content entry              | PASS   | JSON + MDX, operator playbook, GitHub web UI workflow, schema validation safety net                |
