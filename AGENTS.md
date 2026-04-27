# AGENTS.md

Binding contract for any AI coding agent working in this repository.
Read this file at the start of every session. Re-read before any non-trivial change.

If this file conflicts with anything else, this file wins, except where it defers to `docs/authority/NYT_FINAL_RECONCILED_PACK.md`.

---

## 1. Authority order

1. `docs/authority/NYT_FINAL_RECONCILED_PACK.md` — product truth.
2. `docs/authority/DECISION_LOG.md` — decisions log, append-only.
3. `docs/authority/OUT_OF_SCOPE.md` — what is forbidden.
4. `docs/authority/REVIEW_CHECKLIST.md` — launch and PR checks.
5. `AGENTS.md` (this file) — agent rules.
6. `docs/operations/operations.md` — operator playbook.
7. `docs/operations/IMAGE_BRIEF.md` — imagery rules.

If you are about to do something not authorized by these files, stop and ask.

---

## 2. The five rules

1. **Cite the spec.** For every non-trivial decision, cite the section of the reconciled pack that authorizes it. If you cannot cite a section, you are improvising. Stop and ask.
2. **Do less.** Prefer the smallest correct change. Reject elegance that adds files, dependencies, or abstraction.
3. **Never invent scope.** If the user asks for something not in MVP scope, name the conflict and refuse until a `DECISION_LOG.md` entry approves it.
4. **Never fake.** No fake stats, no placeholder logos, no stock people, no AI-generated faces, no aspirational claims, no Lorem Ipsum that ships.
5. **Honor the kill list.** Section 21 of the reconciled pack is binding. Every item is rejected by default.

---

## 3. Approved stack (locked)

You may use only:

- **Framework:** Next.js 14+ App Router, TypeScript strict mode.
- **Styling:** Tailwind CSS 3.x with tokens from `lib/tokens.ts`.
- **Components:** Hand-built primitives. shadcn/ui only for accessibility-critical headless primitives, heavily restyled.
- **Fonts:** Fraunces (display) + Geist (body), self-hosted via `next/font/google`.
- **Icons:** `@phosphor-icons/react` only, single 1.5 stroke weight.
- **Forms:** React Hook Form + Zod.
- **Email:** Resend.
- **Animation:** Framer Motion. Reveal pattern only. No ambient motion.
- **Analytics:** Plausible.
- **Content:** JSON (Zod-validated) + MDX.
- **Testing:** Playwright (visual regression + axe), Vitest (unit), Lighthouse CI.
- **Package manager:** pnpm.

If a problem cannot be solved with the stack above, stop and ask. Do not introduce new dependencies.

---

## 4. Dependency allowlist

Production dependencies permitted:

```
next
react
react-dom
typescript
tailwindcss
postcss
autoprefixer
framer-motion
react-hook-form
zod
@hookform/resolvers
resend
@phosphor-icons/react
next-mdx-remote
clsx
tailwind-merge
```

Dev dependencies permitted:

```
@types/node
@types/react
@types/react-dom
eslint
eslint-config-next
prettier
prettier-plugin-tailwindcss
@playwright/test
@axe-core/playwright
vitest
@vitest/ui
@lhci/cli
tsx
```

**Adding any package outside this list requires a DECISION_LOG entry and explicit human approval before installation.**

Banned outright (never install, never propose):

```
@auth/* / next-auth        — no auth in MVP
prisma / drizzle / kysely  — no database
@sentry/*                  — overhead unjustified
contentlayer / @keystatic  — no CMS
gsap / lottie-web          — Framer Motion sufficient
three / @react-three/fiber — no WebGL
swiper / embla-carousel    — no carousels
react-toastify / sonner    — no toast notifications in MVP
@vercel/analytics          — Plausible is the choice
@vercel/postgres / kv      — no datastore in MVP
firebase / supabase        — no BaaS
mailchimp / convertkit     — no newsletter in MVP
recaptcha / hcaptcha       — honeypot first; CAPTCHA only on observed abuse
```

---

## 5. Banned patterns

These are non-negotiable. Reject any PR or suggestion containing them.

- Inter font.
- Pure black `#000000` backgrounds (use Titan Midnight `#0A1020`).
- Default shadcn theming.
- Glassmorphism without functional reason.
- 3D tilt cards.
- Animated stat counters.
- Carousels of any kind on marketing pages.
- 3-equal-card feature rows on Home or About.
- Bronze/Silver/Gold sponsor tier branding.
- Custom cursors, magnetic cursors, glitch effects.
- Parallax scrolling, locomotive scroll.
- AI-generated imagery of people.
- Stock skyline photos.
- Fake percentages or vanity metrics.
- Ambient/perpetual background animations.
- Cookie banners (Plausible is cookie-free; do not introduce cookies).
- Toast notifications.
- Skeleton loaders on a fully static site.
- "Coming soon" placeholders. If empty, render nothing.

If you find yourself wanting one of these, the spec already rejected it.

---

## 6. File and folder rules

- All routes live under `app/(marketing)/`.
- All components live under `components/{ui,layout,sections,forms}/`.
- All structured content lives under `content/*.json`.
- All long-form prose lives under `content/pages/*.mdx`.
- All Zod schemas live under `lib/schemas/`.
- All design tokens live in `lib/tokens.ts`. Do not hardcode color or spacing values anywhere else.
- All form server actions live under `app/actions/`.

Do not create new top-level folders without approval.

---

## 7. Content rules

- Every JSON file under `content/` must have a matching Zod schema in `lib/schemas/`.
- Every `pnpm build` runs `scripts/validate-content.ts` first. Do not bypass.
- Empty arrays are valid. Pages must render gracefully with empty data (omit the section).
- Never ship placeholder copy. If real copy is unavailable, leave the field empty and let validation fail; do not invent.
- MDX may use only the approved component set: `<Eyebrow>`, `<RuleGold>`, `<Button>`. No arbitrary HTML.

---

## 8. Form rules

- Two forms only: `SponsorForm` and `GeneralInterestForm`.
- Both use server actions in `app/actions/`.
- Both validate input with Zod on both client and server.
- Both include a honeypot field and rate-limit check before sending.
- Both fire an immediate auto-responder via Resend.
- Sender domain: `mail.newyorktitans.org`. Never send from the apex domain.
- Reply-To is always set to the appropriate operator inbox.
- On failure, surface a retry message + direct contact email fallback.

---

## 9. Motion rules

- Single reveal pattern: opacity 0→1, translateY 16px→0, duration 0.6s, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Use the shared `useReducedMotion` hook from `lib/motion.ts` in every motion component.
- No `useEffect` scroll listeners. No `window.scroll` reads in render paths.
- Stagger children by 80ms maximum.
- One press effect per button: `scale 0.98` OR `translateY -1px`. Never both.

---

## 10. Accessibility rules

- Every interactive element must be reachable via keyboard.
- Visible focus ring using Electric Field Blue at 2px offset.
- Every page has exactly one H1 and a logical heading hierarchy.
- All form inputs have visible labels and `aria-describedby` for help/error text.
- All informative images have meaningful alt text. Decorative images use empty alt.
- `prefers-reduced-motion` is respected via the shared hook.
- Body text contrast is 7:1 minimum on dark backgrounds.

CI runs axe-core on every public route. The build fails on any violation.

---

## 11. Performance rules

### Launch targets (must be true before public launch)

- LCP target ≤ 2.5s on 4G mobile for Home and Sponsors.
- JS shipped to client ≤ 120 KB gzip on Home, ≤ 80 KB on other pages.
- CLS ≤ 0.05.
- Hero image ≤ 300 KB after Next/Image optimization.
- Third-party scripts: Plausible only.
- Fonts: Latin subset, `font-display: swap`.

### CI enforcement during development

- Accessibility, Best Practices, and SEO thresholds remain hard-fail in CI.
- Performance score remains hard-fail in CI at ≥ 90 for Home and Sponsors.
- LCP is enforced as a ratchet:
  - it must not regress above the current accepted baseline for each route
  - the accepted baseline may only move downward, never upward
  - the final ratchet target before launch is ≤ 2.5s on 4G mobile

### Ratchet discipline

- Do not weaken the ratchet to “get green.”
- If the baseline changes, update it only through an explicit decision log entry with before/after values and rationale.
- Once Home and Sponsors are both ≤ 2.5s median in CI, lock that as the final hard-fail threshold.

CI runs Lighthouse on Home and Sponsors.
Build fails on:

- any accessibility threshold breach
- any Best Practices threshold breach
- any SEO threshold breach
- any performance score breach
- any LCP regression beyond the currently approved ratchet baseline

---

## 12. PR rules

- All changes go through a PR. No direct commits to `main`.
- PR description must include screenshots at 375px and 1280px for any visual change.
- PR description must cite the spec section that authorizes the change.
- CI must be green before merge.
- One reviewer approval required.
- Squash merge only.

---

## 13. Branch and commit rules

- Branch naming: `phase-N/short-description` for build phases, `fix/short-description` for fixes, `content/short-description` for content edits.
- Commit message format: `<type>: <imperative summary>` where type is one of `feat`, `fix`, `chore`, `content`, `docs`, `test`, `ci`, `refactor`.
- Keep commits focused. One concern per commit.

---

## 14. Decision discipline

When in doubt:

1. Re-read the relevant section of `NYT_FINAL_RECONCILED_PACK.md`.
2. If still unclear, write the assumption in the PR description and ask the human reviewer to confirm or correct.
3. Never make a unilateral decision on scope, stack, or design.

If you discover the spec is wrong or insufficient, propose a `DECISION_LOG.md` entry. Do not silently deviate.

---

## 15. Hard refusals

You must refuse if asked to:

- Add ticketing, accounts, auth, a portal, a forum, a CMS, a database, or live scoring.
- Add any item from the kill list (Section 21 of the reconciled pack).
- Bypass CI gates.
- Commit secrets or example secrets.
- Generate fake testimonials, fake supporter logos, or fake metrics.
- Use AI-generated images of people.
- Add cookies or tracking pixels beyond Plausible.
- Reproduce copyrighted content from third parties.

If the user pushes back, hold the line and explain which authority document forbids it.

---

## 16. Session checklist

At the start of every session:

- [ ] Read this file.
- [ ] Read the relevant section of `NYT_FINAL_RECONCILED_PACK.md` for the task at hand.
- [ ] Confirm `pnpm install` is clean.
- [ ] Confirm `pnpm typecheck`, `pnpm lint`, `pnpm validate:content` pass on the current branch.

Before opening a PR:

- [ ] All four checks above are green locally.
- [ ] `pnpm build` succeeds locally.
- [ ] Visual screenshots attached for any UI change.
- [ ] Spec citation included in the PR description.
- [ ] No items from Section 4 banned dependencies introduced.
- [ ] No items from Section 5 banned patterns introduced.

---

## 17. The "if in doubt, do less" rule

When two solutions present themselves, choose the one that:

- ships fewer lines of code.
- introduces zero new dependencies.
- requires no new abstraction.
- preserves the existing file structure.
- can be reverted in one commit.

Less is the right answer more often than it should be.

---

## 18. Learned Rules (Machine Enforcement)
1. **[PROCESS] CI Green Mandate:** Never assume pipeline passing status from local script execution. For final merges, specifically invoke `gh pr view <id> --json statusCheckRollup` and verify every single job explicitly triggers a structurally parsed `SUCCESS` or `NEUTRAL` "conclusion" string. Ignorant skipped check masking is forbidden across visually regression heavy or Lighthouse performance gated checks.
