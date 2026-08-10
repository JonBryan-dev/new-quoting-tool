import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

// One-time database initialisation: creates the site's tables and the
// first admin user, so setup can be finished without a terminal.
// SELF-DISABLING: once any admin user exists, this endpoint refuses to
// do anything, permanently. The DDL mirrors prisma/schema.prisma and is
// idempotent (IF NOT EXISTS), so a later `prisma db push` is a no-op.

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const DDL: string[] = [
  `CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "efficiency" TEXT,
    "warranty" INTEGER NOT NULL,
    "kw" DOUBLE PRECISION,
    "features" TEXT[],
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "Quote" (
    "id" TEXT PRIMARY KEY,
    "category" TEXT NOT NULL,
    "fuelType" TEXT,
    "currentType" TEXT,
    "isWorking" BOOLEAN,
    "relocate" BOOLEAN,
    "propertyType" TEXT,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "postcode" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "totalPrice" DOUBLE PRECISION,
    "installPrice" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "productId" TEXT REFERENCES "Product"("id"),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "PricingRule" (
    "id" TEXT PRIMARY KEY,
    "category" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "adjustment" DOUBLE PRECISION NOT NULL,
    "isPercent" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "SurveyBooking" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "addressLine" TEXT,
    "postcode" TEXT NOT NULL,
    "preferredDate" TEXT,
    "timeSlot" TEXT,
    "notes" TEXT,
    "source" TEXT,
    "productId" TEXT,
    "productName" TEXT,
    "quotedPrice" DOUBLE PRECISION,
    "priceBeforeGrant" DOUBLE PRECISION,
    "propertyType" TEXT,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_username_key" ON "AdminUser"("username")`,
  `CREATE TABLE IF NOT EXISTS "SeoKeyword" (
    "id" TEXT PRIMARY KEY,
    "phrase" TEXT NOT NULL,
    "targetPath" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "SeoRankCheck" (
    "id" TEXT PRIMARY KEY,
    "keywordId" TEXT NOT NULL REFERENCES "SeoKeyword"("id") ON DELETE CASCADE,
    "position" INTEGER,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "SeoTask" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "frequency" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "SeoDraft" (
    "id" TEXT PRIMARY KEY,
    "kind" TEXT NOT NULL,
    "targetPath" TEXT,
    "brief" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "model" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
];

async function alreadyInitialised(db: any): Promise<boolean> {
  try {
    return (await db.adminUser.count()) > 0;
  } catch {
    // AdminUser table doesn't exist yet
    return false;
  }
}

export async function GET() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ dbConnected: false, initialised: false });
  }
  return NextResponse.json({ dbConnected: true, initialised: await alreadyInitialised(db) });
}

export async function POST(request: NextRequest) {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }

  if (await alreadyInitialised(db)) {
    return NextResponse.json(
      { error: "Already initialised. This setup can only run once." },
      { status: 403 },
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const username = body.username?.trim();
  const password = body.password || "";
  if (!username || password.length < 8) {
    return NextResponse.json(
      { error: "Username required, and password must be at least 8 characters." },
      { status: 400 },
    );
  }

  try {
    for (const statement of DDL) {
      await db.$executeRawUnsafe(statement);
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Table creation failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 500 },
    );
  }

  // Re-check after DDL so two racing requests can't both create a user
  if (await alreadyInitialised(db)) {
    return NextResponse.json({ error: "Already initialised." }, { status: 403 });
  }

  try {
    const hashed = await hashPassword(password);
    await db.adminUser.create({ data: { username, password: hashed } });
  } catch (err) {
    return NextResponse.json(
      { error: `Admin user creation failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, message: "Database initialised. Log in at /admin/login." });
}
