// Database client - connects when DATABASE_URL is available
// The quoting engine works without a DB; the DB is used to persist submitted quotes

let prisma: any = null;

export async function getDb() {
  if (prisma) return prisma;

  try {
    const { PrismaClient } = await import("@/generated/prisma/client");
    prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    } as any);
    return prisma;
  } catch {
    console.warn("Database not available - quotes will not be persisted");
    return null;
  }
}
