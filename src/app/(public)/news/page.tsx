import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import NewsPageClient from "@/components/public/news/NewsPageClient";

export const metadata: Metadata = {
  title: "Tin Tức & Bài Viết - Hiệp POS",
  description:
    "Cập nhật tin tức mới nhất, bài viết hướng dẫn chi tiết, kinh nghiệm kinh doanh và các mẹo tối ưu phần mềm quản lý bán hàng Hiệp POS.",
  keywords: "tin tức, bài viết, hướng dẫn, Hiệp POS, phần mềm bán hàng",
  openGraph: {
    title: "Tin Tức & Bài Viết - Hiệp POS",
    description: "Cập nhật tin tức và bài viết mới nhất từ Hiệp POS.",
    type: "website",
  },
};

const TYPE_LABEL: Record<string, string> = {
  NEWS: "Tin Tức",
  GUIDE: "Hướng Dẫn",
  SECURITY: "Bảo Mật",
  TIPS: "Mẹo & Kinh Nghiệm",
  CUSTOMER_STORY: "Câu Chuyện Khách Hàng",
};

export default async function NewsPage() {
  const dbArticles = await prisma.article.findMany({
    where: { isPublished: true },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  type DbArticle = (typeof dbArticles)[0];
  const articles = dbArticles.map((a: DbArticle, i: number) => ({
    slug: a.slug,
    category: a.type.toLowerCase(),
    categoryLabel: TYPE_LABEL[a.type] ?? a.type,
    title: a.title,
    desc: a.excerpt ?? "",
    image: a.featuredImage ?? "/images/news-01.jpg",
    date: a.publishedAt
      ? a.publishedAt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
      : "",
    author: "Hiệp POS Team",
    featured: i === 0,
  }));

  const types = [...new Set<string>(dbArticles.map((a: DbArticle) => a.type))];
  const filters = [
    { key: "all", label: "Tất cả" },
    ...types.map((t: string) => ({ key: t.toLowerCase(), label: TYPE_LABEL[t] ?? t })),
  ];

  return <NewsPageClient articles={articles} filters={filters} />;
}
