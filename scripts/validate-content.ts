#!/usr/bin/env tsx
/**
 * scripts/validate-content.ts
 *
 * Runs at `prebuild`. Validates every JSON file under /content against its
 * matching Zod schema in /lib/schemas. Exits non-zero on any failure, which
 * fails CI and prevents a broken build from deploying.
 *
 * This is the operator durability gate. Operators edit JSON via the GitHub
 * web UI; this script is what catches their mistakes before they reach
 * production.
 *
 * Authority: docs/authority/NYT_FINAL_RECONCILED_PACK.md, Sections 10.5, 14.3, 18.1.
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { z, ZodError, ZodSchema } from "zod";

import { SiteSchema } from "../lib/schemas/site";
import { HomeSchema } from "../lib/schemas/home";
import { TeamSchema } from "../lib/schemas/team";
import { SponsorsSchema } from "../lib/schemas/sponsors";
import { CodeOfConductSchema } from "../lib/schemas/code-of-conduct";

// ---------------------------------------------------------------------------
// Registry: every JSON content file must appear here with its schema.
// Adding a new content file without registering it is an intentional friction
// point, not an oversight. Update the schema first, then register here.
// ---------------------------------------------------------------------------

type ContentEntry = {
  /** Repo-relative path to the JSON file. */
  path: string;
  /** Zod schema that validates the file. */
  schema: ZodSchema;
  /** Whether the file is required to exist. */
  required: boolean;
};

const CONTENT_REGISTRY: ContentEntry[] = [
  { path: "content/site.json", schema: SiteSchema, required: true },
  { path: "content/home.json", schema: HomeSchema, required: true },
  { path: "content/team.json", schema: TeamSchema, required: true },
  { path: "content/sponsors.json", schema: SponsorsSchema, required: true },
  {
    path: "content/code-of-conduct.json",
    schema: CodeOfConductSchema,
    required: true,
  },
];

// ---------------------------------------------------------------------------
// Reporters
// ---------------------------------------------------------------------------

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

function color(c: keyof typeof colors, s: string): string {
  // Honor NO_COLOR (CI logs).
  if (process.env.NO_COLOR) return s;
  return `${colors[c]}${s}${colors.reset}`;
}

function header(s: string): void {
  // eslint-disable-next-line no-console
  console.log(`\n${color("bold", color("cyan", "▸ " + s))}`);
}

function ok(s: string): void {
  // eslint-disable-next-line no-console
  console.log(`  ${color("green", "✓")} ${s}`);
}

function fail(s: string): void {
  // eslint-disable-next-line no-console
  console.error(`  ${color("red", "✗")} ${s}`);
}

function warn(s: string): void {
  // eslint-disable-next-line no-console
  console.warn(`  ${color("yellow", "!")} ${s}`);
}

// ---------------------------------------------------------------------------
// Zod error formatting that operators can act on.
// ---------------------------------------------------------------------------

function formatZodError(err: ZodError, file: string): string[] {
  return err.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "<root>";
    return `${file} → ${color("bold", path)}: ${issue.message}`;
  });
}

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

type Result =
  | { kind: "ok"; path: string }
  | { kind: "missing"; path: string }
  | { kind: "invalid-json"; path: string; message: string }
  | { kind: "schema-error"; path: string; messages: string[] };

function validateOne(entry: ContentEntry, repoRoot: string): Result {
  const fullPath = join(repoRoot, entry.path);

  if (!existsSync(fullPath)) {
    return entry.required
      ? { kind: "missing", path: entry.path }
      : { kind: "ok", path: entry.path };
  }

  let raw: string;
  try {
    raw = readFileSync(fullPath, "utf8");
  } catch (e) {
    return {
      kind: "invalid-json",
      path: entry.path,
      message: `Could not read file: ${(e as Error).message}`,
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return {
      kind: "invalid-json",
      path: entry.path,
      message: `Invalid JSON: ${(e as Error).message}`,
    };
  }

  const result = entry.schema.safeParse(parsed);
  if (!result.success) {
    return {
      kind: "schema-error",
      path: entry.path,
      messages: formatZodError(result.error, entry.path),
    };
  }

  return { kind: "ok", path: entry.path };
}

// ---------------------------------------------------------------------------
// Cross-file invariants: catches things a per-file schema cannot.
// ---------------------------------------------------------------------------

type InvariantCheck = (repoRoot: string) => string[];

const INVARIANTS: InvariantCheck[] = [
  // Roster minors must have consent recorded. Schema-level catch is in
  // lib/schemas/team.ts via .refine(), but we re-assert here to make the
  // failure mode explicit in CI logs.
  function rosterMinorConsent(repoRoot: string): string[] {
    const teamFile = join(repoRoot, "content/team.json");
    if (!existsSync(teamFile)) return [];
    const team = JSON.parse(readFileSync(teamFile, "utf8")) as {
      roster?: Array<{
        name?: string;
        isMinor?: boolean;
        consentRecorded?: boolean;
      }>;
    };
    const offenders = (team.roster ?? []).filter(
      (p) => p.isMinor === true && p.consentRecorded !== true,
    );
    return offenders.map(
      (p) =>
        `content/team.json → roster: minor "${p.name ?? "<unnamed>"}" lacks consentRecorded=true`,
    );
  },

  // Sponsors logo files must exist on disk.
  function sponsorLogosExist(repoRoot: string): string[] {
    const sponsorsFile = join(repoRoot, "content/sponsors.json");
    if (!existsSync(sponsorsFile)) return [];
    const data = JSON.parse(readFileSync(sponsorsFile, "utf8")) as {
      supporters?: Array<{ name?: string; logo?: string }>;
    };
    const errs: string[] = [];
    for (const s of data.supporters ?? []) {
      if (!s.logo) continue;
      const logoPath = join(repoRoot, "public", s.logo.replace(/^\//, ""));
      if (!existsSync(logoPath)) {
        errs.push(
          `content/sponsors.json → supporter "${s.name}": logo file not found at public${s.logo}`,
        );
      }
    }
    return errs;
  },

  // Site contact emails must use the approved domain. Prevents accidental
  // exposure of personal email addresses.
  function contactEmailDomain(repoRoot: string): string[] {
    const siteFile = join(repoRoot, "content/site.json");
    if (!existsSync(siteFile)) return [];
    const data = JSON.parse(readFileSync(siteFile, "utf8")) as {
      contactEmail?: string;
      partnershipsEmail?: string;
    };
    const expected = "newyorktitans.org";
    const errs: string[] = [];
    for (const [field, value] of [
      ["contactEmail", data.contactEmail],
      ["partnershipsEmail", data.partnershipsEmail],
    ] as const) {
      if (value && !value.endsWith(`@${expected}`)) {
        errs.push(`content/site.json → ${field}: must end with @${expected} (got "${value}")`);
      }
    }
    return errs;
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const repoRoot = resolve(process.cwd());

  header("Validating content schemas");

  let hadFailure = false;
  for (const entry of CONTENT_REGISTRY) {
    const result = validateOne(entry, repoRoot);
    switch (result.kind) {
      case "ok":
        ok(result.path);
        break;
      case "missing":
        fail(`${result.path} is required but missing`);
        hadFailure = true;
        break;
      case "invalid-json":
        fail(`${result.path}: ${result.message}`);
        hadFailure = true;
        break;
      case "schema-error":
        fail(`${result.path} failed schema validation:`);
        for (const m of result.messages) {
          // eslint-disable-next-line no-console
          console.error(`      ${m}`);
        }
        hadFailure = true;
        break;
    }
  }

  header("Checking cross-file invariants");
  for (const check of INVARIANTS) {
    const errs = check(repoRoot);
    if (errs.length === 0) {
      ok(check.name);
    } else {
      fail(check.name);
      for (const e of errs) {
        // eslint-disable-next-line no-console
        console.error(`      ${e}`);
      }
      hadFailure = true;
    }
  }

  header("Pre-launch advisory checks");
  // Photography gate (D-028). Advisory in dev, enforced via separate launch
  // gate script. Surfaced here so contributors are reminded.
  const imageDir = join(repoRoot, "public/images");
  if (!existsSync(imageDir)) {
    warn("public/images/ does not exist yet (3 authentic photos required for launch)");
  } else {
    ok("public/images/ exists");
  }

  if (hadFailure) {
    // eslint-disable-next-line no-console
    console.error(
      "\n" +
        color(
          "red",
          color("bold", "Content validation FAILED. Fix the issues above before committing."),
        ) +
        "\n",
    );
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log("\n" + color("green", color("bold", "All content valid. ✓")) + "\n");
  process.exit(0);
}

main();
