"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import MultiImageUpload, { ImageItem } from "@/components/admin/MultiImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";

const categories = ["Máy POS", "Máy In", "Máy Quét", "Vật Tư", "Phụ Kiện"];

export interface CategoryOption { id: string; name: string; }

export interface ProductFormData {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  price: string;
  originalPrice: string;
  description: string;
  fullDescription: string;
  badge: string;
  warranty: string;
  sortOrder: string;
  images: ImageItem[];
  isFeatured: boolean;
  isActive: boolean;
}

export default function EditProductForm({ product, categoryOptions }: { product: ProductFormData; categoryOptions: CategoryOption[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProductFormData>(product);
  const [images, setImages] = useState<ImageItem[]>(product.images);

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
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, images }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Lỗi khi cập nhật sản phẩm");
      }

      setSuccess(true);
      setTimeout(() => {
        router.refresh();
        router.push("/admin/products");
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader title="Chỉnh sửa sản phẩm" />
      <div className="admin-form-page">
        <Link href="/admin/products" className="admin-back-link">← Quay lại danh sách</Link>

        {success && <div className="admin-alert admin-alert-success">Cập nhật thành công! Đang chuyển hướng...</div>}
        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-card">
            <div className="admin-form-title">Chỉnh sửa sản phẩm</div>
            <div className="admin-form-grid">
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Tên sản phẩm *</label>
                <input name="name" type="text" className="admin-form-input" value={form.name} onChange={handleChange} required title="Tên sản phẩm" placeholder="VD: Máy in hóa đơn KV804" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Slug (URL)</label>
                <input name="slug" type="text" className="admin-form-input" value={form.slug} onChange={handleChange} title="Slug" placeholder="may-in-hoa-don-kv804" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Danh mục</label>
                <select name="categoryId" className="admin-form-select" value={form.categoryId} onChange={handleChange} title="Danh mục" aria-label="Danh mục">
                  <option value="">— Chọn danh mục —</option>
                  {categoryOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Giá bán</label>
                <input name="price" type="text" className="admin-form-input" value={form.price} onChange={handleChange} title="Giá bán" placeholder="VD: 1200000" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Giá gốc</label>
                <input name="originalPrice" type="text" className="admin-form-input" value={form.originalPrice} onChange={handleChange} title="Giá gốc" placeholder="VD: 1500000" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Badge</label>
                <input name="badge" type="text" className="admin-form-input" value={form.badge} onChange={handleChange} title="Badge" placeholder="VD: Bán chạy" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Bảo hành</label>
                <input name="warranty" type="text" className="admin-form-input" value={form.warranty} onChange={handleChange} title="Bảo hành" placeholder="VD: 12 tháng" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Thứ tự hiển thị</label>
                <input name="sortOrder" type="number" className="admin-form-input" value={form.sortOrder} onChange={handleChange} title="Thứ tự" placeholder="VD: 0, 1, 2..." />
              </div>
              <div className="admin-form-group admin-form-full">
                <MultiImageUpload
                  label="Ảnh sản phẩm"
                  images={images}
                  onChange={setImages}
                />
              </div>
              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Mô tả ngắn</label>
                <textarea name="description" className="admin-form-textarea" value={form.description} onChange={handleChange} title="Mô tả ngắn" placeholder="Mô tả ngắn hiển thị trên trang danh sách..." />
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
                {saving ? "Đang lưu..." : "Cập nhật"}
              </button>
              <Link href="/admin/products" className="admin-btn-cancel">Hủy</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
