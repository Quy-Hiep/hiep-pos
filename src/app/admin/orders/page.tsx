import AdminHeader from "@/components/admin/AdminHeader";

const orders = [
  { id: "ORD001", customer: "Nguyễn Văn A", phone: "0901234567", items: "Máy POS x1", total: "Liên hệ", status: "PENDING", date: "2025-01-15" },
  { id: "ORD002", customer: "Trần Thị B", phone: "0912345678", items: "Máy in KV804 x2", total: "2.400.000đ", status: "PROCESSING", date: "2025-01-14" },
];

const statusLabels: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Chờ xử lý", cls: "admin-badge-pending" },
  PROCESSING: { label: "Đang xử lý", cls: "admin-badge-pending" },
  COMPLETED: { label: "Hoàn thành", cls: "admin-badge-published" },
  CANCELLED: { label: "Đã hủy", cls: "admin-badge-cancelled" },
};

export default function AdminOrdersPage() {
  return (
    <>
      <AdminHeader title="Quản lý đơn hàng" />
      <div className="admin-content">
        <div className="admin-table-card">
          <div className="admin-table-header">
            <span className="admin-table-title">Danh sách đơn hàng ({orders.length})</span>
            <input type="text" className="admin-table-search" placeholder="Tìm kiếm đơn hàng..." readOnly />
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>SĐT</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const s = statusLabels[o.status] ?? { label: o.status, cls: "" };
                  return (
                    <tr key={o.id}>
                      <td className="admin-td-id">{o.id}</td>
                      <td className="admin-td-bold">{o.customer}</td>
                      <td>{o.phone}</td>
                      <td>{o.items}</td>
                      <td>{o.total}</td>
                      <td className="admin-td-date">{o.date}</td>
                      <td>
                        <span className={`admin-badge ${s.cls}`}>{s.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
