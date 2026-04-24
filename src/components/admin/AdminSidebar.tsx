"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/categories", label: "Thể loại", icon: "🏷️" },
  { href: "/admin/products", label: "Sản phẩm", icon: "📦" },
  { href: "/admin/articles", label: "Tin tức", icon: "📰" },
  { href: "/admin/drivers", label: "Driver", icon: "💾" },
  { href: "/admin/orders", label: "Đơn hàng", icon: "🛒" },
  { href: "/admin/pages/home", label: "Trang chủ", icon: "🏠" },
  { href: "/admin/pages/about", label: "Giới thiệu", icon: "📋" },
  { href: "/admin/settings", label: "Cài đặt", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <Link href="/admin/dashboard">
          <Image src="/images/icons/logo2.png" alt="Hiệp POS Admin" width={110} height={36} style={{ width: "auto", height: "auto" }} />
        </Link>
        <span className="admin-sidebar-badge">Admin</span>
      </div>

      <nav className="admin-sidebar-nav">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin/dashboard"
              ? pathname === "/admin/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item${isActive ? " active" : ""}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" target="_blank" className="admin-nav-item">
          <span className="admin-nav-icon">🌐</span>
          <span>Xem trang web</span>
        </Link>
      </div>
    </aside>
  );
}
