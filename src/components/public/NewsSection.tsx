"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  image: string;
  category: string;
  title: string;
  desc: string;
  date: string;
  slug: string;
};

const defaultNews: NewsItem[] = [
  {
    image: "/images/news-01.jpg",
    category: "Cập nhật",
    title: "Cập nhật phần mềm mới nhất",
    desc: "Chúng tôi vừa ra mắt phiên bản mới với nhiều tính năng cải tiến giúp quản lý bán hàng hiệu quả hơn.",
    date: "17/04/2026",
    slug: "/news/cap-nhat-phan-mem-moi-nhat",
  },
  {
    image: "/images/news-01.jpg",
    category: "Hướng dẫn",
    title: "Tối ưu hiệu suất hệ thống",
    desc: "Các mẹo và thủ thuật để tối ưu hóa hiệu suất phần mềm quản lý bán hàng của bạn.",
    date: "15/04/2026",
    slug: "/news/toi-uu-hieu-suat-he-thong",
  },
  {
    image: "/images/news-01.jpg",
    category: "Bảo mật",
    title: "Bảo mật dữ liệu tối ưu",
    desc: "Hiệp POS cam kết bảo vệ dữ liệu kinh doanh của bạn với các tiêu chuẩn bảo mật quốc tế.",
    date: "12/04/2026",
    slug: "/news/bao-mat-du-lieu-toi-uu",
  },
  {
    image: "/images/news-01.jpg",
    category: "Tin tức",
    title: "Hỗ trợ khách hàng 24/7",
    desc: "Đội hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn 24 giờ mỗi ngày để giải quyết các vấn đề.",
    date: "10/04/2026",
    slug: "/news/ho-tro-khach-hang-24-7",
  },
];

export default function NewsSection({ articles }: { articles?: NewsItem[] }) {
  const news = articles ?? defaultNews;
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSwiper = async () => {
      const { Swiper } = await import("swiper");
      const { Pagination, Autoplay } = await import("swiper/modules");

      if (!swiperRef.current) return;
      new Swiper(swiperRef.current, {
        modules: [Pagination, Autoplay],
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: ".news-pagination", clickable: true },
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          992: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    };
    loadSwiper();
  }, []);

  return (
    <section className="section-news py-8 lg:py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="title-section text-center mb-8 lg:mb-12">Kinh nghiệm & Tin tức</h2>
        <div ref={swiperRef} className="swiper pb-16">
          <div className="swiper-wrapper">
            {news.map((item) => (
              <div key={item.title} className="swiper-slide">
                <div className="news-card">
                  <div className="news-image-wrapper relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                      className="news-image object-cover"
                    />
                    <div className="news-overlay"></div>
                    <span className="news-category">{item.category}</span>
                  </div>
                  <div className="news-content">
                    <h3 className="news-title">
                      <Link href={item.slug}>{item.title}</Link>
                    </h3>
                    <p className="news-description">{item.desc}</p>
                    <div className="news-meta">
                      <span className="news-date">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {item.date}
                      </span>
                      <Link href={item.slug} className="news-read-more">
                        Đọc thêm
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination news-pagination"></div>
        </div>
      </div>
    </section>
  );
}
