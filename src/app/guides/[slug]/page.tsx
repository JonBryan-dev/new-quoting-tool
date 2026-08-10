import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { getDb } from "@/lib/db";
import { ensureArticleColumns } from "@/lib/seo-content";
import { MarkdownArticle } from "@/lib/markdown";

// DB-published guide articles (approved SeoDraft rows). Hand-written
// guides have their own static routes, which take precedence over this
// dynamic one, so only slugs without a static page reach here.

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.plumbgasrenewables.services";

async function getArticle(slug: string) {
  const db = await getDb();
  if (!db) return null;
  try {
    await ensureArticleColumns(db);
    return await db.seoDraft.findFirst({
      where: { slug, kind: "article", status: "published" },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Guide not found | PlumbGas Renewables" };
  return {
    title: `${article.title} | PlumbGas Renewables`,
    description: article.metaDescription || undefined,
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article || !article.title) notFound();

  const published = article.publishedAt ? new Date(article.publishedAt) : new Date(article.createdAt);
  const displayDate = published.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || undefined,
    datePublished: published.toISOString(),
    mainEntityOfPage: `${SITE_URL}/guides/${slug}`,
    author: {
      "@type": "Organization",
      name: "PG Renewables",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PG Renewables",
      url: SITE_URL,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#4e7522] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/guides" className="hover:text-white">Guides</Link>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3 max-w-3xl">
            {article.title}
          </h1>
          <p className="text-sm text-blue-200">
            {displayDate} · PG Renewables, Stafford
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <MarkdownArticle markdown={article.content} />
        </article>
      </section>

      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0c3560] to-[#4e7522] rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">
              Wondering what this means for your home?
            </h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Book a free heat loss survey and get a fixed-price quote with the
              £7,500 grant already taken off. No obligation, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#83b54b] text-[#213311] font-semibold rounded-xl hover:bg-[#74a43f] transition-colors"
              >
                <CalendarCheck className="w-5 h-5" />
                Book My Free Survey
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                More guides
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
