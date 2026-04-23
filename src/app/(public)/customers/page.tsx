import type { Metadata } from "next";
import CustomersPageClient from "@/components/public/CustomersPageClient";

export const metadata: Metadata = {
  title: "Khách Hàng - Hiệp POS",
  description:
    "Hình ảnh thực tế các buổi tư vấn, lắp đặt thiết bị bán hàng cho cửa hàng, nhà hàng, quán cà phê trên toàn quốc. 500+ khách hàng tin dùng Hiệp POS.",
  openGraph: {
    title: "Khách Hàng - Hiệp POS",
    description: "500+ khách hàng đã tin dùng Hiệp POS trên toàn quốc.",
    type: "website",
  },
};

export default function CustomersPage() {
  return <CustomersPageClient />;
}
