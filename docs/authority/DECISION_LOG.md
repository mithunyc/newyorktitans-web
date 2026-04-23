# DECISION_LOG.md

## Purpose

This document is the permanent decision ledger for the New York Titans website project.

It exists to prevent drift, preserve rationale, and make future changes explicit instead of accidental.

Rules:

- append, do not rewrite history
- each decision gets an ID
- each decision states status and rationale
- if a future decision changes an earlier one, link the newer decision to the older one

---

## Status Key

- `Approved` = decided and active
- `Provisional` = default unless superseded by evidence
- `Open` = unresolved
- `Rejected` = considered and not approved

---

## Decisions

### D-001 — Website purpose

- Date: 2026-04-21
- Status: Approved
- Decision: The website will be a sponsor-ready, nonprofit/community-first flagship site for New York Titans.
- Rationale: The current need is credibility, growth, and community trust, not franchise-scale digital operations.

### D-002 — Primary site objective

- Date: 2026-04-21
- Status: Approved
- Decision: The MVP will prioritize sponsor conversion, player/family trust, and community legitimacy over advanced fan utility features.
- Rationale: This best matches the organization’s current stage and limited ops burden.

### D-003 — Brand framing

- Date: 2026-04-21
- Status: Approved
- Decision: New York Titans will be positioned as more than a team: a home for cricket, character, belonging, leadership, and community in New York.
- Rationale: This increases relevance to sponsors, families, players, and supporters while aligning with the club’s values and code of conduct. See club mission and code of conduct. fileciteturn0file0

### D-004 — Values backbone

- Date: 2026-04-21
- Status: Approved
- Decision: The site’s narrative and design will reflect integrity, respect, teamwork, discipline, community, and enjoyment.
- Rationale: These values already exist in club governance and should shape the public brand. fileciteturn0file0

### D-005 — Canonical domain

- Date: 2026-04-21
- Status: Provisional
- Decision: `newyorktitans.org` will be the canonical domain.
- Rationale: It is clearer, more institutional, and better aligned with nonprofit/community positioning.

### D-006 — Secondary domain

- Date: 2026-04-21
- Status: Provisional
- Decision: `nytitans.org` will be acquired and redirected to the canonical domain.
- Rationale: It is useful for shorthand, print use, and fallback discoverability.

### D-007 — Deployment platform

- Date: 2026-04-21
- Status: Provisional
- Decision: Vercel is the default deployment platform.
- Rationale: Fast deployment, low initial cost, strong fit for a modern low-ops frontend workflow.

### D-008 — Frontend architecture

- Date: 2026-04-21
- Status: Provisional
- Decision: The site will use a modern frontend stack centered on Next.js unless a clearly superior alternative is justified.
- Rationale: Strong fit for performance, flexibility, and Vercel deployment.

### D-009 — MVP content approach

- Date: 2026-04-21
- Status: Approved
- Decision: MVP content should be mostly static or lightly structured to reduce maintenance burden.
- Rationale: The club should not depend on a heavy publishing workflow to keep the site alive.

### D-010 — CMS policy

- Date: 2026-04-21
- Status: Approved
- Decision: No heavy CMS will be introduced in MVP unless a real content operations need is demonstrated.
- Rationale: Prevent unnecessary complexity and admin burden.

### D-011 — Design authority

- Date: 2026-04-21
- Status: Approved
- Decision: `DESIGN.md` is binding for visual and interaction direction.
- Rationale: It prevents AI-slop drift and keeps quality consistent.

### D-012 — Scope guardrail

- Date: 2026-04-21
- Status: Approved
- Decision: `OUT_OF_SCOPE.md` is binding for MVP unless a later decision explicitly overrides it.
- Rationale: Scope control is essential to quality, budget, and launch speed.

### D-013 — MVP pages

- Date: 2026-04-21
- Status: Provisional
- Decision: MVP pages are expected to include Home, About, Team, Community, Sponsors, Join Titans, Support/Donate, Contact, and a lightweight Updates/News presence if needed.
- Rationale: This provides enough breadth for trust and conversion without feature sprawl.

### D-014 — Visual style

- Date: 2026-04-21
- Status: Approved
- Decision: The site will use premium restraint, editorial sports energy, strong typography, real imagery, and subtle motion.
- Rationale: This is the most credible path to a premium look without becoming generic or gimmicky.

### D-015 — Prohibited style patterns

- Date: 2026-04-21
- Status: Approved
- Decision: Generic AI gradients, template clutter, fake dashboards, excessive motion, and low-contrast dark UI are banned.
- Rationale: These are the highest-probability paths to mediocrity.

### D-016 — Accessibility baseline

- Date: 2026-04-21
- Status: Approved
- Decision: The MVP will target strong accessibility fundamentals from day one.
- Rationale: Accessibility is part of credibility, usability, and long-term quality.

### D-017 — Mobile-first rule

- Date: 2026-04-21
- Status: Approved
- Decision: Mobile experience is the primary design baseline.
- Rationale: The site must work exceptionally well on phones, where many users will first encounter it.

### D-018 — MVP exclusions

- Date: 2026-04-21
- Status: Approved
- Decision: Ticketing, private portals, forums, custom live scoring, ecommerce, mobile app, multilingual rollout, AI features, and complex backend systems are excluded from MVP.
- Rationale: These add complexity without serving the immediate launch mission.

### D-019 — Sponsor pathway

- Date: 2026-04-21
- Status: Approved
- Decision: Sponsor/partner inquiry must be one of the clearest user pathways on the site.
- Rationale: Commercial credibility and fundraising support are central launch goals.

### D-020 — Content truthfulness

- Date: 2026-04-21
- Status: Approved
- Decision: The site must not use invented numbers, inflated achievements, or fake operational sophistication.
- Rationale: Trust compounds; fake signals destroy it.

### D-021 — Donation posture

- Date: 2026-04-21
- Status: Open
- Decision: Public donation solicitation flow will only be activated after confirming the correct legal/compliance posture for the organization.
- Rationale: Avoid unnecessary compliance exposure.

### D-022 — Asset quality rule

- Date: 2026-04-21
- Status: Approved
- Decision: If photography inventory is limited, the site will use fewer, stronger image moments rather than padding layouts with weak images.
- Rationale: Quality beats volume.

### D-023 — AI tooling role

- Date: 2026-04-21
- Status: Approved
- Decision: AI tools may accelerate design, writing, and implementation, but they do not override product truth, design authority, or scope guardrails.
- Rationale: Prevent automation from becoming drift.

---

## Open Questions

- Confirm canonical domain purchase status.
- Confirm whether donation capability should be present at launch or deferred.
- Confirm whether an Updates/News page is needed in MVP or deferred until content capacity is clearer.
- Confirm whether official brand colors and logo files already exist.
- Confirm whether there is enough quality photography for a strong launch.

---

## Change Template

Use this template for future entries:

### D-XXX — Title

- Date: YYYY-MM-DD
- Status: Approved / Provisional / Open / Rejected
- Decision:
- Rationale:
- Supersedes: D-\_\_\_ (if applicable)
