import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  fetchGa4Summary,
  fetchSearchConsole,
  getGoogleAccessToken,
  getServiceAccount,
} from "@/lib/google-apis";

// Public health check for the SEO integrations, exposes only booleans
// and short status lines (no secrets), so setup can be verified without
// the admin login (which itself needs the database connected).

export const maxDuration = 30;
export const dynamic = "force-dynamic";

function trim(message: string): string {
  return message.length > 250 ? `${message.slice(0, 250)}…` : message;
}

export async function GET() {
  const result = {
    env: {
      googleServiceAccount: Boolean(getServiceAccount()),
      ga4PropertyId: Boolean(process.env.GA4_PROPERTY_ID),
      anthropicKey: Boolean(process.env.ANTHROPIC_API_KEY2 || process.env.ANTHROPIC_API_KEY),
      database: false,
    },
    googleAuth: "not attempted",
    searchConsole: "not attempted",
    ga4: "not attempted",
  };

  result.env.database = Boolean(await getDb());

  if (!result.env.googleServiceAccount) {
    result.googleAuth = "GOOGLE_SERVICE_ACCOUNT_KEY not set (or not valid JSON)";
  } else {
    try {
      const token = await getGoogleAccessToken();
      result.googleAuth = "ok";

      try {
        const gsc = await fetchSearchConsole(token);
        result.searchConsole = `ok, reading ${gsc.siteUrl} (${gsc.queries.length} queries in last 28 days)`;
      } catch (err) {
        result.searchConsole = `error: ${trim(err instanceof Error ? err.message : "failed")}`;
      }

      if (!result.env.ga4PropertyId) {
        result.ga4 = "GA4_PROPERTY_ID not set";
      } else {
        try {
          const ga4 = await fetchGa4Summary(token);
          result.ga4 = `ok, ${ga4.sessions} sessions, ${ga4.activeUsers} visitors, ${ga4.leads} leads (28 days)`;
        } catch (err) {
          result.ga4 = `error: ${trim(err instanceof Error ? err.message : "failed")}`;
        }
      }
    } catch (err) {
      result.googleAuth = `error: ${trim(err instanceof Error ? err.message : "failed")}`;
    }
  }

  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}
