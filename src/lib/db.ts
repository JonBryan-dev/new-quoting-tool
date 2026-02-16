// Database client - connects when an Accelerate URL is available
// Prisma v7 requires `accelerateUrl` (not `datasourceUrl`)
// Supports both PRISMA_ACCELERATE_URL and PRISMA_DATABASE_URL env var names

let prisma: any = null;

export async function getDb() {
  if (prisma) return prisma;

  try {
    const { PrismaClient } = await import("@/generated/prisma/client");
    const accelerateUrl =
      process.env.PRISMA_ACCELERATE_URL ||
      process.env.PRISMA_DATABASE_URL;
    if (!accelerateUrl) {
      console.warn("No Prisma Accelerate URL set — database unavailable");
      return null;
    }
    prisma = new PrismaClient({
      accelerateUrl,
    } as any);
    return prisma;
  } catch {
    console.warn("Database not available - quotes will not be persisted");
    return null;
  }
}
