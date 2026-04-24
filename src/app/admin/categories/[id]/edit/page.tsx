import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [category, allCategories] = await Promise.all([
    prisma.category.findUnique({ where: { id } }),
    prisma.category.findMany({
      select: { id: true, name: true, type: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!category) notFound();

  const initialData = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    type: category.type,
    description: category.description ?? "",
    image: category.image ?? "",
    parentId: category.parentId ?? "",
    showInMenu: category.showInMenu,
    menuOrder: String(category.menuOrder),
    isActive: category.isActive,
  };

  return <CategoryForm initialData={initialData} parentOptions={allCategories} mode="edit" />;
}
