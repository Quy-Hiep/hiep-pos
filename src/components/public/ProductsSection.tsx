"use client";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/public/ProductCard";

type Product = {
  image: string;
  alt: string;
  badge?: string;
  badgeHot?: boolean;
  category: string;
  categoryLabel: string;
  categoryStyle?: string;
  name: string;
  slug: string;
  desc: string;
  price: string;
  priceOld?: string;
  priceUnit?: string;
  features: string[];
  filter: string;
};

const defaultProducts: Product[] = [
  {
    image: "/images/products/may-in-804.png",
    alt: "Máy in hóa đơn kv804",
    badge: "Bán chạy",
    badgeHot: true,
    category: "Máy In",
    categoryLabel: "Máy In",
    name: "Máy in hóa đơn kv804",
    slug: "/products/may-in-hoa-don-kv804",
    desc: "Phương pháp in nhiệt trực tiếp trên cỡ giấy 80mm. Kết nối với két đựng tiền. Cảm biến thông báo: hết giấy, gần hết giấy, nắp đang mở, kẹt dao cắt, kẹt giấy.",
    price: "1.400.000₫",
    priceOld: "1.300.000₫",
    features: ["Tự động cắt giấy", "Kết nối USB/Lan", "Tốc độ quét 260mm/s"],
    filter: "may-in",
  },
  {
    image: "/images/products/may-in-365b.png",
    alt: "Máy in mã vạch 365B",
    badge: "Mới",
    category: "Máy In",
    categoryLabel: "Máy In",
    name: "Máy in mã vạch 365B",
    slug: "/products/may-in-ma-vach-365b",
    desc: "Máy in tem nhãn - mã vạch chuyên dụng, in sắc nét, hỗ trợ nhiều khổ giấy.",
    price: "1.400.000₫",
    features: ["In nhiệt trực tiếp không cần mực", "Kết nối : USB + Lan", "Đa dạng khổ in"],
    filter: "may-in",
  },
  {
    image: "/images/products/may-quet-ma-vach-Kpos-Xl-6500png.png",
    alt: "Máy Quét Mã Vạch",
    category: "Máy Quét",
    categoryLabel: "Máy Quét",
    name: "Máy quét mã vạch XL-6500A",
    slug: "/products/may-quet-ma-vach-xl-6500a",
    desc: "Máy quét mã vạch 1D & 2D chuyên dụng, tốc độ quét nhanh, độ bền cao.",
    price: "600.000₫",
    priceOld: "500.000₫",
    features: ["Quét nhanh 1D", "Hỗ trợ quét tự động và thủ công", "Kết nối PS-2(KB), RS-232, USB-HID"],
    filter: "may-quet",
  },
  {
    image: "/images/products/may-quet-xl-2302.png",
    alt: "Máy Quét Mã Vạch XL-2302",
    category: "Máy Quét",
    categoryLabel: "Máy Quét",
    name: "Máy quét mã vạch XL-2302",
    slug: "/products/may-quet-ma-vach-xl-2302",
    desc: "Máy quét mã vạch 1D & 2D chuyên dụng, tốc độ quét nhanh, độ bền cao.",
    price: "1.600.000₫",
    priceOld: "500.000₫",
    features: ["Trình đọc mã vạch 2D đa hướng, quét được QR code", "Chế độ quét: quét liên tục", "Kết nối jack cắm RJ-45"],
    filter: "may-quet",
  },
  {
    image: "/images/products/giay-in-hd.jpg",
    alt: "Giấy In Nhiệt",
    category: "Phụ Kiện",
    categoryLabel: "Phụ Kiện",
    categoryStyle: "accessory",
    name: "Giấy in nhiệt (In hóa đơn) K80",
    slug: "/products/giay-in-nhiet-k80",
    desc: "Giấy in nhiệt chất lượng cao, nhiều kích thước 58mm, 80mm, giá cạnh tranh.",
    price: "15.000₫",
    priceUnit: "/ cuộn",
    features: ["Bề rộng khổ : 80mm", "Chất lượng cao", "Giá tốt"],
    filter: "phu-kien",
  },
  {
    image: "/images/products/tem-tra-sua.jpg",
    alt: "Giấy In Tem trà sữa",
    category: "Phụ Kiện",
    categoryLabel: "Phụ Kiện",
    categoryStyle: "accessory",
    name: "Giấy in tem (Khổ 50*30)",
    slug: "/products/giay-in-tem-50x30",
    desc: "Giấy in tem (khổ 1 tem chuyên dùng) cho quán trà sữa, cà phê.",
    price: "50.000₫",
    priceUnit: "/ cuộn",
    features: ["Kích thước mỗi tem: 50 x 30mm", "Số lượng tem: 900 tem", "Bóc dán: dễ dàng"],
    filter: "phu-kien",
  },
  {
    image: "/images/products/giay-in-tem-2-tem.png",
    alt: "Giấy in tem 2 tem",
    category: "Phụ Kiện",
    categoryLabel: "Phụ Kiện",
    categoryStyle: "accessory",
    name: "Giấy in tem (Khổ 2 tem 50*30)",
    slug: "/products/giay-in-tem-2-tem",
    desc: "Giấy in tem (khổ 2 tem) cho tạp hóa, điện máy, phụ kiện, máy móc,....",
    price: "50.000₫",
    priceUnit: "/ cuộn",
    features: ["Kích thước mỗi tem: 35 x 22mm", "Số lượng tem: 2000 tem", "Bóc dán: dễ dàng"],
    filter: "phu-kien",
  },
  {
    image: "/images/products/ket-tien.png",
    alt: "Ngăn Kéo Đựng Tiền",
    category: "Phụ Kiện",
    categoryLabel: "Phụ Kiện",
    categoryStyle: "accessory",
    name: "Khay đựng tiền KV405",
    slug: "/products/khay-dung-tien-kv405",
    desc: "Chất liệu từ thép dày, mạ kẽm, sơn tĩnh điện. Kích thước (mm): 405(ngang) x420(sâu) x100(cao).",
    price: "920.000₫",
    features: ["Chất liệu từ thép dày, mạ kẽm, sơn tĩnh điện", "Tự động mở", "Tối thiểu 1 triệu lần đóng mở"],
    filter: "phu-kien",
  },
  {
    image: "/images/products/may-hien-qr.jpg",
    alt: "Màn hình hiển thị QR",
    category: "QR",
    categoryLabel: "QR",
    name: "Màn hình hiển thị QR - KV99",
    slug: "/products/man-hinh-hien-thi-qr-kv99",
    desc: "Hiển thị mã QR động (có sẵn STK, số tiền) giúp khách chuyển khoản thuận tiện & chính xác.",
    price: "490.000₫",
    features: ["Kết nối qua cổng USB", "Màn hình: 3.5 inches", "Không có loa thông báo"],
    filter: "phu-kien",
  },
];

const defaultTabs = [
  { label: "Tất cả", filter: "all" },
  { label: "Máy POS", filter: "may-pos" },
  { label: "Máy In", filter: "may-in" },
  { label: "Máy Quét", filter: "may-quet" },
  { label: "Phụ Kiện", filter: "phu-kien" },
  { label: "Phần Mềm", filter: "phan-mem" },
];

export default function ProductsSection({
  products: propProducts,
  tabs: propTabs,
}: {
  products?: Product[];
  tabs?: { label: string; filter: string }[];
}) {
  const products = propProducts ?? defaultProducts;
  const tabs = propTabs ?? defaultTabs;
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = products.filter(
    (p) => activeFilter === "all" || p.filter === activeFilter
  );

  return (
    <section className="section-products py-8 lg:py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="title-section">Sản Phẩm Nổi Bật</h2>
          <p className="sub-title mt-2">Các sản phẩm thiết bị bán hàng chuyên dụng, chất lượng cao</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.filter}
              onClick={() => setActiveFilter(tab.filter)}
              className={`product-tab-btn ${activeFilter === tab.filter ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.name}
              image={product.image}
              alt={product.alt}
              badge={product.badge}
              badgeType={product.badgeHot ? "badge-hot" : ""}
              name={product.name}
              slug={product.slug}
              desc={product.desc}
              price={product.price}
              priceOld={product.priceOld}
              priceUnit={product.priceUnit}
              features={product.features}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-12 text-[var(--color-text-light)]">
              Chưa có sản phẩm trong danh mục này.
            </div>
          )}
        </div>

        {/* See All Button */}
        <div className="flex justify-center mt-8 lg:mt-12">
          <Link href="/products" className="btn-see-more">
            Xem tất cả sản phẩm
            <svg className="ml-2 w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
