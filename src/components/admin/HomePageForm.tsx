"use client";
import { useState, useEffect } from "react";

// ===== TYPES =====
interface HomeStat { icon: string; number: string; label: string; }
interface SwTabItem { title: string; desc: string; }
interface SwTab { label: string; items: SwTabItem[]; }
interface IndSlideItem { title: string; desc: string; }
interface IndSlide { title: string; desc: string; image: string; items: IndSlideItem[]; }

// ===== DEFAULTS =====
const DEF_STATS: HomeStat[] = [
  { icon: "🤝", number: "500+", label: "Khách hàng tin dùng" },
  { icon: "🛡️", number: "12", label: "Tháng bảo hành" },
  { icon: "🎧", number: "24/7", label: "Hỗ trợ kỹ thuật" },
  { icon: "🚀", number: "30 phút", label: "Cài đặt & sử dụng" },
];

const DEF_SW_TABS: SwTab[] = [
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

const DEF_IND_SLIDES: IndSlide[] = [
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

export default function HomePageForm() {
  const [activeTab, setActiveTab] = useState<"general" | "software" | "industry">("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // General
  const [bannerTagline, setBannerTagline] = useState("✔ Giải pháp bán hàng toàn diện – Phần mềm & Thiết bị cho mọi ngành nghề");
  const [stats, setStats] = useState<HomeStat[]>(DEF_STATS.map((s) => ({ ...s })));
  const [ctaTitle, setCtaTitle] = useState("Bắt đầu sử dụng ngay hôm nay");
  const [ctaDesc, setCtaDesc] = useState("Đăng ký dùng thử miễn phí hoặc liên hệ tư vấn. Đội ngũ kỹ thuật sẵn sàng hỗ trợ bạn cài đặt và vận hành trong 30 phút.");
  const [ctaPhone, setCtaPhone] = useState("0855285872");
  const [ctaPhoneDisplay, setCtaPhoneDisplay] = useState("085.528.5872");
  const [ctaZalo, setCtaZalo] = useState("https://zalo.me/0855285872");

  // Software tabs
  const [swTitle, setSwTitle] = useState("Phần mềm quản lý bán hàng đa ngành nghề");
  const [swSubtitle, setSwSubtitle] = useState("Giải pháp toàn diện cho mọi ngành nghề");
  const [swTabs, setSwTabs] = useState<SwTab[]>(DEF_SW_TABS.map((t) => ({ ...t, items: t.items.map((i) => ({ ...i })) })));

  // Industry
  const [indSubtitle, setIndSubtitle] = useState("Dù bạn đang bán lẻ hay kinh doanh nhà hàng - dịch vụ, chúng tôi cung cấp giải pháp");
  const [indTitle, setIndTitle] = useState("Phần mềm quản lý chuyên biệt cho từng lĩnh vực kinh doanh");
  const [indSlides, setIndSlides] = useState<IndSlide[]>(DEF_IND_SLIDES.map((s) => ({ ...s, items: s.items.map((i) => ({ ...i })) })));

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        if (data.home_banner_tagline) setBannerTagline(data.home_banner_tagline);
        const ns = DEF_STATS.map((s) => ({ ...s }));
        [0, 1, 2, 3].forEach((i) => {
          if (data[`home_stat_${i}_icon`]) ns[i].icon = data[`home_stat_${i}_icon`];
          if (data[`home_stat_${i}_number`]) ns[i].number = data[`home_stat_${i}_number`];
          if (data[`home_stat_${i}_label`]) ns[i].label = data[`home_stat_${i}_label`];
        });
        setStats(ns);
        if (data.home_cta_title) setCtaTitle(data.home_cta_title);
        if (data.home_cta_desc) setCtaDesc(data.home_cta_desc);
        if (data.home_cta_phone) setCtaPhone(data.home_cta_phone);
        if (data.home_cta_phone_display) setCtaPhoneDisplay(data.home_cta_phone_display);
        if (data.home_cta_zalo) setCtaZalo(data.home_cta_zalo);
        if (data.sw_title) setSwTitle(data.sw_title);
        if (data.sw_subtitle) setSwSubtitle(data.sw_subtitle);
        if (data.sw_tabs_json) { try { setSwTabs(JSON.parse(data.sw_tabs_json)); } catch { /* keep default */ } }
        if (data.ind_subtitle) setIndSubtitle(data.ind_subtitle);
        if (data.ind_title) setIndTitle(data.ind_title);
        if (data.ind_slides_json) { try { setIndSlides(JSON.parse(data.ind_slides_json)); } catch { /* keep default */ } }
      })
      .catch(() => setError("Không thể tải dữ liệu cài đặt"))
      .finally(() => setLoading(false));
  }, []);

  const updateStat = (i: number, field: keyof HomeStat, value: string) => {
    setStats((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
    setSaved(false);
  };
  const updateSwTabLabel = (ti: number, label: string) => {
    setSwTabs((prev) => prev.map((t, i) => i === ti ? { ...t, label } : t));
    setSaved(false);
  };
  const updateSwTabItem = (ti: number, ii: number, field: keyof SwTabItem, value: string) => {
    setSwTabs((prev) => prev.map((t, i) => {
      if (i !== ti) return t;
      return { ...t, items: t.items.map((item, j) => j === ii ? { ...item, [field]: value } : item) };
    }));
    setSaved(false);
  };
  const updateIndSlide = (si: number, field: keyof Omit<IndSlide, "items">, value: string) => {
    setIndSlides((prev) => prev.map((s, i) => i === si ? { ...s, [field]: value } : s));
    setSaved(false);
  };
  const updateIndSlideItem = (si: number, ii: number, field: keyof IndSlideItem, value: string) => {
    setIndSlides((prev) => prev.map((s, i) => {
      if (i !== si) return s;
      return { ...s, items: s.items.map((item, j) => j === ii ? { ...item, [field]: value } : item) };
    }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload: Record<string, string> = {
        home_banner_tagline: bannerTagline,
        home_cta_title: ctaTitle,
        home_cta_desc: ctaDesc,
        home_cta_phone: ctaPhone,
        home_cta_phone_display: ctaPhoneDisplay,
        home_cta_zalo: ctaZalo,
        sw_title: swTitle,
        sw_subtitle: swSubtitle,
        sw_tabs_json: JSON.stringify(swTabs),
        ind_subtitle: indSubtitle,
        ind_title: indTitle,
        ind_slides_json: JSON.stringify(indSlides),
      };
      stats.forEach((s, i) => {
        payload[`home_stat_${i}_icon`] = s.icon;
        payload[`home_stat_${i}_number`] = s.number;
        payload[`home_stat_${i}_label`] = s.label;
      });
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
    } catch {
      setError("Có lỗi khi lưu. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page-form"><p>Đang tải...</p></div>;

  const TABS = [
    { key: "general" as const, label: "📢 Chung" },
    { key: "software" as const, label: "💻 Tính năng phần mềm" },
    { key: "industry" as const, label: "🏭 Ngành nghề" },
  ];

  return (
    <form className="page-form" onSubmit={handleSubmit}>
      <div>
        <div className="settings-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`settings-tab${activeTab === t.key ? " settings-tab-active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "general" && (
          <div className="settings-panel">
            <div className="settings-section-title">Banner</div>
            <div className="admin-form-group mb-4">
              <label className="admin-form-label">Dòng chữ dưới banner</label>
              <input className="admin-form-input" value={bannerTagline}
                onChange={(e) => { setBannerTagline(e.target.value); setSaved(false); }}
                title="Dòng chữ dưới banner" placeholder="✔ Giải pháp bán hàng toàn diện..." />
            </div>

            <div className="settings-section-title settings-section-title-mt">Thống kê nổi bật (4 mục)</div>
            <div className="pages-stats-grid mb-6">
              {stats.map((s, i) => (
                <div key={i} className="pages-stat-card">
                  <p className="pages-stat-card-label">Mục {i + 1}</p>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Icon</label>
                    <input className="admin-form-input" value={s.icon} onChange={(e) => updateStat(i, "icon", e.target.value)} placeholder="🤝" title={`Icon mục ${i + 1}`} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Số liệu</label>
                    <input className="admin-form-input" value={s.number} onChange={(e) => updateStat(i, "number", e.target.value)} placeholder="500+" title={`Số liệu mục ${i + 1}`} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Nhãn</label>
                    <input className="admin-form-input" value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Khách hàng tin dùng" title={`Nhãn mục ${i + 1}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="settings-section-title settings-section-title-mt">Khu vực CTA (Call to Action)</div>
            <div className="admin-form-group mb-4">
              <label className="admin-form-label">Tiêu đề</label>
              <input className="admin-form-input" value={ctaTitle} onChange={(e) => { setCtaTitle(e.target.value); setSaved(false); }} title="Tiêu đề CTA" />
            </div>
            <div className="admin-form-group mb-4">
              <label className="admin-form-label">Mô tả</label>
              <textarea className="admin-form-textarea" rows={3} value={ctaDesc} onChange={(e) => { setCtaDesc(e.target.value); setSaved(false); }} title="Mô tả CTA" />
            </div>
            <div className="settings-grid-2 mb-4">
              <div className="admin-form-group">
                <label className="admin-form-label">Số điện thoại (href tel:)</label>
                <input className="admin-form-input" value={ctaPhone} onChange={(e) => { setCtaPhone(e.target.value); setSaved(false); }} placeholder="0855285872" title="Số điện thoại" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Hiển thị số điện thoại</label>
                <input className="admin-form-input" value={ctaPhoneDisplay} onChange={(e) => { setCtaPhoneDisplay(e.target.value); setSaved(false); }} placeholder="085.528.5872" title="Hiển thị SĐT" />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Link Zalo</label>
              <input className="admin-form-input" value={ctaZalo} onChange={(e) => { setCtaZalo(e.target.value); setSaved(false); }} placeholder="https://zalo.me/..." title="Link Zalo" />
            </div>
          </div>
        )}

        {activeTab === "software" && (
          <div className="settings-panel">
            <div className="settings-section-title">Tiêu đề section</div>
            <div className="admin-form-group mb-4">
              <label className="admin-form-label">Tiêu đề chính</label>
              <input className="admin-form-input" value={swTitle} onChange={(e) => { setSwTitle(e.target.value); setSaved(false); }} title="Tiêu đề section phần mềm" />
            </div>
            <div className="admin-form-group mb-6">
              <label className="admin-form-label">Tiêu đề phụ</label>
              <input className="admin-form-input" value={swSubtitle} onChange={(e) => { setSwSubtitle(e.target.value); setSaved(false); }} title="Tiêu đề phụ section phần mềm" />
            </div>

            {swTabs.map((tab, ti) => (
              <div key={ti}>
                <div className={`settings-section-title${ti > 0 ? " settings-section-title-mt" : ""}`}>
                  Tab {ti + 1}
                </div>
                <div className="admin-form-group mb-4">
                  <label className="admin-form-label">Nhãn tab</label>
                  <input className="admin-form-input" value={tab.label} onChange={(e) => updateSwTabLabel(ti, e.target.value)} title={`Nhãn tab ${ti + 1}`} />
                </div>
                <div className="pages-stats-grid mb-2">
                  {tab.items.map((item, ii) => (
                    <div key={ii} className="pages-stat-card">
                      <p className="pages-stat-card-label">Thẻ {ii + 1}</p>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Tiêu đề</label>
                        <input className="admin-form-input" value={item.title} onChange={(e) => updateSwTabItem(ti, ii, "title", e.target.value)} title={`Tab ${ti + 1} thẻ ${ii + 1} tiêu đề`} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Mô tả</label>
                        <textarea className="admin-form-textarea" rows={3} value={item.desc} onChange={(e) => updateSwTabItem(ti, ii, "desc", e.target.value)} title={`Tab ${ti + 1} thẻ ${ii + 1} mô tả`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "industry" && (
          <div className="settings-panel">
            <div className="settings-section-title">Tiêu đề section</div>
            <div className="admin-form-group mb-4">
              <label className="admin-form-label">Tiêu đề phụ (trên tiêu đề chính)</label>
              <input className="admin-form-input" value={indSubtitle} onChange={(e) => { setIndSubtitle(e.target.value); setSaved(false); }} title="Tiêu đề phụ section ngành nghề" />
            </div>
            <div className="admin-form-group mb-6">
              <label className="admin-form-label">Tiêu đề chính</label>
              <input className="admin-form-input" value={indTitle} onChange={(e) => { setIndTitle(e.target.value); setSaved(false); }} title="Tiêu đề chính section ngành nghề" />
            </div>

            {indSlides.map((slide, si) => (
              <div key={si}>
                <div className={`settings-section-title${si > 0 ? " settings-section-title-mt" : ""}`}>
                  Ngành {si + 1}: {slide.title}
                </div>
                <div className="settings-grid-2 mb-4">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Tiêu đề ngành</label>
                    <input className="admin-form-input" value={slide.title} onChange={(e) => updateIndSlide(si, "title", e.target.value)} title={`Tiêu đề slide ${si + 1}`} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Hình ảnh (đường dẫn)</label>
                    <input className="admin-form-input" value={slide.image} onChange={(e) => updateIndSlide(si, "image", e.target.value)} title={`Hình ảnh slide ${si + 1}`} />
                  </div>
                </div>
                <div className="admin-form-group mb-4">
                  <label className="admin-form-label">Mô tả ngành</label>
                  <textarea className="admin-form-textarea" rows={2} value={slide.desc} onChange={(e) => updateIndSlide(si, "desc", e.target.value)} title={`Mô tả slide ${si + 1}`} />
                </div>
                <div className="pages-stats-grid mb-2">
                  {slide.items.map((item, ii) => (
                    <div key={ii} className="pages-stat-card">
                      <p className="pages-stat-card-label">Mục {ii + 1}</p>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Tiêu đề</label>
                        <input className="admin-form-input" value={item.title} onChange={(e) => updateIndSlideItem(si, ii, "title", e.target.value)} title={`Slide ${si + 1} mục ${ii + 1} tiêu đề`} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Mô tả</label>
                        <textarea className="admin-form-textarea" rows={2} value={item.desc} onChange={(e) => updateIndSlideItem(si, ii, "desc", e.target.value)} title={`Slide ${si + 1} mục ${ii + 1} mô tả`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="settings-save-bar">
        {error && <span className="required">{error}</span>}
        {saved && <span className="settings-save-success">✓ Đã lưu thành công</span>}
        <button type="submit" className="admin-btn-add" disabled={saving}>
          {saving ? "Đang lưu..." : "💾 Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}