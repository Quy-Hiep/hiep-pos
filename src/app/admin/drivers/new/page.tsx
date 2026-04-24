"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";

const printerTypes = [
  { value: "thermal", label: "Máy in nhiệt" },
  { value: "laser", label: "Máy in laser" },
  { value: "inkjet", label: "Máy in phun" },
  { value: "label", label: "Máy in tem nhãn" },
];

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function NewDriverPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    model: "",
    printerType: "thermal",
    version: "",
    description: "",
    downloadWindows: "",
    downloadMacos: "",
    isActive: true,
    sortOrder: 0,
  });

  function set(field: string, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const files: Record<string, string> = {};
    if (form.downloadWindows) files.windows = form.downloadWindows;
    if (form.downloadMacos) files.macos = form.downloadMacos;

    const res = await fetch("/api/admin/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        slug: form.slug || slugify(form.name),
        model: form.model,
        printerType: form.printerType,
        version: form.version,
        description: form.description,
        files: Object.keys(files).length ? files : null,
        isActive: form.isActive,
        sortOrder: Number(form.sortOrder),
      }),
    });

    setSaving(false);
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Có lỗi xảy ra.");
      return;
    }
    router.push("/admin/drivers");
  }

  return (
    <>
      <AdminHeader title="Thêm driver mới" />
      <div className="admin-content">
        <form onSubmit={handleSubmit} className="admin-form-card">
          {error && <div className="admin-form-error">{error}</div>}

          <div className="admin-form-group">
            <label className="admin-form-label">Tên driver *</label>
            <input
              className="admin-form-input"
              value={form.name}
              onChange={(e) => {
                set("name", e.target.value);
                set("slug", slugify(e.target.value));
              }}
              required
              placeholder="VD: BP-T3, Canon LBP6000..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Slug *</label>
            <input
              className="admin-form-input"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              required
              title="Slug"
              placeholder="vd: bp-t3"
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Model máy</label>
              <input
                className="admin-form-input"
                value={form.model}
                onChange={(e) => set("model", e.target.value)}
                placeholder="VD: KV804, LBP6000..."
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Loại máy in</label>
              <select
                className="admin-form-input"
                value={form.printerType}
                onChange={(e) => set("printerType", e.target.value)}
                title="Loại máy in"
              >
                {printerTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Phiên bản</label>
              <input
                className="admin-form-input"
                value={form.version}
                onChange={(e) => set("version", e.target.value)}
                placeholder="VD: v7.11"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Thứ tự</label>
              <input
                className="admin-form-input"
                type="number"
                value={form.sortOrder}
                onChange={(e) => set("sortOrder", Number(e.target.value))}
                title="Thứ tự hiển thị"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Mô tả</label>
            <textarea
              className="admin-form-textarea"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Mô tả ngắn về driver..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Link tải Windows</label>
            <input
              className="admin-form-input"
              value={form.downloadWindows}
              onChange={(e) => set("downloadWindows", e.target.value)}
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Link tải macOS</label>
            <input
              className="admin-form-input"
              value={form.downloadMacos}
              onChange={(e) => set("downloadMacos", e.target.value)}
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-checkbox">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => set("isActive", e.target.checked)}
              />
              Hiển thị trên trang web
            </label>
          </div>

          <div className="admin-form-actions">
            <Link href="/admin/drivers" className="admin-btn-cancel">Hủy</Link>
            <button type="submit" className="admin-btn-save" disabled={saving}>
              {saving ? "Đang lưu..." : "Lưu driver"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
