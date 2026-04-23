# Operations Guide

## Purpose

This document explains how non-engineering and light-engineering operators should safely update and maintain the New York Titans website.

This is an operational guide, not a product spec. Product truth lives in `docs/authority/NYT_FINAL_RECONCILED_PACK.md`.

## Roles

### Content Editor

A trusted person who proposes content changes.

Typical tasks:

- update page copy
- add or edit sponsor details
- update roster entries
- change contact details
- swap approved images

### Reviewer

A trusted person who checks:

- truthfulness
- tone
- design fit
- preview behavior on mobile and desktop

### Operator

A person responsible for:

- inbox monitoring
- first response to inquiries
- DNS/admin coordination if something breaks

One person may hold multiple roles at launch.

## Core workflow

All changes follow this path:

1. open GitHub in the browser
2. create a new branch
3. edit JSON or MDX files
4. open a pull request
5. review Vercel preview
6. approve and merge
7. production deploy happens automatically

No direct commits to `main`.

## What to edit where

### Structured content

Edit JSON files in:

```text
/content/*.json
```

Examples:

- `content/home.json`
- `content/team.json`
- `content/sponsors.json`
- `content/site.json`

Use JSON when editing:

- names
- titles
- short blocks
- CTAs
- URLs
- roster entries
- sponsor lists
- contact details

### Long-form content

Edit MDX files in:

```text
/content/pages/*.mdx
```

Examples:

- `content/pages/about.mdx`
- `content/pages/join.mdx`
- `content/pages/contact.mdx`
- `content/pages/accessibility.mdx`
- `content/pages/privacy.mdx`
- `content/pages/code-of-conduct-full.mdx`

Use MDX for:

- paragraphs
- headings
- lists
- long-form explanations

Keep MDX simple. Do not invent custom components unless they already exist and are approved.

## Safe editing rules

- change the minimum necessary
- do not rename keys in JSON unless asked by engineering
- do not add new fields to JSON unless the schema is updated too
- do not paste rich text from Word without cleaning it
- do not upload random screenshots into public assets
- do not create new pages without approval
- do not change fonts, colors, CTA styles, or layout patterns through content edits

## How to update roster entries

File:

```text
content/team.json
```

Only edit:

- `name`
- `role`
- `battingStyle`
- `bowlingStyle`
- `bio`
- `image`
- `imageAlt`
- `isCaptain`
- `isViceCaptain`
- `isMinor`
- `consentRecorded`

### Important rule for minors

If `isMinor` is true, `consentRecorded` must also be true.
If that is not true, the build should fail.

## How to update sponsors

File:

```text
content/sponsors.json
```

Only list real supporters or partners.
Never add placeholder logos.
Never add organizations that are “in discussion.”
Never use logos without permission.

If there are no real supporters to show, leave the array empty.
The site is designed to render nothing rather than fake proof.

## How to update contact details

File:

```text
content/site.json
```

Typical fields:

- `contactEmail`
- `partnershipsEmail`
- `socials`
- organization summary

Be careful with URLs and email addresses.

## How to update images

Put approved files in:

```text
/public/images/
```

Use clear names, for example:

- `home-hero-01.jpg`
- `team-training-01.jpg`
- `sponsors-community-01.jpg`

Rules:

- use only real Titans photos
- no stock skyline filler
- no AI-generated people imagery
- no low-quality blurry screenshots

See `docs/operations/IMAGE_BRIEF.md` before adding or replacing images.

## Launch photo gate

Public launch requires at least 3 authentic Titans photos in production assets.
Recommended distribution:

- 1 for Home
- 1 for Team
- 1 for About or Sponsors

## Form operations

### Sponsor Inquiry form

Routes to the partnerships inbox.
Must send an immediate auto-responder.

### General Interest form

Routes to the inquiries inbox.
Must also send an immediate auto-responder.

## What to verify after form changes

After any change to form behavior:

1. submit from a real email address
2. verify inbox receipt
3. verify auto-responder receipt
4. verify Reply-To behavior
5. verify mobile usability

## Preview review checklist

Before approving a PR, check:

- homepage loads correctly on mobile and desktop
- sponsor CTA is obvious
- forms work visually
- no text overflow
- no broken images
- no obvious spacing drift
- footer links still work
- Code of Conduct page still works

Then run the fuller `docs/authority/REVIEW_CHECKLIST.md` before launch.

## When to escalate to engineering

Escalate if:

- you need a new page
- you need a new field in a JSON file
- the build fails and the error is unclear
- Vercel preview fails
- form emails do not arrive
- domain or DNS issues appear
- accessibility or performance gates fail

## Do not do these things

- do not commit secrets
- do not edit production directly
- do not bypass PR review
- do not add features because they “would be nice”
- do not upload unapproved logos
- do not add a donation surface without explicit approval
- do not add a newsletter form
- do not add trackers or pixels
