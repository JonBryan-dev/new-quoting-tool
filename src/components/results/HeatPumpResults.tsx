"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  Leaf,
  Phone,
  TrendingDown,
  Zap,
} from "lucide-react";
import { getHeatPumpProducts } from "@/lib/products";
import { GRANT_AMOUNT, buildHeatPumpEstimate } from "@/lib/heatpump";
import type { QuoteAnswers } from "@/lib/types";

interface HeatPumpResultsProps {
  answers: QuoteAnswers;
}

export default function HeatPumpResults({ answers }: HeatPumpResultsProps) {
  const router = useRouter();
  const heatPumps = getHeatPumpProducts();
  const estimate = buildHeatPumpEstimate(answers, heatPumps);

  if (!estimate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No heat pumps available</h1>
          <Link href="/" className="text-[#144E82] hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const { heatLossKw, recommended, installCost, totalBeforeGrant, afterGrant, monthly, costs } = estimate;

  const bookUrl = (productId: string, total: number, beforeGrant: number) =>
    `/book?productId=${productId}&total=${total}&grant=${GRANT_AMOUNT}&beforeGrant=${beforeGrant}&propertyType=${answers.propertyType}&bedrooms=${answers.bedrooms}&bathrooms=${answers.bathrooms}&source=estimate`;

  // Alternatives: the sizes either side of the recommendation
  const alternatives = heatPumps
    .filter((p) => p.id !== recommended.id)
    .sort(
      (a, b) =>
        Math.abs((a.kw || 0) - heatLossKw) - Math.abs((b.kw || 0) - heatLossKw)
    )
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/quote/heatpump"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to questions
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Your heat pump estimate
          </h1>
          <p className="text-gray-500 mt-1">
            Based on your {answers.propertyType || "home"} with {answers.bedrooms} bedroom{answers.bedrooms === 1 ? "" : "s"} and {answers.bathrooms} bathroom{answers.bathrooms === 1 ? "" : "s"}.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sizing banner */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center shrink-0">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-gray-900">
              Your home needs approximately {heatLossKw}kW of heating
            </p>
            <p className="text-sm text-gray-500">
              This is an estimate, your free heat loss survey measures every room to
              confirm the exact size, so you never pay for a bigger heat pump than you need.
            </p>
          </div>
        </div>

        {/* Recommended */}
        <div className="bg-white rounded-2xl border-2 border-[#4e7522] p-6 sm:p-8 mb-6 relative">
          <span className="absolute -top-3.5 left-6 bg-[#83b54b] text-[#213311] text-xs font-bold px-3 py-1.5 rounded-full">
            RECOMMENDED FOR YOUR HOME
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                  {recommended.kw}kW
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                  {recommended.efficiency}
                </span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">
                  {recommended.warranty}yr warranty
                </span>
              </div>
              <p className="text-sm text-[#4e7522] font-medium">{recommended.brand}</p>
              <h2 className="text-2xl font-bold text-gray-900">{recommended.name}</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-xl">{recommended.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {recommended.features.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-800 px-2.5 py-1 rounded-full">
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
              <p className="text-4xl font-bold text-gray-900">
                &pound;{afterGrant.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 font-medium">
                After the &pound;{GRANT_AMOUNT.toLocaleString()} BUS grant
              </p>
              <p className="text-xs text-gray-400 mt-1">
                From &pound;{monthly}/mo over 10 years
              </p>
              <button
                onClick={() => router.push(bookUrl(recommended.id, afterGrant, totalBeforeGrant))}
                className="mt-4 inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-6 py-3.5 rounded-xl font-semibold transition-colors w-full sm:w-auto"
              >
                Book Free Survey
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <details className="mt-5">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
              View price breakdown
            </summary>
            <div className="mt-2 space-y-1 text-xs text-gray-500 bg-gray-50 rounded-lg p-3 max-w-md">
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
                <span>Boiler Upgrade Scheme grant</span>
                <span>-&pound;{GRANT_AMOUNT.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1 mt-1 font-bold text-gray-900">
                <span>You pay</span>
                <span>&pound;{afterGrant.toLocaleString()}</span>
              </div>
            </div>
          </details>
        </div>

        {/* Running costs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-500">Gas boiler / year</span>
            </div>
            <p className="text-3xl font-bold text-red-600">&pound;{costs.gasAnnual.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-500">Heat pump / year</span>
            </div>
            <p className="text-3xl font-bold text-green-600">&pound;{costs.hpAnnual.toLocaleString()}</p>
          </div>
          <div className="bg-[#4e7522] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm font-medium text-green-100">Estimated saving</span>
            </div>
            <p className="text-3xl font-bold">
              &pound;{Math.max(0, costs.annualSaving).toLocaleString()}<span className="text-lg font-medium">/yr</span>
            </p>
          </div>
        </div>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Other options for your home</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {alternatives.map((alt) => {
                const altTotal = alt.basePrice + installCost;
                const altAfter = Math.max(0, altTotal - GRANT_AMOUNT);
                return (
                  <div key={alt.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                        {alt.kw}kW
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">
                        {alt.warranty}yr warranty
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{alt.brand}</p>
                    <p className="font-bold text-gray-900">{alt.name}</p>
                    <p className="text-sm text-gray-500 mt-1 flex-1">{alt.description}</p>
                    <div className="flex items-end justify-between mt-4">
                      <div>
                        <p className="text-xs text-gray-400 line-through">&pound;{altTotal.toLocaleString()}</p>
                        <p className="text-xl font-bold text-gray-900">&pound;{altAfter.toLocaleString()}</p>
                        <p className="text-xs text-green-600">after grant</p>
                      </div>
                      <button
                        onClick={() => router.push(bookUrl(alt.id, altAfter, altTotal))}
                        className="text-sm font-semibold text-[#4e7522] hover:text-[#3f5e1b] inline-flex items-center gap-1"
                      >
                        Book survey
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div className="bg-[#144E82] rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            The next step costs nothing
          </h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Book your free heat loss survey and get an exact, fixed-price quote with the
            &pound;7,500 grant already applied. No obligation, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push(bookUrl(recommended.id, afterGrant, totalBeforeGrant))}
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Book My Free Survey
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
