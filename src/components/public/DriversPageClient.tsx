"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import FloatingButtons from "@/components/public/FloatingButtons";

const allDrivers = [
  {
    name: "BP-T3",
    printerType: "thermal",
    os: ["windows", "macos"],
    desc: "Dùng cho các dòng máy in KV804 và tương đương.",
    version: "v7.11",
    downloadWindows: "https://drive.google.com/file/d/1qpa0b8MYRSjpdAGq-kEzksgbZJuYRtwc/view?usp=sharing",
    downloadMacos: "",
  },
  {
    name: "365B",
    printerType: "thermal",
    os: ["windows", "macos"],
    desc: "Dùng cho các dòng máy in tem nhãn 365B và tương đương.",
    version: "v1.0.0",
    downloadWindows: "https://drive.google.com/file/d/1jhuUqlXzuukQJd0ZbQTCUPgfLDIycUTc/view?usp=drive_link",
    downloadMacos: "",
  },
  {
    name: "Canon LBP6000",
    printerType: "laser",
    os: ["windows"],
    desc: "Máy in laser đen trắng Canon LBP6000, thích hợp cho văn phòng.",
    version: "v1.0.0",
    downloadWindows: "",
    downloadMacos: "",
  },
  {
    name: "ZY307 — ZY606",
    printerType: "thermal",
    os: ["windows", "macos"],
    desc: "Dùng cho các dòng máy in ZY307 và ZY606.",
    version: "v1.0.0",
    downloadWindows: "",
    downloadMacos: "",
  },
  {
    name: "XP-365B Pro",
    printerType: "thermal",
    os: ["windows"],
    desc: "Dùng cho dòng máy in tem nhãn XP-365B Pro.",
    version: "v2.1.0",
    downloadWindows: "",
    downloadMacos: "",
  },
  {
    name: "HP LaserJet P1102",
    printerType: "laser",
    os: ["windows", "macos"],
    desc: "Máy in laser HP LaserJet P1102 dùng cho văn phòng.",
    version: "v1.2.0",
    downloadWindows: "",
    downloadMacos: "",
  },
];

export default function DriversPageClient() {
  const [os, setOs] = useState("");
  const [printerType, setPrinterType] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return allDrivers.filter((d) => {
      const matchOs = !os || os === "all" || d.os.includes(os);
      const matchType = !printerType || printerType === "all" || d.printerType === printerType;
      const matchSearch =
        !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.desc.toLowerCase().includes(search.toLowerCase());
      return matchOs && matchType && matchSearch;
    });
  }, [os, printerType, search]);

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="page-hero-title">Tải Driver Máy In</h1>
          <p className="page-hero-subtitle">
            Tải các driver máy in cho Windows, macOS. Hỗ trợ hàng trăm loại máy in khác nhau. Tìm và tải
            driver phù hợp với máy in của bạn một cách nhanh chóng và dễ dàng.
          </p>
          <div className="page-hero-features">
            <div className="page-hero-feature">⬇️ Tải nhanh</div>
            <div className="page-hero-feature">🛡️ An toàn</div>
            <div className="page-hero-feature">🎧 Hỗ trợ 24/7</div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container mx-auto px-4 max-w-6xl">
          <ol className="breadcrumb-list">
            <li><Link href="/">Trang chủ</Link></li>
            <li><span className="current">Tải Driver</span></li>
          </ol>
        </div>
      </nav>

      {/* Search & Filter */}
      <section className="driver-search-section">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="title-section text-center mb-8">Tìm Driver Của Bạn</h2>
          <div className="driver-search-form">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="driver-form-label">Hệ Điều Hành</label>
                <select
                  className="driver-form-select"
                  value={os}
                  onChange={(e) => setOs(e.target.value)}
                  title="Hệ điều hành"
                  aria-label="Hệ điều hành"
                >
                  <option value="">-- Chọn hệ điều hành --</option>
                  <option value="windows">Windows (32-bit &amp; 64-bit)</option>
                  <option value="macos">macOS</option>
                  <option value="all">Tất cả</option>
                </select>
              </div>
              <div>
                <label className="driver-form-label">Loại Máy In</label>
                <select
                  className="driver-form-select"
                  value={printerType}
                  onChange={(e) => setPrinterType(e.target.value)}
                  title="Loại máy in"
                  aria-label="Loại máy in"
                >
                  <option value="">-- Chọn loại máy in --</option>
                  <option value="thermal">Máy In Hóa Đơn (Thermal)</option>
                  <option value="laser">Máy In Laser</option>
                  <option value="all">Tất cả</option>
                </select>
              </div>
              <div>
                <label className="driver-form-label">Tìm Kiếm</label>
                <input
                  type="text"
                  className="driver-form-input"
                  placeholder="Nhập tên hãng hoặc model..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drivers Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="title-section text-center mb-8">
            Danh Sách Driver
            <span className="ml-3 text-base font-normal text-gray-400">({filtered.length} kết quả)</span>
          </h2>

          {filtered.length === 0 ? (
            <div className="no-items-msg">
              <h3>Không tìm thấy driver phù hợp</h3>
              <p>Liên hệ với chúng tôi để được hỗ trợ tìm driver</p>
              <a href="tel:0855285872" className="btn-contact inline-flex mt-4 px-8 py-3">📞 Gọi hỗ trợ</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((driver, i) => (
                <div key={i} className="driver-card">
                  <div className="driver-icon">🖨️</div>
                  <h3 className="driver-name">{driver.name}</h3>
                  <div className="driver-os-badges">
                    {driver.os.includes("windows") && (
                      <span className="driver-os-badge">Windows</span>
                    )}
                    {driver.os.includes("macos") && (
                      <span className="driver-os-badge macos">macOS</span>
                    )}
                  </div>
                  <p className="driver-desc">{driver.desc}</p>
                  <div className="driver-actions">
                    {driver.os.includes("windows") && (
                      driver.downloadWindows ? (
                        <a
                          href={driver.downloadWindows}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-download"
                        >
                          ⬇️ Windows
                        </a>
                      ) : (
                        <span className="btn-download opacity-50 cursor-not-allowed">⬇️ Windows</span>
                      )
                    )}
                    {driver.os.includes("macos") && (
                      driver.downloadMacos ? (
                        <a
                          href={driver.downloadMacos}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-download macos-btn"
                        >
                          ⬇️ macOS
                        </a>
                      ) : (
                        <span className="btn-download macos-btn opacity-50 cursor-not-allowed">⬇️ macOS</span>
                      )
                    )}
                  </div>
                  <div className="driver-version">Phiên bản: {driver.version}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Help section */}
      <section className="py-10 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-4">
              🆘 Không tìm thấy driver cần thiết?
            </h3>
            <p className="text-gray-500 mb-6">
              Đội ngũ kỹ thuật của Hiệp POS sẵn sàng hỗ trợ bạn tìm đúng driver cho máy in của mình.
              Liên hệ ngay qua điện thoại hoặc Zalo để được hỗ trợ trong vòng 30 phút.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:0855285872" className="btn-contact px-8 py-3 inline-flex">
                📞 Gọi ngay: 085 528 5872
              </a>
              <a
                href="https://zalo.me/0855285872"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-details px-8 py-3 inline-flex items-center gap-2"
              >
                💬 Chat Zalo
              </a>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
    </>
  );
}
