"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Anh Trần Minh Tuấn",
    role: "Chủ cửa hàng tạp hóa, Phan Thiết",
    text: '"Phần mềm quản lý bán hàng của Hiệp POS đã giúp tôi tiết kiệm rất nhiều thời gian và công sức trong việc quản lý cửa hàng. Giao diện thân thiện và dễ sử dụng, tôi rất hài lòng!"',
  },
  {
    name: "Chị Nguyễn Thu Hà",
    role: "Quản lý nhà thuốc, Mũi Né",
    text: '"Tôi đã thử nhiều phần mềm quản lý bán hàng khác nhau, nhưng Hiệp POS là lựa chọn tốt nhất. Hỗ trợ khách hàng nhanh chóng và hiệu quả, tôi rất ấn tượng!"',
  },
  {
    name: "Anh Lê Hoàng Phúc",
    role: "Chủ quán cà phê, Bình Thuận",
    text: '"Phần mềm của Hiệp POS giúp tôi quản lý tồn kho và đơn hàng một cách dễ dàng. Tôi có thể theo dõi doanh thu và lợi nhuận một cách chính xác hơn bao giờ hết."',
  },
  {
    name: "Chị Phạm Thị Mai Lan",
    role: "Chủ shop thời trang, Phan Thiết",
    text: '"Dịch vụ hỗ trợ của Hiệp POS thực sự tuyệt vời. Đội kỹ thuật rất nhiệt tình, cài đặt tận nơi và hướng dẫn rất chi tiết. Đã giới thiệu cho nhiều bạn bè kinh doanh!"',
  },
];

export default function ReviewsSection() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSwiper = async () => {
      const { Swiper } = await import("swiper");
      const { Navigation, Pagination, Autoplay } = await import("swiper/modules");

      if (!swiperRef.current) return;
      new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: ".reviews-pagination", clickable: true },
        navigation: { nextEl: ".reviews-next", prevEl: ".reviews-prev" },
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1200: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    };
    loadSwiper();
  }, []);

  return (
    <section className="section-reviews reviews-gradient py-8 lg:py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="title-section text-center mb-8 lg:mb-10">
          Khách hàng nói gì về chúng tôi?
        </h2>
        <div
          ref={swiperRef}
          className="swiper overflow-visible px-10 -mx-10"

        >
          <div className="swiper-wrapper">
            {reviews.map((review) => (
              <div key={review.name} className="swiper-slide">
                <div className="review-card">
                  <div className="review-header">
                    <div className="reviewer-avatar">
                      <Image
                        src="/images/icons/logo2.png"
                        alt={review.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="reviewer-info">
                      <h4 className="reviewer-name">{review.name}</h4>
                      <span className="reviewer-role">{review.role}</span>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="review-body">
                    <p>{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination reviews-pagination"></div>
          <div className="swiper-button-prev reviews-prev"></div>
          <div className="swiper-button-next reviews-next"></div>
        </div>
      </div>
    </section>
  );
}
