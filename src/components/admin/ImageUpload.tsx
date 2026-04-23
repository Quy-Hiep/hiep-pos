"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Ảnh" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload thất bại");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="img-upload-wrapper">
      <label className="admin-form-label">{label}</label>

      {value && (
        <div className="img-upload-preview">
          <Image
            src={value}
            alt="preview"
            fill
            sizes="200px"
            className="img-upload-img"
          />
          <button
            type="button"
            className="img-upload-remove"
            onClick={() => onChange("")}
            title="Xóa ảnh"
          >
            ✕
          </button>
        </div>
      )}

      <div className="img-upload-actions">
        <button
          type="button"
          className="img-upload-btn"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Đang tải lên..." : value ? "Đổi ảnh" : "Chọn ảnh"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="img-upload-input"
          aria-label="Chọn file ảnh"
          title="Chọn file ảnh"
          onChange={handleFile}
        />
        <input
          type="text"
          className="admin-form-input img-upload-url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Hoặc nhập URL ảnh..."
        />
      </div>

      {error && <p className="img-upload-error">{error}</p>}
    </div>
  );
}
