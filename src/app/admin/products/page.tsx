import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

function formatPrice(price: unknown): string {
  const num = Number(price);
  if (!num) return "Liên hệ";
  return num.toLocaleString("vi-VN") + "đ";
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  return (
    <>
      <AdminHeader title="Quản lý sản phẩm" />
      <div className="admin-content">
        <div className="admin-table-card">
          <div className="admin-table-header">
            <span className="admin-table-title">Danh sách sản phẩm ({products.length})</span>
            <div className="admin-table-header-actions">
              <input
                type="text"
                className="admin-table-search"
                placeholder="Tìm kiếm sản phẩm..."
                readOnly
              />
              <Link href="/admin/products/new" className="admin-btn-add">
                + Thêm sản phẩm
              </Link>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Giá</th>
                  <th>Thứ tự</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p: (typeof products)[0], i: number) => (
                  <tr key={p.id}>
                    <td className="admin-td-muted">{i + 1}</td>
                    <td className="admin-td-bold">{p.name}</td>
                    <td>{p.category?.name ?? "—"}</td>
                    <td>{formatPrice(p.price)}</td>
                    <td className="admin-td-muted">{p.sortOrder ?? 0}</td>
                    <td>
                      <span className={`admin-badge ${p.isActive ? "admin-badge-active" : "admin-badge-inactive"}`}>
                        {p.isActive ? "Hoạt động" : "Ẩn"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-action-btns">
                        <Link href={`/admin/products/${p.id}/edit`} className="admin-btn-edit">
                          Sửa
                        </Link>
                        <DeleteProductBtn id={p.id} />
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

function DeleteProductBtn({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await prisma.product.delete({ where: { id } });
        revalidatePath("/admin/products");
      }}
    >
      <button type="submit" className="admin-btn-delete">Xóa</button>
    </form>
  );
}
