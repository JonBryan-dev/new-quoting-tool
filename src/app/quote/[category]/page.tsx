"use client";

import { useParams } from "next/navigation";
import { categories } from "@/lib/products";
import QuoteWizard from "@/components/quote/QuoteWizard";
import HeatGeekEstimateSection from "@/components/heatgeek/HeatGeekEstimateSection";
import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";

export default function QuotePage() {
  const params = useParams();
  const category = params.category as string;

  // Heat pump estimates run through our Heat Geek partner tenancy —
  // their tool generates the estimate and the lead comes to us.
  if (category === "heatpump") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Instant Estimate</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Your heat pump estimate, in about two minutes
            </h1>
            <p className="text-gray-500 mt-1">
              Answer a few questions about your home and get a personalised price —
              with the &pound;7,500 grant already included.
            </p>
          </div>
        </div>

        <HeatGeekEstimateSection
          heading="Start your estimate below"
          sub="Powered by Heat Geek — the UK's most trusted heat pump platform — and installed locally by our own MCS-accredited engineers."
          widgetStyle="block"
          align="center"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Rather talk to a human first?
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                Skip the tool and book a free heat loss survey — a local engineer
                visits, measures your home room by room, and gives you a fixed
                price with no obligation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-[#144E82] hover:bg-[#0e3a63] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Free Survey
              </Link>
              <a
                href="tel:07872626573"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" />
                07872 626573
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categoryInfo = categories.find((c) => c.id === category);

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category not found</h1>
          <p className="text-gray-500 mb-4">The category you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-[#144E82] hover:underline font-medium">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{categoryInfo.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {category === "heatpump"
              ? "Get your instant heat pump estimate"
              : `Get your ${categoryInfo.name.toLowerCase()} quote`}
          </h1>
          <p className="text-gray-500 mt-1">
            {category === "heatpump"
              ? "Three quick questions to size a heat pump for your home and see your price after the £7,500 grant."
              : "Answer a few quick questions to get your personalised, fixed-price quote."}
          </p>
        </div>
      </div>

      {/* Quiz Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10">
          <QuoteWizard category={category} />
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            No contact details required. Your quote is calculated instantly. No obligation.
          </p>
        </div>
      </div>
    </div>
  );
}
