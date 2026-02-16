// Database client - connects when DATABASE_URL is available
// Uses Prisma Accelerate URL if available, falls back to direct DATABASE_URL

let prisma: any = null;

export async function getDb() {
  if (prisma) return prisma;

  try {
    const { PrismaClient } = await import("@/generated/prisma/client");
    // Use Accelerate URL on Vercel, direct URL locally
    const url = process.env.PRISMA_ACCELERATE_URL || process.env.DATABASE_URL;
    prisma = new PrismaClient({
      datasourceUrl: url,
    } as any);
    return prisma;
  } catch {
    console.warn("Database not available - quotes will not be persisted");
    return null;
  }
}
