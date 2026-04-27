"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/public/ProductCard";
import FloatingButtons from "@/components/public/FloatingButtons";

export type ProductItem = {
  slug: string;
  category: string;
  categoryLabel: string;
  name: string;
  image: string;
  badge: string;
  badgeType: string;
  desc: string;
  price: string;
  oldPrice: string;
  priceUnit: string;
  features: string[];
};

export type FilterItem = { key: string; label: string };

// placeholder — replaced by DB data passed via props
const _unused = [
  {
    slug: "may-pos-ban-hang-tinh-tien",
    category: "pos",
    categoryLabel: "Máy POS",
    name: "Máy POS Bán Hàng Tính Tiền",
    image: "/images/products/may-in-804.png",
    badge: "Mới",
    badgeType: "",
    desc: "Máy POS chuyên dụng với màn hình cảm ứng, tính tiền nhanh, thanh toán đa phương thức, kết nối mạng.",
    price: "Liên hệ",
    oldPrice: "",
    priceUnit: "",
    features: ["Màn hình cảm ứng 7-10 inch", "Thanh toán đa phương thức", "Báo cáo doanh số chi tiết"],
  },
  {
    slug: "may-in-hoa-don-kv804",
    category: "printer",
    categoryLabel: "Máy In",
    name: "Máy in hóa đơn KV804",
    image: "/images/products/may-in-804.png",
    badge: "Bán chạy",
    badgeType: "badge-hot",
    desc: "Phương pháp in nhiệt trực tiếp trên cỡ giấy 80mm. Kết nối với két đựng tiền. Cảm biến thông báo hết giấy, gần hết giấy, nắp đang mở.",
    price: "1.400.000₫",
    oldPrice: "1.600.000₫",
    priceUnit: "",
    features: ["Tự động cắt giấy", "Kết nối USB/LAN", "Tốc độ in 260mm/s"],
  },
  {
    slug: "may-in-ma-vach-365b",
    category: "printer",
    categoryLabel: "Máy In",
    name: "Máy in mã vạch 365B",
    image: "/images/products/may-in-365b.png",
    badge: "",
    badgeType: "",
    desc: "Máy in tem nhãn - mã vạch chuyên dụng, in sắc nét, hỗ trợ nhiều khổ giấy, in nhiệt trực tiếp không cần mực.",
    price: "1.400.000₫",
    oldPrice: "",
    priceUnit: "",
    features: ["In nhiệt không cần mực", "Kết nối USB + LAN", "Đa dạng khổ in"],
  },
  {
    slug: "may-quet-ma-vach-xl-6500a",
    category: "scanner",
    categoryLabel: "Máy Quét",
    name: "Máy quét mã vạch XL-6500A",
    image: "/images/products/may-quet-ma-vach-Kpos-Xl-6500png.png",
    badge: "",
    badgeType: "",
    desc: "Máy quét mã vạch 1D chuyên dụng, tốc độ quét nhanh, độ bền cao, hỗ trợ quét tự động và thủ công.",
    price: "600.000₫",
    oldPrice: "700.000₫",
    priceUnit: "",
    features: ["Quét nhanh 1D", "Tự động & thủ công", "Kết nối USB-HID / RS-232"],
  },
  {
    slug: "may-quet-ma-vach-xl-2302",
    category: "scanner",
    categoryLabel: "Máy Quét",
    name: "Máy quét mã vạch XL-2302",
    image: "/images/products/may-quet-xl-2302.png",
    badge: "",
    badgeType: "",
    desc: "Máy quét mã vạch 2D không dây, quét QR code, barcode, thanh toán QR Pay nhanh chóng tiện lợi.",
    price: "850.000₫",
    oldPrice: "",
    priceUnit: "",
    features: ["Quét 1D & 2D / QR Code", "Không dây Bluetooth", "Thời lượng pin 12h"],
  },
  {
    slug: "giay-in-nhiet-k80",
    category: "supplies",
    categoryLabel: "Vật Tư",
    name: "Giấy in nhiệt K80 (In hóa đơn)",
    image: "/images/products/giay-in-hd.jpg",
    badge: "",
    badgeType: "",
    desc: "Giấy in nhiệt chất lượng cao dùng cho máy in hóa đơn. Bề rộng 80mm, cuộn dài 45m, không lem, không phai.",
    price: "15.000₫",
    oldPrice: "",
    priceUnit: "/ cuộn",
    features: ["Bề rộng 80mm", "Chất lượng cao", "Giá cạnh tranh"],
  },
  {
    slug: "giay-in-tem-tra-sua",
    category: "supplies",
    categoryLabel: "Vật Tư",
    name: "Tem in trà sữa - Đồ uống",
    image: "/images/products/tem-tra-sua.jpg",
    badge: "",
    badgeType: "",
    desc: "Tem nhãn in nhiệt chuyên dụng cho trà sữa, đồ uống. In rõ nét, dán chắc, chịu nhiệt tốt.",
    price: "Liên hệ",
    oldPrice: "",
    priceUnit: "",
    features: ["Chịu ẩm, chịu nhiệt", "In rõ nét, sắc sảo", "Đa dạng kích thước"],
  },
];
void _unused;

export default function ProductsPageClient({ products, filters }: { products: ProductItem[]; filters: FilterItem[] }) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";
  const [active, setActive] = useState(categoryFromUrl);

  // Sync active state khi URL thay đổi
  useEffect(() => {
    setActive(categoryFromUrl);
  }, [categoryFromUrl]);

  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="page-hero-title">Sản Phẩm Thiết Bị Bán Hàng</h1>
              <p className="page-hero-subtitle">
                Khám phá những sản phẩm thiết bị bán hàng chuyên dụng, chất lượng cao. Từ máy POS,
                máy in hóa đơn, máy quét mã vạch đến các giải pháp bán hàng toàn diện cho mọi ngành nghề.
              </p>
            </div>
            <div className="hidden lg:flex items-center justify-center w-48 h-48 rounded-full bg-white/10">
              <svg viewBox="0 0 96 96" fill="none" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="16" width="80" height="56" rx="8" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="3"/>
                <rect x="20" y="28" width="24" height="32" rx="4" fill="white" fillOpacity="0.3"/>
                <rect x="52" y="28" width="24" height="14" rx="4" fill="white" fillOpacity="0.3"/>
                <rect x="52" y="46" width="24" height="14" rx="4" fill="white" fillOpacity="0.3"/>
                <rect x="28" y="72" width="40" height="8" rx="4" fill="white" fillOpacity="0.2"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container mx-auto px-4 max-w-6xl">
          <ol className="breadcrumb-list">
            <li><Link href="/">Trang chủ</Link></li>
            <li><span className="current">Sản phẩm</span></li>
          </ol>
        </div>
      </nav>

      {/* Products Section */}
      <section className="py-12 lg:py-16 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="title-section text-center mb-2">Danh Mục Sản Phẩm</h2>
          <p className="text-center text-gray-500 mb-8">Chọn danh mục để tìm sản phẩm phù hợp</p>

          {/* Filter */}
          <div className="filter-bar">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${active === f.key ? "active" : ""}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="no-items-msg">
              <h3>Không có sản phẩm trong danh mục này</h3>
              <p>Liên hệ với chúng tôi để được tư vấn</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.slug}
                  image={product.image}
                  alt={product.name}
                  badge={product.badge}
                  badgeType={product.badgeType}
                  name={product.name}
                  slug={`/products/${product.slug}`}
                  desc={product.desc}
                  price={product.price}
                  priceOld={product.oldPrice}
                  priceUnit={product.priceUnit}
                  features={product.features}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-gradient">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-white text-3xl font-bold mb-3">Cần Tìm Sản Phẩm Phù Hợp?</h2>
          <p className="text-white/85 text-lg mb-8">
            Liên hệ với chúng tôi ngay để được tư vấn và báo giá tốt nhất
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:0855285872" className="btn-cta-primary">
              📞 Gọi ngay: 085 528 5872
            </a>
            <a
              href="https://zalo.me/0855285872"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-secondary"
            >
              💬 Nhắn Zalo
            </a>
          </div>
        </div>
      </section>

      <FloatingButtons />
    </>
  );
}
