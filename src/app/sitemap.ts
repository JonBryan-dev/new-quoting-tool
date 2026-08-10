import type { MetadataRoute } from "next";
import { towns } from "@/lib/towns";
import { getDb } from "@/lib/db";
import { ensureArticleColumns } from "@/lib/seo-content";

const SITE_URL = "https://www.plumbgasrenewables.services";

// Revalidate hourly so newly published guide articles appear without a
// redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const townPages: MetadataRoute.Sitemap = towns.map((t) => ({
    url: `${SITE_URL}/heat-pumps/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const db = await getDb();
    if (db) {
      await ensureArticleColumns(db);
      const rows = await db.seoDraft.findMany({
        where: { kind: "article", status: "published", slug: { not: null } },
        select: { slug: true },
      });
      articlePages = rows
        .filter((r: { slug: string | null }) => r.slug)
        .map((r: { slug: string | null }) => ({
          url: `${SITE_URL}/guides/${r.slug}`,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }));
    }
  } catch {
    // DB unavailable at render time, static entries still ship
  }

  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/book`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/heat-pumps`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/boiler-upgrade-scheme`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/zerodisrupt`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/quote/heatpump`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/quote/boiler`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/heat-pump-installation`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/heat-loss-surveys`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/heat-pump-servicing`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/underfloor-heating`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/services/boiler-servicing`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/accreditations`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/case-studies`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/heat-pump-cost-staffordshire-2026`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/heat-pump-vs-gas-boiler-running-costs`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...articlePages,
    ...townPages,
  ];
}
