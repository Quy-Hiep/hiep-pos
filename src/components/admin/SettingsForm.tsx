"use client";

import { useState, useEffect, useCallback } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Settings {
  // General
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactPhone2: string;
  contactAddress: string;
  contactMap: string;
  // Social
  socialFacebook: string;
  socialYoutube: string;
  socialZalo: string;
  socialTiktok: string;
  socialLinkedin: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  googleVerification: string;
  bingSiteAuth: string;
  googleAnalytics: string;
  facebookPixel: string;
  // Appearance
  logoUrl: string;
  faviconUrl: string;
  footerText: string;
}

const DEFAULTS: Settings = {
  siteName: "", siteDescription: "", siteUrl: "",
  contactEmail: "", contactPhone: "", contactPhone2: "", contactAddress: "", contactMap: "",
  socialFacebook: "", socialYoutube: "", socialZalo: "", socialTiktok: "", socialLinkedin: "",
  metaTitle: "", metaDescription: "", metaKeywords: "",
  ogTitle: "", ogDescription: "", ogImage: "",
  twitterCard: "summary_large_image", twitterTitle: "", twitterDescription: "", twitterImage: "",
  googleVerification: "", bingSiteAuth: "",
  googleAnalytics: "", facebookPixel: "",
  logoUrl: "", faviconUrl: "", footerText: "",
};

export default function SettingsForm() {
  const [data, setData] = useState<Settings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "social" | "seo" | "appearance">("general");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d: Record<string, string>) => {
        setData({ ...DEFAULTS, ...d });
        setLoading(false);
      });
  }, []);

  const set = useCallback((key: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const setVal = useCallback((key: keyof Settings, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="admin-loading">Đang tải cài đặt...</div>;

  const TABS = [
    { key: "general", label: "⚙️ Chung" },
    { key: "social", label: "🌐 Mạng xã hội" },
    { key: "seo", label: "🔍 SEO & Meta" },
    { key: "appearance", label: "🎨 Giao diện" },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="settings-form">

      {/* Tab bar */}
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

      {/* ===== GENERAL ===== */}
      {activeTab === "general" && (
        <div className="settings-panel">
          <div className="settings-section-title">Thông tin website</div>
          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Tên website <span className="required">*</span></label>
              <input className="admin-form-input" value={data.siteName} onChange={set("siteName")} placeholder="Hiệp POS" title="Tên website" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">URL website</label>
              <input className="admin-form-input" value={data.siteUrl} onChange={set("siteUrl")} placeholder="https://hieppos.com" title="URL website" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Mô tả website</label>
            <textarea className="admin-form-textarea" rows={3} value={data.siteDescription} onChange={set("siteDescription")} placeholder="Mô tả ngắn về website..." title="Mô tả website" />
          </div>

          <div className="settings-section-title settings-section-title-mt">Thông tin liên hệ</div>
          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Email liên hệ</label>
              <input className="admin-form-input" type="email" value={data.contactEmail} onChange={set("contactEmail")} placeholder="info@hieppos.com" title="Email liên hệ" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Hotline 1</label>
              <input className="admin-form-input" type="tel" value={data.contactPhone} onChange={set("contactPhone")} placeholder="0918.696.988" title="Hotline 1" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Hotline 2</label>
              <input className="admin-form-input" type="tel" value={data.contactPhone2} onChange={set("contactPhone2")} placeholder="028.xxxx.xxxx" title="Hotline 2" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Địa chỉ</label>
            <input className="admin-form-input" value={data.contactAddress} onChange={set("contactAddress")} placeholder="123 Đường ABC, Quận 1, TP.HCM" title="Địa chỉ" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Google Maps Embed URL</label>
            <input className="admin-form-input" value={data.contactMap} onChange={set("contactMap")} placeholder="https://www.google.com/maps/embed?pb=..." title="Google Maps URL" />
            <div className="admin-form-hint">Lấy từ Google Maps → Chia sẻ → Nhúng bản đồ → Sao chép URL trong src="..."</div>
          </div>
        </div>
      )}

      {/* ===== SOCIAL ===== */}
      {activeTab === "social" && (
        <div className="settings-panel">
          <div className="settings-section-title">Liên kết mạng xã hội</div>
          {([
            ["socialFacebook", "Facebook", "https://facebook.com/hieppos", "facebook"],
            ["socialYoutube", "YouTube", "https://youtube.com/@hieppos", "youtube"],
            ["socialZalo", "Zalo OA", "https://zalo.me/...", "zalo"],
            ["socialTiktok", "TikTok", "https://tiktok.com/@hieppos", "tiktok"],
            ["socialLinkedin", "LinkedIn", "https://linkedin.com/company/...", "linkedin"],
          ] as [keyof Settings, string, string, string][]).map(([key, label, ph]) => (
            <div key={key} className="admin-form-group">
              <label className="admin-form-label">{label}</label>
              <input className="admin-form-input" type="url" value={data[key]} onChange={set(key)} placeholder={ph} title={label} />
            </div>
          ))}
        </div>
      )}

      {/* ===== SEO ===== */}
      {activeTab === "seo" && (
        <div className="settings-panel">

          <div className="settings-section-title">Meta cơ bản</div>
          <div className="settings-meta-preview">
            <div className="settings-meta-preview-title">{data.metaTitle || data.siteName || "Tên trang web"}</div>
            <div className="settings-meta-preview-url">{data.siteUrl || "https://hieppos.com"}</div>
            <div className="settings-meta-preview-desc">{data.metaDescription || "Mô tả trang web hiển thị trên Google..."}</div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Meta Title <span className="settings-char-hint">{data.metaTitle.length}/60</span></label>
            <input className="admin-form-input" value={data.metaTitle} onChange={set("metaTitle")} maxLength={60} placeholder="Tiêu đề SEO (để trống dùng tên website)" title="Meta Title" />
            <div className="admin-form-hint">Hiển thị trên tab trình duyệt và kết quả Google. Nên 50–60 ký tự.</div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Meta Description <span className="settings-char-hint">{data.metaDescription.length}/160</span></label>
            <textarea className="admin-form-textarea" rows={3} value={data.metaDescription} onChange={set("metaDescription")} maxLength={160} placeholder="Mô tả ngắn gọn hiển thị trên Google..." title="Meta Description" />
            <div className="admin-form-hint">Nên 120–160 ký tự. Ảnh hưởng tỷ lệ click từ Google.</div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Meta Keywords</label>
            <input className="admin-form-input" value={data.metaKeywords} onChange={set("metaKeywords")} placeholder="máy in nhiệt, máy pos, hieppos, ..." title="Meta Keywords" />
            <div className="admin-form-hint">Các từ khóa cách nhau bởi dấu phẩy. Google không còn dùng nhưng Bing vẫn đọc.</div>
          </div>

          <div className="settings-section-title settings-section-title-mt">Open Graph (Facebook / Zalo)</div>
          <div className="admin-form-hint settings-hint-mb">Hiển thị khi chia sẻ link trên Facebook, Zalo, Messenger, v.v.</div>
          <div className="admin-form-group">
            <label className="admin-form-label">OG Title</label>
            <input className="admin-form-input" value={data.ogTitle} onChange={set("ogTitle")} placeholder="Để trống → dùng Meta Title" title="OG Title" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">OG Description</label>
            <textarea className="admin-form-textarea" rows={2} value={data.ogDescription} onChange={set("ogDescription")} placeholder="Để trống → dùng Meta Description" title="OG Description" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">OG Image (1200×630 px)</label>
            <ImageUpload value={data.ogImage} onChange={(url) => setVal("ogImage", url)} label="Ảnh chia sẻ mạng xã hội" />
            <div className="admin-form-hint">Kích thước khuyến nghị 1200×630 px. Hiện trong preview khi chia sẻ.</div>
          </div>

          <div className="settings-section-title settings-section-title-mt">Twitter Card</div>
          <div className="admin-form-group">
            <label className="admin-form-label">Loại card</label>
            <select className="admin-form-select" value={data.twitterCard} onChange={set("twitterCard")} title="Twitter Card type">
              <option value="summary">summary</option>
              <option value="summary_large_image">summary_large_image</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Twitter Title</label>
            <input className="admin-form-input" value={data.twitterTitle} onChange={set("twitterTitle")} placeholder="Để trống → dùng OG Title" title="Twitter Title" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Twitter Description</label>
            <textarea className="admin-form-textarea" rows={2} value={data.twitterDescription} onChange={set("twitterDescription")} placeholder="Để trống → dùng OG Description" title="Twitter Description" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Twitter Image</label>
            <ImageUpload value={data.twitterImage} onChange={(url) => setVal("twitterImage", url)} label="Ảnh Twitter Card" />
          </div>

          <div className="settings-section-title settings-section-title-mt">Xác minh & Phân tích</div>
          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Google Site Verification</label>
              <input className="admin-form-input" value={data.googleVerification} onChange={set("googleVerification")} placeholder="google-site-verification=XXXXXX" title="Google Verification" />
              <div className="admin-form-hint">Lấy từ Google Search Console → Xác minh quyền sở hữu.</div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Bing Site Auth</label>
              <input className="admin-form-input" value={data.bingSiteAuth} onChange={set("bingSiteAuth")} placeholder="XXXXXXXXXXXXXXXXX" title="Bing Auth" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Google Analytics ID</label>
              <input className="admin-form-input" value={data.googleAnalytics} onChange={set("googleAnalytics")} placeholder="G-XXXXXXXXXX" title="GA4 ID" />
              <div className="admin-form-hint">Định dạng G-XXXXXXXXXX (GA4) hoặc UA-XXXXXXXX-X (Universal).</div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Facebook Pixel ID</label>
              <input className="admin-form-input" value={data.facebookPixel} onChange={set("facebookPixel")} placeholder="1234567890123456" title="Facebook Pixel ID" />
            </div>
          </div>
        </div>
      )}

      {/* ===== APPEARANCE ===== */}
      {activeTab === "appearance" && (
        <div className="settings-panel">
          <div className="settings-section-title">Logo & Favicon</div>
          <div className="admin-form-group">
            <label className="admin-form-label">Logo</label>
            <ImageUpload value={data.logoUrl} onChange={(url) => setVal("logoUrl", url)} label="Logo website" />
            <div className="admin-form-hint">Hiển thị trên header. SVG hoặc PNG nền trong suốt.</div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Favicon</label>
            <ImageUpload value={data.faviconUrl} onChange={(url) => setVal("faviconUrl", url)} label="Favicon (32×32 px)" />
            <div className="admin-form-hint">Biểu tượng tab trình duyệt. Kích thước 32×32 hoặc 64×64 px (.ico hoặc .png).</div>
          </div>

          <div className="settings-section-title settings-section-title-mt">Footer</div>
          <div className="admin-form-group">
            <label className="admin-form-label">Văn bản footer</label>
            <input className="admin-form-input" value={data.footerText} onChange={set("footerText")} placeholder="© 2025 Hiệp POS. Tất cả quyền được bảo lưu." title="Footer text" />
          </div>
        </div>
      )}

      {/* Save bar */}
      <div className="settings-save-bar">
        {saved && <span className="settings-save-success">✅ Đã lưu thành công!</span>}
        <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
          {saving ? "Đang lưu..." : "💾 Lưu cài đặt"}
        </button>
      </div>

    </form>
  );
}
