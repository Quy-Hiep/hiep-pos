"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FloatingButtons from "@/components/public/FloatingButtons";

const allCases = [
  {
    slug: "lap-dat-may-pos-quan-ca-phe-moc",
    category: "install",
    categoryLabel: "Lắp đặt",
    title: "Lắp đặt bộ máy POS cho quán cà phê Mộc",
    desc: "Tư vấn và lắp đặt trọn bộ máy POS, máy in hóa đơn, phần mềm quản lý cho quán cà phê Mộc tại Phan Thiết. Hệ thống hoạt động ổn định từ ngày đầu.",
    image: "/images/news-01.jpg",
    date: "15/04/2026",
    location: "Phan Thiết",
    tags: ["Quán cà phê", "Máy POS", "Phần mềm"],
  },
  {
    slug: "lap-dat-nha-hang-hai-san-bien-xanh",
    category: "install",
    categoryLabel: "Lắp đặt",
    title: "Lắp đặt hệ thống bán hàng cho nhà hàng Hải Sản Biển Xanh",
    desc: "Triển khai 3 máy in hóa đơn, 2 máy quét mã vạch và phần mềm quản lý cho nhà hàng hải sản lớn tại Mũi Né.",
    image: "/images/news-01.jpg",
    date: "10/04/2026",
    location: "Mũi Né",
    tags: ["Nhà hàng", "Máy in", "Máy quét"],
  },
  {
    slug: "tu-van-chuoi-cua-hang-minimart",
    category: "consult",
    categoryLabel: "Tư vấn",
    title: "Tư vấn giải pháp bán hàng cho chuỗi cửa hàng tiện lợi MiniMart",
    desc: "Tư vấn hệ thống POS đồng bộ cho 5 chi nhánh cửa hàng tiện lợi, quản lý tập trung từ xa.",
    image: "/images/news-01.jpg",
    date: "05/04/2026",
    location: "TP. Hồ Chí Minh",
    tags: ["Chuỗi cửa hàng", "Đồng bộ"],
  },
  {
    slug: "danh-gia-anh-minh-tra-sua-teahouse",
    category: "review",
    categoryLabel: "Đánh giá",
    title: "Anh Minh — Chủ quán trà sữa TeaHouse: \"Dùng rất hài lòng!\"",
    desc: "Sau 6 tháng sử dụng bộ thiết bị Hiệp POS, anh Minh chia sẻ trải nghiệm thực tế và đánh giá chất lượng sản phẩm.",
    image: "/images/news-01.jpg",
    date: "01/04/2026",
    location: "Bình Thuận",
    tags: ["Trà sữa", "Đánh giá"],
  },
  {
    slug: "lap-dat-nha-thuoc-an-khang",
    category: "install",
    categoryLabel: "Lắp đặt",
    title: "Lắp đặt hệ thống bán hàng cho nhà thuốc An Khang",
    desc: "Triển khai máy POS, máy in hóa đơn và phần mềm quản lý dược phẩm cho nhà thuốc An Khang.",
    image: "/images/news-01.jpg",
    date: "25/03/2026",
    location: "Phan Thiết",
    tags: ["Nhà thuốc", "Máy POS"],
  },
  {
    slug: "tu-van-khach-san-sea-star-resort",
    category: "consult",
    categoryLabel: "Tư vấn",
    title: "Tư vấn thiết bị cho khách sạn Sea Star Resort",
    desc: "Tư vấn giải pháp in hóa đơn, quản lý đặt phòng và thanh toán cho khách sạn Sea Star Resort tại Mũi Né.",
    image: "/images/news-01.jpg",
    date: "18/03/2026",
    location: "Mũi Né",
    tags: ["Khách sạn", "Resort"],
  },
];

const filters = [
  { key: "all", label: "Tất cả" },
  { key: "install", label: "Lắp đặt" },
  { key: "consult", label: "Tư vấn" },
  { key: "review", label: "Đánh giá" },
];

export default function CustomersPageClient() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? allCases : allCases.filter((c) => c.category === active);

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <h1 className="page-hero-title">Khách Hàng Của Chúng Tôi</h1>
              <p className="page-hero-subtitle">
                Hình ảnh thực tế các buổi tư vấn, lắp đặt thiết bị bán hàng cho cửa hàng, nhà hàng,
                quán cà phê trên toàn quốc. Hiệp POS luôn đồng hành cùng khách hàng từ khâu tư vấn đến vận hành.
              </p>
              <div className="page-hero-stats">
                <div className="page-hero-stat">
                  <span className="page-hero-stat-number">500+</span>
                  <span className="page-hero-stat-label">Khách hàng</span>
                </div>
                <div className="page-hero-stat">
                  <span className="page-hero-stat-number">20+</span>
                  <span className="page-hero-stat-label">Tỉnh thành</span>
                </div>
                <div className="page-hero-stat">
                  <span className="page-hero-stat-number">99%</span>
                  <span className="page-hero-stat-label">Hài lòng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container mx-auto px-4 max-w-6xl">
          <ol className="breadcrumb-list">
            <li><Link href="/">Trang chủ</Link></li>
            <li><span className="current">Khách hàng</span></li>
          </ol>
        </div>
      </nav>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="title-section text-center mb-2">Câu Chuyện Khách Hàng</h2>
          <p className="text-center text-gray-500 mb-8">Những câu chuyện thực tế từ khách hàng sử dụng Hiệp POS</p>

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

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="no-items-msg">
              <h3>Không có nội dung trong danh mục này</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <article key={item.slug} className="customer-card">
                  <div className="customer-card-img">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                    <span className={`card-badge badge-${item.category}`}>{item.categoryLabel}</span>
                  </div>
                  <div className="customer-card-body">
                    <div className="customer-card-meta">
                      <span>📅 {item.date}</span>
                      <span>📍 {item.location}</span>
                    </div>
                    <h3 className="customer-card-title">{item.title}</h3>
                    <p className="customer-card-desc">{item.desc}</p>
                    <div className="customer-tags">
                      {item.tags.map((t, i) => (
                        <span key={i} className="customer-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center bg-brand-gradient">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-white text-3xl font-bold mb-3">Bạn Muốn Trở Thành Khách Hàng Tiếp Theo?</h2>
          <p className="text-white/85 text-lg mb-8">
            Liên hệ với chúng tôi ngay để được tư vấn giải pháp phù hợp
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:0855285872" className="btn-cta-primary">📞 Gọi ngay: 085 528 5872</a>
            <a href="https://zalo.me/0855285872" target="_blank" rel="noopener noreferrer" className="btn-cta-secondary">
              💬 Nhắn Zalo
            </a>
          </div>
        </div>
      </section>

      <FloatingButtons />
    </>
  );
}
