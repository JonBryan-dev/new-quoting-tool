import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { DEFAULT_SEO_KEYWORDS } from "@/lib/seo-centre";

// Admin-only (protected by middleware): keyword rank tracker.
// GET  → list keywords with their recent checks (seeds defaults on first use)
// POST → { action: "add", phrase, targetPath? }
//        { action: "check", keywordId, position }  position 0/null = not found
//        { action: "delete", keywordId }

export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({ dbAvailable: false, keywords: [] });

  try {
    if ((await db.seoKeyword.count()) === 0) {
      await db.seoKeyword.createMany({ data: DEFAULT_SEO_KEYWORDS });
    }
    const keywords = await db.seoKeyword.findMany({
      orderBy: { createdAt: "asc" },
      include: { checks: { orderBy: { checkedAt: "desc" }, take: 8 } },
    });
    return NextResponse.json({ dbAvailable: true, keywords });
  } catch {
    return NextResponse.json({ dbAvailable: false, keywords: [], tablesMissing: true });
  }
}

export async function POST(request: NextRequest) {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }

  let body: { action?: string; phrase?: string; targetPath?: string; keywordId?: string; position?: number | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    if (body.action === "add" && body.phrase?.trim()) {
      const keyword = await db.seoKeyword.create({
        data: { phrase: body.phrase.trim(), targetPath: body.targetPath?.trim() || null },
      });
      return NextResponse.json({ success: true, keyword });
    }

    if (body.action === "check" && body.keywordId) {
      const position =
        typeof body.position === "number" && body.position > 0 ? Math.round(body.position) : null;
      const check = await db.seoRankCheck.create({
        data: { keywordId: body.keywordId, position, source: "manual" },
      });
      return NextResponse.json({ success: true, check });
    }

    if (body.action === "delete" && body.keywordId) {
      await db.seoKeyword.delete({ where: { id: body.keywordId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Database write failed, run npm run db:push?" }, { status: 500 });
  }
}
