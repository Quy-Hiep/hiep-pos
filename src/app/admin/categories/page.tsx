import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteCategoryBtn from "@/components/admin/DeleteCategoryBtn";

export const dynamic = "force-dynamic";

const typeLabel: Record<string, string> = {
  PRODUCT: "Sản phẩm",
  ARTICLE: "Tin tức",
  DRIVER: "Driver",
  PAGE: "Trang",
};

const typeBadge: Record<string, string> = {
  PRODUCT: "badge-blue",
  ARTICLE: "badge-green",
  DRIVER: "badge-purple",
  PAGE: "badge-gray",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ type: "asc" }, { menuOrder: "asc" }, { name: "asc" }],
    include: {
      parent: { select: { name: true } },
      _count: { select: { products: true, articles: true, drivers: true } },
    },
  });

  return (
    <>
      <AdminHeader title="Thể loại" />
      <div className="admin-content">
        <div className="admin-toolbar">
          <div className="admin-toolbar-left">
            <span className="admin-count">{categories.length} thể loại</span>
          </div>
          <Link href="/admin/categories/new" className="admin-btn-primary">
            + Thêm thể loại
          </Link>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tên thể loại</th>
                <th>Loại</th>
                <th>Cha</th>
                <th>Slug</th>
                <th>Menu</th>
                <th>Số mục</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={8} className="admin-table-empty">Chưa có thể loại nào</td>
                </tr>
              ) : (
                categories.map((cat) => {
                  const count = cat._count.products + cat._count.articles + cat._count.drivers;
                  return (
                    <tr key={cat.id}>
                      <td className="font-medium">{cat.name}</td>
                      <td>
                        <span className={`admin-badge ${typeBadge[cat.type] ?? "badge-gray"}`}>
                          {typeLabel[cat.type] ?? cat.type}
                        </span>
                      </td>
                      <td className="text-sm text-gray-500">{cat.parent?.name ?? "—"}</td>
                      <td className="text-sm text-gray-400 font-mono">{cat.slug}</td>
                      <td>
                        {cat.showInMenu ? (
                          <span className="admin-badge badge-green">Hiện · {cat.menuOrder}</span>
                        ) : (
                          <span className="admin-badge badge-gray">Ẩn</span>
                        )}
                      </td>
                      <td className="text-center">{count}</td>
                      <td>
                        <span className={`admin-badge ${cat.isActive ? "badge-green" : "badge-gray"}`}>
                          {cat.isActive ? "Hoạt động" : "Ẩn"}
                        </span>
                      </td>
                      <td>
                        <div className="admin-table-actions">
                          <Link href={`/admin/categories/${cat.id}/edit`} className="admin-btn-edit">Sửa</Link>
                          <DeleteCategoryBtn id={cat.id} name={cat.name} count={count} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

