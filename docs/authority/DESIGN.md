# DESIGN.md

## Purpose

This document is the visual and interaction constitution for the New York Titans website. It exists to prevent AI slop, prevent design drift, and ensure that every screen feels premium, human, athletic, and credible.

If a future design or implementation conflicts with this document, this document wins unless an explicit decision is added to `DECISION_LOG.md`.

---

## Product Intent

New York Titans is not just a cricket team website. It is the flagship digital presence of a New York nonprofit/community-first cricket organization focused on:

- talent development
- discipline and leadership
- belonging and pride
- community impact
- sponsor credibility

The website must communicate ambition without pretending to be a giant franchise. It must feel established, serious, warm, and aspirational.

---

## Brand Core

### Brand Positioning

New York Titans is building more than a team. It is building a home for cricket, character, leadership, and community in New York.

### Brand Personality

The site must feel:

- premium
- disciplined
- electric
- cinematic
- trustworthy
- welcoming
- community-rooted
- future-facing

The site must never feel:

- cheap
- generic
- overanimated
- startup-SaaS-like
- template-driven
- fake-premium
- cluttered
- corporate in a cold way

### Values Backbone

The design and copy must reflect the organization’s stated values:

- Integrity
- Respect
- Teamwork
- Discipline
- Community
- Enjoyment

These values come from the club’s mission and code of conduct and should shape tone, imagery, and hierarchy, not sit buried on a policy page. See the club mission and code of conduct. fileciteturn0file0

---

## Audience Priorities

Design first for these audiences, in this order:

1. sponsors and community partners
2. players and aspiring players
3. families and community members
4. supporters and fans
5. volunteers and coaches

This is a sponsor-ready community institution site first, not a stats-heavy fan utility product.

---

## Design Principles

### 1. Premium restraint

Every page should feel expensive because of discipline, not because of visual noise.

### 2. One strong idea per section

Each section must communicate one main message. If a section tries to do three things, split it or cut it.

### 3. Story before widgets

Lead with narrative, imagery, trust, and calls to action. Avoid dashboard thinking.

### 4. Editorial sports energy

Borrow from premium editorial and sports identity systems, not from template marketplaces.

### 5. Mobile-first clarity

The site must work beautifully on a phone. Desktop is an enhancement, not the design starting point.

### 6. Human warmth

The site must feel like people belong here. Use real faces, community moments, and team discipline.

### 7. Future-ready without present bloat

Design patterns should extend cleanly later, but MVP must stay focused.

---

## Visual System

### Color System

Use a dark, premium foundation with one dominant accent and one optional reserved utility accent.

#### Core Palette

- `Titan Midnight` — `#0A1020`
- `Hudson Navy` — `#111A33`
- `City White` — `#F7F4EE`
- `Steel Mist` — `#C8CEDA`
- `Graphite` — `#1A1F29`

#### Primary Accent

- `Titan Gold` — `#D6A84F`

#### Reserved Utility Accent

- `Electric Field Blue` — `#3E7BFA`

#### Usage Rules

- Dark foundation should dominate the site.
- White/near-white should carry most text and negative space.
- Gold is the main brand accent and should be used for high-value emphasis, dividers, subtle glows, key CTAs, and premium detail work.
- Electric blue is optional and must be used sparingly for interactive utility states or micro-emphasis only.
- Never let gold and electric blue compete equally in the same viewport.
- Never create rainbow interfaces.
- Never use more than one gradient per page, and only if it is subtle and controlled.

### Contrast Rules

- Body text must meet strong contrast standards.
- Gold must never be used for long-form body copy on dark backgrounds unless contrast is verified.
- Decorative overlays must never reduce readability.

---

## Typography

### Typography Goals

Typography must carry authority, elegance, and readability.

### Recommended Pairing Direction

Use one high-character serif or serif-like display font for major headlines and one clean, modern sans-serif for body and UI.

#### Typographic Tone

- Headlines: proud, cinematic, crisp
- Body: calm, clean, highly readable
- UI labels: compact, disciplined, not shouty

### Hierarchy Rules

- Hero headline must feel iconic, not verbose.
- Section headlines must be concise and high signal.
- Paragraphs must stay readable and avoid wall-of-text density.
- Captions and metadata should be visibly subordinate.

### Typographic Scale Guidance

- Hero title: very large and intentional
- Section headline: large
- Card title: medium
- Body: standard reading size
- Fine print: limited use only

### Typography Restrictions

- No more than two font families.
- No novelty sports fonts.
- No faux-condensed distortion.
- No all-caps paragraphs.
- No thin light-gray body text on dark backgrounds.

---

## Layout System

### Grid

Use a clean content grid with strong margins and generous spacing.

### Spacing Rhythm

Spacing should feel luxurious and consistent.

#### Default Rhythm

Use a spacing system based on a simple scale and preserve visual breathing room between sections.

#### Rules

- Large sections need strong top and bottom padding.
- Cards need internal breathing room.
- Do not collapse everything upward.
- Avoid tiny gaps between unrelated objects.
- Use whitespace to create confidence.

### Width Rules

- Reading text blocks should not become too wide.
- Hero and image moments may run wider, but copy should remain controlled.
- Sponsor and CTA blocks should be easy to scan.

---

## Page Composition Rules

### Hero Rules

Each major page should have a clear hero with:

- one dominant message
- one supporting statement
- one or two meaningful CTAs
- one visually strong image, video, or texture treatment

#### Hero must not include

- four or more competing CTAs
- dense feature bullets
- cluttered icon rows
- unnecessary carousels
- autoplay video with no fallback

### Section Rules

Each section should do exactly one of the following:

- build trust
- tell the story
- prove community impact
- drive action
- clarify structure

If a section does none of these, cut it.

### Footer Rules

The footer must feel serious and credible, not like an afterthought.
Include:

- contact
- core navigation
- sponsor/partner path
- social links
- organizational summary

---

## Image and Media Direction

### Image Priorities

Prioritize real imagery in this order:

1. team identity moments
2. action photography
3. coaches mentoring players
4. community and youth moments
5. supporters/families/events
6. New York environmental context

### Art Direction

Images should feel:

- real
- proud
- sharp
- emotionally grounded
- not overfiltered

### Image Restrictions

- No cheesy stock cricket imagery if avoidable.
- No random skyline spam.
- No collage-heavy layouts.
- No low-resolution hero images.
- No AI-generated people imagery representing the club.
- No image treatments that make everyone look plastic or fake.

### Fallback Rule

If image inventory is weak, use fewer, larger, better-composed image moments rather than filling the page with mediocre photos.

---

## Motion System

### Motion Philosophy

Motion should communicate confidence and polish, not novelty.

### Allowed Motion

- subtle fade and rise
- controlled image reveal
- soft hover feedback
- restrained CTA emphasis
- smooth section transitions

### Motion Restrictions

- no bouncy gimmicks
- no parallax abuse
- no spinning decorative elements
- no motion that delays access to content
- no motion that competes with typography

### Motion Timing Guidance

- quick and purposeful
- smooth, not flashy
- reduced motion must be respected

---

## Component Rules

### Buttons

Buttons must feel premium and decisive.

#### Rules

- Primary CTA should be visually obvious.
- Secondary CTA should support, not compete.
- Button styles must remain consistent across the site.
- Avoid more than two CTA styles in MVP.

### Cards

Cards must not become a generic grid of interchangeable boxes.

#### Rules

- Use cards when grouping truly parallel content.
- Each card must have strong hierarchy.
- Avoid excessive borders, shadows, and decoration.
- If a story block wants to be more editorial than card-like, let it be editorial.

### Stats / Metrics

Use sparingly.
Only show stats if they are credible, current enough, and meaningful.
Do not invent inflated achievement counters.

### Sponsor Logos

Sponsor treatment must be elegant and respectful.

- maintain visual consistency
- use adequate spacing
- avoid logo wall chaos
- avoid making logos look like clip-art stickers

### Forms

Forms must be short, clear, and trustworthy.

- minimal required fields
- clear success/failure states
- mobile-friendly inputs
- plain-language labels

---

## Copy and Tone

### Tone

Copy must be:

- clear
- proud
- warm
- disciplined
- specific
- non-corporate

### Copy must not be

- buzzword-heavy
- fake-inspirational
- generic sports hype
- overly formal legalese outside policy pages
- long-winded when clarity would do

### Messaging Priority

Every important page should reinforce one or more of these:

- we build talent
- we build character
- we build belonging
- we serve community
- we are worthy of partnership

---

## Accessibility Rules

- Design to strong WCAG 2.2 AA expectations.
- Preserve readable contrast at all times.
- Visible focus states are mandatory.
- Keyboard access must work for core navigation and forms.
- Motion must respect reduced-motion preferences.
- Images must support meaningful alt text.
- Headings must form a logical hierarchy.
- Do not rely on color alone to communicate meaning.

---

## Mobile Rules

- Design the mobile experience first.
- Navigation must remain simple and calm.
- Hero sections must remain legible and high impact on small screens.
- Cards must stack cleanly.
- Forms must feel easy to complete on mobile.
- Tap targets must be comfortable.
- Avoid desktop-only image crops and brittle layout tricks.

---

## Forbidden Patterns

The following are explicitly banned unless a written exception is added to `DECISION_LOG.md`:

- generic AI gradient soup
- overly glossy fake-3D sports graphics
- crowded homepage hero sections
- giant rotating carousels
- template-style icon feature grids everywhere
- animated counters with no substance
- fake sponsor dashboards
- dark UI with weak contrast
- oversized shadow-heavy cards
- random glassmorphism
- startup SaaS illustration style
- cluttered navbars
- mixed visual languages on the same page
- using design tricks to hide weak content

---

## Review Standard

A page passes design review only if the answer is yes to all of these:

- Does it feel like New York Titans, not a template?
- Is the hierarchy obvious within three seconds?
- Is the primary CTA clear?
- Does the page feel premium because of discipline?
- Does it reinforce trust, belonging, or action?
- Is the mobile version genuinely strong?
- Are images helping rather than filling space?
- Is motion subtle and purposeful?
- Would a sponsor take this seriously?
- Would a parent or player feel welcomed and proud?

---

## Final Rule

When in doubt:

- cut clutter
- simplify layout
- strengthen typography
- use better images
- reduce motion
- make the story clearer
- protect trust
