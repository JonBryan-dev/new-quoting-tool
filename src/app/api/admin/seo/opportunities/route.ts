import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { fetchSearchConsole, getGoogleAccessToken, getServiceAccount } from "@/lib/google-apis";
import { findContentOpportunities } from "@/lib/seo-opportunities";
import { ensureArticleColumns } from "@/lib/seo-content";

// Admin-only (protected by middleware): what to write next, worked out
// from the searches that are already bringing this site up in Google.

export const maxDuration = 30;

export async function GET() {
  if (!getServiceAccount()) {
    return NextResponse.json({ configured: false, opportunities: [] });
  }

  try {
    const token = await getGoogleAccessToken();
    const { queries } = await fetchSearchConsole(token);

    // Skip anything a published article already answers
    let coveredSlugs: string[] = [];
    const db = await getDb();
    if (db) {
      try {
        await ensureArticleColumns(db);
        const published = await db.seoDraft.findMany({
          where: { kind: "article", status: "published", slug: { not: null } },
          select: { slug: true },
        });
        coveredSlugs = published
          .map((p: { slug: string | null }) => p.slug)
          .filter((s: string | null): s is string => Boolean(s));
      } catch {
        // no article table yet, everything is fair game
      }
    }

    const opportunities = findContentOpportunities(queries, coveredSlugs).slice(0, 20);
    return NextResponse.json({
      configured: true,
      totalQueries: queries.length,
      opportunities,
    });
  } catch (err) {
    return NextResponse.json(
      {
        configured: true,
        opportunities: [],
        error: err instanceof Error ? err.message.slice(0, 200) : "failed",
      },
      { status: 502 },
    );
  }
}
