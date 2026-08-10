import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, PoundSterling, TrendingDown } from "lucide-react";
import { getDb } from "@/lib/db";
import { ensureArticleColumns } from "@/lib/seo-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Heat Pump Guides & Advice | PlumbGas Renewables",
  description:
    "Plain-English heat pump guides for Staffordshire homeowners: real costs, running-cost comparisons, the £7,500 grant and honest answers from working heating engineers.",
  alternates: { canonical: "/guides" },
};

const GUIDES = [
  {
    href: "/guides/heat-pump-cost-staffordshire-2026",
    icon: <PoundSterling className="w-6 h-6" />,
    title: "How much does a heat pump cost in Staffordshire? (2026 prices)",
    desc: "Real installed prices by property type, what changes the price, and what the £7,500 grant leaves you paying.",
    date: "August 2026",
  },
  {
    href: "/guides/heat-pump-vs-gas-boiler-running-costs",
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Heat pump vs gas boiler running costs, the honest maths",
    desc: "The efficiency-vs-unit-price equation explained with worked examples, and what actually decides whether you save.",
    date: "August 2026",
  },
  {
    href: "/boiler-upgrade-scheme",
    icon: <BookOpen className="w-6 h-6" />,
    title: "The £7,500 Boiler Upgrade Scheme grant, explained simply",
    desc: "Who qualifies, what it covers and how we claim it for you so it comes straight off your quote.",
    date: "August 2026",
  },
];

// Approved articles from the Content Studio join the hand-written
// guides below; publishing happens in the admin, never automatically.
async function getPublishedArticles() {
  const db = await getDb();
  if (!db) return [];
  try {
    await ensureArticleColumns(db);
    const rows = await db.seoDraft.findMany({
      where: { kind: "article", status: "published", slug: { not: null } },
      orderBy: { publishedAt: "desc" },
    });
    return rows
      .filter((r: { slug: string | null; title: string | null }) => r.slug && r.title)
      .map((r: { slug: string | null; title: string | null; metaDescription: string | null; publishedAt: Date | null; createdAt: Date }) => ({
        href: `/guides/${r.slug}`,
        icon: <BookOpen className="w-6 h-6" />,
        title: r.title as string,
        desc: r.metaDescription || "",
        date: new Date(r.publishedAt || r.createdAt).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        }),
      }));
  } catch {
    return [];
  }
}

export default async function GuidesPage() {
  const articles = await getPublishedArticles();
  const allGuides = [...articles, ...GUIDES];
  return (
    <div>
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#4e7522] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Guides</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Heat pump guides,{" "}
            <span className="text-[#c4dd9b]">without the sales pitch</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Written by the engineers who do the installs, real prices, real maths and
            honest answers for Staffordshire homeowners.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {allGuides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 flex gap-5 hover:shadow-lg hover:border-[#4e7522]/40 transition-all"
              >
                <div className="w-12 h-12 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center shrink-0">
                  {g.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">{g.date}</p>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-[#4e7522] transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-sm text-gray-500">{g.desc}</p>
                </div>
                <span className="self-center text-[#4e7522] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            New guides published regularly, including performance write-ups from our
            own installs.
          </p>
        </div>
      </section>
    </div>
  );
}
