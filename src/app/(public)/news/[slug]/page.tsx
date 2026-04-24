import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArticleDetailClient from "@/components/public/news/ArticleDetailClient";

type Props = { params: Promise<{ slug: string }> };

const TYPE_LABEL: Record<string, string> = {
  NEWS: "Tin Tức",
  GUIDE: "Hướng Dẫn",
  SECURITY: "Bảo Mật",
  TIPS: "Mẹo & Kinh Nghiệm",
  CUSTOMER_STORY: "Câu Chuyện Khách Hàng",
};

type RawArticle = {
  slug: string; type: string; title: string; excerpt: string | null;
  featuredImage: string | null; publishedAt: Date | null;
  content?: string | null; readingTime?: number | null;
};

function mapArticle(a: RawArticle) {
  return {
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
    content: a.content ?? "",
    readingTime: a.readingTime ?? null,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      metaTitle: true,
      metaDescription: true,
      featuredImage: true,
      ogImage: true,
      publishedAt: true,
      updatedAt: true,
      type: true,
    },
  });
  if (!article) return { title: "Không tìm thấy bài viết" };

  const title = article.metaTitle ?? `${article.title} - Hiệp POS`;
  const desc = article.metaDescription ?? article.excerpt ?? "";
  const image = article.ogImage ?? article.featuredImage ?? "/images/og-default.jpg";

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      section: TYPE_LABEL[article.type] ?? article.type,
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [image],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;

  const [article, allPublished] = await Promise.all([
    prisma.article.findUnique({ where: { slug } }),
    prisma.article.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      select: { slug: true, type: true, title: true, excerpt: true, featuredImage: true, publishedAt: true },
    }),
  ]);

  if (!article) notFound();

  type PubArticle = (typeof allPublished)[0];
  const currentIndex = allPublished.findIndex((a: PubArticle) => a.slug === slug);
  const others = allPublished.filter((a: PubArticle) => a.slug !== slug).slice(0, 4).map(mapArticle);
  const prev = currentIndex > 0 ? mapArticle(allPublished[currentIndex - 1]) : null;
  const next = currentIndex < allPublished.length - 1 ? mapArticle(allPublished[currentIndex + 1]) : null;

  return (
    <ArticleDetailClient
      article={mapArticle(article)}
      others={others}
      prev={prev}
      next={next}
    />
  );
}
