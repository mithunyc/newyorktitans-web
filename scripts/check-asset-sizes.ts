#!/usr/bin/env tsx
/**
 * scripts/check-asset-sizes.ts
 *
 * CI gate: prevents oversized image assets from reaching production.
 * Exits non-zero if any image in public/ exceeds the hard limit.
 *
 * Thresholds:
 *   - WARN  at 300 KB  (advisory — flags candidates for manual review)
 *   - ERROR at 500 KB  (hard gate — blocks the build)
 *
 * Source images in public/ are the *originals*. Next.js + sharp optimizes
 * them at serve-time to AVIF/WebP, so source JPGs don't need to be tiny —
 * but they must be reasonable. A 5 MB raw camera export is a CI failure.
 *
 * Authority: docs/authority/DESIGN.md, image governance.
 */

import { readdirSync, statSync } from "node:fs";
import { join, resolve, relative, extname } from "node:path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const WARN_BYTES = 300 * 1024; // 300 KB
const ERROR_BYTES = 500 * 1024; // 500 KB
const SCAN_DIR = "public";
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

// ---------------------------------------------------------------------------
// Reporters (match validate-content.ts style)
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
  if (process.env.NO_COLOR) return s;
  return `${colors[c]}${s}${colors.reset}`;
}

function header(s: string): void {
  console.log(`\n${color("bold", color("cyan", "▸ " + s))}`);
}

function ok(s: string): void {
  console.log(`  ${color("green", "✓")} ${s}`);
}

function fail(s: string): void {
  console.error(`  ${color("red", "✗")} ${s}`);
}

function warn(s: string): void {
  console.warn(`  ${color("yellow", "!")} ${s}`);
}

// ---------------------------------------------------------------------------
// Scanner
// ---------------------------------------------------------------------------

type AssetResult = {
  path: string;
  bytes: number;
  level: "ok" | "warn" | "error";
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function scanDir(dir: string): AssetResult[] {
  const results: AssetResult[] = [];

  function walk(current: string): void {
    const entries = readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
        // Exact base64 SVGs in brand kit are intentionally large
        if (fullPath.includes("brand")) continue;
        const stat = statSync(fullPath);
        let level: AssetResult["level"] = "ok";
        if (stat.size > ERROR_BYTES) level = "error";
        else if (stat.size > WARN_BYTES) level = "warn";
        results.push({ path: fullPath, bytes: stat.size, level });
      }
    }
  }

  walk(dir);
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const repoRoot = resolve(process.cwd());
  const scanPath = join(repoRoot, SCAN_DIR);

  header(`Checking image asset sizes in ${SCAN_DIR}/`);
  console.log(
    `  Thresholds: warn > ${formatSize(WARN_BYTES)}, error > ${formatSize(ERROR_BYTES)}\n`,
  );

  const results = scanDir(scanPath);

  if (results.length === 0) {
    warn("No image assets found in public/.");
    process.exit(0);
  }

  let hadError = false;
  let warnCount = 0;

  // Sort by size descending for readability.
  results.sort((a, b) => b.bytes - a.bytes);

  for (const r of results) {
    const relPath = relative(repoRoot, r.path);
    const sizeStr = formatSize(r.bytes);

    switch (r.level) {
      case "error":
        fail(`${relPath} (${sizeStr}) — exceeds ${formatSize(ERROR_BYTES)} limit`);
        hadError = true;
        break;
      case "warn":
        warn(`${relPath} (${sizeStr}) — above ${formatSize(WARN_BYTES)} advisory`);
        warnCount++;
        break;
      case "ok":
        ok(`${relPath} (${sizeStr})`);
        break;
    }
  }

  // Summary
  header("Summary");
  console.log(`  ${results.length} image(s) scanned`);
  if (warnCount > 0) {
    warn(`${warnCount} image(s) above advisory threshold`);
  }

  if (hadError) {
    console.error(
      "\n" +
        color(
          "red",
          color("bold", "Asset size check FAILED. Compress oversized images before committing."),
        ) +
        "\n",
    );
    process.exit(1);
  }

  console.log("\n" + color("green", color("bold", "All image assets within limits. ✓")) + "\n");
  process.exit(0);
}

main();
