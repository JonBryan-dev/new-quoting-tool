import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getDb } from "@/lib/db";

// Admin-only (protected by middleware): the Content Studio brain.
// POST { mode, brief, currentText?, targetPath? } → Claude-drafted content.
// Drafts are saved to SeoDraft when the database is available; the route
// still works without a DB (the draft just isn't stored).
//
// Google spam-policy guardrail: everything produced here is a DRAFT for
// Jon to review and publish by hand — nothing is auto-published.

export const maxDuration = 60;

const BRAND_CONTEXT = `You write for PG Renewables (plumbgasrenewables.services), the renewables arm of PlumbGas Services — a Gas Safe & MCS-certified, Which? Trusted Trader heating company in Stafford, run by Jon Bryan, serving the whole of Staffordshire since 2003 (4.9★ on Trustpilot, 270+ reviews).

Key facts you must keep accurate:
- Core offer: FREE heat loss survey → fixed-price air source heat pump quote.
- ZeroDisrupt heat pumps from around £3,000 installed after the £7,500 Boiler Upgrade Scheme grant — about the same price as a new gas boiler. PG Renewables handles the grant paperwork.
- Brands installed: Vaillant, Viessmann, Daikin (5–16kW). 2-year workmanship warranty.
- Instant estimates powered by Heat Geek (partner tenancy).
- Phone 07872 626573 · 27 Barnbank Lane, Stafford ST17 9HB.
- Towns served: Stafford, Stone, Cannock, Rugeley, Uttoxeter, Stoke-on-Trent, Newcastle-under-Lyme, Lichfield, Tamworth, Burton upon Trent, Leek, Cheadle, Penkridge, Eccleshall, Gnosall, Brewood.

Style: plain British English, warm and expert, no hype, no invented statistics or fake reviews. Write for homeowners, not engineers. Content must read as genuinely local and helpful — never boilerplate.`;

const MODE_PROMPTS: Record<string, string> = {
  meta: "Write an SEO title tag (max 60 characters) and meta description (max 155 characters) for the page described in the brief. Return them labelled 'Title:' and 'Description:', then 2 alternative options.",
  article: "Write a complete, publish-ready guide article in Markdown for the topic in the brief. Include an H1, short intro that leads with the reader's problem, useful H2 sections, a realistic FAQ section (4-5 questions), and a closing call-to-action to book a free heat loss survey. 800-1200 words.",
  improve: "Rewrite the provided text to be clearer, more persuasive and better for SEO while keeping every fact accurate and the same rough length. Return the rewrite, then a short bullet list of what you changed and why.",
  keywords: "Suggest 15-20 keyword phrases worth targeting for the topic in the brief, grouped by intent (ready-to-buy, researching, local). For each, note which existing or new page should target it.",
  "gbp-post": "Write 3 alternative Google Business Profile posts (each under 750 characters) for the topic in the brief. Friendly, local, one clear call-to-action each. No hashtag spam.",
  custom: "Follow the brief exactly.",
};

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set in Vercel. Add it in Project Settings → Environment Variables, then redeploy." },
      { status: 503 },
    );
  }

  let body: { mode?: string; brief?: string; currentText?: string; targetPath?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const mode = body.mode && MODE_PROMPTS[body.mode] ? body.mode : "custom";
  const brief = body.brief?.trim();
  if (!brief) {
    return NextResponse.json({ error: "A brief is required" }, { status: 400 });
  }

  const userContent = [
    `Task: ${MODE_PROMPTS[mode]}`,
    body.targetPath ? `Target page: ${body.targetPath}` : null,
    `Brief: ${brief}`,
    body.currentText ? `Current text to work from:\n\n${body.currentText}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 6000,
      system: BRAND_CONTEXT,
      messages: [{ role: "user", content: userContent }],
    });

    if (message.stop_reason === "refusal") {
      return NextResponse.json({ error: "Claude declined this request — try rephrasing the brief." }, { status: 422 });
    }

    const content = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .filter(Boolean)
      .join("\n");

    if (!content.trim()) {
      return NextResponse.json({ error: "Empty response from Claude — try again." }, { status: 502 });
    }

    // Best-effort draft save — never fail the request over storage
    let draftId: string | null = null;
    const db = await getDb();
    if (db) {
      try {
        const draft = await db.seoDraft.create({
          data: {
            kind: mode,
            targetPath: body.targetPath?.trim() || null,
            brief,
            content,
            model: message.model,
          },
        });
        draftId = draft.id;
      } catch {
        // SeoDraft table missing — draft still returned to the UI
      }
    }

    return NextResponse.json({ success: true, content, draftId, model: message.model });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Claude request failed: ${detail}` }, { status: 502 });
  }
}
