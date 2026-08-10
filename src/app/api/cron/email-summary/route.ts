import { NextRequest, NextResponse } from "next/server";
import { sendSiteEmail } from "@/lib/seo-content";

// Monday-morning summary email, triggered by Vercel Cron (see
// vercel.json). The SEO autopilot commits its plain-English weekly
// summary to public/seo-weekly-summary.txt earlier the same morning;
// this route reads it off the live site and emails it to Jon. If the
// file is stale (autopilot didn't run or the deploy failed) it skips
// rather than re-sending old news.

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const SUMMARY_URL = "https://www.plumbgasrenewables.services/seo-weekly-summary.txt";
const MAX_AGE_DAYS = 6;

export async function GET(request: NextRequest) {
  if (process.env.CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let text: string;
  try {
    const res = await fetch(SUMMARY_URL, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ skipped: `summary file returned ${res.status}` });
    }
    text = await res.text();
  } catch {
    return NextResponse.json({ skipped: "summary file unreachable" });
  }

  // The summary starts with a "Week of YYYY-MM-DD" line; anything older
  // than a week means this Monday's autopilot run didn't land.
  const dateMatch = text.slice(0, 200).match(/\d{4}-\d{2}-\d{2}/);
  if (!dateMatch) {
    return NextResponse.json({ skipped: "no date line in summary" });
  }
  const ageDays = (Date.now() - new Date(dateMatch[0]).getTime()) / 86_400_000;
  if (ageDays > MAX_AGE_DAYS) {
    return NextResponse.json({ skipped: `summary is ${Math.round(ageDays)} days old` });
  }

  const emailed = await sendSiteEmail(
    `Your weekly SEO update (w/c ${dateMatch[0]})`,
    text.trim() +
      "\n\n----------------------------------------\nFull numbers and history: log in at /admin and open the SEO tab.\n",
  );

  return NextResponse.json({ success: true, emailed, weekOf: dateMatch[0] });
}
