"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface IndSlideItem { title: string; desc: string; }
export interface IndSlide { title: string; desc: string; image: string; items: IndSlideItem[]; }

const DEFAULT_SLIDES: IndSlide[] = [
  {
    title: "Ngành Bán buôn - Bán lẻ",
    desc: "Phần mềm quản lý bán hàng đa ngành nghề được thiết kế đặc biệt cho ngành bán buôn, bán lẻ",
    image: "/images/section-02.png",
    items: [
      { title: "Quản lý kho thông minh", desc: "Theo dõi tồn kho chính xác, tự động cập nhật khi bán hàng, giúp tránh tình trạng thiếu hàng hoặc tồn kho quá nhiều." },
      { title: "Quản lý khách hàng và chương trình khuyến mãi", desc: "Ghi nhận thông tin khách hàng, lịch sử mua hàng và thiết lập chương trình khuyến mãi, thẻ thành viên." },
      { title: "Báo cáo doanh thu và phân tích kinh doanh", desc: "Cung cấp báo cáo chi tiết về doanh thu, lợi nhuận, sản phẩm bán chạy và hiệu suất nhân viên." },
      { title: "Quản lý đơn hàng và thanh toán đa dạng", desc: "Hỗ trợ quản lý đơn hàng từ nhiều kênh và tích hợp nhiều phương thức thanh toán." },
    ],
  },
  {
    title: "Ngành Ăn uống - Giải trí",
    desc: "Giải pháp quản lý toàn diện cho nhà hàng, quán cà phê, quán ăn và các cơ sở giải trí",
    image: "/images/section-02.png",
    items: [
      { title: "Quản lý bàn và order", desc: "Sơ đồ bàn trực quan, order tại bàn nhanh chóng, chuyển bàn/gộp bàn linh hoạt." },
      { title: "Quản lý thực đơn và nguyên vật liệu", desc: "Cập nhật thực đơn dễ dàng, theo dõi nguyên vật liệu, cảnh báo khi sắp hết hàng." },
      { title: "Báo cáo doanh thu theo ca/ngày", desc: "Thống kê chi tiết doanh thu theo ca làm việc, theo ngày, theo món ăn bán chạy." },
      { title: "Tích hợp bếp và phục vụ", desc: "Kết nối trực tiếp giữa quầy order và bếp, giảm sai sót và tăng tốc độ phục vụ." },
    ],
  },
  {
    title: "Ngành Lưu trú - Làm đẹp",
    desc: "Phần mềm quản lý dành riêng cho khách sạn, homestay, spa, salon và các dịch vụ làm đẹp",
    image: "/images/section-02.png",
    items: [
      { title: "Đặt lịch và quản lý lịch hẹn", desc: "Khách hàng đặt lịch online, tự động nhắc nhở, tránh trùng lịch và bỏ lỡ khách." },
      { title: "Quản lý dịch vụ và gói combo", desc: "Tạo và quản lý các gói dịch vụ, combo ưu đãi, thẻ thành viên linh hoạt." },
      { title: "Chăm sóc khách hàng", desc: "Lưu trữ lịch sử sử dụng dịch vụ, gửi tin nhắn chúc mừng sinh nhật, khuyến mãi cá nhân." },
      { title: "Quản lý phòng và công suất", desc: "Theo dõi tình trạng phòng, công suất sử dụng, doanh thu theo từng dịch vụ." },
    ],
  },
  {
    title: "Ngành nghề khác",
    desc: "Giải pháp linh hoạt, tùy biến cho mọi loại hình kinh doanh và dịch vụ khác",
    image: "/images/section-02.png",
    items: [
      { title: "Tùy biến theo nhu cầu", desc: "Cấu hình linh hoạt phù hợp với đặc thù từng ngành nghề kinh doanh của bạn." },
      { title: "Quản lý công nợ", desc: "Theo dõi công nợ khách hàng và nhà cung cấp, nhắc nhở thanh toán tự động." },
      { title: "Hóa đơn điện tử", desc: "Xuất hóa đơn điện tử nhanh chóng, đúng quy định, tích hợp trực tiếp với phần mềm." },
      { title: "Đa chi nhánh", desc: "Quản lý nhiều cửa hàng, chi nhánh trên cùng một hệ thống, đồng bộ dữ liệu realtime." },
    ],
  },
];

function SlideContent({ slide }: { slide: IndSlide }) {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Image */}
      <div>
        <Image
          src={slide.image}
          alt={slide.title}
          width={600}
          height={450}
          className="w-full h-auto"
        />
      </div>
      {/* Content */}
      <div>
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">{slide.title}</h3>
        <p className="text-[var(--color-text-light)] font-medium mb-4">{slide.desc}</p>
        <ul className="space-y-2 pl-2">
          {slide.items.map((item, idx) => (
            <li
              key={item.title}
              onClick={() => setActiveItem(idx)}
              className={`cursor-pointer pl-5 border-l-4 transition-all py-2 ${
                activeItem === idx
                  ? "border-[var(--color-primary)] bg-white rounded-r-lg shadow-sm"
                  : "border-transparent hover:border-[var(--color-primary)]/40"
              }`}
            >
              <div
                className={`font-bold text-sm mb-1 ${
                  activeItem === idx ? "text-[var(--color-primary)]" : "text-[var(--color-primary-dark)]"
                }`}
              >
                {item.title}
              </div>
              {activeItem === idx && (
                <p className="text-sm text-[var(--color-text-light)] font-medium">{item.desc}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface Props { subtitle?: string; title?: string; slides?: IndSlide[]; }

export default function IndustrySwiperSection({ subtitle = "Dù bạn đang bán lẻ hay kinh doanh nhà hàng - dịch vụ, chúng tôi cung cấp giải pháp", title = "Phần mền quản lý chuyên biệt cho từng lĩnh vực kinh doanh", slides = DEFAULT_SLIDES }: Props) {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSwiper = async () => {
      const { Swiper } = await import("swiper");
      const { Autoplay, Pagination } = await import("swiper/modules");

      if (!swiperRef.current) return;

      new Swiper(swiperRef.current, {
        modules: [Autoplay, Pagination],
        loop: false,
        autoplay: { delay: 6000, disableOnInteraction: false },
        pagination: { el: ".section-02-pagination", clickable: true },
        slidesPerView: 1,
        spaceBetween: 0,
      });
    };
    loadSwiper();
  }, []);

  return (
    <section className="py-8 lg:py-14 bg-[#e5f1fe]">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Titles */}
        <p className="text-center font-semibold text-[var(--color-primary-dark)] mb-1">
          {subtitle}
        </p>
        <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary-dark)] text-center mb-8 lg:mb-12">
          {title}
        </h2>

        {/* Swiper */}
        <div className="relative">
          <div ref={swiperRef} className="swiper overflow-hidden">
            <div className="swiper-wrapper">
              {slides.map((slide) => (
                <div key={slide.title} className="swiper-slide">
                  <SlideContent slide={slide} />
                </div>
              ))}
            </div>
            <div className="section-02-pagination mt-6 flex justify-center"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
