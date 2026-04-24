import { prisma } from "@/lib/prisma";
import HeaderClient, { NavLink } from "@/components/layout/HeaderClient";

// Fallback menu nếu chưa có category nào được tạo
const FALLBACK_NAV: NavLink[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/customers", label: "Khách hàng" },
  { href: "/drivers", label: "Tải Driver" },
  { href: "/news", label: "Tin tức" },
];

function buildHref(slug: string, type: string): string {
  if (type === "PAGE") return `/${slug}`;
  const prefix =
    type === "PRODUCT" ? "/products" :
    type === "ARTICLE" ? "/news" :
    "/drivers";
  return `${prefix}?category=${slug}`;
}

export default async function Header() {
  let navLinks: NavLink[] = FALLBACK_NAV;

  try {
    const menuCategories = await prisma.category.findMany({
      where: { showInMenu: true, isActive: true, parentId: null },
      orderBy: { menuOrder: "asc" },
      include: {
        children: {
          where: { showInMenu: true, isActive: true },
          orderBy: { menuOrder: "asc" },
        },
      },
    });

    if (menuCategories.length > 0) {
      navLinks = [
        { href: "/", label: "Trang chủ" },
        ...menuCategories.map((cat) => ({
          href: buildHref(cat.slug, cat.type),
          label: cat.name,
          children: cat.children.length > 0
            ? cat.children.map((child) => ({
                href: buildHref(child.slug, child.type),
                label: child.name,
              }))
            : undefined,
        })),
      ];
    }
  } catch {
    // Silently fallback to static nav
  }

  return <HeaderClient navLinks={navLinks} />;
}

