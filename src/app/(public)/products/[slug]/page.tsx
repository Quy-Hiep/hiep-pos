import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "@/components/public/products/ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

function fmtPrice(n: number): string {
  return new Intl.NumberFormat("vi-VN").format(n) + "₫";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true, metaTitle: true, metaDescription: true },
  });
  if (!product) return { title: "Không tìm thấy sản phẩm" };
  const title = product.metaTitle ?? `${product.name} - Hiệp POS`;
  const desc = product.metaDescription ?? product.description ?? "";
  return {
    title,
    description: desc,
    openGraph: { title, description: desc, type: "website" },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
  if (!p) notFound();

  const specs = Array.isArray(p.specifications)
    ? (p.specifications as { label: string; value: string }[])
    : [];

  const product = {
    slug: p.slug,
    category: p.category?.name ?? "",
    name: p.name,
    image: p.images[0]?.url ?? "/images/products/may-in-804.png",
    images: p.images.map((img) => ({ url: img.url, alt: img.alt ?? "" })),
    price: Number(p.price) > 0 ? fmtPrice(Number(p.price)) : "Liên hệ",
    oldPrice: p.originalPrice && Number(p.originalPrice) > 0 ? fmtPrice(Number(p.originalPrice)) : undefined,
    desc: p.fullDescription ?? p.description ?? p.name,
    shortDesc: p.description ?? p.name,
    features: p.connectionTypes,
    specs,
  };

  return <ProductDetailClient product={product} />;
}
