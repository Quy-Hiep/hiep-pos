import AdminHeader from "@/components/admin/AdminHeader";
import SettingsForm from "@/components/admin/SettingsForm";

export default function AdminSettingsPage() {
  return (
    <>
      <AdminHeader title="Cài đặt" />
      <div className="admin-content">
        <SettingsForm />
      </div>
    </>
  );
}
