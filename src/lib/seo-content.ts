// Shared brand voice, the auto-draft topic queue, and helpers for
// DB-published articles. Articles live in SeoDraft rows (kind
// "article"); approving one in admin publishes it at /guides/[slug].

export const BRAND_CONTEXT = `You write for PG Renewables (plumbgasrenewables.services), the renewables arm of PlumbGas Services, a Gas Safe & MCS-certified, Which? Trusted Trader heating company in Stafford, run by Jon Bryan, serving the whole of Staffordshire since 2003 (4.9 stars on Trustpilot, 270+ reviews).

Key facts you must keep accurate:
- Core offer: FREE heat loss survey leading to a fixed-price air source heat pump quote.
- ZeroDisrupt heat pumps from around £3,000 installed after the £7,500 Boiler Upgrade Scheme grant, about the same price as a new gas boiler. PG Renewables handles the grant paperwork.
- Brands installed: Vaillant, Viessmann, Daikin (5-16kW). 2-year workmanship warranty.
- Instant estimates powered by Heat Geek (partner tenancy).
- Phone 07872 626573. 27 Barnbank Lane, Stafford ST17 9HB.
- Towns served: Stafford, Stone, Cannock, Rugeley, Uttoxeter, Stoke-on-Trent, Newcastle-under-Lyme, Lichfield, Tamworth, Burton upon Trent, Leek, Cheadle, Penkridge, Eccleshall, Gnosall, Brewood.

Style: plain British English, warm and expert, no hype, no invented statistics or fake reviews. Never use em dashes; use commas, colons or full stops instead. Write for homeowners, not engineers. Content must read as genuinely local and helpful, never boilerplate.`;

// Topics queue for the weekly auto-draft, ordered by lead-gen value.
// Each becomes one article; slug doubles as the dedupe key.
export const ARTICLE_TOPICS: { slug: string; topic: string }[] = [
  {
    slug: "how-long-does-heat-pump-installation-take",
    topic: "How long does a heat pump installation actually take, what happens on each day, how much disruption to expect, and how low-disruption installs keep the heating off for hours rather than days",
  },
  {
    slug: "do-heat-pumps-work-in-winter",
    topic: "Do heat pumps really work in cold UK winters? Address the myth directly with how modern units perform below freezing and why correct sizing from a heat loss survey matters",
  },
  {
    slug: "heat-pump-noise-what-to-expect",
    topic: "How loud is an air source heat pump? Honest decibel context (compared with everyday sounds), siting choices that keep neighbours happy, and planning rules on noise",
  },
  {
    slug: "do-i-need-planning-permission-heat-pump",
    topic: "Do you need planning permission for a heat pump in England? Permitted development rules as they apply to typical Staffordshire homes, and the exceptions worth knowing",
  },
  {
    slug: "heat-pump-radiators-do-they-need-changing",
    topic: "Will you need to change your radiators for a heat pump? Why some homes need a few swaps, how the heat loss survey decides radiator by radiator, and typical costs",
  },
  {
    slug: "combi-boiler-to-heat-pump-cylinder",
    topic: "Switching from a combi boiler to a heat pump: where does the hot water cylinder go? Practical options for airing cupboards, lofts and garages in typical homes",
  },
  {
    slug: "boiler-upgrade-scheme-eligibility-explained",
    topic: "Who actually qualifies for the £7,500 Boiler Upgrade Scheme grant, common misconceptions, and how the installer claims it so the homeowner never handles paperwork",
  },
  {
    slug: "heat-pump-oil-lpg-homes",
    topic: "Heat pumps for oil and LPG heated homes in rural Staffordshire villages: why the savings are biggest off the gas grid, and what the switch involves",
  },
  {
    slug: "what-is-mcs-certification",
    topic: "What MCS certification means, why the £7,500 grant requires an MCS installer, and what to check before choosing a heat pump company",
  },
  {
    slug: "heat-pump-servicing-what-it-involves",
    topic: "What a heat pump service involves, why manufacturers require one annually for the warranty, and the efficiency problems a service catches early",
  },
  {
    slug: "underfloor-heating-with-heat-pumps",
    topic: "Why underfloor heating and heat pumps are the perfect pairing, when it makes sense in a retrofit, and what low-profile overlay systems make possible",
  },
  {
    slug: "epc-rating-and-heat-pumps",
    topic: "Heat pumps and your EPC rating: what changes, why it matters when selling or renting a home, and what Staffordshire homeowners should know",
  },
];

// Lazy column additions for article publishing; SeoDraft predates them.
let ensured = false;
export async function ensureArticleColumns(db: any): Promise<void> {
  if (ensured) return;
  await db.$executeRawUnsafe(`ALTER TABLE "SeoDraft" ADD COLUMN IF NOT EXISTS "title" TEXT`);
  await db.$executeRawUnsafe(`ALTER TABLE "SeoDraft" ADD COLUMN IF NOT EXISTS "slug" TEXT`);
  await db.$executeRawUnsafe(`ALTER TABLE "SeoDraft" ADD COLUMN IF NOT EXISTS "metaDescription" TEXT`);
  await db.$executeRawUnsafe(`ALTER TABLE "SeoDraft" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3)`);
  await db.$executeRawUnsafe(
    `CREATE UNIQUE INDEX IF NOT EXISTS "SeoDraft_slug_key" ON "SeoDraft"("slug") WHERE "slug" IS NOT NULL`,
  );
  ensured = true;
}

export interface ParsedArticle {
  title: string;
  slug: string;
  metaDescription: string;
  body: string;
}

// The generation prompt asks for TITLE:/SLUG:/META: header lines then
// the markdown body; parse defensively in case the model drifts.
export function parseArticle(raw: string, fallbackSlug: string): ParsedArticle {
  const lines = raw.trim().split("\n");
  let title = "";
  let slug = "";
  let meta = "";
  let bodyStart = 0;

  for (let i = 0; i < Math.min(lines.length, 8); i++) {
    const line = lines[i].trim();
    if (/^TITLE:\s*/i.test(line)) {
      title = line.replace(/^TITLE:\s*/i, "").trim();
      bodyStart = i + 1;
    } else if (/^SLUG:\s*/i.test(line)) {
      slug = line.replace(/^SLUG:\s*/i, "").trim();
      bodyStart = i + 1;
    } else if (/^META:\s*/i.test(line)) {
      meta = line.replace(/^META:\s*/i, "").trim();
      bodyStart = i + 1;
    }
  }

  let body = lines.slice(bodyStart).join("\n").trim();
  if (!title) {
    const h1 = body.match(/^#\s+(.+)$/m);
    title = h1 ? h1[1].trim() : "Untitled draft";
  }
  // Body keeps its own H1; the page renders title separately, so drop
  // a duplicate leading H1 if present.
  body = body.replace(/^#\s+.+\n+/, "");
  if (!slug) slug = fallbackSlug;
  slug = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  if (!meta) meta = body.replace(/[#*_>`]/g, "").slice(0, 150).trim();
  return { title, slug, metaDescription: meta.slice(0, 155), body };
}

export async function sendSiteEmail(subject: string, text: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false;
  const fromCandidates = [
    process.env.LEADS_FROM || "PG Renewables <leads@plumbgasrenewables.services>",
    "PG Renewables <onboarding@resend.dev>",
  ].filter((v, i, arr) => arr.indexOf(v) === i);
  for (const from of fromCandidates) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [process.env.LEADS_EMAIL || "jon@plumbgas.services"],
          subject,
          text,
        }),
      });
      if (res.ok) return true;
    } catch {
      // try next sender
    }
  }
  return false;
}
