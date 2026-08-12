import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ensureArticleColumns } from "@/lib/seo-content";

// Admin-only (protected by middleware): saved Content Studio drafts.
// GET  → list recent drafts
// POST → { action: "update", draftId, title?, slug?, metaDescription?, content? }
//        { action: "status", draftId, status } (draft | approved | published)
//        { action: "delete", draftId }
// Publishing an article draft sets publishedAt, which makes it live at
// /guides/[slug]; moving it back to draft/approved takes it down again.

export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({ dbAvailable: false, drafts: [] });

  try {
    await ensureArticleColumns(db);
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

  let body: {
    action?: string;
    draftId?: string;
    status?: string;
    title?: string;
    slug?: string;
    metaDescription?: string;
    content?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    await ensureArticleColumns(db);

    // Editing an article draft before (or after) publishing it.
    if (body.action === "update" && body.draftId) {
      const slug = body.slug
        ?.toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
      if (body.slug !== undefined && !slug) {
        return NextResponse.json({ error: "That web address is not usable" }, { status: 400 });
      }
      try {
        const draft = await db.seoDraft.update({
          where: { id: body.draftId },
          data: {
            ...(body.title !== undefined ? { title: body.title.trim() } : {}),
            ...(slug ? { slug } : {}),
            ...(body.metaDescription !== undefined
              ? { metaDescription: body.metaDescription.trim().slice(0, 300) }
              : {}),
            ...(body.content !== undefined ? { content: body.content } : {}),
          },
        });
        return NextResponse.json({ success: true, draft });
      } catch (err) {
        // The slug has a unique index, so a clash lands here
        const detail = err instanceof Error ? err.message : "";
        if (detail.includes("Unique") || detail.includes("unique")) {
          return NextResponse.json(
            { error: "Another article already uses that web address" },
            { status: 409 },
          );
        }
        throw err;
      }
    }

    if (body.action === "status" && body.draftId && ["draft", "approved", "published"].includes(body.status || "")) {
      const draft = await db.seoDraft.update({
        where: { id: body.draftId },
        data: {
          status: body.status,
          publishedAt: body.status === "published" ? new Date() : null,
        },
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
