"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FloatingButtons from "@/components/public/FloatingButtons";

type Product = {
  slug: string;
  category: string;
  name: string;
  image: string;
  images: { url: string; alt?: string }[];
  price: string;
  oldPrice?: string;
  desc: string;
  shortDesc: string;
  features: string[];
  specs: { label: string; value: string }[];
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const allImages = product.images.length > 0 ? product.images : [{ url: product.image, alt: product.name }];
  const [activeImg, setActiveImg] = useState(0);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container mx-auto px-4 max-w-6xl">
          <ol className="breadcrumb-list">
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/products">Sản phẩm</Link></li>
            <li><span className="current">{product.name}</span></li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="product-detail-page">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Images */}
            <div>
              <div className="product-main-image">
                <Image
                  src={allImages[activeImg].url}
                  alt={allImages[activeImg].alt || product.name}
                  width={600}
                  height={450}
                  style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
                  priority
                />
              </div>
              {allImages.length > 1 && (
                <div className="product-thumbnails">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`product-thumbnail${i === activeImg ? " active" : ""}`}
                      onClick={() => setActiveImg(i)}
                      title={img.alt || `Ảnh ${i + 1}`}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || `Ảnh ${i + 1}`}
                        width={80}
                        height={80}
                        style={{ width: "auto", height: "auto" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="product-info-detail">
              <span className="product-category-badge">{product.category}</span>
              <h1 className="product-name-detail">{product.name}</h1>

              <div className="product-rating-row">
                <div className="product-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="product-rating-text">5.0 (12 đánh giá)</span>
              </div>

              <div className="product-price-detail">
                {product.price}
                {product.oldPrice && (
                  <span className="text-base font-normal text-gray-400 line-through ml-3">
                    {product.oldPrice}
                  </span>
                )}
              </div>

              <p className="product-short-desc">{product.shortDesc}</p>

              <div className="product-highlights">
                {product.features.map((f, i) => (
                  <div key={i} className="product-highlight-item">{f}</div>
                ))}
              </div>

              <div className="product-action-btns">
                <a href="tel:0855285872" className="btn-buy-now">
                  📞 Mua ngay — 085 528 5872
                </a>
                <a
                  href="https://zalo.me/0855285872"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-zalo-contact"
                >
                  <Image
                    src="/images/icons/icon_zalo_50x50.png"
                    alt="Zalo"
                    width={24}
                    height={24}
                    style={{ width: "24px", height: "24px" }}
                  />
                  Chat Zalo
                </a>
              </div>

              <div className="product-guarantees">
                <div className="product-guarantee-item">🛡️ Bảo hành chính hãng</div>
                <div className="product-guarantee-item">🚚 Giao hàng toàn quốc</div>
                <div className="product-guarantee-item">🔄 Đổi trả trong 7 ngày</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="detail-tabs-section">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="detail-tabs-nav">
            <button
              className={`detail-tab-btn ${activeTab === "desc" ? "active" : ""}`}
              onClick={() => setActiveTab("desc")}
            >
              Mô tả sản phẩm
            </button>
            <button
              className={`detail-tab-btn ${activeTab === "specs" ? "active" : ""}`}
              onClick={() => setActiveTab("specs")}
            >
              Thông số kỹ thuật
            </button>
            <button
              className={`detail-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Đánh giá (12)
            </button>
          </div>

          <div className={`detail-tab-content ${activeTab === "desc" ? "active" : ""}`}>
            <div className="detail-tab-body">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <h4>Tính năng nổi bật</h4>
              <ul>
                {product.features.map((f, i) => (
                  <li key={i}><strong>{f}</strong></li>
                ))}
              </ul>
              <h4>Liên hệ hỗ trợ</h4>
              <p>Mọi thắc mắc vui lòng liên hệ:</p>
              <ul>
                <li>Điện thoại: <a href="tel:0855285872">085 528 5872</a></li>
                <li>Zalo: <a href="https://zalo.me/0855285872" target="_blank" rel="noopener noreferrer">Zalo.me/0855285872</a></li>
              </ul>
            </div>
          </div>

          <div className={`detail-tab-content ${activeTab === "specs" ? "active" : ""}`}>
            <div className="detail-tab-body">
              <h3>Thông Số Kỹ Thuật</h3>
              <table className="specs-table">
                <tbody>
                  {product.specs.map((s, i) => (
                    <tr key={i}>
                      <td>{s.label}</td>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`detail-tab-content ${activeTab === "reviews" ? "active" : ""}`}>
            <div className="detail-tab-body">
              <h3>Đánh Giá Từ Khách Hàng</h3>
              <div className="flex flex-col gap-4">
                {[
                  { name: "Anh Minh", role: "Chủ quán cà phê", text: "Sản phẩm rất tốt, dùng được gần 1 năm không hỏng hóc gì, nhân viên hỗ trợ nhiệt tình." },
                  { name: "Chị Lan", role: "Chủ cửa hàng thời trang", text: "Mua được 6 tháng, in nhanh và rõ nét. Giá cả hợp lý, sẽ giới thiệu thêm." },
                  { name: "Anh Tuấn", role: "Chủ nhà hàng", text: "Đã thử nhiều loại máy in, cái này là tốt nhất trong tầm giá. Hỗ trợ kỹ thuật nhanh." },
                ].map((r, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                        {r.name.charAt(r.name.indexOf(" ") + 1)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{r.name}</div>
                        <div className="text-xs text-gray-400">{r.role}</div>
                      </div>
                      <div className="ml-auto text-yellow-400 text-sm">★★★★★</div>
                    </div>
                    <p className="text-sm text-gray-600 italic">&quot;{r.text}&quot;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to products */}
      <section className="py-10 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold text-base hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
        >
          ← Xem tất cả sản phẩm
        </Link>
      </section>

      <FloatingButtons />
    </>
  );
}
