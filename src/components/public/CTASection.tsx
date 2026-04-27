import Image from "next/image";

interface Props {
  title?: string;
  desc?: string;
  phone?: string;
  phoneDisplay?: string;
  zaloLink?: string;
}

export default function CTASection({
  title = "Bắt đầu sử dụng ngay hôm nay",
  desc = "Đăng ký dùng thử miễn phí hoặc liên hệ tư vấn. Đội ngũ kỹ thuật sẵn sàng hỗ trợ bạn cài đặt và vận hành trong 30 phút.",
  phone = "0855285872",
  phoneDisplay = "085.528.5872",
  zaloLink = "https://zalo.me/0855285872",
}: Props) {
  return (
    <section
      className="py-8 lg:py-14"
      style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}
    >
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="title-section !text-white mb-3">{title}</h2>
        <p className="text-white/75 mb-8 mx-auto max-w-xl">{desc}</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <a href={`tel:${phone}`} className="btn-cta-primary">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Gọi ngay: {phoneDisplay}
          </a>
          <a
            href={zaloLink}
            className="btn-cta-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/icon_zalo_50x50.png"
              alt="Zalo"
              width={20}
              height={20}
              style={{ width: "20px", height: "20px" }}
            />
            Nhắn Zalo ngay
          </a>
          <a
            href="https://www.kiotviet.vn/dang-ky?refcode=12760"
            className="btn-cta-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                clipRule="evenodd"
              />
              <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
            </svg>
            Dùng thử miễn phí
          </a>
        </div>
      </div>
    </section>
  );
}
