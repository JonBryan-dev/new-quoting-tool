import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  fetchGa4Summary,
  fetchSearchConsole,
  getGoogleAccessToken,
  getServiceAccount,
} from "@/lib/google-apis";
import { syncKeywordRanks } from "@/lib/seo-rank";

// Admin-only (protected by middleware): live Google data for the SEO tab.
// GET  → { configured, gsc?, ga4?, errors }
// POST → { action: "sync-keywords" } records Search Console positions
//        against tracked keywords (source "gsc")

export const maxDuration = 30;

export async function GET() {
  const configured = {
    serviceAccount: Boolean(getServiceAccount()),
    ga4PropertyId: Boolean(process.env.GA4_PROPERTY_ID),
  };

  if (!configured.serviceAccount) {
    return NextResponse.json({ configured, gsc: null, ga4: null, errors: [] });
  }

  const errors: string[] = [];
  let gsc = null;
  let ga4 = null;

  try {
    const token = await getGoogleAccessToken();

    try {
      const full = await fetchSearchConsole(token);
      // The full query list can run to hundreds of rows; the UI only
      // shows the head of it, and keyword matching happens server-side.
      gsc = { ...full, queries: full.queries.slice(0, 25), pages: full.pages.slice(0, 10) };
    } catch (err) {
      errors.push(`Search Console: ${err instanceof Error ? err.message : "failed"}`);
    }

    if (configured.ga4PropertyId) {
      try {
        ga4 = await fetchGa4Summary(token);
      } catch (err) {
        errors.push(`GA4: ${err instanceof Error ? err.message : "failed"}`);
      }
    }
  } catch (err) {
    errors.push(`Google auth: ${err instanceof Error ? err.message : "failed"}`);
  }

  return NextResponse.json({ configured, gsc, ga4, errors });
}

export async function POST(request: NextRequest) {
  let body: { action?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.action !== "sync-keywords") {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
  if (!getServiceAccount()) {
    return NextResponse.json({ error: "GOOGLE_SERVICE_ACCOUNT_KEY not set" }, { status: 503 });
  }

  try {
    const token = await getGoogleAccessToken();
    const { queries } = await fetchSearchConsole(token);
    const result = await syncKeywordRanks(db, queries);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Sync failed" },
      { status: 502 },
    );
  }
}
