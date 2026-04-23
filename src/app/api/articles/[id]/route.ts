import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
    return NextResponse.json(article);
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
    const { title, slug, type, excerpt, content, featuredImage, readingTime, isPublished } = body;

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        type,
        excerpt: excerpt || null,
        content: content || null,
        featuredImage: featuredImage || null,
        readingTime: readingTime ? parseInt(readingTime) : null,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json(article);
  } catch {
    return NextResponse.json({ error: "Lỗi khi cập nhật bài viết" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi khi xóa bài viết" }, { status: 500 });
  }
}
