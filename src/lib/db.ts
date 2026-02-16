// Database client - connects when PRISMA_ACCELERATE_URL is available
// Prisma v7 requires `accelerateUrl` (not `datasourceUrl`)

let prisma: any = null;

export async function getDb() {
  if (prisma) return prisma;

  try {
    const { PrismaClient } = await import("@/generated/prisma/client");
    const accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
    if (!accelerateUrl) {
      console.warn("PRISMA_ACCELERATE_URL not set — database unavailable");
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
