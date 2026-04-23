import AdminHeader from "@/components/admin/AdminHeader";
import AboutPageForm from "@/components/admin/AboutPageForm";

export const metadata = {
  title: "Nội dung Trang giới thiệu – Admin",
};

export default function AdminAboutPageContent() {
  return (
    <>
      <AdminHeader title="Nội dung Trang giới thiệu" />
      <div className="admin-content">
        <AboutPageForm />
      </div>
    </>
  );
}
