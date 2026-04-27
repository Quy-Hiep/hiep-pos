import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/admin/EditProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [product, productCategories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.category.findMany({
      where: { type: "PRODUCT", isActive: true },
      orderBy: { menuOrder: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!product) notFound();

  const data = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    categoryId: product.categoryId ?? "",
    price: product.price ? String(product.price) : "",
    originalPrice: product.originalPrice ? String(product.originalPrice) : "",
    description: product.description ?? "",
    fullDescription: product.fullDescription ?? "",
    badge: product.badge ?? "",
    warranty: product.warranty ?? "",
    sortOrder: String(product.sortOrder ?? 0),
    images: product.images.map((img) => ({ url: img.url, alt: img.alt ?? "", sortOrder: img.sortOrder })),
    isFeatured: product.isFeatured,
    isActive: product.isActive,
  };

  return <EditProductForm product={data} categoryOptions={productCategories} />;
}
