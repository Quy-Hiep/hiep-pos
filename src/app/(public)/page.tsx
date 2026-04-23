import BannerSection from "@/components/public/BannerSection";
import StatsSection from "@/components/public/StatsSection";
import SoftwareTabsSection from "@/components/public/SoftwareTabsSection";
import IndustrySwiperSection from "@/components/public/IndustrySwiperSection";
import ProductsSection from "@/components/public/ProductsSection";
import ReviewsSection from "@/components/public/ReviewsSection";
import CTASection from "@/components/public/CTASection";
import NewsSection from "@/components/public/NewsSection";
import FloatingButtons from "@/components/public/FloatingButtons";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/getSettings";

export const metadata: Metadata = {
  title: "Hiệp POS – Phần mềm & Thiết bị bán hàng chuyên dụng tại Bình Thuận",
  description:
    "Hiệp POS cung cấp giải pháp bán hàng toàn diện: phần mềm quản lý bán hàng, máy POS, máy in hóa đơn, máy quét mã vạch và phụ kiện thiết bị bán hàng. Hỗ trợ 24/7, bảo hành 12 tháng.",
  keywords: ["phần mềm bán hàng", "thiết bị POS", "máy in hóa đơn", "máy quét mã vạch", "Hiệp POS", "Bình Thuận"],
  openGraph: {
    title: "Hiệp POS – Phần mềm & Thiết bị bán hàng chuyên dụng",
    description: "Giải pháp bán hàng toàn diện cho mọi ngành nghề kinh doanh tại Bình Thuận.",
    images: ["/images/backgrounds/banner-01.jpg"],
    type: "website",
  },
};

function fmtPrice(n: number): string {
  return new Intl.NumberFormat("vi-VN").format(n) + "₫";
}

const TYPE_LABEL: Record<string, string> = {
  NEWS: "Tin Tức",
  GUIDE: "Hướng Dẫn",
  SECURITY: "Bảo Mật",
  TIPS: "Mẹo & Kinh Nghiệm",
  CUSTOMER_STORY: "Câu Chuyện Khách Hàng",
};

export default async function HomePage() {
  const [dbProducts, dbCats, dbArticles, s] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true },
      include: { category: true, images: { orderBy: { sortOrder: "asc" }, take: 1 } },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.category.findMany({
      where: { type: "PRODUCT", isActive: true, showInMenu: true },
      orderBy: { menuOrder: "asc" },
    }),
    prisma.article.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
    getSettings([
      "home_banner_tagline",
      "home_cta_title", "home_cta_desc",
      "home_cta_phone", "home_cta_phone_display", "home_cta_zalo",
      "home_stat_0_icon", "home_stat_0_number", "home_stat_0_label",
      "home_stat_1_icon", "home_stat_1_number", "home_stat_1_label",
      "home_stat_2_icon", "home_stat_2_number", "home_stat_2_label",
      "home_stat_3_icon", "home_stat_3_number", "home_stat_3_label",
      "sw_title", "sw_subtitle", "sw_tabs_json",
      "ind_subtitle", "ind_title", "ind_slides_json",
    ]),
  ]);

  const products = dbProducts.map((p: (typeof dbProducts)[0]) => ({
    image: p.images[0]?.url ?? "/images/products/may-in-804.png",
    alt: p.name,
    badge: p.badge === "Liên hệ" ? undefined : (p.badge ?? undefined),
    badgeHot: p.badge === "Bán chạy",
    category: p.category?.name ?? "",
    categoryLabel: p.category?.name ?? "Khác",
    name: p.name,
    slug: `/products/${p.slug}`,
    desc: p.description ?? "",
    price: Number(p.price) > 0 ? fmtPrice(Number(p.price)) : "Liên hệ",
    priceOld: p.originalPrice && Number(p.originalPrice) > 0 ? fmtPrice(Number(p.originalPrice)) : undefined,
    features: p.connectionTypes,
    filter: p.category?.slug ?? "other",
  }));

  const tabs = [
    { label: "Tất cả", filter: "all" },
    ...dbCats.map((c: (typeof dbCats)[0]) => ({ label: c.name, filter: c.slug })),
  ];

  const articles = dbArticles.map((a: (typeof dbArticles)[0]) => ({
    image: a.featuredImage ?? "/images/news-01.jpg",
    category: TYPE_LABEL[a.type] ?? a.type,
    title: a.title,
    desc: a.excerpt ?? "",
    date: a.publishedAt
      ? a.publishedAt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
      : "",
    slug: `/news/${a.slug}`,
  }));

  const homeStats = [0, 1, 2, 3].map((i) => ({
    icon: s[`home_stat_${i}_icon`] || ["👥", "🛡️", "🎧", "🚀"][i],
    number: s[`home_stat_${i}_number`] || ["500+", "12", "24/7", "30 phút"][i],
    label: s[`home_stat_${i}_label`] || ["Khách hàng tin dùng", "Tháng bảo hành", "Hỗ trợ kỹ thuật", "Cài đặt & sử dụng"][i],
  }));

  return (
    <>
      <BannerSection tagline={s.home_banner_tagline} />
      <StatsSection stats={homeStats} />
      <SoftwareTabsSection
        title={s.sw_title || undefined}
        subtitle={s.sw_subtitle || undefined}
        tabs={s.sw_tabs_json ? (() => { try { return JSON.parse(s.sw_tabs_json); } catch { return undefined; } })() : undefined}
      />
      <IndustrySwiperSection
        subtitle={s.ind_subtitle || undefined}
        title={s.ind_title || undefined}
        slides={s.ind_slides_json ? (() => { try { return JSON.parse(s.ind_slides_json); } catch { return undefined; } })() : undefined}
      />
      <ProductsSection products={products} tabs={tabs} />
      <ReviewsSection />
      <CTASection
        title={s.home_cta_title}
        desc={s.home_cta_desc}
        phone={s.home_cta_phone}
        phoneDisplay={s.home_cta_phone_display}
        zaloLink={s.home_cta_zalo}
      />
      <NewsSection articles={articles} />
      <FloatingButtons />
    </>
  );
}
