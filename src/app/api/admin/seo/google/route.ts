import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  fetchGa4Summary,
  fetchSearchConsole,
  getGoogleAccessToken,
  getServiceAccount,
} from "@/lib/google-apis";

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
      gsc = await fetchSearchConsole(token);
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
    const keywords = await db.seoKeyword.findMany();

    const byPhrase = new Map<string, number>();
    for (const row of queries) {
      byPhrase.set(row.keys[0]?.toLowerCase().trim(), Math.round(row.position));
    }

    let synced = 0;
    for (const keyword of keywords) {
      const position = byPhrase.get(keyword.phrase.toLowerCase().trim());
      if (position != null) {
        await db.seoRankCheck.create({
          data: { keywordId: keyword.id, position, source: "gsc" },
        });
        synced++;
      }
    }

    return NextResponse.json({ success: true, synced, totalTracked: keywords.length });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Sync failed" },
      { status: 502 },
    );
  }
}
