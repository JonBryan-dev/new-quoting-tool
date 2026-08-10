import "dotenv/config";
import bcrypt from "bcryptjs";

async function main() {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.error("Usage: npx tsx prisma/create-admin.ts <username> <password>");
    console.error("Example: npx tsx prisma/create-admin.ts admin mySecurePassword123");
    process.exit(1);
  }

  // Dynamic import of Prisma client
  const { PrismaClient } = await import("../src/generated/prisma/client");

  // Prisma v7 requires either `adapter` or `accelerateUrl`. Supports
  // Accelerate URLs and plain Postgres URLs (e.g. Supabase) alike.
  const url =
    process.env.PRISMA_ACCELERATE_URL ||
    process.env.PRISMA_DATABASE_URL ||
    process.env.DATABASE_URL;
  if (!url) {
    console.error("Set DATABASE_URL (or PRISMA_ACCELERATE_URL) in .env");
    process.exit(1);
  }

  let prisma: InstanceType<typeof PrismaClient>;
  if (url.startsWith("prisma://") || url.startsWith("prisma+postgres://")) {
    prisma = new PrismaClient({ accelerateUrl: url } as any);
  } else {
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const noVerifyUrl = (() => {
      try {
        const u = new URL(url);
        u.searchParams.delete("sslmode");
        u.searchParams.set("sslmode", "no-verify");
        return u.toString();
      } catch {
        return url;
      }
    })();
    prisma = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: noVerifyUrl,
        ssl: { rejectUnauthorized: false },
      } as any),
    } as any);
  }

  try {
    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.adminUser.upsert({
      where: { username },
      update: { password: hashed },
      create: { username, password: hashed },
    });

    console.log(`\n✓ Admin user "${user.username}" created/updated successfully.`);
    console.log(`  You can now log in at /admin/login\n`);
  } catch (err) {
    console.error("Failed to create admin user:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
