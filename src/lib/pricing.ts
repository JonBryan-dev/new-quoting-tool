import type { QuoteAnswers, PriceBreakdown, Product, QuoteResult } from "./types";

const BASE_INSTALL_COSTS: Record<string, number> = {
  boiler: 500,
  heatpump: 2000,
};

const RELOCATION_FEE: Record<string, number> = {
  boiler: 350,
  heatpump: 500,
};

const PROPERTY_MULTIPLIERS: Record<string, number> = {
  "detached": 1.15,
  "semi-detached": 1.05,
  "terraced": 1.0,
  "flat": 0.95,
  "bungalow": 1.1,
};

const BEDROOM_ADJUSTMENTS: Record<number, number> = {
  1: -100,
  2: 0,
  3: 100,
  4: 200,
  5: 350,
};

export function calculatePrice(product: Product, answers: QuoteAnswers): PriceBreakdown {
  const category = answers.category || product.category;
  const baseInstall = BASE_INSTALL_COSTS[category] || 500;
  const relocationFee = answers.relocate ? (RELOCATION_FEE[category] || 0) : 0;

  const propertyMult = PROPERTY_MULTIPLIERS[answers.propertyType] || 1.0;
  const bedroomAdj = BEDROOM_ADJUSTMENTS[Math.min(answers.bedrooms, 5)] || 0;

  const adjustedInstall = Math.round(baseInstall * propertyMult);
  // Older boilers cost more to remove safely
  const ageAdj = answers.boilerAge === "15+" ? 200
    : answers.boilerAge === "10-15" ? 100
    : answers.boilerAge === "5-10" ? 50
    : 0;

  // Standard flue conversions cost extra (need new flue route)
  const flueAdj = answers.flueType === "standard" ? 250 : 0;

  const complexityAdjustment = bedroomAdj + (answers.isWorking === false ? 150 : 0) + ageAdj + flueAdj;

  const total = product.basePrice + adjustedInstall + relocationFee + complexityAdjustment;

  return {
    productPrice: product.basePrice,
    baseInstall: adjustedInstall,
    relocationFee,
    complexityAdjustment,
    total: Math.round(total),
  };
}

export function getMonthlyPrice(total: number, months: number = 60): number {
  return Math.round((total / months) * 100) / 100;
}

// ── SMART BOILER RECOMMENDATION ─────────────────────────────
// Works out which kW output the user actually needs based on
// bedrooms + bathrooms, then scores every boiler on:
//   1. Type match  – does the boiler type match what the user asked for?
//   2. kW fit      – how close is it to the ideal output?
//   3. Value       – reasonable price for the spec

export function getRecommendedKw(answers: QuoteAnswers): number {
  const bedrooms = answers.bedrooms || 2;
  const bathrooms = answers.bathrooms || 1;

  // Standard UK sizing guide
  if (bedrooms <= 1 && bathrooms <= 1) return 24;
  if (bedrooms <= 2 && bathrooms <= 1) return 28;
  if (bedrooms <= 3 && bathrooms <= 2) return 30;
  if (bedrooms <= 4 && bathrooms <= 2) return 35;
  if (bedrooms <= 4 && bathrooms <= 3) return 38;
  return 40; // 5+ bed
}

/** Does the user's current boiler type preference match this product? */
function getTypeMatch(product: Product, answers: QuoteAnswers): boolean {
  const userType = answers.currentType; // combi | system | regular | unsure
  if (!userType || userType === "unsure") return true; // no preference
  if (userType === "combi") return product.type === "combi";
  // "system" or "regular" both suit system boilers
  if (userType === "system" || userType === "regular") return product.type === "system";
  return true;
}

/** Score a boiler from 0–100 based on how well it fits the user's answers */
export function scoreBoiler(product: Product, answers: QuoteAnswers): number {
  let score = 0;
  const idealKw = getRecommendedKw(answers);

  // ── TYPE MATCH (40 points) ──
  if (getTypeMatch(product, answers)) {
    score += 40;
  }

  // ── kW FIT (35 points) ──
  // Perfect match = 35, each kW off = -3 (capped at 0)
  const kwDiff = Math.abs((product.kw || 0) - idealKw);
  score += Math.max(0, 35 - kwDiff * 3);

  // ── VALUE / WARRANTY (15 points) ──
  // Longer warranty = better value
  score += Math.min(15, product.warranty * 1.5);

  // ── EFFICIENCY BONUS (10 points) ──
  const effNum = parseFloat(product.efficiency || "0");
  if (effNum >= 96) score += 10;
  else if (effNum >= 94) score += 7;
  else if (effNum >= 92) score += 4;

  return Math.round(score);
}

export function buildQuoteResults(products: Product[], answers: QuoteAnswers): QuoteResult[] {
  // Filter: only show boilers that match the user's type preference
  // (but if "unsure" or empty, show all boilers)
  const userType = answers.currentType;
  const wantsCombi = userType === "combi";
  const wantsSystem = userType === "system" || userType === "regular";

  const filtered = products.filter((p) => {
    if (!userType || userType === "unsure") return true;
    if (wantsCombi) return p.type === "combi";
    if (wantsSystem) return p.type === "system";
    return true;
  });

  // If the filter removed everything (unlikely), fall back to all products
  const pool = filtered.length > 0 ? filtered : products;

  return pool.map((product) => {
    const breakdown = calculatePrice(product, answers);
    const recommendationScore = scoreBoiler(product, answers);
    return {
      product,
      installPrice: breakdown.baseInstall + breakdown.relocationFee + breakdown.complexityAdjustment,
      totalPrice: breakdown.total,
      monthlyPrice: getMonthlyPrice(breakdown.total),
      breakdown,
      recommendationScore,
    };
  }).sort((a, b) => {
    // Primary sort: recommendation score (highest first)
    // Secondary sort: price (lowest first) as tiebreaker
    if ((b.recommendationScore || 0) !== (a.recommendationScore || 0)) {
      return (b.recommendationScore || 0) - (a.recommendationScore || 0);
    }
    return a.totalPrice - b.totalPrice;
  });
}
