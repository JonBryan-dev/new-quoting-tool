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
    ...townPages,
  ];
}
