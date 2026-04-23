"use client";

import { useState, useEffect, useCallback } from "react";

interface AboutSettings {
  about_hero_title: string;
  about_hero_subtitle: string;
  about_stat_years_number: string;
  about_stat_years_label: string;
  about_stat_customers_number: string;
  about_stat_customers_label: string;
  about_stat_support_number: string;
  about_stat_support_label: string;
  about_mission_title: string;
  about_mission_desc: string;
  about_vision_title: string;
  about_vision_desc: string;
  about_cta_title: string;
  about_cta_desc: string;
  about_cta_phone: string;
  about_cta_phone_display: string;
  about_cta_zalo: string;
}

const DEFAULTS: AboutSettings = {
  about_hero_title: "Về Hiệp POS",
  about_hero_subtitle:
    "Chúng tôi là đơn vị hàng đầu cung cấp giải pháp bán hàng toàn diện, bao gồm phần mềm quản lý, thiết bị máy in, và các giải pháp hỗ trợ kinh doanh cho các doanh nhân trên toàn quốc.",
  about_stat_years_number: "10+",
  about_stat_years_label: "Năm kinh nghiệm",
  about_stat_customers_number: "500+",
  about_stat_customers_label: "Khách hàng hài lòng",
  about_stat_support_number: "24/7",
  about_stat_support_label: "Hỗ trợ kỹ thuật",
  about_mission_title: "Sứ Mệnh",
  about_mission_desc:
    "Cung cấp các giải pháp bán hàng hiện đại, đáng tin cậy và giá cả phải chăng để giúp các doanh nhân quản lý kinh doanh hiệu quả, tăng doanh thu và phát triển bền vững.",
  about_vision_title: "Tầm Nhìn",
  about_vision_desc:
    "Trở thành nhà cung cấp giải pháp bán hàng hàng đầu tại Việt Nam, được tin tưởng bởi hàng chục nghìn doanh nhân, và liên tục tìm kiếm những cách mới để nâng cao trải nghiệm khách hàng.",
  about_cta_title: "Bắt Đầu Ngay Hôm Nay",
  about_cta_desc: "Hãy để chúng tôi giúp bạn quản lý kinh doanh hiệu quả hơn",
  about_cta_phone: "0855285872",
  about_cta_phone_display: "085 528 5872",
  about_cta_zalo: "https://zalo.me/0855285872",
};

export default function AboutPageForm() {
  const [form, setForm] = useState<AboutSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setForm((prev) => {
          const next = { ...prev };
          for (const k of Object.keys(DEFAULTS) as Array<keyof AboutSettings>) {
            if (data[k] !== undefined && data[k] !== "") next[k] = data[k];
          }
          return next;
        });
      })
      .catch(() => setError("Không thể tải dữ liệu cài đặt"))
      .finally(() => setLoading(false));
  }, []);

  const set = useCallback(<K extends keyof AboutSettings>(key: K, value: AboutSettings[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Lưu thất bại");
      setSaved(true);
    } catch {
      setError("Có lỗi khi lưu. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page-form"><p>Đang tải...</p></div>;

  return (
    <form className="page-form" onSubmit={handleSubmit}>
      {/* Hero */}
      <div className="page-form-section">
        <h2 className="page-form-section-title">Phần Hero (đầu trang)</h2>
        <div className="admin-form-group">
          <label className="admin-form-label">Tiêu đề</label>
          <input
            className="admin-form-input"
            value={form.about_hero_title}
            onChange={(e) => set("about_hero_title", e.target.value)}
            title="Tiêu đề hero"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Mô tả ngắn</label>
          <textarea
            className="admin-form-textarea"
            rows={3}
            value={form.about_hero_subtitle}
            onChange={(e) => set("about_hero_subtitle", e.target.value)}
            title="Mô tả ngắn"
          />
        </div>
      </div>

      {/* Hero Stats */}
      <div className="page-form-section">
        <h2 className="page-form-section-title">Thống kê Hero</h2>
        <div className="pages-stats-grid">
          <div className="pages-stat-card">
            <p className="pages-stat-card-label">Kinh nghiệm</p>
            <div className="admin-form-group">
              <label className="admin-form-label">Số</label>
              <input className="admin-form-input" value={form.about_stat_years_number}
                onChange={(e) => set("about_stat_years_number", e.target.value)} placeholder="10+" title="Số năm" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Nhãn</label>
              <input className="admin-form-input" value={form.about_stat_years_label}
                onChange={(e) => set("about_stat_years_label", e.target.value)} placeholder="Năm kinh nghiệm" title="Nhãn kinh nghiệm" />
            </div>
          </div>
          <div className="pages-stat-card">
            <p className="pages-stat-card-label">Khách hàng</p>
            <div className="admin-form-group">
              <label className="admin-form-label">Số</label>
              <input className="admin-form-input" value={form.about_stat_customers_number}
                onChange={(e) => set("about_stat_customers_number", e.target.value)} placeholder="500+" title="Số khách hàng" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Nhãn</label>
              <input className="admin-form-input" value={form.about_stat_customers_label}
                onChange={(e) => set("about_stat_customers_label", e.target.value)} placeholder="Khách hàng hài lòng" title="Nhãn khách hàng" />
            </div>
          </div>
          <div className="pages-stat-card">
            <p className="pages-stat-card-label">Hỗ trợ</p>
            <div className="admin-form-group">
              <label className="admin-form-label">Số</label>
              <input className="admin-form-input" value={form.about_stat_support_number}
                onChange={(e) => set("about_stat_support_number", e.target.value)} placeholder="24/7" title="Số hỗ trợ" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Nhãn</label>
              <input className="admin-form-input" value={form.about_stat_support_label}
                onChange={(e) => set("about_stat_support_label", e.target.value)} placeholder="Hỗ trợ kỹ thuật" title="Nhãn hỗ trợ" />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="page-form-section">
        <h2 className="page-form-section-title">Sứ Mệnh &amp; Tầm Nhìn</h2>
        <div className="settings-grid-2">
          <div>
            <div className="admin-form-group">
              <label className="admin-form-label">Tiêu đề Sứ Mệnh</label>
              <input className="admin-form-input" value={form.about_mission_title}
                onChange={(e) => set("about_mission_title", e.target.value)} title="Tiêu đề sứ mệnh" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Nội dung Sứ Mệnh</label>
              <textarea className="admin-form-textarea" rows={4} value={form.about_mission_desc}
                onChange={(e) => set("about_mission_desc", e.target.value)} title="Nội dung sứ mệnh" />
            </div>
          </div>
          <div>
            <div className="admin-form-group">
              <label className="admin-form-label">Tiêu đề Tầm Nhìn</label>
              <input className="admin-form-input" value={form.about_vision_title}
                onChange={(e) => set("about_vision_title", e.target.value)} title="Tiêu đề tầm nhìn" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Nội dung Tầm Nhìn</label>
              <textarea className="admin-form-textarea" rows={4} value={form.about_vision_desc}
                onChange={(e) => set("about_vision_desc", e.target.value)} title="Nội dung tầm nhìn" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="page-form-section">
        <h2 className="page-form-section-title">Khu vực CTA (cuối trang)</h2>
        <div className="admin-form-group">
          <label className="admin-form-label">Tiêu đề</label>
          <input className="admin-form-input" value={form.about_cta_title}
            onChange={(e) => set("about_cta_title", e.target.value)} title="Tiêu đề CTA" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Mô tả</label>
          <textarea className="admin-form-textarea" rows={2} value={form.about_cta_desc}
            onChange={(e) => set("about_cta_desc", e.target.value)} title="Mô tả CTA" />
        </div>
        <div className="settings-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Số điện thoại (href tel:)</label>
            <input className="admin-form-input" value={form.about_cta_phone}
              onChange={(e) => set("about_cta_phone", e.target.value)} placeholder="0855285872" title="Số điện thoại" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Hiển thị số điện thoại</label>
            <input className="admin-form-input" value={form.about_cta_phone_display}
              onChange={(e) => set("about_cta_phone_display", e.target.value)} placeholder="085 528 5872" title="Hiển thị số điện thoại" />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Link Zalo</label>
          <input className="admin-form-input" value={form.about_cta_zalo}
            onChange={(e) => set("about_cta_zalo", e.target.value)} placeholder="https://zalo.me/..." title="Link Zalo" />
        </div>
      </div>

      {/* Save bar */}
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
