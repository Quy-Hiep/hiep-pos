import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FloatingButtons from "@/components/public/FloatingButtons";
import { getSettings } from "@/lib/getSettings";

export const metadata: Metadata = {
  title: "Giới Thiệu - Hiệp POS",
  description:
    "Hiệp POS — đơn vị hàng đầu cung cấp giải pháp bán hàng toàn diện: phần mềm quản lý, máy in hóa đơn, thiết bị POS cho doanh nghiệp Việt Nam.",
  openGraph: {
    title: "Giới Thiệu - Hiệp POS",
    description: "Tìm hiểu về Hiệp POS — giải pháp bán hàng toàn diện.",
    type: "website",
  },
};

export default async function AboutPage() {
  const s = await getSettings([
    "about_hero_title", "about_hero_subtitle",
    "about_stat_years_number", "about_stat_years_label",
    "about_stat_customers_number", "about_stat_customers_label",
    "about_stat_support_number", "about_stat_support_label",
    "about_mission_title", "about_mission_desc",
    "about_vision_title", "about_vision_desc",
    "about_cta_title", "about_cta_desc",
    "about_cta_phone", "about_cta_phone_display", "about_cta_zalo",
  ]);

  const heroTitle = s.about_hero_title || "Về Hiệp POS";
  const heroSubtitle = s.about_hero_subtitle || "Chúng tôi là đơn vị hàng đầu cung cấp giải pháp bán hàng toàn diện, bao gồm phần mềm quản lý, thiết bị máy in, và các giải pháp hỗ trợ kinh doanh cho các doanh nhân trên toàn quốc.";
  const yearsNumber = s.about_stat_years_number || "10+";
  const yearsLabel = s.about_stat_years_label || "Năm kinh nghiệm";
  const customersNumber = s.about_stat_customers_number || "500+";
  const customersLabel = s.about_stat_customers_label || "Khách hàng hài lòng";
  const supportNumber = s.about_stat_support_number || "24/7";
  const supportLabel = s.about_stat_support_label || "Hỗ trợ kỹ thuật";
  const missionTitle = s.about_mission_title || "Sứ Mệnh";
  const missionDesc = s.about_mission_desc || "Cung cấp các giải pháp bán hàng hiện đại, đáng tin cậy và giá cả phải chăng để giúp các doanh nhân quản lý kinh doanh hiệu quả, tăng doanh thu và phát triển bền vững.";
  const visionTitle = s.about_vision_title || "Tầm Nhìn";
  const visionDesc = s.about_vision_desc || "Trở thành nhà cung cấp giải pháp bán hàng hàng đầu tại Việt Nam, được tin tưởng bởi hàng chục nghìn doanh nhân, và liên tục tìm kiếm những cách mới để nâng cao trải nghiệm khách hàng.";
  const ctaTitle = s.about_cta_title || "Bắt Đầu Ngay Hôm Nay";
  const ctaDesc = s.about_cta_desc || "Hãy để chúng tôi giúp bạn quản lý kinh doanh hiệu quả hơn";
  const ctaPhone = s.about_cta_phone || "0855285872";
  const ctaPhoneDisplay = s.about_cta_phone_display || "085 528 5872";
  const ctaZalo = s.about_cta_zalo || "https://zalo.me/0855285872";

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <h1 className="page-hero-title">{heroTitle}</h1>
              <p className="page-hero-subtitle">{heroSubtitle}</p>
              <div className="page-hero-stats">
                <div className="page-hero-stat">
                  <span className="page-hero-stat-number">{yearsNumber}</span>
                  <span className="page-hero-stat-label">{yearsLabel}</span>
                </div>
                <div className="page-hero-stat">
                  <span className="page-hero-stat-number">{customersNumber}</span>
                  <span className="page-hero-stat-label">{customersLabel}</span>
                </div>
                <div className="page-hero-stat">
                  <span className="page-hero-stat-number">{supportNumber}</span>
                  <span className="page-hero-stat-label">{supportLabel}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center w-52 h-52 rounded-full bg-white/10">
              <svg viewBox="0 0 96 96" fill="none" className="w-28 h-28" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="80" height="60" rx="10" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="3"/>
                <rect x="20" y="24" width="56" height="8" rx="4" fill="white" fillOpacity="0.4"/>
                <rect x="20" y="38" width="36" height="6" rx="3" fill="white" fillOpacity="0.3"/>
                <rect x="20" y="50" width="48" height="6" rx="3" fill="white" fillOpacity="0.2"/>
                <rect x="32" y="72" width="32" height="8" rx="4" fill="white" fillOpacity="0.2"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container mx-auto px-4 max-w-6xl">
          <ol className="breadcrumb-list">
            <li><Link href="/">Trang chủ</Link></li>
            <li><span className="current">Giới thiệu</span></li>
          </ol>
        </div>
      </nav>

      {/* Mission & Vision */}
      <section className="py-14 lg:py-20 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="title-section text-center mb-2">Sứ Mệnh &amp; Tầm Nhìn</h2>
          <p className="sub-title text-center mb-10">Định hướng phát triển bền vững cho doanh nghiệp Việt</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3 className="mission-title">{missionTitle}</h3>
              <p className="mission-desc">{missionDesc}</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon mission-icon-info">🚀</div>
              <h3 className="mission-title">{visionTitle}</h3>
              <p className="mission-desc">{visionDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Software features */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="title-section mb-3">Phần Mềm Bán Hàng Toàn Diện</h2>
              <p className="text-gray-500 mb-8 text-base leading-relaxed">
                Phần mềm quản lý bán hàng hàng đầu, được thiết kế để giúp các doanh nhân quản lý kinh
                doanh một cách hiệu quả, nhanh chóng và dễ dàng.
              </p>
              <div>
                {[
                  {
                    icon: "🛒",
                    title: "Quản lý nhiều kênh bán hàng",
                    desc: "Kết nối với tất cả các nền tảng bán hàng online: Facebook, Shopee, Lazada, TikTok Shop.",
                  },
                  {
                    icon: "📦",
                    title: "Đồng bộ tồn kho thực thời",
                    desc: "Cập nhật tồn kho tự động trên tất cả các kênh, tránh tình trạng bán vượt.",
                  },
                  {
                    icon: "🧾",
                    title: "Hóa đơn điện tử tích hợp",
                    desc: "Tự động xuất hóa đơn điện tử theo quy định của nhà nước.",
                  },
                  {
                    icon: "📊",
                    title: "Báo cáo chi tiết &amp; Phân tích",
                    desc: "Dashboard trực quan giúp bạn hiểu rõ tình hình kinh doanh.",
                  },
                ].map((f, i) => (
                  <div key={i} className="about-feature-row">
                    <div className="about-feature-icon">{f.icon}</div>
                    <div>
                      <div className="about-feature-title" dangerouslySetInnerHTML={{ __html: f.title }} />
                      <div className="about-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/section-02.png"
                alt="Phần mềm bán hàng Hiệp POS"
                width={480}
                height={360}
                style={{ width: "100%", height: "auto", maxWidth: "480px" }}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hardware */}
      <section className="py-14 lg:py-20 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="title-section text-center mb-2">Thiết Bị Hỗ Trợ Bán Hàng</h2>
          <p className="sub-title text-center mb-10">
            Cung cấp đầy đủ các thiết bị máy in, máy POS, và vật tư tiêu hao chất lượng cao
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🖥️", title: "Máy POS", desc: "Màn hình cảm ứng, tính tiền nhanh, đa phương thức thanh toán." },
              { icon: "🖨️", title: "Máy in hóa đơn", desc: "In nhiệt siêu nhanh, tự động cắt giấy, kết nối USB/LAN." },
              { icon: "📷", title: "Máy quét mã vạch", desc: "Quét 1D/2D/QR, cắm là dùng, tốc độ cao." },
              { icon: "📄", title: "Vật tư tiêu hao", desc: "Giấy in nhiệt, tem nhãn mã vạch, két tiền chuyên dụng." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn-see-more">
              Xem tất cả sản phẩm →
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="title-section text-center mb-2">Tại Sao Chọn Hiệp POS?</h2>
          <p className="sub-title text-center mb-10">Cam kết mang lại giá trị thực sự cho doanh nghiệp của bạn</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Triển khai nhanh trong 30 phút", desc: "Cài đặt và bắt đầu sử dụng ngay, không cần kiến thức kỹ thuật." },
              { icon: "🛡️", title: "Bảo hành 12 tháng", desc: "Tất cả thiết bị đều được bảo hành chính hãng, đổi mới nếu có lỗi." },
              { icon: "🎓", title: "Đào tạo miễn phí", desc: "Chúng tôi đào tạo nhân viên sử dụng phần mềm, không tính thêm phí." },
              { icon: "📱", title: "Hỗ trợ từ xa 24/7", desc: "Đội ngũ kỹ thuật hỗ trợ qua điện thoại và Zalo bất kỳ lúc nào." },
              { icon: "💰", title: "Giá cả minh bạch", desc: "Không có phí ẩn, báo giá rõ ràng trước khi ký hợp đồng." },
              { icon: "🔄", title: "Nâng cấp miễn phí", desc: "Luôn cập nhật phần mềm mới nhất mà không mất thêm chi phí." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl border border-gray-100 bg-[#f9f9f9] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-all duration-300">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-[var(--color-primary-dark)] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center bg-brand-gradient">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-white text-3xl font-bold mb-3">{ctaTitle}</h2>
          <p className="text-white/85 text-lg mb-8">{ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${ctaPhone}`} className="btn-cta-primary">📞 Gọi ngay: {ctaPhoneDisplay}</a>
            <a href={ctaZalo} target="_blank" rel="noopener noreferrer" className="btn-cta-secondary">
              💬 Nhắn Zalo
            </a>
          </div>
        </div>
      </section>

      <FloatingButtons />
    </>
  );
}
