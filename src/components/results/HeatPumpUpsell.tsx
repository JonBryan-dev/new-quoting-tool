"use client";

import { Thermometer, Check, ArrowRight, Leaf, PoundSterling, TrendingDown } from "lucide-react";
import { getHeatPumpProducts } from "@/lib/products";
import type { QuoteAnswers } from "@/lib/types";

interface HeatPumpUpsellProps {
  answers: QuoteAnswers;
}

const GRANT_AMOUNT = 7500;

export default function HeatPumpUpsell({ answers }: HeatPumpUpsellProps) {
  const heatPumps = getHeatPumpProducts();

  if (heatPumps.length === 0) return null;

  // Pick the best heat pump based on property size
  const recommended = answers.bedrooms <= 3 ? heatPumps[0] : heatPumps[heatPumps.length - 1];
  const installCost = 2000;
  const totalBeforeGrant = recommended.basePrice + installCost;
  const afterGrant = totalBeforeGrant - GRANT_AMOUNT;
  const monthly = Math.round((afterGrant / 120) * 100) / 100; // 10 year finance

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
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Have you considered a heat pump?
                </h3>
              </div>
              <p className="text-gray-600">
                You could be eligible for a <strong>&pound;7,500 government grant</strong> to help cover the cost
              </p>
            </div>
          </div>
          <span className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full whitespace-nowrap self-start">
            Save &pound;7,500
          </span>
        </div>

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
              Heat pumps are 3-4x more efficient than gas boilers. You could save hundreds per year on energy bills.
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
                From &pound;{monthly}/mo
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Get a Heat Pump Quote
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-500 self-center">
            Same quick process &mdash; we&apos;ll check your eligibility for the &pound;7,500 grant
          </p>
        </div>
      </div>
    </div>
  );
}
