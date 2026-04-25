import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = {
  NEWS: "Tin tức",
  GUIDE: "Hướng dẫn",
  SECURITY: "Bảo mật",
  TIPS: "Mẹo hay",
  CUSTOMER_STORY: "Khách hàng",
};

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <AdminHeader title="Quản lý tin tức" />
      <div className="admin-content">
        <div className="admin-table-card">
          <div className="admin-table-header">
            <span className="admin-table-title">Danh sách bài viết ({articles.length})</span>
            <div className="admin-table-header-actions">
              <input type="text" className="admin-table-search" placeholder="Tìm kiếm bài viết..." readOnly />
              <Link href="/admin/articles/new" className="admin-btn-add">+ Viết bài mới</Link>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tiêu đề</th>
                  <th>Loại</th>
                  <th>Ngày đăng</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a: (typeof articles)[0], i: number) => (
                  <tr key={a.id}>
                    <td className="admin-td-muted">{i + 1}</td>
                    <td className="admin-td-bold-max">{a.title}</td>
                    <td>{typeLabels[a.type] ?? a.type}</td>
                    <td className="admin-td-date">
                      {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString("vi-VN") : "—"}
                    </td>
                    <td>
                      <span className={`admin-badge ${a.isPublished ? "admin-badge-published" : "admin-badge-draft"}`}>
                        {a.isPublished ? "Đã đăng" : "Nháp"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-action-btns">
                        <Link href={`/admin/articles/${a.id}/edit`} className="admin-btn-edit">Sửa</Link>
                        <DeleteArticleBtn id={a.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function DeleteArticleBtn({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await prisma.article.delete({ where: { id } });
        revalidatePath("/admin/articles");
      }}
    >
      <button type="submit" className="admin-btn-delete">Xóa</button>
    </form>
  );
}
