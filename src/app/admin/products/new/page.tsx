import { prisma } from "@/lib/prisma";
import NewProductForm from "@/components/admin/NewProductForm";

export default async function NewProductPage() {
  const categoryOptions = await prisma.category.findMany({
    where: { type: "PRODUCT", isActive: true },
    orderBy: { menuOrder: "asc" },
    select: { id: true, name: true },
  });

  return <NewProductForm categoryOptions={categoryOptions} />;
}
