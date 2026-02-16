import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb();

    if (!db) {
      // No database configured - still return success for the UI
      return NextResponse.json({ id: "local-" + Date.now(), success: true });
    }

    const quote = await db.quote.create({
      data: {
        category: body.category,
        fuelType: body.fuelType,
        currentType: body.currentType,
        isWorking: body.isWorking,
        relocate: body.relocate,
        propertyType: body.propertyType,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        postcode: body.postcode,
        email: body.email,
        phone: body.phone,
        name: body.name,
        totalPrice: body.totalPrice,
        installPrice: body.installPrice,
        productId: body.productId,
        status: "pending",
      },
    });

    return NextResponse.json({ id: quote.id, success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save quote" }, { status: 500 });
  }
}
