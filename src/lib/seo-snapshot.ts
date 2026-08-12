import { fetchGa4Summary, fetchSearchConsole, getGoogleAccessToken } from "./google-apis";

// Weekly SEO progress snapshots: one row per week capturing every
// headline metric, written by the Monday cron and on demand from the
// admin SEO tab. The table self-creates (idempotent DDL) because the
// one-time /setup ran before this table existed.

const SNAPSHOT_DDL = `CREATE TABLE IF NOT EXISTS "SeoSnapshot" (
  "id" TEXT PRIMARY KEY,
  "weekStart" TIMESTAMP(3) NOT NULL,
  "sessions" INTEGER NOT NULL DEFAULT 0,
  "activeUsers" INTEGER NOT NULL DEFAULT 0,
  "leads" INTEGER NOT NULL DEFAULT 0,
  "gscClicks" INTEGER NOT NULL DEFAULT 0,
  "gscImpressions" INTEGER NOT NULL DEFAULT 0,
  "gscQueries" INTEGER NOT NULL DEFAULT 0,
  "avgPosition" DOUBLE PRECISION,
  "top10Count" INTEGER NOT NULL DEFAULT 0,
  "trackedKeywords" INTEGER NOT NULL DEFAULT 0,
  "tasksDone" INTEGER NOT NULL DEFAULT 0,
  "tasksOpen" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

export async function ensureSnapshotTable(db: any): Promise<void> {
  await db.$executeRawUnsafe(SNAPSHOT_DDL);
  await db.$executeRawUnsafe(
    `CREATE UNIQUE INDEX IF NOT EXISTS "SeoSnapshot_weekStart_key" ON "SeoSnapshot"("weekStart")`,
  );
}

function mondayOf(date: Date): Date {
  const d = new Date(date);
  const daysSinceMonday = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - daysSinceMonday);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

// Gathers all metrics and upserts this week's snapshot. Numbers from
// Google are 28-day rolling figures at time of capture, totalled across
// every query Search Console returns. Note that this used to cover only
// the top 25 queries, so snapshots captured before August 2026 read low
// against later ones. Throws if Google isn't set up.
export async function captureSeoSnapshot(db: any) {
  await ensureSnapshotTable(db);

  const token = await getGoogleAccessToken();
  const gsc = await fetchSearchConsole(token);

  let ga4 = { sessions: 0, activeUsers: 0, leads: 0 };
  try {
    ga4 = await fetchGa4Summary(token);
  } catch {
    // GA4 not configured — keep zeros rather than failing the snapshot
  }

  const gscClicks = gsc.queries.reduce((sum, row) => sum + row.clicks, 0);
  const gscImpressions = gsc.queries.reduce((sum, row) => sum + row.impressions, 0);
  const weighted = gsc.queries.reduce((sum, row) => sum + row.position * row.impressions, 0);
  const avgPosition = gscImpressions > 0 ? Math.round((weighted / gscImpressions) * 10) / 10 : null;
  const top10Count = gsc.queries.filter((row) => row.position <= 10).length;

  let tasksDone = 0;
  let tasksOpen = 0;
  let trackedKeywords = 0;
  try {
    tasksDone = await db.seoTask.count({ where: { status: "done" } });
    tasksOpen = await db.seoTask.count({ where: { status: "open" } });
    trackedKeywords = await db.seoKeyword.count();
  } catch {
    // task/keyword tables unavailable — snapshot still worth keeping
  }

  const data = {
    sessions: ga4.sessions,
    activeUsers: ga4.activeUsers,
    leads: ga4.leads,
    gscClicks,
    gscImpressions,
    gscQueries: gsc.queries.length,
    avgPosition,
    top10Count,
    trackedKeywords,
    tasksDone,
    tasksOpen,
  };

  const weekStart = mondayOf(new Date());
  return db.seoSnapshot.upsert({
    where: { weekStart },
    update: data,
    create: { weekStart, ...data },
  });
}
