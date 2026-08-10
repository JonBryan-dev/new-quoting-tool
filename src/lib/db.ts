// Database client. Supports two connection styles:
//  - Prisma Accelerate URLs (prisma:// or prisma+postgres://) via accelerateUrl
//  - Plain Postgres URLs (e.g. Supabase) via the pg driver adapter
// Checks the common env var names so Vercel integrations work out of the box.

let prisma: any = null;

export async function getDb() {
  if (prisma) return prisma;

  try {
    const { PrismaClient } = await import("@/generated/prisma/client");
    const url =
      process.env.PRISMA_ACCELERATE_URL ||
      process.env.PRISMA_DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL;

    if (!url) {
      console.warn("No database URL set, database unavailable");
      return null;
    }

    if (url.startsWith("prisma://") || url.startsWith("prisma+postgres://")) {
      prisma = new PrismaClient({ accelerateUrl: url } as any);
    } else {
      const { PrismaPg } = await import("@prisma/adapter-pg");
      const adapter = new PrismaPg({ connectionString: url });
      prisma = new PrismaClient({ adapter } as any);
    }
    return prisma;
  } catch (err) {
    console.warn("Database not available:", err instanceof Error ? err.message : err);
    return null;
  }
}
