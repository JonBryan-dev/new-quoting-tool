import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { captureSeoSnapshot, ensureSnapshotTable } from "@/lib/seo-snapshot";

// Admin-only (protected by middleware): weekly progress snapshots.
// GET  → snapshots newest-first (up to six months)
// POST → { action: "capture" } records/updates this week's snapshot now

export const maxDuration = 30;

export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({ dbAvailable: false, snapshots: [] });

  try {
    await ensureSnapshotTable(db);
    const snapshots = await db.seoSnapshot.findMany({
      orderBy: { weekStart: "desc" },
      take: 26,
    });
    return NextResponse.json({ dbAvailable: true, snapshots });
  } catch (err) {
    return NextResponse.json({
      dbAvailable: false,
      snapshots: [],
      error: err instanceof Error ? err.message.slice(0, 200) : "failed",
    });
  }
}

export async function POST(request: NextRequest) {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }

  let body: { action?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.action !== "capture") {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  try {
    const snapshot = await captureSeoSnapshot(db);
    return NextResponse.json({ success: true, snapshot });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message.slice(0, 300) : "Capture failed" },
      { status: 502 },
    );
  }
}
