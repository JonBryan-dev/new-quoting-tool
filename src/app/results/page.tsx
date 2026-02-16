"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/results/ProductCard";
import HeatPumpUpsell from "@/components/results/HeatPumpUpsell";
import type { QuoteResult, QuoteAnswers } from "@/lib/types";
import { getRecommendedKw } from "@/lib/pricing";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<QuoteResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"price" | "warranty">("price");

  const answers: QuoteAnswers = {
    category: searchParams.get("category") || "boiler",
    fuelType: searchParams.get("fuelType") || "",
    currentType: searchParams.get("currentType") || "",
    flueType: searchParams.get("flueType") || "",
    boilerAge: searchParams.get("boilerAge") || "",
    isWorking: searchParams.get("isWorking") === "" ? null : searchParams.get("isWorking") === "true",
    relocate: searchParams.get("relocate") === "" ? null : searchParams.get("relocate") === "true",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: parseInt(searchParams.get("bedrooms") || "0"),
    bathrooms: parseInt(searchParams.get("bathrooms") || "0"),
    postcode: "",
    email: "",
    phone: "",
    name: "",
  };

  const recommendedKw = getRecommendedKw(answers);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        console.error("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "price") return a.totalPrice - b.totalPrice;
    if (sortBy === "warranty") return b.product.warranty - a.product.warranty;
    return 0;
  });

  // The boiler with the highest recommendation score (already first in the default results)
  const topRecommendedId = results.length > 0 ? results[0].product.id : null;

  const handleSelect = (result: QuoteResult) => {
    router.push(
      `/checkout?productId=${result.product.id}&total=${result.totalPrice}&category=${answers.category}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#144E82] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Finding the best boilers for your home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/quote/boiler"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to quiz
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Your boiler quotes
          </h1>
          <p className="text-gray-500 mt-1">
            {results.length} boilers matched your requirements.
            {recommendedKw > 0 && (
              <span className="ml-1">
                We recommend around <strong>{recommendedKw}kW</strong> for your home.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-blue-700 font-medium">Your answers:</span>
            {answers.propertyType && (
              <span className="bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200 capitalize">
                {answers.propertyType}
              </span>
            )}
            {answers.bedrooms > 0 && (
              <span className="bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                {answers.bedrooms} bed
              </span>
            )}
            {answers.bathrooms > 0 && (
              <span className="bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                {answers.bathrooms} bath
              </span>
            )}
            {answers.fuelType && (
              <span className="bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200 capitalize">
                {answers.fuelType}
              </span>
            )}
            {answers.currentType && (
              <span className="bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200 capitalize">
                {answers.currentType}
              </span>
            )}
            {answers.flueType && answers.flueType !== "unsure" && (
              <span className="bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200 capitalize">
                {answers.flueType} flue
              </span>
            )}
            {answers.boilerAge && answers.boilerAge !== "unsure" && (
              <span className="bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                {answers.boilerAge} years old
              </span>
            )}
            {answers.relocate === true && (
              <span className="bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                Relocating
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500 font-medium">Sort by:</span>
          </div>
          <div className="flex gap-2">
            {[
              { value: "price" as const, label: "Price" },
              { value: "warranty" as const, label: "Warranty" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === option.value
                    ? "bg-[#144E82] text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResults.map((result, index) => (
            <ProductCard
              key={result.product.id}
              result={result}
              recommended={result.product.id === topRecommendedId}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No boilers found</h3>
            <p className="text-gray-500">Try adjusting your requirements or go back to the quiz.</p>
          </div>
        )}

        {/* Finance info */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible payment options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Pay in full</p>
              <p className="text-sm text-gray-500">Pay the full amount upfront with our secure payment system.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">0% Finance</p>
              <p className="text-sm text-gray-500">Spread the cost with 0% interest on selected boilers for up to 2 years.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Monthly payments</p>
              <p className="text-sm text-gray-500">Low monthly payments over 5 years. Representative APR 9.9%.</p>
            </div>
          </div>
        </div>

        {/* ── HEAT PUMP UPSELL ─────────────────────────────── */}
        <HeatPumpUpsell answers={answers} />
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#144E82] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
