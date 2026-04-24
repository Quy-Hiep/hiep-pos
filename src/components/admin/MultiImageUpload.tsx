"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export interface ImageItem {
  url: string;
  alt?: string;
  sortOrder: number;
}

interface Props {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  label?: string;
}

export default function MultiImageUpload({ images, onChange, label = "Ảnh sản phẩm" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    setError("");

    try {
      const uploaded: ImageItem[] = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload thất bại");
        uploaded.push({
          url: data.url,
          alt: "",
          sortOrder: images.length + uploaded.length,
        });
      }
      onChange([...images, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(index: number) {
    const next = images.filter((_, i) => i !== index).map((img, i) => ({ ...img, sortOrder: i }));
    onChange(next);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const next = [...images];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next.map((img, i) => ({ ...img, sortOrder: i })));
  }

  function moveDown(index: number) {
    if (index === images.length - 1) return;
    const next = [...images];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next.map((img, i) => ({ ...img, sortOrder: i })));
  }

  function updateAlt(index: number, alt: string) {
    const next = [...images];
    next[index] = { ...next[index], alt };
    onChange(next);
  }

  return (
    <div className="multi-img-upload">
      <label className="admin-form-label">{label}</label>

      {images.length > 0 && (
        <div className="multi-img-grid">
          {images.map((img, i) => (
            <div key={img.url + i} className="multi-img-item">
              {i === 0 && <span className="multi-img-badge">Ảnh chính</span>}
              <div className="multi-img-preview">
                <Image src={img.url} alt={img.alt || "product"} fill sizes="160px" className="multi-img-img" />
              </div>
              <input
                type="text"
                className="multi-img-alt"
                value={img.alt ?? ""}
                onChange={(e) => updateAlt(i, e.target.value)}
                placeholder="Mô tả ảnh (alt)"
                title="Alt text"
              />
              <div className="multi-img-actions">
                <button type="button" onClick={() => moveUp(i)} disabled={i === 0} title="Lên trên">↑</button>
                <button type="button" onClick={() => moveDown(i)} disabled={i === images.length - 1} title="Xuống dưới">↓</button>
                <button type="button" onClick={() => remove(i)} className="multi-img-remove" title="Xóa">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="multi-img-upload-btn-wrap">
        <button
          type="button"
          className="multi-img-add-btn"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Đang tải lên..." : "+ Thêm ảnh"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
          title="Chọn ảnh"
        />
        {error && <p className="multi-img-error">{error}</p>}
        <p className="multi-img-hint">Ảnh đầu tiên sẽ là ảnh chính. Có thể chọn nhiều ảnh cùng lúc.</p>
      </div>
    </div>
  );
}
