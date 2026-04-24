import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { parent: { select: { id: true, name: true } } },
    });
    if (!category) return NextResponse.json({ error: "Không tìm thấy thể loại" }, { status: 404 });
    return NextResponse.json(category);
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
    const { name, slug, type, description, image, parentId, showInMenu, menuOrder, isActive } = body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        type,
        description: description || null,
        image: image || null,
        parentId: parentId || null,
        showInMenu,
        menuOrder: menuOrder ? parseInt(menuOrder) : 0,
        isActive,
      },
    });

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/news");
    return NextResponse.json(category);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
      return NextResponse.json({ error: "Slug đã tồn tại, vui lòng dùng slug khác" }, { status: 400 });
    }
    return NextResponse.json({ error: "Lỗi khi cập nhật thể loại" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Check if category has children
    const children = await prisma.category.count({ where: { parentId: id } });
    if (children > 0) {
      return NextResponse.json({ error: "Không thể xóa thể loại có thể loại con" }, { status: 400 });
    }
    await prisma.category.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi khi xóa thể loại" }, { status: 500 });
  }
}
