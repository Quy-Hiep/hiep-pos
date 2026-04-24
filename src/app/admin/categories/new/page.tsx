import { prisma } from "@/lib/prisma";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function NewCategoryPage() {
  const allCategories = await prisma.category.findMany({
    select: { id: true, name: true, type: true },
    orderBy: { name: "asc" },
  });

  const initialData = {
    name: "",
    slug: "",
    type: "PRODUCT",
    description: "",
    image: "",
    parentId: "",
    showInMenu: false,
    menuOrder: "0",
    isActive: true,
  };

  return <CategoryForm initialData={initialData} parentOptions={allCategories} mode="new" />;
}
