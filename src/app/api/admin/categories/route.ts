import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    const categories = await prisma.category.findMany({
      where: type ? { type: type as "PRODUCT" | "ARTICLE" | "DRIVER" | "PAGE" } : undefined,
      orderBy: [{ type: "asc" }, { menuOrder: "asc" }, { name: "asc" }],
      include: {
        parent: { select: { id: true, name: true } },
        _count: { select: { products: true, articles: true, drivers: true } },
      },
    });
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json({ error: "Lỗi khi lấy danh sách thể loại" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, slug, type, description, image, parentId, showInMenu, menuOrder, isActive } = body;

    if (!name) return NextResponse.json({ error: "Tên thể loại không được để trống" }, { status: 400 });
    if (!type) return NextResponse.json({ error: "Loại thể loại không được để trống" }, { status: 400 });

    const finalSlug = slug || name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

    const category = await prisma.category.create({
      data: {
        name,
        slug: finalSlug,
        type,
        description: description || null,
        image: image || null,
        parentId: parentId || null,
        showInMenu: showInMenu ?? false,
        menuOrder: menuOrder ? parseInt(menuOrder) : 0,
        isActive: isActive ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/news");
    return NextResponse.json(category, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
      return NextResponse.json({ error: "Slug đã tồn tại, vui lòng dùng slug khác" }, { status: 400 });
    }
    return NextResponse.json({ error: "Lỗi khi tạo thể loại" }, { status: 500 });
  }
}
