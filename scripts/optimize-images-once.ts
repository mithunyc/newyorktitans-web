#!/usr/bin/env tsx
/**
 * One-off script to optimize oversized images using sharp.
 * Run: pnpm tsx scripts/optimize-images-once.ts
 */
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, renameSync } from "node:fs";
import { join, extname } from "node:path";

const MAX_BYTES = 500 * 1024;
const PUBLIC_DIR = join(process.cwd(), "public");
const JPEG_QUALITY = 80;
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function walk(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase())) results.push(full);
  }
  return results;
}

async function main() {
  const files = walk(PUBLIC_DIR);
  let optimized = 0;

  for (const file of files) {
    const stat = statSync(file);
    if (stat.size <= MAX_BYTES) continue;

    const ext = extname(file).toLowerCase();
    const sizeBefore = (stat.size / 1024).toFixed(1);

    console.log(`Optimizing: ${file} (${sizeBefore} KB)`);

    // Read into buffer first to avoid file locking issues with sharp.
    let buffer: Buffer;
    if (ext === ".png") {
      buffer = await sharp(file).png({ quality: JPEG_QUALITY, effort: 10 }).toBuffer();
    } else {
      // jpg/jpeg/webp
      buffer = await sharp(file).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
    }

    // Only write if we actually reduced size
    if (buffer.length < stat.size) {
      const tempFile = `${file}.tmp`;
      writeFileSync(tempFile, buffer);
      renameSync(tempFile, file);

      const sizeAfter = (buffer.length / 1024).toFixed(1);
      console.log(
        `  ✓ ${sizeBefore} KB → ${sizeAfter} KB (saved ${((1 - buffer.length / stat.size) * 100).toFixed(1)}%)`,
      );
      optimized++;
    } else {
      console.log(`  – Already optimal, skipping`);
    }
  }

  console.log(`\nDone. Optimized ${optimized} file(s).`);
}

main().catch(console.error);
