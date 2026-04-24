import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/admin/EditProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!product) notFound();

  const data = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price ? String(product.price) : "",
    originalPrice: product.originalPrice ? String(product.originalPrice) : "",
    description: product.description ?? "",
    fullDescription: product.fullDescription ?? "",
    badge: product.badge ?? "",
    warranty: product.warranty ?? "",
    images: product.images.map((img) => ({ url: img.url, alt: img.alt ?? "", sortOrder: img.sortOrder })),
    isFeatured: product.isFeatured,
    isActive: product.isActive,
  };

  return <EditProductForm product={data} />;
}
