import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const drivers = [
  {
    name: "BP-T3",
    slug: "bp-t3",
    model: "KV804",
    printerType: "thermal",
    version: "v7.11",
    description: "Dùng cho các dòng máy in KV804 và tương đương.",
    files: {
      windows: "https://drive.google.com/file/d/1qpa0b8MYRSjpdAGq-kEzksgbZJuYRtwc/view?usp=sharing",
    },
    isActive: true,
    sortOrder: 1,
  },
  {
    name: "365B",
    slug: "365b",
    model: "365B",
    printerType: "thermal",
    version: "v1.0.0",
    description: "Dùng cho các dòng máy in tem nhãn 365B và tương đương.",
    files: {
      windows: "https://drive.google.com/file/d/1jhuUqlXzuukQJd0ZbQTCUPgfLDIycUTc/view?usp=drive_link",
    },
    isActive: true,
    sortOrder: 2,
  },
  {
    name: "Canon LBP6000",
    slug: "canon-lbp6000",
    model: "LBP6000",
    printerType: "laser",
    version: "v1.0.0",
    description: "Máy in laser đen trắng Canon LBP6000, thích hợp cho văn phòng.",
    files: null,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: "ZY307 — ZY606",
    slug: "zy307-zy606",
    model: "ZY307 / ZY606",
    printerType: "thermal",
    version: "v1.0.0",
    description: "Dùng cho các dòng máy in ZY307 và ZY606.",
    files: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: "XP-365B Pro",
    slug: "xp-365b-pro",
    model: "XP-365B Pro",
    printerType: "thermal",
    version: "v2.1.0",
    description: "Dùng cho dòng máy in tem nhãn XP-365B Pro.",
    files: null,
    isActive: true,
    sortOrder: 5,
  },
  {
    name: "HP LaserJet P1102",
    slug: "hp-laserjet-p1102",
    model: "LaserJet P1102",
    printerType: "laser",
    version: "v1.2.0",
    description: "Máy in laser HP LaserJet P1102 dùng cho văn phòng.",
    files: null,
    isActive: true,
    sortOrder: 6,
  },
];

async function main() {
  console.log("Xóa toàn bộ drivers cũ...");
  await prisma.driver.deleteMany();
  console.log("Đã xóa.");

  console.log("Tạo drivers mới...");
  for (const d of drivers) {
    await prisma.driver.create({ data: d });
    console.log(`  ✓ ${d.name}`);
  }
  console.log(`\nHoàn thành! Đã tạo ${drivers.length} drivers.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
