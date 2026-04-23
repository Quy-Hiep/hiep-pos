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

export interface ArticleFormData {
  id: string;
  title: string;
  slug: string;
  type: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  readingTime: string;
  isPublished: boolean;
}

export default function EditArticleForm({ article }: { article: ArticleFormData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ArticleFormData>(article);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Lỗi khi cập nhật bài viết");
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
      <AdminHeader title="Chỉnh sửa bài viết" />
      <div className="admin-form-page">
        <Link href="/admin/articles" className="admin-back-link">← Quay lại danh sách</Link>

        {success && <div className="admin-alert admin-alert-success">Cập nhật thành công! Đang chuyển hướng...</div>}
        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-card">
            <div className="admin-form-title">Chỉnh sửa bài viết</div>
            <div className="admin-form-grid">
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Tiêu đề *</label>
                <input name="title" type="text" className="admin-form-input" value={form.title} onChange={handleChange} required title="Tiêu đề" placeholder="VD: Hướng dẫn cài đặt máy in" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Slug</label>
                <input name="slug" type="text" className="admin-form-input" value={form.slug} onChange={handleChange} title="Slug" placeholder="huong-dan-cai-dat-may-in" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Loại bài viết</label>
                <select name="type" className="admin-form-select" value={form.type} onChange={handleChange} title="Loại bài viết" aria-label="Loại bài viết">
                  {articleTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Thời gian đọc (phút)</label>
                <input name="readingTime" type="number" className="admin-form-input" value={form.readingTime} onChange={handleChange} min="1" title="Thời gian đọc" placeholder="VD: 5" />
              </div>
              <div className="admin-form-group admin-form-full">
                <ImageUpload
                  label="Ảnh đại diện"
                  value={form.featuredImage}
                  onChange={(url) => setForm((prev) => ({ ...prev, featuredImage: url }))}
                />
              </div>
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Mô tả ngắn</label>
                <textarea name="excerpt" className="admin-form-textarea" value={form.excerpt} onChange={handleChange} title="Mô tả ngắn" placeholder="Tóm tắt ngắn hiển thị trên trang danh sách..." />
              </div>
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Nội dung</label>
                <RichTextEditor
                  value={form.content}
                  onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                  placeholder="Nhập nội dung chi tiết bài viết..."
                />
              </div>
              <div className="admin-form-group admin-form-full">
                <div className="admin-form-checks">
                  <label className="admin-form-check">
                    <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
                    Đã xuất bản
                  </label>
                </div>
              </div>
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-save" disabled={saving}>
                {saving ? "Đang lưu..." : "Cập nhật"}
              </button>
              <Link href="/admin/articles" className="admin-btn-cancel">Hủy</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
