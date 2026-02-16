"use client";

import { useParams } from "next/navigation";
import { categories } from "@/lib/products";
import QuoteWizard from "@/components/quote/QuoteWizard";
import Link from "next/link";

export default function QuotePage() {
  const params = useParams();
  const category = params.category as string;

  const categoryInfo = categories.find((c) => c.id === category);

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category not found</h1>
          <p className="text-gray-500 mb-4">The category you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-[#1a56db] hover:underline font-medium">
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
            Get your {categoryInfo.name.toLowerCase()} quote
          </h1>
          <p className="text-gray-500 mt-1">
            Answer a few quick questions to get your personalised, fixed-price quote.
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
