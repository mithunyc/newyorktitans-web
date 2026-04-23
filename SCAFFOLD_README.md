# Scaffold Bootstrap

This folder contains a complete starter scaffold for `newyorktitans-web`. Drop the files into your repo root preserving the directory structure, then run the steps below.

## What's in this scaffold

```
.
├── AGENTS.md                              ← Agent governance contract
├── package.json                           ← Pinned deps + scripts (pnpm)
├── tsconfig.json                          ← TypeScript strict
├── tailwind.config.ts                     ← Consumes lib/tokens.ts
├── next.config.mjs                        ← Security headers + redirects + images
├── playwright.config.ts                   ← Visual regression + a11y projects
├── vitest.config.ts                       ← Unit test runner
├── lighthouserc.json                      ← Performance gates
├── .prettierrc.json
├── .eslintrc.json
├── .gitignore
├── .env.example
├── .github/
│   ├── workflows/ci.yml                   ← 5-job CI pipeline
│   ├── PULL_REQUEST_TEMPLATE.md           ← Citation discipline
│   └── CODEOWNERS                         ← Review enforcement
├── lib/
│   ├── tokens.ts                          ← Single source of truth for design
│   ├── motion.ts                          ← useReducedMotion + reveal variants
│   ├── email.ts                           ← Resend wrapper + auto-responders
│   ├── rate-limit.ts                      ← In-memory IP throttle
│   ├── validation.ts                      ← Form input Zod schemas
│   ├── cn.ts                              ← className utility
│   └── schemas/
│       ├── site.ts
│       ├── home.ts
│       ├── team.ts                        ← Enforces minor consent
│       ├── sponsors.ts                    ← Bans Bronze/Silver/Gold tiers
│       └── code-of-conduct.ts
├── scripts/
│   └── validate-content.ts                ← Build-time content gate
├── app/
│   └── actions/
│       ├── sponsor-inquiry.ts
│       └── general-interest.ts
└── tests/
    ├── visual-regression.spec.ts          ← 6 baselines (Home, Sponsors, Join × mobile, desktop)
    ├── accessibility.spec.ts              ← axe on every public route
    └── tokens-drift.test.ts               ← Asserts tokens match DESIGN.md
```

## Setup (one-time, ~15 min)

### 1. Initialize the Next.js project

```bash
# In your repo root, with the scaffold files in place:
pnpm install
```

The `preinstall` script enforces pnpm. Yarn or npm will be rejected.

### 2. Create the .env.local

```bash
cp .env.example .env.local
# Then fill in:
#   - RESEND_API_KEY  (from https://resend.com/api-keys)
#   - INQUIRIES_INBOX, PARTNERSHIPS_INBOX (your routing aliases)
```

### 3. Place the source documents

The scaffold expects authority docs under `docs/`:

```
docs/
├── authority/
│   ├── NYT_FINAL_RECONCILED_PACK.md
│   ├── DECISION_LOG.md
│   ├── OUT_OF_SCOPE.md
│   ├── PRD.md
│   ├── REVIEW_CHECKLIST.md
│   ├── BUILD_SPEC.md
│   ├── DESIGN.md
│   └── CONTENT_SEED.md
├── operations/
│   ├── operations.md
│   └── IMAGE_BRIEF.md
└── source/
    └── New_York_Titans_Code_of_Conduct.docx
```

Move the existing project files into this layout. The agent will read from these paths.

### 4. Create the content scaffolding

Create empty (but schema-valid) files. The agent will populate them in Phase 5.

```bash
mkdir -p content/pages public/images public/og public/downloads
```

Initial content files (the agent fills these in):

- `content/site.json`
- `content/home.json`
- `content/team.json`
- `content/sponsors.json`
- `content/code-of-conduct.json`
- `content/pages/about.mdx`
- `content/pages/join.mdx`
- `content/pages/contact.mdx`
- `content/pages/privacy.mdx`
- `content/pages/accessibility.mdx`
- `content/pages/code-of-conduct-full.mdx`

### 5. Verify the toolchain

```bash
pnpm typecheck       # Should pass
pnpm lint            # Should pass
pnpm validate:content  # Will fail until content files exist; expected
pnpm test            # Tokens-drift test should pass
```

### 6. Configure GitHub branch protection

In repo settings → Branches → Add rule for `main`:

- [x] Require a pull request before merging
- [x] Require approvals: 1
- [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require review from Code Owners
- [x] Require status checks to pass:
  - `Verify (typecheck, lint, content, unit)`
  - `Build`
  - `Visual regression`
  - `Accessibility (axe-core)`
  - `Lighthouse (Home, Sponsors)`
- [x] Require branches to be up to date before merging
- [x] Do not allow bypassing the above settings

Replace `@nyt-maintainers` in `.github/CODEOWNERS` with the actual team handle.

### 7. Vercel project setup

1. Import the GitHub repo into Vercel.
2. Framework preset: Next.js (auto-detected).
3. Add environment variables (production):
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL=https://newyorktitans.org`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=newyorktitans.org`
   - `INQUIRIES_INBOX`, `PARTNERSHIPS_INBOX`, `NOREPLY_SENDER`
4. Add the three custom domains (apex + www + nytitans.org). The 308 redirects in `next.config.mjs` handle canonicalization.

### 8. Resend domain setup

1. Add `mail.newyorktitans.org` as a sending domain in Resend.
2. Add the SPF, DKIM CNAMEs to your DNS provider.
3. Add a DMARC record at `_dmarc.newyorktitans.org`:
   ```
   v=DMARC1; p=none; rua=mailto:dmarc@newyorktitans.org
   ```
4. Wait 24-48h, verify in Resend dashboard.
5. Test with a real send before launch.
6. After 30 days of clean DMARC reports, escalate `p=none` → `p=quarantine`.

## Now hand the repo to the agent

Point the agent at `AGENTS.md` and `docs/authority/NYT_FINAL_RECONCILED_PACK.md`. Begin with **Phase 1** of the build plan (covered in the build pack).

Do not skip phases. Do not allow the agent to add dependencies outside the allowlist in `AGENTS.md`. The CI pipeline catches most violations; PR review catches the rest.
