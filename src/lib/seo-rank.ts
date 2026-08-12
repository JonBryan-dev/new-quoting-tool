import type { GscRow } from "./google-apis";

// Keyword rank tracking helpers shared by the weekly cron and the admin
// "sync from Google" button, so both record exactly the same thing.

// SeoRankCheck predates these columns, and /setup self-locks after the
// first admin is created, so the columns are added lazily at call sites.
let ensured = false;
export async function ensureRankCheckColumns(db: any): Promise<void> {
  if (ensured) return;
  await db.$executeRawUnsafe(`ALTER TABLE "SeoRankCheck" ADD COLUMN IF NOT EXISTS "clicks" INTEGER`);
  await db.$executeRawUnsafe(`ALTER TABLE "SeoRankCheck" ADD COLUMN IF NOT EXISTS "impressions" INTEGER`);
  ensured = true;
}

export interface SyncResult {
  synced: number;
  skipped: number;
  totalTracked: number;
}

// Records today's Search Console position for every tracked keyword that
// appears in the query list. Positions are per-day: running this twice in
// one day updates the existing row rather than adding a duplicate, which
// keeps the history readable.
export async function syncKeywordRanks(db: any, queries: GscRow[]): Promise<SyncResult> {
  await ensureRankCheckColumns(db);

  const byPhrase = new Map<string, GscRow>();
  for (const row of queries) {
    const phrase = row.keys[0]?.toLowerCase().trim();
    if (phrase) byPhrase.set(phrase, row);
  }

  const keywords = await db.seoKeyword.findMany();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  let synced = 0;
  let skipped = 0;

  for (const keyword of keywords) {
    const row = byPhrase.get(keyword.phrase.toLowerCase().trim());
    if (!row) {
      skipped++;
      continue;
    }
    const data = {
      position: Math.round(row.position),
      clicks: Math.round(row.clicks),
      impressions: Math.round(row.impressions),
      source: "gsc",
    };

    const today = await db.seoRankCheck.findFirst({
      where: { keywordId: keyword.id, source: "gsc", checkedAt: { gte: startOfDay } },
    });
    if (today) {
      await db.seoRankCheck.update({ where: { id: today.id }, data });
    } else {
      await db.seoRankCheck.create({ data: { keywordId: keyword.id, ...data } });
    }
    synced++;
  }

  return { synced, skipped, totalTracked: keywords.length };
}
