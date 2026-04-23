/**
 * app/api/health/route.ts
 *
 * Uptime ping endpoint. Returns 200 + JSON so external monitors
 * (UptimeRobot, BetterStack free tier) can confirm the deployment is live.
 *
 * Authority: NYT pack Section 17 (Deployment/Hosting Plan).
 *
 * Excluded from robots.txt disallow — it is not a user-facing page and
 * has nothing to index, but monitors need it to be reachable.
 */

import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "newyorktitans.org",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        // Short cache so monitors see real status quickly.
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
