"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";

const articleTypes = [
  { value: "NEWS", label: "Tin tức" },
  { value: "GUIDE", label: "Hướng dẫn" },
  { value: "TIPS", label: "Mẹo hay" },
  { value: "SECURITY", label: "Bảo mật" },
  { value: "CUSTOMER_STORY", label: "Câu chuyện khách hàng" },
];

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    type: "NEWS",
    excerpt: "",
    content: "",
    featuredImage: "",
    readingTime: "",
    isPublished: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function toSlug(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((prev) => ({ ...prev, title, slug: toSlug(title) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Lỗi khi tạo bài viết");
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin/articles"), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader title="Viết bài mới" />
      <div className="admin-form-page">
        <Link href="/admin/articles" className="admin-back-link">← Quay lại danh sách</Link>

        {success && <div className="admin-alert admin-alert-success">Tạo bài viết thành công! Đang chuyển hướng...</div>}
        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-card">
            <div className="admin-form-title">Nội dung bài viết</div>
            <div className="admin-form-grid">
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Tiêu đề *</label>
                <input name="title" type="text" className="admin-form-input" value={form.title} onChange={handleTitleChange} required placeholder="VD: Hướng dẫn cài đặt máy in hóa đơn nhiệt" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Slug (URL)</label>
                <input name="slug" type="text" className="admin-form-input" value={form.slug} onChange={handleChange} title="Slug (URL)" placeholder="huong-dan-cai-dat-may-in" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Loại bài viết</label>
                <select name="type" className="admin-form-select" value={form.type} onChange={handleChange} title="Loại bài viết" aria-label="Loại bài viết">
                  {articleTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Thời gian đọc (phút)</label>
                <input name="readingTime" type="number" className="admin-form-input" value={form.readingTime} onChange={handleChange} placeholder="VD: 5" min="1" />
              </div>
              <div className="admin-form-group admin-form-full">
                <ImageUpload
                  label="Ảnh đại diện"
                  value={form.featuredImage}
                  onChange={(url) => setForm((prev) => ({ ...prev, featuredImage: url }))}
                />
              </div>
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Mô tả ngắn (excerpt)</label>
                <textarea name="excerpt" className="admin-form-textarea" value={form.excerpt} onChange={handleChange} placeholder="Tóm tắt ngắn hiển thị trên trang danh sách tin tức..." />
              </div>
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Nội dung bài viết</label>
                <RichTextEditor
                  value={form.content}
                  onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                  placeholder="Nhập nội dung chi tiết bài viết..."
                />
              </div>
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Xuất bản</label>
                <div className="admin-form-checks">
                  <label className="admin-form-check">
                    <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
                    Đăng ngay
                  </label>
                </div>
              </div>
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-save" disabled={saving}>
                {saving ? "Đang lưu..." : "Lưu bài viết"}
              </button>
              <Link href="/admin/articles" className="admin-btn-cancel">Hủy</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
