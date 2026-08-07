import type { MetadataRoute } from "next";

const SITE_URL = "https://www.plumbgasrenewables.services";

export default function sitemap(): MetadataRoute.Sitemap {
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
      url: `${SITE_URL}/quote/heatpump`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/quote/boiler`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
