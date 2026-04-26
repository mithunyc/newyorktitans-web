# Launch Asset Ledger

> **WARNING:** Do not use `git stash pop` for this asset pack. Selective extraction only.
> The stash also contains unrelated exploratory WIP (fonts, tokens, Tailwind config) that must not land on `main`.

## Recovery Provenance

| Field                       | Value                                              |
| --------------------------- | -------------------------------------------------- |
| Stash ref                   | `stash@{0}`                                        |
| Stash SHA                   | `d64ef175eb0adf926ba3d31cb67eb42e66bda73f`         |
| Untracked parent SHA (`^3`) | `ea9e0c635db638bc86e92fe600d71b98319b7296`         |
| Extraction method           | `git restore --source="stash@{0}^3" -- <path>`     |
| Recovery branch             | `content/launch-asset-recovery-ledger`             |
| Authority                   | D-028 (photography gate), D-032 (logo disposition) |

---

## Extracted Files

### Logo Assets — `public/brand/`

| File                 | Bytes   | Source                             | Use                               | Optimization Status        | Next Slice                |
| -------------------- | ------- | ---------------------------------- | --------------------------------- | -------------------------- | ------------------------- |
| `logo-primary.svg`   | 675,669 | `NYT_Primary_Crest_Exact.svg`      | Main crest / hero / official      | **needs SVG optimization** | Logo integration (future) |
| `logo-secondary.svg` | 419,594 | `NYT_Secondary_Web_Logo_Exact.svg` | Website header / horizontal       | **needs SVG optimization** | Logo integration (future) |
| `logo-emblem.svg`    | 576,569 | `NYT_Icon_Mark_Exact.svg`          | Favicon / app icon / compact mark | **needs SVG optimization** | Logo integration (future) |

### Photo Assets — `public/images/launch/`

| #   | File                                        | Dir          | Bytes   | Source                                   | Intended Page                | Optimization Status       | Next Slice        |
| --- | ------------------------------------------- | ------------ | ------- | ---------------------------------------- | ---------------------------- | ------------------------- | ----------------- |
| 1   | `home-hero-team-2025.jpg`                   | `team/`      | 293,191 | `2025 Group Picture - Hero Image`        | Home Hero                    | **OK**                    | Photo integration |
| 2   | `home-values-warmup.jpg`                    | `team/`      | 911,838 | `Game Day Warm Up`                       | Home Secondary / About       | **needs resize** (>300KB) | Photo integration |
| 3   | `team-group-primary.jpg`                    | `team/`      | 141,342 | `Possible Hero Image - Team primary`     | Team Page Primary            | **OK**                    | Photo integration |
| 4   | `team-runner-up-2024.jpg`                   | `team/`      | 214,093 | `2024 Runner UP winning Picture`         | Team / About History         | **OK**                    | Photo integration |
| 5   | `team-match-action-01.jpg`                  | `action/`    | 334,723 | `Field Action - Team lower action strip` | Team Action Strip            | **needs resize** (>300KB) | Photo integration |
| 6   | `team-match-action-02.jpg`                  | `action/`    | 601,842 | `Field Action 2.jpg`                     | Team Action (optional)       | **needs resize** (>300KB) | Photo integration |
| 7   | `join-onboarding.jpg`                       | `community/` | 179,184 | `Onboarding - Join page`                 | Join Onboarding              | **OK**                    | Photo integration |
| 8   | `sponsors-community-youth-volunteering.jpg` | `community/` | 147,931 | `Youth - Volunteering - Sponsors`        | Sponsors / About / Community | **OK**                    | Photo integration |
| 9   | `about-founder-portrait.jpg`                | `portraits/` | 303,367 | `Founder - Team lower action`            | About Founder Portrait       | **OK** (borderline)       | Photo integration |
| 10  | `team-player-performance-portrait.jpg`      | `portraits/` | 302,006 | `Tpp Perfromence and coach`              | Team / Join Supporting       | **OK** (borderline)       | Photo integration |

### Supporting Documents

| File                                | Bytes | Purpose                                     |
| ----------------------------------- | ----- | ------------------------------------------- |
| `docs/operations/image-manifest.md` | 2,376 | Maps original source filenames → repo paths |
| `docs/operations/logo-manifest.md`  | 444   | Maps original SVG sources → repo paths      |
| `public/brand/README.md`            | 223   | Brand asset usage guidelines                |
| `public/images/launch/README.md`    | 520   | Launch image asset guidelines               |

---

## Explicitly Excluded (remain in stash only)

| File                 | Reason                           |
| -------------------- | -------------------------------- |
| `app/fonts.ts`       | Unrelated font exploration WIP   |
| `lib/tokens.ts`      | Unrelated token exploration WIP  |
| `tailwind.config.ts` | Unrelated config exploration WIP |

---

## Quick Lookup Commands

```powershell
# Asset inventory
git ls-tree -r -l HEAD -- public/images/launch public/brand docs/operations

# Find launch asset references
git grep -n "public/images/launch\|/images/launch\|public/brand\|/brand"

# Verify no accidental exploratory stash files landed
git diff --name-only main...HEAD | Select-String "app/fonts.ts|lib/tokens.ts|tailwind.config.ts"
```

---

## Gate Status

| Gate  | Requirement                                   | Status                    |
| ----- | --------------------------------------------- | ------------------------- |
| D-028 | Min 3 authentic photos                        | ✅ 10 available           |
| D-028 | Distributed across Home, Team, About/Sponsors | ✅ 4 directories          |
| D-028 | No AI-generated people                        | ✅ All authentic          |
| D-032 | Vectorized primary mark                       | ✅ `logo-primary.svg`     |
| D-032 | Vectorized emblem mark                        | ✅ `logo-emblem.svg`      |
| §16.5 | Hero image ≤ 300KB                            | ⚠️ 3 photos exceed budget |

---

## Next Slice Recommendation

The next slice after this ledger is **photo integration only** — wiring the photos into page components via `next/image`. Logo integration is a separate, later slice that requires SVG optimization first.
