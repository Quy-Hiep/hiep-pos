"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FloatingButtons from "@/components/public/FloatingButtons";

export type ArticleItem = {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  desc: string;
  image: string;
  date: string;
  author: string;
  featured: boolean;
};

export type NewsFilterItem = { key: string; label: string };

// placeholder — replaced by DB data passed via props
const _unused = [
  {
    slug: "phan-mem-hiep-pos-v3-2-nang-cap-bao-cao",
    category: "update",
    categoryLabel: "Cập nhật",
    title: "Phần mềm Hiệp POS v3.2 — Nâng cấp tính năng báo cáo",
    desc: "Chúng tôi vừa phát hành phiên bản 3.2 với các cải tiến đáng kể về báo cáo doanh thu, phân tích bán hàng và giao diện người dùng.",
    image: "/images/news-01.jpg",
    date: "18/04/2026",
    author: "Hiệp POS Team",
    featured: true,
  },
  {
    slug: "huong-dan-cai-dat-may-in-hoa-don",
    category: "guide",
    categoryLabel: "Hướng dẫn",
    title: "Hướng dẫn cài đặt và kết nối máy in hóa đơn với Hiệp POS",
    desc: "Bước-by-bước hướng dẫn chi tiết cách cài đặt, kết nối máy in hóa đơn nhiệt với phần mềm quản lý bán hàng.",
    image: "/images/news-01.jpg",
    date: "15/04/2026",
    author: "Support Team",
    featured: false,
  },
  {
    slug: "hiep-pos-dat-chung-chi-bao-mat-iso-27001",
    category: "security",
    categoryLabel: "Bảo mật",
    title: "Hiệp POS đạt chứng chỉ bảo mật ISO 27001",
    desc: "Chúng tôi cam kết bảo vệ dữ liệu kinh doanh của bạn với các tiêu chuẩn bảo mật cao nhất.",
    image: "/images/news-01.jpg",
    date: "12/04/2026",
    author: "Hiệp POS Team",
    featured: false,
  },
  {
    slug: "5-meo-toi-uu-doanh-thu-cuoi-tuan",
    category: "tips",
    categoryLabel: "Mẹo & Kinh nghiệm",
    title: "5 Mẹo tối ưu doanh thu cuối tuần với Hiệp POS",
    desc: "Khám phá các chiến lược bán hàng hiệu quả trong khung giờ cao điểm cuối tuần dành cho chủ cửa hàng.",
    image: "/images/news-01.jpg",
    date: "10/04/2026",
    author: "Marketing Team",
    featured: false,
  },
  {
    slug: "quan-ly-kho-thong-minh-voi-phan-mem-pos",
    category: "guide",
    categoryLabel: "Hướng dẫn",
    title: "Quản lý kho thông minh với phần mềm POS — Tránh hết hàng đột ngột",
    desc: "Hướng dẫn cách sử dụng tính năng cảnh báo tồn kho thấp và tự động tạo đơn nhập hàng trong Hiệp POS.",
    image: "/images/news-01.jpg",
    date: "08/04/2026",
    author: "Support Team",
    featured: false,
  },
  {
    slug: "hoa-don-dien-tu-tu-2025",
    category: "update",
    categoryLabel: "Cập nhật",
    title: "Hóa đơn điện tử bắt buộc từ 2025 — Hiệp POS đã sẵn sàng",
    desc: "Theo quy định mới, tất cả doanh nghiệp phải sử dụng hóa đơn điện tử. Hiệp POS đã tích hợp đầy đủ.",
    image: "/images/news-01.jpg",
    date: "05/04/2026",
    author: "Hiệp POS Team",
    featured: false,
  },
];
void _unused;

export default function NewsPageClient({ articles, filters }: { articles: ArticleItem[]; filters: NewsFilterItem[] }) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? articles : articles.filter((a) => a.category === active);

  const categoryCounts = filters
    .filter((f) => f.key !== "all")
    .reduce<Record<string, number>>((acc, f) => {
      acc[f.key] = articles.filter((a) => a.category === f.key).length;
      return acc;
    }, {});

  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = filtered.filter((a) => a.slug !== featured?.slug);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="page-hero-title">Tin Tức &amp; Bài Viết</h1>
          <p className="page-hero-subtitle">
            Cập nhật những tin tức mới nhất, bài viết hướng dẫn chi tiết, kinh nghiệm kinh doanh
            và các mẹo hay để tối ưu hóa phần mềm quản lý bán hàng của bạn.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container mx-auto px-4 max-w-6xl">
          <ol className="breadcrumb-list">
            <li><Link href="/">Trang chủ</Link></li>
            <li><span className="current">Tin tức &amp; Bài viết</span></li>
          </ol>
        </div>
      </nav>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="title-section text-center mb-2">Danh Mục Bài Viết</h2>
          <p className="text-center text-gray-500 mb-8">Chọn danh mục để tìm bài viết phù hợp</p>

          {/* Filter */}
          <div className="filter-bar">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${active === f.key ? "active" : ""}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main articles */}
            <div className="lg:col-span-2">
              {filtered.length === 0 ? (
                <div className="no-items-msg">
                  <h3>Không có bài viết trong danh mục này</h3>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Featured article */}
                  {featured && (
                    <Link href={`/news/${featured.slug}`} className="news-listing-card featured">
                      <div className="news-listing-img">
                        <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 45vw" style={{ objectFit: "cover" }} />
                        <span className="news-listing-category">{featured.categoryLabel}</span>
                      </div>
                      <div className="news-listing-body">
                        <h2 className="news-listing-title">{featured.title}</h2>
                        <p className="news-listing-desc">{featured.desc}</p>
                        <div className="news-listing-meta">
                          <span>📅 {featured.date} · ✍️ {featured.author}</span>
                          <span className="news-listing-read">Đọc tiếp →</span>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Other articles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {rest.map((article) => (
                      <Link key={article.slug} href={`/news/${article.slug}`} className="news-listing-card">
                        <div className="news-listing-img relative">
                          <Image src={article.image} alt={article.title} fill sizes="(max-width: 640px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                          <span className="news-listing-category">{article.categoryLabel}</span>
                        </div>
                        <div className="news-listing-body">
                          <h3 className="news-listing-title">{article.title}</h3>
                          <p className="news-listing-desc">{article.desc}</p>
                          <div className="news-listing-meta">
                            <span>📅 {article.date}</span>
                            <span className="news-listing-read">Đọc →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              {/* Recent posts */}
              <div className="news-sidebar-card">
                <h3 className="news-sidebar-title">Bài viết mới nhất</h3>
                {articles.slice(0, 4).map((a) => (
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

              {/* Categories */}
              <div className="news-sidebar-card">
                <h3 className="news-sidebar-title">Danh mục</h3>
                <ul className="sidebar-category-list">
                  {filters.slice(1).map((f) => (
                    <li key={f.key} className="sidebar-category-item" onClick={() => setActive(f.key)}>
                      <span>{f.label}</span>
                      <span className="sidebar-category-count">{categoryCounts[f.key] ?? 0}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA card */}
              <div className="rounded-xl p-6 text-white text-center bg-brand-gradient">
                <p className="font-bold text-lg mb-2">Cần tư vấn?</p>
                <p className="text-sm text-white/80 mb-4">Gọi ngay để được hỗ trợ miễn phí</p>
                <a href="tel:0855285872" className="btn-cta-primary text-sm px-6 py-2 inline-flex">
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
