import type { Metadata } from "next";
import DriversPageClient from "@/components/public/DriversPageClient";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Tải Driver Máy In - Hiệp POS",
  description:
    "Tải driver máy in cho Windows, macOS. Hỗ trợ máy in KV804, 365B, Canon LBP6000, ZY307, ZY606. Tìm và tải driver phù hợp nhanh chóng.",
  keywords: "tải driver, driver máy in, KV804, 365B, Canon, Windows, macOS",
  openGraph: {
    title: "Tải Driver Máy In - Hiệp POS",
    description: "Tải driver máy in cho Windows và macOS tại Hiệp POS.",
    type: "website",
  },
};

export default async function DriversPage() {
  const drivers = await prisma.driver.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const mapped = drivers.map((d) => ({
    ...d,
    files: (d.files as { windows?: string; macos?: string } | null) ?? null,
  }));

  return <DriversPageClient drivers={mapped} />;
}
