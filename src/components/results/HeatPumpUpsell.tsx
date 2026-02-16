"use client";

import { useRouter } from "next/navigation";
import { Thermometer, Check, ArrowRight, Leaf, PoundSterling, TrendingDown, Home, Zap } from "lucide-react";
import { getHeatPumpProducts } from "@/lib/products";
import type { QuoteAnswers, Product } from "@/lib/types";

interface HeatPumpUpsellProps {
  answers: QuoteAnswers;
}

const GRANT_AMOUNT = 7500;

// ── HEAT PUMP SIZING ────────────────────────────────────────
// Based on property type, bedrooms, bathrooms — estimates the
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

function estimateHeatLossKw(answers: QuoteAnswers): number {
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

function pickBestHeatPump(heatLossKw: number, heatPumps: Product[]): Product {
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
// Heat pump install is more complex than boiler — varies by property

function estimateInstallCost(answers: QuoteAnswers): number {
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

function estimateAnnualCosts(heatLossKw: number) {
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

export default function HeatPumpUpsell({ answers }: HeatPumpUpsellProps) {
  const router = useRouter();
  const heatPumps = getHeatPumpProducts();

  if (heatPumps.length === 0) return null;

  // ── CALCULATIONS ──
  const heatLossKw = estimateHeatLossKw(answers);
  const recommended = pickBestHeatPump(heatLossKw, heatPumps);
  const installCost = estimateInstallCost(answers);
  const totalBeforeGrant = recommended.basePrice + installCost;
  const afterGrant = totalBeforeGrant - GRANT_AMOUNT;
  const monthly = Math.round((afterGrant / 120) * 100) / 100; // 10 year finance
  const costs = estimateAnnualCosts(heatLossKw);

  const handleGetQuote = () => {
    router.push(
      `/checkout?productId=${recommended.id}&total=${afterGrant}&category=heatpump&grant=${GRANT_AMOUNT}&beforeGrant=${totalBeforeGrant}`
    );
  };

  return (
    <div className="mt-12 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 rounded-2xl border-2 border-purple-200 p-6 sm:p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full -translate-y-32 translate-x-32 opacity-50" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-100 rounded-full translate-y-24 -translate-x-24 opacity-50" />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <Thermometer className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Have you considered a heat pump?
              </h3>
              <p className="text-gray-600">
                Based on your <strong>{answers.propertyType || "home"}</strong> with <strong>{answers.bedrooms} bedrooms</strong>, we&apos;ve sized a heat pump specifically for you
              </p>
            </div>
          </div>
          <span className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full whitespace-nowrap self-start">
            Save &pound;7,500
          </span>
        </div>

        {/* Sizing explanation */}
        <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-purple-100 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900">Your home needs approximately {heatLossKw}kW</span>
          </div>
          <p className="text-sm text-gray-600">
            We&apos;ve estimated your heat loss at <strong>{heatLossKw}kW</strong> based on your {answers.propertyType || "property"} ({answers.bedrooms} bed, {answers.bathrooms} bath). That&apos;s why we recommend the <strong>{recommended.kw}kW {recommended.brand} {recommended.name}</strong>.
          </p>
        </div>

        {/* Running cost comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur rounded-xl p-5 border border-red-100">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-500">Gas boiler annual cost</span>
            </div>
            <p className="text-3xl font-bold text-red-600">&pound;{costs.gasAnnual.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Based on {costs.annualHeatDemandKwh.toLocaleString()} kWh/yr at 7p/kWh (90% efficient)</p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-5 border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-500">Heat pump annual cost</span>
            </div>
            <p className="text-3xl font-bold text-green-600">&pound;{costs.hpAnnual.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">COP 3.0 average at 24.5p/kWh electricity</p>
          </div>
        </div>

        {costs.annualSaving > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <TrendingDown className="w-6 h-6 text-green-600 shrink-0" />
            <div>
              <p className="font-semibold text-green-800">
                Save approximately &pound;{costs.annualSaving.toLocaleString()} per year on heating
              </p>
              <p className="text-sm text-green-700">
                That&apos;s &pound;{Math.round(costs.annualSaving / 12)}/month less on energy bills. Over 10 years you&apos;d save around &pound;{(costs.annualSaving * 10).toLocaleString()}.
              </p>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-white">
            <div className="flex items-center gap-2 mb-2">
              <PoundSterling className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900">Government Grant</span>
            </div>
            <p className="text-sm text-gray-600">
              The Boiler Upgrade Scheme pays &pound;7,500 towards an air source heat pump, applied directly to your quote.
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-white">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Lower Running Costs</span>
            </div>
            <p className="text-sm text-gray-600">
              Heat pumps are 3-4x more efficient than gas boilers. Your estimated saving: &pound;{costs.annualSaving}/year.
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-white">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900">Zero Carbon</span>
            </div>
            <p className="text-sm text-gray-600">
              No gas, no carbon emissions at point of use. Future-proof your home for the 2035 gas boiler ban.
            </p>
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">
                  Sized for your home
                </span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                  {recommended.kw}kW
                </span>
              </div>
              <p className="text-sm text-purple-600 font-medium">{recommended.brand}</p>
              <h4 className="text-lg font-bold text-gray-900">{recommended.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{recommended.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {recommended.features.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full">
                    <Check className="w-3 h-3" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <p className="text-sm text-gray-400 line-through">
                &pound;{totalBeforeGrant.toLocaleString()}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                &pound;{afterGrant.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 font-medium">
                After &pound;7,500 BUS grant
              </p>
              <p className="text-xs text-gray-400 mt-1">
                From &pound;{monthly}/mo over 10 years
              </p>
            </div>
          </div>

          {/* Price breakdown */}
          <details className="mt-4">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
              View price breakdown
            </summary>
            <div className="mt-2 space-y-1 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between">
                <span>Heat pump ({recommended.brand} {recommended.name})</span>
                <span>&pound;{recommended.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Installation (pipework, cylinder, controls)</span>
                <span>&pound;{installCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1 mt-1">
                <span>Subtotal</span>
                <span>&pound;{totalBeforeGrant.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>BUS Grant</span>
                <span>-&pound;{GRANT_AMOUNT.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1 mt-1 font-bold text-gray-900">
                <span>You pay</span>
                <span>&pound;{afterGrant.toLocaleString()}</span>
              </div>
            </div>
          </details>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleGetQuote}
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Get This Heat Pump Quote
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-500 self-center">
            Includes the &pound;7,500 BUS grant &mdash; we handle the application for you
          </p>
        </div>
      </div>
    </div>
  );
}
