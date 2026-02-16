import { NextRequest, NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/products";
import { buildQuoteResults, getRecommendedKw } from "@/lib/pricing";
import type { QuoteAnswers } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const answers: QuoteAnswers = await request.json();

    if (!answers.category) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    const products = getProductsByCategory(answers.category);
    const recommendedKw = getRecommendedKw(answers);
    const results = buildQuoteResults(products, answers);

    return NextResponse.json({
      results,
      recommendedKw,
      totalProducts: products.length,
    });
  } catch {
    return NextResponse.json({ error: "Failed to calculate quote" }, { status: 500 });
  }
}
