import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Admin-only (protected by middleware): list captured leads —
// survey bookings plus any quote-table fallbacks with contact details.

export async function GET() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ dbAvailable: false, bookings: [], quotes: [] });
  }

  let bookings: unknown[] = [];
  let quotes: unknown[] = [];

  try {
    bookings = await db.surveyBooking.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  } catch {
    // Table may not exist until `prisma db push` has been run
  }

  try {
    quotes = await db.quote.findMany({
      where: {
        OR: [{ name: { not: null } }, { phone: { not: null } }, { email: { not: null } }],
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  } catch {
    // Quote table unavailable
  }

  return NextResponse.json({ dbAvailable: true, bookings, quotes });
}
