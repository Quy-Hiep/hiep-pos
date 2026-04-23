/**
 * Seed initial admin user into the database.
 * Run: npx tsx scripts/seed-admin.ts
 *
 * Default credentials:
 *   Email:    admin@hieppos.com
 *   Password: admin123   <-- CHANGE after first login
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@hieppos.com";
  const name = "Admin";
  const password = "admin123";
  const role = "SUPER_ADMIN";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`User "${email}" already exists. Skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      role,
      isActive: true,
    },
  });

  console.log(`✅ Admin user created:`);
  console.log(`   ID:    ${user.id}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Role:  ${user.role}`);
  console.log(`\n⚠️  Default password is "admin123" — change it after first login!`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
