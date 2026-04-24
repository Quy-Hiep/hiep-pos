import Image from "next/image";
import Link from "next/link";
import FloatingButtons from "@/components/public/FloatingButtons";

type Article = {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  desc: string;
  image: string;
  date: string;
  author: string;
  content: string;
  readingTime: number | null;
};

type Props = {
  article: Article;
  others: Article[];
  prev: Article | null;
  next: Article | null;
};

export default function ArticleDetailClient({ article, others, prev, next }: Props) {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container mx-auto px-4 max-w-6xl">
          <ol className="breadcrumb-list">
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/news">Tin tức</Link></li>
            <li><span className="current">{article.title}</span></li>
          </ol>
        </div>
      </nav>

      {/* Article */}
      <section className="article-detail-section">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="article-header">
                <span className="article-category-badge">{article.categoryLabel}</span>
                <h1 className="article-title-main">{article.title}</h1>
                <div className="article-meta-row">
                  <span>📅 {article.date}</span>
                  <span>✍️ {article.author}</span>
                  {article.readingTime && <span>⏱️ {article.readingTime} phút đọc</span>}
                </div>
              </div>

              {/* Featured image */}
              <figure className="article-featured-img">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </figure>

              {/* Content */}
              {article.content ? (
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <div className="article-content">
                  <p>{article.desc}</p>
                </div>
              )}

              {/* Tags */}
              <div className="article-tags-row">
                <span className="article-category-badge">{article.categoryLabel}</span>
                <Link href="/news" className="article-tag">#Tin tức</Link>
                <Link href="/news" className="article-tag">#Hiệp POS</Link>
              </div>

              {/* Prev/Next navigation */}
              {(prev || next) && (
                <div className="article-nav">
                  {prev ? (
                    <Link href={`/news/${prev.slug}`} className="article-nav-link">
                      <div className="article-nav-label">← Bài trước</div>
                      <div className="article-nav-title">{prev.title}</div>
                    </Link>
                  ) : <div />}
                  {next && (
                    <Link href={`/news/${next.slug}`} className="article-nav-link text-right">
                      <div className="article-nav-label">Bài tiếp theo →</div>
                      <div className="article-nav-title">{next.title}</div>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              {/* Latest articles */}
              <div className="news-sidebar-card">
                <h3 className="news-sidebar-title">Bài viết mới nhất</h3>
                {others.map((a) => (
                  <Link key={a.slug} href={`/news/${a.slug}`} className="sidebar-post">
                    <div className="sidebar-post-img relative">
                      <Image src={a.image} alt={a.title} fill sizes="64px" style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <div className="sidebar-post-title">{a.title}</div>
                      <div className="sidebar-post-date">📅 {a.date}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="rounded-xl p-6 text-white text-center bg-brand-gradient">
                <p className="font-bold text-lg mb-2">Dùng thử miễn phí</p>
                <p className="text-sm text-white/80 mb-4">Trải nghiệm Hiệp POS không cần thẻ tín dụng</p>
                <a
                  href="tel:0855285872"
                  className="btn-cta-primary text-sm px-6 py-2 inline-flex"
                >
                  📞 085 528 5872
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FloatingButtons />
    </>
  );
}
