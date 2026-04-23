/**
 * lib/rate-limit.ts
 *
 * In-memory IP rate limiter for form server actions. Sufficient for the
 * expected volume of a small club site. Replace with Vercel KV only if
 * traffic justifies the cost.
 *
 * Authority: NYT pack Sections 10.6, 16.2; AGENTS.md Section 8.
 *
 * Caveats:
 *   - In-memory state does not survive across serverless instances. Different
 *     edge regions hold separate counters. This is acceptable; the goal is to
 *     stop trivial automated abuse, not to implement strict global enforcement.
 *   - For stronger guarantees, swap _hits with @upstash/ratelimit or
 *     @vercel/kv. Both require a DECISION_LOG entry to introduce.
 */

import "server-only";

const WINDOW_MS = Number(process.env.FORM_RATE_LIMIT_WINDOW_SECONDS ?? "30") * 1000;
const MAX_HITS = Number(process.env.FORM_RATE_LIMIT_MAX ?? "1");

// Cap on in-memory size to prevent unbounded growth.
const MAX_KEYS = 10_000;

type Bucket = { count: number; resetAt: number };

const _hits = new Map<string, Bucket>();

function evictIfFull(): void {
  if (_hits.size < MAX_KEYS) return;
  // Cheapest possible eviction: drop the oldest insertion.
  // Map iteration is insertion-ordered in modern JS engines.
  const firstKey = _hits.keys().next().value;
  if (firstKey !== undefined) _hits.delete(firstKey);
}

export type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: 0; resetAt: number; retryAfterSeconds: number };

/**
 * Check and increment the rate-limit counter for a key.
 * Use IP as the key for form submissions.
 */
export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const existing = _hits.get(key);

  if (!existing || existing.resetAt <= now) {
    evictIfFull();
    _hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_HITS - 1, resetAt: now + WINDOW_MS };
  }

  if (existing.count >= MAX_HITS) {
    return {
      ok: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  _hits.set(key, existing);
  return {
    ok: true,
    remaining: MAX_HITS - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Extract a best-effort IP from the request headers in a Vercel/Edge context.
 * Falls back to "unknown" so rate-limiting never silently passes — every
 * unknown caller shares the same bucket, which is conservative.
 */
export function ipFromHeaders(headers: Headers): string {
  // Vercel forwards the real client IP here.
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}
