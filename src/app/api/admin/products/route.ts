import { NextRequest, NextResponse } from "next/server";
import {
  getAdminConfig,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/admin-config";

// GET /api/admin/products → list all products
export async function GET() {
  const config = getAdminConfig();
  return NextResponse.json(config.products);
}

// POST /api/admin/products → add a new product
export async function POST(request: NextRequest) {
  try {
    const product = await request.json();

    // Auto-generate an ID if not provided
    if (!product.id) {
      product.id = `boiler-${Date.now()}`;
    }

    addProduct(product);
    return NextResponse.json({ success: true, product });
  } catch {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

// PUT /api/admin/products → update an existing product
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }
    updateProduct(id, updates);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/admin/products → delete a product
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }
    deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
