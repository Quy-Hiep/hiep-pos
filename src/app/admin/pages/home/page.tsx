import AdminHeader from "@/components/admin/AdminHeader";
import HomePageForm from "@/components/admin/HomePageForm";

export const metadata = {
  title: "Nội dung Trang chủ – Admin",
};

export default function AdminHomePageContent() {
  return (
    <>
      <AdminHeader title="Nội dung Trang chủ" />
      <div className="admin-content">
        <HomePageForm />
      </div>
    </>
  );
}
