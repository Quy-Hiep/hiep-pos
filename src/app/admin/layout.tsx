import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminSessionProvider from "@/components/admin/AdminSessionProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionProvider>
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          {children}
        </div>
      </div>
    </AdminSessionProvider>
  );
}
