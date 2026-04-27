import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ProductsPageClient from "@/components/public/products/ProductsPageClient";

export const metadata: Metadata = {
  title: "Sản Phẩm Thiết Bị Bán Hàng - Hiệp POS",
  description:
    "Khám phá các sản phẩm thiết bị bán hàng chuyên dụng: máy POS, máy in hóa đơn, máy quét mã vạch, giấy in nhiệt. Giải pháp bán hàng toàn diện.",
  keywords:
    "máy POS, máy in hóa đơn, máy quét mã vạch, giấy in nhiệt, thiết bị bán hàng",
  openGraph: {
    title: "Sản Phẩm Thiết Bị Bán Hàng - Hiệp POS",
    description: "Khám phá các sản phẩm thiết bị bán hàng chuyên dụng tại Hiệp POS.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

function fmtPrice(n: number): string {
  return new Intl.NumberFormat("vi-VN").format(n) + "₫";
}

export default async function ProductsPage() {
  const [dbProducts, dbCats] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
      },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.category.findMany({
      where: { 
        type: "PRODUCT", 
        isActive: true,
        OR: [
          { parentId: { not: null } }, // Child categories (menu cấp 2)
          { children: { none: {} } }, // Hoặc standalone categories không có children
        ]
      },
      orderBy: { menuOrder: "asc" },
    }),
  ]);

  const products = dbProducts.map((p: (typeof dbProducts)[0]) => ({
    slug: p.slug,
    category: p.category?.slug ?? "other",
    categoryLabel: p.category?.name ?? "Khác",
    name: p.name,
    image: p.images[0]?.url ?? "/images/products/may-in-804.png",
    badge: (p.badge === "Liên hệ" ? "" : p.badge) ?? "",
    badgeType: p.badge === "Bán chạy" ? "badge-hot" : "",
    desc: p.description ?? "",
    price: Number(p.price) > 0 ? fmtPrice(Number(p.price)) : "Liên hệ",
    oldPrice: p.originalPrice && Number(p.originalPrice) > 0 ? fmtPrice(Number(p.originalPrice)) : "",
    priceUnit: "",
    features: p.connectionTypes,
  }));

  const filters = [
    { key: "all", label: "Tất cả" },
    ...dbCats.map((c: (typeof dbCats)[0]) => ({ key: c.slug, label: c.name })),
  ];

  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <ProductsPageClient products={products} filters={filters} />
    </Suspense>
  );
}
