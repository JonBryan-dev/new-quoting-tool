import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  fetchGa4Summary,
  fetchSearchConsole,
  getGoogleAccessToken,
  getServiceAccount,
} from "@/lib/google-apis";

// Weekly SEO data export, triggered by Vercel Cron (see vercel.json).
// Gathers Search Console + GA4 data, records rank checks for tracked
// keywords, and emails a machine-readable report via Resend. The SEO
// autopilot (a scheduled Claude session) reads that email each week to
// decide on low-risk site improvements.

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` when the
  // env var is set, reject other callers in that case.
  if (process.env.CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!getServiceAccount()) {
    return NextResponse.json({ error: "GOOGLE_SERVICE_ACCOUNT_KEY not set" }, { status: 503 });
  }

  const report: Record<string, unknown> = {
    generatedAt: new Date().toISOString(),
    site: "https://www.plumbgasrenewables.services",
  };

  try {
    const token = await getGoogleAccessToken();

    try {
      const gsc = await fetchSearchConsole(token);
      report.searchConsole = {
        siteUrl: gsc.siteUrl,
        topQueries: gsc.queries,
        topPages: gsc.pages,
      };

      // Auto-record positions for tracked keywords while we're here
      const db = await getDb();
      if (db) {
        try {
          const keywords = await db.seoKeyword.findMany();
          const byPhrase = new Map<string, number>();
          for (const row of gsc.queries) {
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
          report.keywordSync = { tracked: keywords.length, synced };
        } catch {
          report.keywordSync = { error: "SEO tables unavailable" };
        }

        // Weekly progress snapshot — one row per week, upserted
        try {
          const { captureSeoSnapshot } = await import("@/lib/seo-snapshot");
          const snapshot = await captureSeoSnapshot(db);
          report.snapshot = { weekStart: snapshot.weekStart, captured: true };
        } catch (err) {
          report.snapshot = { error: err instanceof Error ? err.message : "failed" };
        }
      }
    } catch (err) {
      report.searchConsole = { error: err instanceof Error ? err.message : "failed" };
    }

    try {
      report.ga4 = await fetchGa4Summary(token);
    } catch (err) {
      report.ga4 = { error: err instanceof Error ? err.message : "failed" };
    }
  } catch (err) {
    report.authError = err instanceof Error ? err.message : "Google auth failed";
  }

  // Email the report (autopilot parses the JSON block; Jon can skim it)
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    const json = JSON.stringify(report, null, 2);
    const fromCandidates = [
      process.env.LEADS_FROM || "PG Renewables <leads@plumbgasrenewables.services>",
      "PG Renewables <onboarding@resend.dev>",
    ].filter((v, i, arr) => arr.indexOf(v) === i);
    for (const from of fromCandidates) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [process.env.LEADS_EMAIL || "jon@plumbgas.services"],
            subject: `SEO Autopilot data ${new Date().toISOString().slice(0, 10)}`,
            text: `Weekly SEO data export for plumbgasrenewables.services.\nThe SEO autopilot reads this automatically, no action needed.\n\n===JSON===\n${json}\n===END===\n`,
          }),
        });
        if (res.ok) {
          emailed = true;
          break;
        }
      } catch {
        // try next sender
      }
    }
  }

  return NextResponse.json({ success: true, emailed, report });
}
