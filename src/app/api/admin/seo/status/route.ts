import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Admin-only (protected by middleware): SEO Command Centre setup status.
// Reports which integrations are live so the UI can show what's left to
// wire up, plus headline counts when the database is reachable.

export async function GET() {
  const db = await getDb();

  const status = {
    dbConnected: false,
    tablesReady: false,
    anthropicKey: Boolean(process.env.ANTHROPIC_API_KEY2 || process.env.ANTHROPIC_API_KEY),
    googleServiceAccount: Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
    ga4MeasurementId: "G-F7Z434DHFX",
    counts: { keywords: 0, openTasks: 0, doneTasks: 0, drafts: 0, leads: 0 },
  };

  if (db) {
    status.dbConnected = true;
    try {
      const [keywords, openTasks, doneTasks, drafts] = await Promise.all([
        db.seoKeyword.count(),
        db.seoTask.count({ where: { status: "open" } }),
        db.seoTask.count({ where: { status: "done" } }),
        db.seoDraft.count(),
      ]);
      status.tablesReady = true;
      status.counts.keywords = keywords;
      status.counts.openTasks = openTasks;
      status.counts.doneTasks = doneTasks;
      status.counts.drafts = drafts;
    } catch {
      // SEO tables don't exist yet — `npm run db:push` hasn't been run
    }
    try {
      status.counts.leads = await db.surveyBooking.count();
    } catch {
      // SurveyBooking table unavailable
    }
  }

  return NextResponse.json(status);
}
