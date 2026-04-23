"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  tagline?: string;
}

export default function BannerSection({
  tagline = "✔ Giải pháp bán hàng toàn diện – Phần mềm & Thiết bị cho mọi ngành nghề",
}: Props) {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import Swiper to avoid SSR issues
    const loadSwiper = async () => {
      const { Swiper } = await import("swiper");
      const { Navigation, Pagination, Autoplay } = await import("swiper/modules");

      if (!swiperRef.current) return;
      new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: ".banner-pagination", clickable: true },
        navigation: { nextEl: ".banner-next", prevEl: ".banner-prev" },
      });
    };
    loadSwiper();
  }, []);

  return (
    <section>
      {/* Slider */}
      <div ref={swiperRef} className="swiper overflow-hidden">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <Image
              src="/images/backgrounds/banner-01.jpg"
              alt="Hiệp POS - Giải pháp bán hàng"
              width={1920}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div className="swiper-slide">
            <Image
              src="/images/backgrounds/banner-02.jpg"
              alt="Thiết bị bán hàng chuyên dụng"
              width={1920}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="swiper-pagination banner-pagination"></div>
        <div className="swiper-button-prev banner-prev"></div>
        <div className="swiper-button-next banner-next"></div>
      </div>

      {/* Text Bottom */}
      <div className="bg-[var(--color-primary-light)] py-3">
        <div className="container mx-auto max-w-7xl px-4 text-center font-semibold text-[var(--color-primary-dark)] text-sm">
          {tagline}
        </div>
      </div>
    </section>
  );
}
