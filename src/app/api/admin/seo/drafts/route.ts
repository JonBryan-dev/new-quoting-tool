import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Admin-only (protected by middleware): saved Content Studio drafts.
// GET  → list recent drafts
// POST → { action: "status", draftId, status } (draft | approved | published)
//        { action: "delete", draftId }

export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({ dbAvailable: false, drafts: [] });

  try {
    const drafts = await db.seoDraft.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ dbAvailable: true, drafts });
  } catch {
    return NextResponse.json({ dbAvailable: false, drafts: [], tablesMissing: true });
  }
}

export async function POST(request: NextRequest) {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }

  let body: { action?: string; draftId?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    if (body.action === "status" && body.draftId && ["draft", "approved", "published"].includes(body.status || "")) {
      const draft = await db.seoDraft.update({
        where: { id: body.draftId },
        data: { status: body.status },
      });
      return NextResponse.json({ success: true, draft });
    }

    if (body.action === "delete" && body.draftId) {
      await db.seoDraft.delete({ where: { id: body.draftId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Database write failed" }, { status: 500 });
  }
}
