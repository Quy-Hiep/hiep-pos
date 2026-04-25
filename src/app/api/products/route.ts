import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        isActive: true,
        isFeatured: true,
        badge: true,
        category: { select: { name: true } },
      },
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Lỗi khi lấy danh sách sản phẩm" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, slug, categoryId, price, originalPrice, description, fullDescription, badge, warranty, images, isFeatured, isActive } = body;

    if (!name) return NextResponse.json({ error: "Tên sản phẩm không được để trống" }, { status: 400 });

    const product = await prisma.product.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        categoryId: categoryId || null,
        price: price ? parseFloat(price) : 0,
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        description: description || null,
        fullDescription: fullDescription || null,
        badge: badge || null,
        warranty: warranty || null,
        isFeatured: isFeatured ?? false,
        isActive: isActive ?? true,
        ...(Array.isArray(images) && images.length > 0
          ? {
              images: {
                create: images.map((img: { url: string; alt?: string; sortOrder: number }) => ({
                  url: img.url,
                  alt: img.alt || null,
                  sortOrder: img.sortOrder,
                })),
              },
            }
          : {}),
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/products", "layout");
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Lỗi khi tạo sản phẩm" }, { status: 500 });
  }
}
