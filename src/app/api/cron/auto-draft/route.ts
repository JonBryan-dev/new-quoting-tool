import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getDb } from "@/lib/db";
import {
  ARTICLE_TOPICS,
  BRAND_CONTEXT,
  ensureArticleColumns,
  parseArticle,
  sendSiteEmail,
} from "@/lib/seo-content";

// Weekly auto-draft, triggered by Vercel Cron (see vercel.json).
// Picks the next undrafted topic from the queue, has Claude write the
// article, saves it as a SeoDraft (status "draft") and emails Jon a
// preview. NOTHING PUBLISHES HERE: the article only goes live when Jon
// presses "Approve & publish" in the admin SEO tab, which keeps
// Google's scaled-content policy on side.

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (process.env.CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY2 || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 503 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }

  await ensureArticleColumns(db);

  // A topic counts as taken once any draft exists for its slug, whatever
  // its status, so a rejected draft never regenerates on its own.
  const existing = await db.seoDraft.findMany({
    where: { kind: "article", slug: { not: null } },
    select: { slug: true },
  });
  const taken = new Set(existing.map((r: { slug: string | null }) => r.slug));
  const next = ARTICLE_TOPICS.find((t) => !taken.has(t.slug));
  if (!next) {
    return NextResponse.json({ success: true, done: "All queued topics are drafted" });
  }

  const prompt = `Write a complete, publish-ready guide article for the topic below.

Output format, exactly:
TITLE: <page title, max 65 characters, written to earn the click in Google>
SLUG: ${next.slug}
META: <meta description, max 155 characters>

Then a blank line, then the article body in Markdown. Do not include an H1, the page adds the title itself. Structure: a short intro that leads with the reader's real question, useful H2 sections, an H2 "Frequently asked questions" section with 4 or 5 H3 questions, and a closing call to action to book a free heat loss survey linking to /book. Use only headings, paragraphs, bold text and lists, no tables and no images. 800 to 1200 words.

Topic: ${next.topic}`;

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 6000,
      system: BRAND_CONTEXT,
      messages: [{ role: "user", content: prompt }],
    });

    if (message.stop_reason === "refusal") {
      return NextResponse.json({ error: "Model declined the topic" }, { status: 422 });
    }

    const raw = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .filter(Boolean)
      .join("\n");
    if (!raw.trim()) {
      return NextResponse.json({ error: "Empty response from model" }, { status: 502 });
    }

    const parsed = parseArticle(raw, next.slug);
    const draft = await db.seoDraft.create({
      data: {
        kind: "article",
        targetPath: `/guides/${parsed.slug}`,
        brief: next.topic,
        content: parsed.body,
        model: message.model,
        status: "draft",
        title: parsed.title,
        slug: parsed.slug,
        metaDescription: parsed.metaDescription,
      },
    });

    const emailed = await sendSiteEmail(
      `New article draft ready: ${parsed.title}`,
      [
        `A new guide article has been drafted for plumbgasrenewables.services and is waiting for your approval.`,
        ``,
        `Title: ${parsed.title}`,
        `Will publish at: https://www.plumbgasrenewables.services/guides/${parsed.slug}`,
        ``,
        `To review and publish: log in at /admin, open the SEO tab, scroll to Content Studio, open "saved drafts" and press "Approve & publish". Nothing goes live until you do.`,
        ``,
        `----------------------------------------`,
        ``,
        parsed.body,
      ].join("\n"),
    );

    return NextResponse.json({
      success: true,
      draftId: draft.id,
      slug: parsed.slug,
      title: parsed.title,
      emailed,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message.slice(0, 300) : "Unknown error";
    return NextResponse.json({ error: `Draft generation failed: ${detail}` }, { status: 502 });
  }
}
