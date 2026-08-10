// Database client. Supports two connection styles:
//  - Prisma Accelerate URLs (prisma:// or prisma+postgres://) via accelerateUrl
//  - Plain Postgres URLs (e.g. Supabase) via the pg driver adapter
// Checks the common env var names so Vercel integrations work out of the box.

let prisma: any = null;

const URL_CANDIDATES = [
  "PRISMA_ACCELERATE_URL",
  "PRISMA_DATABASE_URL",
  "POSTGRES_PRISMA_URL",
  "DATABASE_URL",
  "POSTGRES_URL",
] as const;

export function resolveDbUrl(): { name: string; url: string } | null {
  for (const name of URL_CANDIDATES) {
    const url = process.env[name];
    if (url) return { name, url };
  }
  return null;
}

// Supabase's certificate chain is self-signed, which the driver rejects
// by default. Encode no-verify into the URL itself (pg maps
// sslmode=no-verify to TLS without chain verification) so the setting
// can't be lost in option passing.
function withNoVerify(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.delete("sslmode");
    u.searchParams.delete("ssl");
    u.searchParams.delete("sslcert");
    u.searchParams.set("sslmode", "no-verify");
    return u.toString();
  } catch {
    return url;
  }
}

export async function getDb() {
  if (prisma) return prisma;

  try {
    const { PrismaClient } = await import("@/generated/prisma/client");
    const resolved = resolveDbUrl();

    if (!resolved) {
      console.warn("No database URL set, database unavailable");
      return null;
    }

    const { url } = resolved;
    if (url.startsWith("prisma://") || url.startsWith("prisma+postgres://")) {
      prisma = new PrismaClient({ accelerateUrl: url } as any);
    } else {
      const { PrismaPg } = await import("@prisma/adapter-pg");
      const adapter = new PrismaPg({
        connectionString: withNoVerify(url),
        ssl: { rejectUnauthorized: false },
      } as any);
      prisma = new PrismaClient({ adapter } as any);
    }
    return prisma;
  } catch (err) {
    console.warn("Database not available:", err instanceof Error ? err.message : err);
    return null;
  }
}
