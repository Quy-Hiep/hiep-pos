"use client";

import { useRouter } from "next/navigation";

export default function DeleteCategoryBtn({ id, name, count }: { id: string; name: string; count: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Xóa thể loại "${name}"?`)) return;

    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Lỗi khi xóa thể loại");
    }
  }

  return (
    <button
      type="button"
      className="admin-btn-delete"
      disabled={count > 0}
      title={count > 0 ? "Không thể xóa thể loại đang có mục" : `Xóa ${name}`}
      onClick={handleDelete}
    >
      Xóa
    </button>
  );
}
