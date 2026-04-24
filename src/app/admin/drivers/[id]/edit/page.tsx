"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";

const printerTypes = [
  { value: "thermal", label: "Máy in nhiệt" },
  { value: "laser", label: "Máy in laser" },
  { value: "inkjet", label: "Máy in phun" },
  { value: "label", label: "Máy in tem nhãn" },
];

export default function EditDriverPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetch(`/api/admin/drivers/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        const files = (d.files as Record<string, string>) ?? {};
        setForm({
          name: d.name ?? "",
          slug: d.slug ?? "",
          model: d.model ?? "",
          printerType: d.printerType ?? "thermal",
          version: d.version ?? "",
          description: d.description ?? "",
          downloadWindows: files.windows ?? "",
          downloadMacos: files.macos ?? "",
          isActive: d.isActive ?? true,
          sortOrder: d.sortOrder ?? 0,
        });
        setLoading(false);
      })
      .catch((e) => {
        setError(`Không thể tải dữ liệu: ${e.message}`);
        setLoading(false);
      });
  }, [id]);

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

    const res = await fetch(`/api/admin/drivers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        slug: form.slug,
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

  if (loading) return <div className="admin-content"><p>Đang tải...</p></div>;

  return (
    <>
      <AdminHeader title="Chỉnh sửa driver" />
      <div className="admin-content">
        <form onSubmit={handleSubmit} className="admin-form-card">
          {error && <div className="admin-form-error">{error}</div>}

          <div className="admin-form-group">
            <label className="admin-form-label">Tên driver *</label>
            <input
              className="admin-form-input"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              title="Tên driver"
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
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Model máy</label>
              <input
                className="admin-form-input"
                value={form.model}
                onChange={(e) => set("model", e.target.value)}
                title="Model máy"
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
                title="Phiên bản"
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
              title="Mô tả"
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
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
