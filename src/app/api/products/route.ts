import { NextRequest, NextResponse } from "next/server";
import { getProductsByCategory, sampleProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category) {
    const products = getProductsByCategory(category);
    return NextResponse.json(products);
  }

  return NextResponse.json(sampleProducts);
}
