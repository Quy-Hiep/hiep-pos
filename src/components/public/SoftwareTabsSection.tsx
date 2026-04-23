"use client";
import { useState } from "react";

export interface SwTabItem { title: string; desc: string; }
export interface SwTab { label: string; items: SwTabItem[]; }

const DEFAULT_TABS: SwTab[] = [
  {
    label: "Quản lý bán hàng",
    items: [
      { title: "Mở rộng kênh bán hàng đa nền tảng", desc: "Với phần mềm quản lý bán hàng thông minh, doanh nghiệp dễ dàng kết nối và vận hành đa kênh từ cửa hàng, website, sàn TMĐT đến mạng xã hội. Tất cả được đồng bộ trong một hệ thống duy nhất." },
      { title: "Quản lý tập trung – Kiểm soát toàn diện", desc: "Toàn bộ dữ liệu bán hàng, tồn kho, đơn hàng và khách hàng được quản lý tập trung trên một nền tảng duy nhất. Giúp bạn theo dõi chính xác tình hình kinh doanh theo thời gian thực." },
      { title: "Tối ưu hóa vận hành - Tiết kiệm chi phí", desc: "Tự động hóa quy trình từ tạo đơn, xử lý đơn hàng đến báo cáo doanh thu. Giảm thiểu thao tác thủ công, tiết kiệm thời gian và chi phí nhân sự." },
    ],
  },
  {
    label: "Quản lý công nợ",
    items: [
      { title: "Theo dõi công nợ khách hàng", desc: "Quản lý chi tiết số tiền khách hàng còn nợ, lịch sử thanh toán và hạn thanh toán. Hệ thống tự động nhắc nhở khi đến hạn." },
      { title: "Quản lý công nợ nhà cung cấp", desc: "Theo dõi số tiền còn nợ nhà cung cấp, lịch nhập hàng và lịch thanh toán. Giúp bạn chủ động trong việc thanh toán và duy trì mối quan hệ tốt với đối tác." },
      { title: "Báo cáo công nợ tổng hợp", desc: "Báo cáo chi tiết tổng nợ phải thu, nợ phải trả theo từng khách hàng, nhà cung cấp. Giúp bạn nắm bắt tình hình tài chính và đưa ra quyết định hợp lý." },
    ],
  },
  {
    label: "Hóa đơn điện tử & chữ ký số",
    items: [
      { title: "Xuất hóa đơn điện tử nhanh chóng", desc: "Tích hợp trực tiếp với hệ thống hóa đơn điện tử, cho phép xuất hóa đơn VAT ngay khi bán hàng. Tuân thủ đầy đủ quy định của cơ quan thuế." },
      { title: "Chữ ký số bảo mật cao", desc: "Hỗ trợ ký số trực tiếp trên hóa đơn điện tử, đảm bảo tính pháp lý và bảo mật. Giúp doanh nghiệp thực hiện giao dịch, ký hợp đồng từ xa." },
      { title: "Quản lý & lưu trữ hóa đơn", desc: "Toàn bộ hóa đơn được lưu trữ trên hệ thống điện toán đám mây, dễ dàng tìm kiếm, tra cứu và xuất báo cáo." },
    ],
  },
];

interface Props { title?: string; subtitle?: string; tabs?: SwTab[]; }

export default function SoftwareTabsSection({ title = "Phần mềm quản lý bán hàng đa ngành nghề", subtitle = "Giải pháp toàn diện cho mọi ngành nghề", tabs = DEFAULT_TABS }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = tabs[activeIndex] ?? tabs[0];

  return (
    <section className="py-8 lg:py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary-dark)] text-center mb-2">
          {title}
        </h2>
        <p className="text-center text-[var(--color-primary-dark)] font-semibold mb-8">
          {subtitle}
        </p>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`px-7 py-2.5 rounded-full font-bold text-sm transition-all shadow-md ${
                activeIndex === idx
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {current.items.map((item) => (
            <div
              key={item.title}
              className="text-center text-white rounded-xl p-8 h-full shadow-lg"
              style={{
                backgroundImage: "url(/images/backgrounds/bg-form-footer.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3 className="text-xl font-bold mb-5">{item.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
