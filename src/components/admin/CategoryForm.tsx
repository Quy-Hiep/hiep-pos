"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUpload from "@/components/admin/ImageUpload";

const CATEGORY_TYPES = [
  { value: "PRODUCT", label: "Sản phẩm" },
  { value: "ARTICLE", label: "Tin tức" },
  { value: "DRIVER", label: "Driver" },
  { value: "PAGE", label: "Trang" },
];

export interface CategoryFormData {
  id?: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  image: string;
  parentId: string;
  showInMenu: boolean;
  menuOrder: string;
  isActive: boolean;
}

interface ParentOption { id: string; name: string; type: string; }

interface Props {
  initialData: CategoryFormData;
  parentOptions: ParentOption[];
  mode: "new" | "edit";
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

export default function CategoryForm({ initialData, parentOptions, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<CategoryFormData>(initialData);

  const filteredParents = parentOptions.filter(
    (p) => p.type === form.type && p.id !== form.id
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      // Reset parentId if type changes
      ...(name === "type" ? { parentId: "" } : {}),
    }));
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
      const url = mode === "edit" ? `/api/admin/categories/${form.id}` : "/api/admin/categories";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Lỗi khi lưu thể loại");
      }

      setSuccess(true);
      setTimeout(() => { router.refresh(); router.push("/admin/categories"); }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader title={mode === "edit" ? "Chỉnh sửa thể loại" : "Thêm thể loại"} />
      <div className="admin-form-page">
        <Link href="/admin/categories" className="admin-back-link">← Quay lại danh sách</Link>

        {success && <div className="admin-alert admin-alert-success">Lưu thành công! Đang chuyển hướng...</div>}
        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-card">
            <div className="admin-form-title">{mode === "edit" ? "Chỉnh sửa thể loại" : "Thông tin thể loại"}</div>
            <div className="admin-form-grid">

              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Tên thể loại *</label>
                <input
                  name="name"
                  type="text"
                  className="admin-form-input"
                  value={form.name}
                  onChange={handleNameChange}
                  required
                  placeholder="VD: Máy in hóa đơn"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Slug (URL)</label>
                <input
                  name="slug"
                  type="text"
                  className="admin-form-input"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="may-in-hoa-don"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Loại *</label>
                <select name="type" className="admin-form-select" value={form.type} onChange={handleChange} title="Loại thể loại">
                  {CATEGORY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Thể loại cha</label>
                <select name="parentId" className="admin-form-select" value={form.parentId} onChange={handleChange} title="Thể loại cha">
                  <option value="">— Không có —</option>
                  {filteredParents.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Thứ tự menu</label>
                <input
                  name="menuOrder"
                  type="number"
                  className="admin-form-input"
                  value={form.menuOrder}
                  onChange={handleChange}
                  min={0}
                  placeholder="0"
                />
              </div>

              <div className="admin-form-group admin-form-full">
                <label className="admin-form-label">Mô tả</label>
                <textarea
                  name="description"
                  className="admin-form-textarea"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Mô tả ngắn về thể loại..."
                  rows={3}
                />
              </div>

              <div className="admin-form-group admin-form-full">
                <ImageUpload
                  label="Ảnh đại diện"
                  value={form.image}
                  onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
                />
              </div>

              <div className="admin-form-group admin-form-full">
                <div className="admin-form-checks">
                  <label className="admin-form-check">
                    <input type="checkbox" name="showInMenu" checked={form.showInMenu} onChange={handleChange} />
                    Hiển thị trong menu điều hướng
                  </label>
                  <label className="admin-form-check">
                    <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                    Kích hoạt thể loại
                  </label>
                </div>
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-save" disabled={saving}>
                {saving ? "Đang lưu..." : mode === "edit" ? "Cập nhật" : "Lưu thể loại"}
              </button>
              <Link href="/admin/categories" className="admin-btn-cancel">Hủy</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
