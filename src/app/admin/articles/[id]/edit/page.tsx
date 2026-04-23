import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditArticleForm from "@/components/admin/EditArticleForm";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const data = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    type: article.type,
    excerpt: article.excerpt ?? "",
    content: article.content ?? "",
    featuredImage: article.featuredImage ?? "",
    readingTime: article.readingTime ? String(article.readingTime) : "",
    isPublished: article.isPublished,
  };

  return <EditArticleForm article={data} />;
}
