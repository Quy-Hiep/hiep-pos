import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Hiệp POS - Giải pháp bán hàng chuyên nghiệp",
  description:
    "Cung cấp máy POS, máy in hóa đơn, máy quét mã vạch và vật tư chính hãng. Hỗ trợ tư vấn, lắp đặt toàn quốc.",
  openGraph: {
    title: "Hiệp POS - Giải pháp bán hàng chuyên nghiệp",
    description:
      "Cung cấp máy POS, máy in hóa đơn, máy quét mã vạch và vật tư chính hãng.",
    type: "website",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
