import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const quickLinks = [
  { label: "Thêm sản phẩm mới", href: "/admin/products/new", icon: "+" },
  { label: "Viết bài mới", href: "/admin/articles/new", icon: "+" },
  { label: "Xem tất cả đơn hàng", href: "/admin/orders", icon: "→" },
];

export default async function DashboardPage() {
  const [productCount, articleCount, orderCount, driverCount] = await Promise.all([
    prisma.product.count(),
    prisma.article.count(),
    prisma.order.count().catch(() => 0),
    prisma.driver.count().catch(() => 0),
  ]);

  const stats = [
    { label: "Sản phẩm", value: String(productCount), icon: "📦", color: "admin-stat-icon-blue", href: "/admin/products" },
    { label: "Tin tức", value: String(articleCount), icon: "📰", color: "admin-stat-icon-green", href: "/admin/articles" },
    { label: "Đơn hàng", value: String(orderCount), icon: "🛒", color: "admin-stat-icon-orange", href: "/admin/orders" },
    { label: "Driver", value: String(driverCount), icon: "💾", color: "admin-stat-icon-purple", href: "/admin/drivers" },
  ];
  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="admin-content">
        {/* Stats */}
        <div className="admin-stats-grid">
          {stats.map((s) => (
            <Link key={s.label} href={s.href} className="admin-stat-link">
              <div className="admin-stat-card">
                <div className={`admin-stat-icon ${s.color}`}>{s.icon}</div>
                <div className="admin-stat-info">
                  <div className="admin-stat-label">{s.label}</div>
                  <div className="admin-stat-value">{s.value}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="admin-dashboard-grid">
          <div className="admin-table-card admin-table-card-p">
            <div className="admin-table-title admin-card-title">Thao tác nhanh</div>
            <div className="admin-quick-links">
              {quickLinks.map((l) => (
                <Link key={l.href} href={l.href} className="admin-btn-add admin-btn-add-full">
                  <span>{l.icon}</span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="admin-table-card admin-table-card-p">
            <div className="admin-table-title">Thông tin hệ thống</div>
            <div className="admin-sysinfo">
              <div>🌐 Website: <strong>hieppos.com</strong></div>
              <div>📦 Framework: <strong>Next.js 16</strong></div>
              <div>🗄️ Database: <strong>Supabase PostgreSQL</strong></div>
              <div>🔐 Auth: <strong>NextAuth v5</strong></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
