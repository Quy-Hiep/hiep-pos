import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProgressBar from "@/components/ui/ProgressBar";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hiệp POS - Giải pháp bán hàng chuyên nghiệp",
  description: "Cung cấp máy POS, máy in hóa đơn, máy quét mã vạch và vật tư chính hãng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.className}>
      <body className="min-h-screen flex flex-col">
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
