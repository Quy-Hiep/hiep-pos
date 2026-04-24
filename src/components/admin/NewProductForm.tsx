"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import MultiImageUpload, { ImageItem } from "@/components/admin/MultiImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";

export interface CategoryOption { id: string; name: string; }

export default function NewProductForm({ categoryOptions }: { categoryOptions: CategoryOption[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    categoryId: "",
    price: "",
    originalPrice: "",
    description: "",
    fullDescription: "",
    badge: "",
    warranty: "",
    isFeatured: false,
    isActive: true,
  });
  const [images, setImages] = useState<ImageItem[]>([]);

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

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setForm((prev) => ({ ...prev, name, slug: toSlug(name) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, images }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Lỗi khi tạo sản phẩm");
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin/products"), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader title="Thêm sản phẩm" />
      <div className="admin-form-page">
        <Link href="/admin/products" className="admin-back-link">← Quay lại danh sách</Link>

        {success && <div className="admin-alert admin-alert-success">Tạo sản phẩm thành công! Đang chuyển hướng...</div>}
        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-card">
            <div className="admin-form-title">Thông tin sản phẩm</div>
            <div className="admin-form-grid">
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Tên sản phẩm *</label>
                <input name="name" type="text" className="admin-form-input" value={form.name} onChange={handleNameChange} required placeholder="VD: Máy in hóa đơn KV804" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Slug (URL)</label>
                <input name="slug" type="text" className="admin-form-input" value={form.slug} onChange={handleChange} placeholder="may-in-hoa-don-kv804" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Danh mục</label>
                <select name="categoryId" className="admin-form-select" value={form.categoryId} onChange={handleChange} title="Danh mục sản phẩm" aria-label="Danh mục sản phẩm">
                  <option value="">— Chọn danh mục —</option>
                  {categoryOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Giá bán</label>
                <input name="price" type="text" className="admin-form-input" value={form.price} onChange={handleChange} placeholder="VD: 1200000 hoặc Liên hệ" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Giá gốc</label>
                <input name="originalPrice" type="text" className="admin-form-input" value={form.originalPrice} onChange={handleChange} placeholder="VD: 1500000" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Badge</label>
                <input name="badge" type="text" className="admin-form-input" value={form.badge} onChange={handleChange} placeholder="VD: Bán chạy, Mới" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Bảo hành</label>
                <input name="warranty" type="text" className="admin-form-input" value={form.warranty} onChange={handleChange} placeholder="VD: 12 tháng" />
              </div>
              <div className="admin-form-group admin-form-full">
                <MultiImageUpload label="Ảnh sản phẩm" images={images} onChange={setImages} />
              </div>
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Mô tả ngắn</label>
                <textarea name="description" className="admin-form-textarea" value={form.description} onChange={handleChange} placeholder="Mô tả ngắn hiển thị trên trang danh sách..." />
              </div>
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Mô tả đầy đủ</label>
                <RichTextEditor
                  value={form.fullDescription}
                  onChange={(html) => setForm((prev) => ({ ...prev, fullDescription: html }))}
                  placeholder="Nội dung chi tiết sản phẩm..."
                />
              </div>
              <div className="admin-form-group admin-form-full">
                <div className="admin-form-checks">
                  <label className="admin-form-check">
                    <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
                    Sản phẩm nổi bật
                  </label>
                  <label className="admin-form-check">
                    <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                    Hiển thị trên website
                  </label>
                </div>
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-save" disabled={saving}>
                {saving ? "Đang lưu..." : "Lưu sản phẩm"}
              </button>
              <Link href="/admin/products" className="admin-btn-cancel">Hủy</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
