import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        type: true,
        isPublished: true,
        publishedAt: true,
        excerpt: true,
        featuredImage: true,
        author: { select: { name: true } },
      },
    });
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json({ error: "Lỗi khi lấy danh sách bài viết" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, slug, type, excerpt, content, featuredImage, readingTime, isPublished } = body;

    if (!title) return NextResponse.json({ error: "Tiêu đề không được để trống" }, { status: 400 });

    const article = await prisma.article.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        type: type ?? "NEWS",
        excerpt: excerpt || null,
        content: content || null,
        featuredImage: featuredImage || null,
        readingTime: readingTime ? parseInt(readingTime) : null,
        isPublished: isPublished ?? false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Lỗi khi tạo bài viết" }, { status: 500 });
  }
}
