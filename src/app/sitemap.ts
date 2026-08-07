import type { MetadataRoute } from "next";
import { towns } from "@/lib/towns";

const SITE_URL = "https://www.plumbgasrenewables.services";

export default function sitemap(): MetadataRoute.Sitemap {
  const townPages: MetadataRoute.Sitemap = towns.map((t) => ({
    url: `${SITE_URL}/heat-pumps/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

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
      url: `${SITE_URL}/quote/heatpump`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/quote/boiler`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...townPages,
  ];
}
