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

  // Prisma v7 requires either `adapter` or `accelerateUrl`
  const accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
  if (!accelerateUrl) {
    console.error("PRISMA_ACCELERATE_URL not set in .env");
    process.exit(1);
  }

  const prisma = new PrismaClient({ accelerateUrl } as any);

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
