import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function AdminDriversPage() {
  const drivers = await prisma.driver.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <AdminHeader title="Quản lý Driver" />
      <div className="admin-content">
        <div className="admin-table-card">
          <div className="admin-table-header">
            <span className="admin-table-title">Danh sách driver ({drivers.length})</span>
            <div className="admin-table-header-actions">
              <Link href="/admin/drivers/new" className="admin-btn-add">+ Thêm driver</Link>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên driver</th>
                  <th>Model máy</th>
                  <th>Loại máy</th>
                  <th>Phiên bản</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d: (typeof drivers)[0], i: number) => (
                  <tr key={d.id}>
                    <td className="admin-td-muted">{i + 1}</td>
                    <td className="admin-td-bold">{d.name}</td>
                    <td className="admin-td-muted">{d.model ?? "—"}</td>
                    <td>{d.printerType ?? "—"}</td>
                    <td>{d.version ?? "—"}</td>
                    <td>
                      <span className={`admin-badge ${d.isActive ? "admin-badge-published" : "admin-badge-draft"}`}>
                        {d.isActive ? "Hiện" : "Ẩn"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-action-btns">
                        <Link href={`/admin/drivers/${d.id}/edit`} className="admin-btn-edit">Sửa</Link>
                        <DeleteDriverBtn id={d.id} />
                      </div>
                    </td>
                  </tr>
                ))}
                {drivers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="admin-td-empty">Chưa có driver nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function DeleteDriverBtn({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await prisma.driver.delete({ where: { id } });
        revalidatePath("/admin/drivers");
      }}
    >
      <button type="submit" className="admin-btn-delete">Xóa</button>
    </form>
  );
}
