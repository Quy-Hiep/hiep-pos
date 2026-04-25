import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, slug, categoryId, price, originalPrice, description, fullDescription, badge, warranty, images, isFeatured, isActive } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        categoryId: categoryId || null,
        price: price ? parseFloat(price) : undefined,
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        description: description || null,
        fullDescription: fullDescription || null,
        badge: badge || null,
        warranty: warranty || null,
        isFeatured,
        isActive,
      },
    });

    // Replace all images
    if (Array.isArray(images)) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      if (images.length > 0) {
        await prisma.productImage.createMany({
          data: images.map((img: { url: string; alt?: string; sortOrder: number }) => ({
            productId: id,
            url: img.url,
            alt: img.alt || null,
            sortOrder: img.sortOrder,
          })),
        });
      }
    }

    revalidatePath("/", "page");
    revalidatePath("/products", "page");
    revalidatePath(`/products/${product.slug}`, "page");
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Lỗi khi cập nhật sản phẩm" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const product = await prisma.product.findUnique({ where: { id }, select: { slug: true } });
    await prisma.product.delete({ where: { id } });
    revalidatePath("/", "page");
    revalidatePath("/products", "page");
    if (product?.slug) revalidatePath(`/products/${product.slug}`, "page");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi khi xóa sản phẩm" }, { status: 500 });
  }
}
