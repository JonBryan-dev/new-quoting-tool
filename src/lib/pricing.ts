import type { QuoteAnswers, PriceBreakdown, Product, QuoteResult } from "./types";

const BASE_INSTALL_COSTS: Record<string, number> = {
  boiler: 500,
  solar: 1200,
  aircon: 800,
  battery: 600,
  heatpump: 2000,
  "ev-charger": 400,
};

const RELOCATION_FEE: Record<string, number> = {
  boiler: 350,
  solar: 0,
  aircon: 250,
  battery: 150,
  heatpump: 500,
  "ev-charger": 200,
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
  const complexityAdjustment = bedroomAdj + (answers.isWorking === false ? 150 : 0);

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

export function buildQuoteResults(products: Product[], answers: QuoteAnswers): QuoteResult[] {
  return products.map((product) => {
    const breakdown = calculatePrice(product, answers);
    return {
      product,
      installPrice: breakdown.baseInstall + breakdown.relocationFee + breakdown.complexityAdjustment,
      totalPrice: breakdown.total,
      monthlyPrice: getMonthlyPrice(breakdown.total),
      breakdown,
    };
  }).sort((a, b) => a.totalPrice - b.totalPrice);
}

export function getRecommendedKw(answers: QuoteAnswers): number {
  const bedrooms = answers.bedrooms || 2;
  const bathrooms = answers.bathrooms || 1;

  if (answers.category === "boiler") {
    if (bedrooms <= 2 && bathrooms <= 1) return 25;
    if (bedrooms <= 3 && bathrooms <= 2) return 30;
    if (bedrooms <= 4) return 35;
    return 40;
  }
  if (answers.category === "aircon") {
    return bedrooms * 2.5;
  }
  if (answers.category === "solar") {
    return bedrooms <= 2 ? 3.5 : bedrooms <= 4 ? 5 : 7;
  }
  return 0;
}
