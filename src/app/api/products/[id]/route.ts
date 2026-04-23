import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

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
    const { name, slug, price, originalPrice, description, fullDescription, badge, warranty, featuredImage, isFeatured, isActive } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
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

    // Upsert first image
    if (featuredImage !== undefined) {
      const existing = await prisma.productImage.findFirst({ where: { productId: id }, orderBy: { sortOrder: "asc" } });
      if (featuredImage) {
        if (existing) {
          await prisma.productImage.update({ where: { id: existing.id }, data: { url: featuredImage } });
        } else {
          await prisma.productImage.create({ data: { productId: id, url: featuredImage, sortOrder: 0 } });
        }
      } else if (existing) {
        await prisma.productImage.delete({ where: { id: existing.id } });
      }
    }

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
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi khi xóa sản phẩm" }, { status: 500 });
  }
}
