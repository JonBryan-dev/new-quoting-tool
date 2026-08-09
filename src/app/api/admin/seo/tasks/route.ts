import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { DEFAULT_SEO_TASKS } from "@/lib/seo-centre";

// Admin-only (protected by middleware): SEO task checklist.
// GET  → list tasks (seeds the default plan on first use)
// POST → { action: "toggle", taskId }
//        { action: "add", title, category }
//        { action: "delete", taskId }
//        { action: "reset-weekly" }  reopens all weekly tasks (Monday routine)

export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({ dbAvailable: false, tasks: [] });

  try {
    if ((await db.seoTask.count()) === 0) {
      await db.seoTask.createMany({ data: DEFAULT_SEO_TASKS });
    }
    const tasks = await db.seoTask.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json({ dbAvailable: true, tasks });
  } catch {
    return NextResponse.json({ dbAvailable: false, tasks: [], tablesMissing: true });
  }
}

export async function POST(request: NextRequest) {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }

  let body: { action?: string; taskId?: string; title?: string; category?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    if (body.action === "toggle" && body.taskId) {
      const task = await db.seoTask.findUnique({ where: { id: body.taskId } });
      if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
      const done = task.status !== "done";
      const updated = await db.seoTask.update({
        where: { id: body.taskId },
        data: { status: done ? "done" : "open", completedAt: done ? new Date() : null },
      });
      return NextResponse.json({ success: true, task: updated });
    }

    if (body.action === "add" && body.title?.trim()) {
      const task = await db.seoTask.create({
        data: {
          title: body.title.trim(),
          category: body.category || "content",
          frequency: "once",
          sortOrder: 999,
        },
      });
      return NextResponse.json({ success: true, task });
    }

    if (body.action === "delete" && body.taskId) {
      await db.seoTask.delete({ where: { id: body.taskId } });
      return NextResponse.json({ success: true });
    }

    if (body.action === "reset-weekly") {
      await db.seoTask.updateMany({
        where: { frequency: "weekly" },
        data: { status: "open", completedAt: null },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Database write failed — run npm run db:push?" }, { status: 500 });
  }
}
