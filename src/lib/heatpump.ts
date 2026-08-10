import type { Product, QuoteAnswers } from "./types";

export const GRANT_AMOUNT = 7500;

// ── HEAT PUMP SIZING ────────────────────────────────────────
// Based on property type, bedrooms, bathrooms, estimates the
// heat loss in kW and picks the best-fit heat pump.
//
// Typical UK heat loss estimates:
//   Flat:           3–5 kW
//   Terraced:       5–7 kW
//   Semi-detached:  7–10 kW
//   Detached:       9–14 kW
//   Bungalow:       6–9 kW
//
// We adjust up for more bedrooms/bathrooms.

export function estimateHeatLossKw(answers: QuoteAnswers): number {
  const bedrooms = answers.bedrooms || 2;
  const bathrooms = answers.bathrooms || 1;

  // Base heat loss by property type (kW)
  const baseByProperty: Record<string, number> = {
    flat: 4,
    terraced: 6,
    "semi-detached": 8,
    detached: 10,
    bungalow: 7,
  };

  let kw = baseByProperty[answers.propertyType] || 7;

  // Each bedroom above 2 adds ~1.2kW
  if (bedrooms > 2) {
    kw += (bedrooms - 2) * 1.2;
  }

  // Each bathroom above 1 adds ~0.8kW (hot water demand)
  if (bathrooms > 1) {
    kw += (bathrooms - 1) * 0.8;
  }

  // Slight reduction for small properties
  if (bedrooms <= 1) {
    kw *= 0.8;
  }

  return Math.round(kw * 10) / 10;
}

export function pickBestHeatPump(heatLossKw: number, heatPumps: Product[]): Product {
  // Pick the smallest heat pump that covers the heat loss
  // (heat pump kW should be >= estimated heat loss)
  const sorted = [...heatPumps].sort((a, b) => (a.kw || 0) - (b.kw || 0));

  for (const hp of sorted) {
    if ((hp.kw || 0) >= heatLossKw) {
      return hp;
    }
  }

  // If nothing's big enough, return the largest
  return sorted[sorted.length - 1];
}

// ── INSTALL COST ────────────────────────────────────────────
// Heat pump install is more complex than boiler, varies by property

export function estimateInstallCost(answers: QuoteAnswers): number {
  const base = 3000; // Base install (pipework, cylinder, controls, commissioning)

  const propertyAdj: Record<string, number> = {
    flat: -500,        // Simpler, but may need planning for outdoor unit
    terraced: 0,
    "semi-detached": 250,
    detached: 500,     // Longer pipe runs
    bungalow: 0,
  };

  const bedroomAdj = Math.max(0, (answers.bedrooms || 2) - 2) * 200;

  return base + (propertyAdj[answers.propertyType] || 0) + bedroomAdj;
}

// ── ANNUAL RUNNING COST COMPARISON ──────────────────────────
// Gas boiler: ~90% efficient, gas costs ~7p/kWh
// Heat pump: COP ~3.0 average, electricity costs ~24.5p/kWh
// Annual heating demand estimated from heat loss x hours

export function estimateAnnualCosts(heatLossKw: number) {
  // Typical UK home heats ~2,000 hours/year
  const annualHeatDemandKwh = heatLossKw * 2000;

  // Gas boiler (90% efficient)
  const gasRate = 0.07;     // £/kWh
  const boilerEfficiency = 0.90;
  const gasAnnual = Math.round((annualHeatDemandKwh / boilerEfficiency) * gasRate);

  // Heat pump (COP 3.0 average across the year)
  const elecRate = 0.245;   // £/kWh
  const cop = 3.0;
  const hpAnnual = Math.round((annualHeatDemandKwh / cop) * elecRate);

  return {
    gasAnnual,
    hpAnnual,
    annualSaving: gasAnnual - hpAnnual,
    annualHeatDemandKwh: Math.round(annualHeatDemandKwh),
  };
}

export interface HeatPumpEstimate {
  heatLossKw: number;
  recommended: Product;
  installCost: number;
  totalBeforeGrant: number;
  afterGrant: number;
  monthly: number;
  costs: ReturnType<typeof estimateAnnualCosts>;
}

export function buildHeatPumpEstimate(
  answers: QuoteAnswers,
  heatPumps: Product[]
): HeatPumpEstimate | null {
  if (heatPumps.length === 0) return null;

  const heatLossKw = estimateHeatLossKw(answers);
  const recommended = pickBestHeatPump(heatLossKw, heatPumps);
  const installCost = estimateInstallCost(answers);
  const totalBeforeGrant = recommended.basePrice + installCost;
  const afterGrant = Math.max(0, totalBeforeGrant - GRANT_AMOUNT);
  const monthly = Math.round((afterGrant / 120) * 100) / 100; // 10 year finance

  return {
    heatLossKw,
    recommended,
    installCost,
    totalBeforeGrant,
    afterGrant,
    monthly,
    costs: estimateAnnualCosts(heatLossKw),
  };
}
