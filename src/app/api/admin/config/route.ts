import { NextRequest, NextResponse } from "next/server";
import {
  getAdminConfig,
  updateProducts,
  updatePricing,
  updateQuizSteps,
  resetToDefaults,
} from "@/lib/admin-config";

// GET  /api/admin/config  → returns the full admin config
export async function GET() {
  const config = getAdminConfig();
  return NextResponse.json(config);
}

// PUT  /api/admin/config  → updates specific sections
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    switch (section) {
      case "products":
        updateProducts(data);
        break;
      case "pricing":
        updatePricing(data);
        break;
      case "quizSteps":
        updateQuizSteps(data);
        break;
      case "reset":
        resetToDefaults();
        break;
      default:
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    return NextResponse.json({ success: true, config: getAdminConfig() });
  } catch {
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
  }
}
