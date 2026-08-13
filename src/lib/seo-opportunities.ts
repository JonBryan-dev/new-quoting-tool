import type { GscRow } from "./google-apis";

// Works out what to write next from real demand rather than guesswork.
//
// Google Trends has no generally available API (the official one has been
// an application-gated alpha since July 2025), and its numbers are
// relative interest rather than volume anyway. Search Console is the
// better source here: it reports the actual phrases people typed that
// showed this site, in this area, including the ones we rank badly for.
// A query with real impressions and a weak position is proof of local
// demand we are failing to serve.

export interface Opportunity {
  query: string;
  impressions: number;
  clicks: number;
  position: number;
  score: number;
  reason: string;
}

// Our own name and near-misses: people already looking for us, so
// writing more content will not move anything.
const BRAND_TERMS = ["plumbgas", "plumb gas", "pg renewables", "zerodisrupt", "zero disrupt"];

// Below this a query is usually noise on a site this size.
const MIN_IMPRESSIONS = 5;

function isBranded(query: string): boolean {
  return BRAND_TERMS.some((term) => query.includes(term));
}

// Queries already answered by a published article, matched loosely on
// the words in its slug so "heat pump noise" does not get suggested
// again once "heat-pump-noise-what-to-expect" is live.
function alreadyCovered(query: string, coveredSlugs: string[]): boolean {
  const words = query.split(/\s+/).filter((w) => w.length > 3);
  if (words.length === 0) return false;
  return coveredSlugs.some((slug) => {
    const hits = words.filter((w) => slug.includes(w)).length;
    return hits >= Math.min(2, words.length);
  });
}

export function findContentOpportunities(
  queries: GscRow[],
  coveredSlugs: string[] = [],
): Opportunity[] {
  const out: Opportunity[] = [];

  for (const row of queries) {
    const query = (row.keys[0] || "").toLowerCase().trim();
    if (!query || isBranded(query)) continue;
    if (row.impressions < MIN_IMPRESSIONS) continue;
    if (alreadyCovered(query, coveredSlugs)) continue;

    // Weight by how much demand there is and how far off winning we are.
    // Position 1 needs no help; position 50 with real impressions is the
    // clearest signal that a proper page or article is missing.
    let reason: string;
    let weight: number;
    if (row.position > 20) {
      reason = "People are searching this and we are barely visible";
      weight = 1;
    } else if (row.position > 10) {
      reason = "Just off page one, a dedicated answer could tip it over";
      weight = 0.9;
    } else if (row.clicks === 0) {
      reason = "On page one but getting no clicks, the wording is not landing";
      weight = 0.7;
    } else {
      reason = "Already working, worth strengthening";
      weight = 0.2;
    }

    out.push({
      query,
      impressions: Math.round(row.impressions),
      clicks: Math.round(row.clicks),
      position: Math.round(row.position * 10) / 10,
      score: Math.round(row.impressions * weight * 10) / 10,
      reason,
    });
  }

  return out.sort((a, b) => b.score - a.score);
}

// Turns the strongest opportunity into a brief the article writer can
// use. Returns null when there is nothing worth writing about yet, which
// is normal for a new site with little Search Console history.
export function briefFromOpportunity(opportunity: Opportunity): { slug: string; topic: string } {
  const slug = opportunity.query
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 70);

  return {
    slug,
    topic: `Answer the question behind the Google search "${opportunity.query}" as thoroughly and honestly as anyone on the internet has. This exact phrase brought up our site ${opportunity.impressions} times in the last 28 days at an average position of ${opportunity.position}, so there is real demand from Staffordshire homeowners and we are not yet serving it properly. Lead with the direct answer in the first two sentences, then go deeper than a generic national guide would, using what a working Staffordshire installer actually sees on jobs.`,
  };
}
