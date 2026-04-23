import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  gioiThieu: [
    { href: "/about", label: "Về Hiệp POS" },
    { href: "/customers", label: "Khách hàng" },
    { href: "/pages/chinh-sach", label: "Điều khoản & chính sách" },
    { href: "/pages/lien-he", label: "Liên hệ" },
  ],
  hoTro: [
    { href: "/drivers", label: "Tải driver máy in" },
    { href: "/news/huong-dan-cai-dat-may-in", label: "Hướng dẫn cài đặt máy in" },
    { href: "/news/huong-dan-su-dung", label: "Hướng dẫn sử dụng" },
    { href: "/news", label: "Tin tức" },
  ],
  banBuon: [
    "Thời trang", "Điện thoại - Điện máy", "Vật liệu xây dựng",
    "Nhà thuốc", "Mẹ và bé", "Sách và Văn phòng phẩm",
    "Tạp hoá và siêu thị", "Mỹ phẩm", "Nông sản và thực phẩm",
    "Xe, máy móc", "Hoa và Quà tặng", "Khác",
  ],
  anUong: [
    "Nhà hàng", "Quán ăn", "Cà phê - trà sữa",
    "Karaoke, bida", "Bar, pub, club", "Căn tin, trạm dừng chân",
  ],
  luTru: [
    "Beauty Spa & Massage", "Hair Salon & Nails", "Khách sạn & Nhà nghỉ",
    "Homestay & Villa, Resort", "Fitness & Yoga", "Phòng khám",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white">
      {/* CTA Register */}
      <div className="border-b border-white/10 py-10 text-center">
        <h2 className="text-2xl font-bold mb-1">Nhận tư vấn miễn phí</h2>
        <p className="text-white/70 mb-5">Giải pháp bán hàng toàn diện</p>
        <div className="flex justify-center items-center gap-3 flex-wrap">
          <input
            type="tel"
            placeholder="Nhập số điện thoại của bạn"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/50 text-sm w-64 focus:outline-none focus:border-white/50 transition-colors"
          />
          <a
            href="tel:0855285872"
            className="bg-[var(--color-primary)] hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Đăng ký
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto max-w-7xl px-4 pt-10 pb-6">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Hiệp POS"
                width={120}
                height={40}
                className="h-10 brightness-0 invert"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Cung cấp phần mềm bán hàng - Thiết bị bán hàng trên toàn quốc.
            </p>
            <p className="text-white/70 text-sm mt-2">
              Điện thoại:{" "}
              <a href="tel:0855285872" className="text-white hover:text-blue-300 font-semibold">
                085 528 5872
              </a>
            </p>
          </div>

          {/* Giới thiệu */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/90">
              Giới Thiệu
            </h3>
            <ul className="space-y-2">
              {footerLinks.gioiThieu.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/90">
              Hỗ Trợ
            </h3>
            <ul className="space-y-2">
              {footerLinks.hoTro.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Industry Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 border-t border-white/10">
          <div>
            <h4 className="font-semibold text-sm text-white/90 mb-3">Bán buôn, bán lẻ</h4>
            <ul className="space-y-1.5">
              {footerLinks.banBuon.map((item) => (
                <li key={item}>
                  <span className="text-white/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white/90 mb-3">Ăn uống, giải trí</h4>
            <ul className="space-y-1.5">
              {footerLinks.anUong.map((item) => (
                <li key={item}>
                  <span className="text-white/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white/90 mb-3">Lưu trú, làm đẹp</h4>
            <ul className="space-y-1.5">
              {footerLinks.luTru.map((item) => (
                <li key={item}>
                  <span className="text-white/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Bản quyền thuộc về Máy In Bill Tính Tiền Phan Thiết.
          </p>
        </div>
      </div>
    </footer>
  );
}
