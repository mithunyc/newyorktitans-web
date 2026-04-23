# BUILD_SPEC.md

## Purpose

This document is the implementation authority for the New York Titans website MVP.

It translates the product direction into a buildable system that a designer, developer, or AI coding agent can execute without expanding scope or drifting into generic patterns.

If an implementation idea conflicts with `OUT_OF_SCOPE.md`, `DECISION_LOG.md`, or `DESIGN.md`, those documents win unless a new decision is explicitly approved.

---

## Build Thesis

Build a sponsor-ready, nonprofit/community-first flagship website for New York Titans that feels premium, cinematic, disciplined, and human while remaining:

- low-cost to host
- low-ops to maintain
- mobile-first
- accessible
- easy to extend later
- honest about the organization’s current stage

This is not a sports operations platform.
This is not a franchise media machine.
This is a high-trust, high-design digital flagship.

---

## Primary Objectives

The MVP must do these things well:

1. establish legitimacy and trust
2. make sponsor/partner outreach credible
3. make players, families, and community members feel they belong here
4. communicate mission, values, and community purpose clearly
5. provide a clean foundation for future expansion without current bloat

---

## Success Definition

A successful MVP should make a first-time visitor feel all of the following within 60–90 seconds:

- this is a serious organization
- this is about more than cricket
- this team has standards and values
- this club would be a credible partner
- this site feels premium, not improvised
- I know what to do next

---

## Canonical Product Shape

### Product Type

Marketing-first, trust-first, sponsor-ready website.

### Primary Use Cases

- sponsor or partner evaluating the organization
- player or parent exploring the club
- supporter learning the mission and story
- volunteer or coach evaluating involvement
- leadership presenting the club professionally

### Core Experience Model

- strong homepage narrative
- clear navigation
- powerful visual identity
- lightweight but meaningful content
- direct conversion paths
- low-maintenance updates

---

## Recommended Stack

### Preferred Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Preferred Deployment

- Vercel

### Preferred Rendering Strategy

- static generation for nearly all public pages
- optional lightweight server action or simple form handler only where necessary
- no database by default for MVP

### Preferred Content Strategy

- local structured content first
- markdown, JSON, or TypeScript content objects for controlled sections
- move to a CMS later only if actual publishing/ops burden justifies it

### Preferred Asset Strategy

- local optimized assets in repo for MVP
- use Next image optimization
- keep image count disciplined
- introduce external object storage only if asset volume or editorial workflow later demands it

### Preferred Forms Strategy

- lightweight external form backend or simple contact handling approach
- sponsor inquiry form
- join Titans / interest form
- optional general contact form
- avoid custom auth, dashboards, or CRM complexity in MVP

### Preferred Analytics

- simple analytics only
- privacy-conscious and lightweight
- page views + key CTA click tracking + inquiry submission events
- no overbuilt analytics warehouse in MVP

---

## Explicit Non-Recommendations

Do not introduce these in MVP:

- heavy CMS
- accounts or login
- database-backed admin systems
- live scoring ownership infrastructure
- ecommerce stack
- event ticketing engine
- forum or comment system
- complex animation frameworks without need
- speculative backend abstractions

---

## Information Architecture

### Primary Navigation

- Home
- About
- Team
- Community
- Sponsors
- Join Titans
- Support
- Contact

### Optional / Conditional Navigation

- Updates

The Updates page should exist only if there is enough content discipline to avoid obvious staleness. If there is doubt, keep updates lightweight or fold recent news into the homepage only.

---

## Page Inventory

### 1. Home

Purpose:

- create immediate trust
- define the brand and mission
- present primary calls to action
- establish emotional and visual tone

Key sections:

1. hero
2. mission/value statement
3. why Titans / three-pillar block
4. team/community proof section
5. sponsor/partner callout
6. join/support split CTA block
7. optional latest updates strip
8. footer

Primary CTAs:

- Partner With Us
- Join Titans
- Support the Mission

### 2. About

Purpose:

- explain who the organization is
- articulate mission, vision, values
- establish legitimacy and seriousness

Key sections:

1. page hero
2. who we are
3. mission and vision
4. values block
5. standards / code of conduct summary
6. closing CTA to join/support/partner

### 3. Team

Purpose:

- present players/coaches/leadership in a credible way
- humanize the organization
- communicate standards and pride

Key sections:

1. page hero
2. roster or featured players
3. leadership/captain/coach section
4. team culture statement
5. CTA to join Titans

### 4. Community

Purpose:

- prove this is about more than competition
- show youth development, belonging, leadership, service, local identity

Key sections:

1. page hero
2. community promise
3. youth development / leadership / belonging blocks
4. events or outreach highlights
5. volunteer/support CTA

### 5. Sponsors

Purpose:

- convert sponsor interest
- make partnership feel credible, useful, and values-aligned

Key sections:

1. page hero
2. why partner with Titans
3. who the club reaches / why it matters
4. partnership themes or package tiers
5. value proposition block
6. sponsor inquiry form or direct CTA
7. optional founding partners / current supporters block

This page is a priority page, not a throwaway.

### 6. Join Titans

Purpose:

- create a clear interest pathway for players, volunteers, coaches, and supporters

Key sections:

1. page hero
2. what joining means
3. segmented pathways:
   - player interest
   - coach/mentor interest
   - volunteer/supporter interest
4. form or contact CTA
5. expectations / standards summary

### 7. Support

Purpose:

- present ways to support the mission
- support future fundraising readiness without overcommitting now

Key sections:

1. page hero
2. why support matters
3. ways to help
4. sponsor vs supporter distinction
5. donation block only if approved
6. closing CTA

### 8. Contact

Purpose:

- provide direct, simple, trustworthy contact methods

Key sections:

1. page hero
2. contact channels
3. inquiry form
4. social links
5. optional location / New York reference

### 9. Updates (optional)

Purpose:

- show lightweight freshness if sustainable

Key sections:

1. update list
2. each entry short, image-led, simple
3. no sprawling editorial system in MVP

---

## Component Inventory

### Global Components

- site header
- mobile navigation drawer
- footer
- page hero shell
- section heading block
- CTA button system
- link treatment system
- content container / max-width wrappers
- image frame component
- logo strip / supporter strip

### Conversion Components

- sponsor CTA block
- split CTA block
- inquiry form block
- contact block
- quote/testimonial block if real and approved

### Narrative Components

- value pillars
- mission statement section
- story section
- impact block
- team/person profile cards
- timeline or milestone strip only if it adds clarity

### Utility Components

- social links
- basic metadata block
- embedded map only if useful and low-cost
- form success / error state components

### Components to avoid unless justified

- carousels
- accordions everywhere
- dense stats panels
- animated counters
- tab overload
- dashboard cards pretending to be product value

---

## Content Model

### Global Site Settings

- site title
- site description
- primary domain
- social URLs
- primary contact email
- default social image
- footer info

### Home Page Content

- hero headline
- hero supporting copy
- primary CTA label/url
- secondary CTA label/url
- mission strip
- pillar cards
- sponsor section copy
- join/support CTA content
- optional recent update cards

### About Content

- intro statement
- mission
- vision
- values list
- code of conduct summary
- closing CTA

### Team Content

- roster entries
  - name
  - role
  - image
  - short bio
  - optional batting/bowling style or team role
- leadership entries

### Community Content

- community pillars
- outreach story cards
- youth development copy
- volunteer CTA copy

### Sponsor Content

- sponsor page hero
- why partner copy
- package/theme cards
- inquiry CTA
- supporter logos
- sponsor FAQ if needed

### Join Content

- hero copy
- join intro
- pathway cards
- form intro copy
- expectations summary

### Support Content

- support intro
- why support matters
- support methods
- donation note if approved

### Updates Content

- title
- date
- short summary
- image
- category
- link/slug

---

## Page-by-Page Wireframe Notes

### Home Wireframe

1. Header
2. Hero: one dominant message + 1–2 CTAs + strong image
3. Short mission strip
4. Three pillar block: compete / develop / serve
5. Story or proof block with strong editorial layout
6. Sponsor/partner block
7. Join/support split CTA
8. Optional updates strip
9. Footer

Rule: no homepage section exists just because “sites usually have one.” Every section must earn its place.

### About Wireframe

1. Hero
2. Organization summary
3. Mission and vision
4. Values grid
5. Standards / conduct summary
6. CTA

### Team Wireframe

1. Hero
2. Featured leadership row
3. Player grid or grouped roster
4. Culture section
5. Join CTA

### Community Wireframe

1. Hero
2. Community statement
3. Three impact areas
4. Story/photo block
5. Volunteer/support CTA

### Sponsors Wireframe

1. Hero
2. Why partner with Titans
3. Community/value proposition block
4. Partnership pathways / tiers
5. Existing supporters or proof block if real
6. Inquiry CTA/form

### Join Titans Wireframe

1. Hero
2. What joining means
3. Segmented pathways
4. Form/contact area
5. Expectations section

### Support Wireframe

1. Hero
2. Why support matters
3. Ways to help
4. Optional donation block if approved
5. CTA

### Contact Wireframe

1. Hero
2. Contact methods
3. Inquiry form
4. Social proof / social links

---

## Design Translation Rules

Implementation must follow `DESIGN.md`, but the following build-specific translations are mandatory:

### Hero Translation

- one dominant image or composition
- one strong headline
- one concise support paragraph
- max two primary actions
- no dense rows of feature bullets

### Card Translation

- use cards only when content benefits from containment
- avoid card-soup layouts where everything competes equally
- use asymmetry where it improves editorial feel

### Motion Translation

- motion should guide attention, not decorate emptiness
- use subtle reveal, fade, slide, or parallax only if lightweight and tasteful
- motion must respect reduced-motion preferences

### CTA Translation

- all CTAs must feel intentional and consistent
- do not create five different button personalities
- sponsor and join pathways should remain visible throughout the experience

---

## Accessibility Baseline

The MVP must include:

- semantic heading structure
- keyboard-reachable navigation
- visible focus states
- strong contrast for body text and buttons
- alt text for informative images
- form labels and understandable validation
- reduced motion support
- meaning not conveyed by color alone

Accessibility is not a later enhancement.

---

## Performance Budget

### Core Rules

- keep the homepage visually rich but technically disciplined
- optimize every image
- avoid loading large video by default unless absolutely justified
- keep animation cost low
- avoid heavy client-side state where unnecessary

### Practical Targets

- fast first-load on normal mobile conditions
- no bloated component libraries without clear benefit
- no unnecessary third-party scripts
- no decorative code that slows the page but adds little value

### Asset Rules

- prefer fewer better images
- use responsive image sizing
- compress assets before shipping
- avoid giant background videos as default hero treatment

---

## Forms and Conversion Flows

### Sponsor Inquiry Flow

User journey:

1. understand mission/value proposition
2. see why sponsorship matters
3. click CTA
4. submit simple inquiry
5. receive confirmation / next-step expectation

Recommended fields:

- name
- organization
- email
- phone (optional)
- sponsorship interest
- message

### Join Titans Flow

User journey:

1. understand club identity and standards
2. choose pathway
3. submit interest
4. receive follow-up expectation

Recommended fields:

- name
- email
- phone (optional)
- role of interest
- playing/coaching/volunteer background
- message

### Form Philosophy

- short
- trustworthy
- no unnecessary friction
- no account creation
- no overcollection of data

---

## Analytics Event Plan

Track only what matters in MVP:

- page view by route
- hero primary CTA click
- sponsor CTA click
- join CTA click
- support CTA click
- sponsor inquiry submission
- join interest submission
- contact submission

Do not flood the project with vanity analytics.

---

## SEO and Metadata Rules

- every page needs unique title and meta description
- social preview image should be set for core pages
- canonical domain should be configured
- clear human-readable URLs
- no thin placeholder pages
- copy must sound natural, not keyword stuffed

---

## Content Operations Plan

### MVP Content Reality

The site must remain credible even if updates are occasional.

### Operating Model

- core evergreen pages carry most of the value
- updates are optional and lightweight
- site should not depend on weekly publishing
- future operator should be able to update content without rethinking the design system

### Update Frequency Expectations

- evergreen pages: update as needed
- team page: seasonal or roster-based refresh
- sponsors page: when partnerships change
- updates/news: only if sustainable

---

## Launch Sequence

### Phase 1 — Build MVP

Ship:

- Home
- About
- Team
- Community
- Sponsors
- Join Titans
- Support
- Contact

### Phase 2 — Tighten and polish

- final asset pass
- mobile polish
- accessibility check
- metadata/social image pass
- sponsor inquiry testing
- copy tightening

### Phase 3 — Optional immediate follow-ons

Only if needed and supportable:

- lightweight Updates page
- improved gallery treatment
- sponsor deck download
- simple event/news blocks

---

## QA Gates

Before launch, verify:

- sponsor pathway is clear
- join pathway is clear
- homepage has one dominant message
- navigation is calm and obvious
- mobile experience feels designed, not compressed
- no placeholder junk remains
- images are good enough or intentionally omitted
- no banned visual patterns appear
- build/deploy path is stable
- site feels specific to New York Titans, not generic

Use `REVIEW_CHECKLIST.md` as the final gate.

---

## Future Extension Map

The following may be added later only through explicit decision entries:

- lightweight updates/news workflow
- stronger image gallery
- sponsor deck download
- academy / youth landing pages
- event registration
- email newsletter integration
- donor campaign pages
- lightweight merchandise

Future additions must preserve the current system’s clarity and low-ops posture.

---

## Final Rule

If an implementation idea makes the site feel larger, louder, more complex, or more generic without materially increasing trust or conversion, reject it.
