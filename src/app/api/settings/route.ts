import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET /api/settings — return all settings as { key: value }
export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await prisma.setting.findMany();
  const data: Record<string, string> = {};
  for (const r of rows) data[r.key] = r.value;
  return NextResponse.json(data);
}

// PUT /api/settings — upsert all provided key/value pairs
export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as Record<string, string>;
  if (typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // group mapping
  const GROUP: Record<string, string> = {
    siteName: "general", siteDescription: "general", siteUrl: "general",
    contactEmail: "general", contactPhone: "general", contactPhone2: "general",
    contactAddress: "general", contactMap: "general",
    socialFacebook: "social", socialYoutube: "social", socialZalo: "social",
    socialTiktok: "social", socialLinkedin: "social",
    metaTitle: "seo", metaDescription: "seo", metaKeywords: "seo",
    ogTitle: "seo", ogDescription: "seo", ogImage: "seo",
    twitterCard: "seo", twitterTitle: "seo", twitterDescription: "seo",
    twitterImage: "seo", googleVerification: "seo", bingSiteAuth: "seo",
    googleAnalytics: "seo", facebookPixel: "seo",
    logoUrl: "appearance", faviconUrl: "appearance", footerText: "appearance",
    home_banner_tagline: "home",
    home_cta_title: "home", home_cta_desc: "home",
    home_cta_phone: "home", home_cta_phone_display: "home", home_cta_zalo: "home",
    home_stat_0_icon: "home", home_stat_0_number: "home", home_stat_0_label: "home",
    home_stat_1_icon: "home", home_stat_1_number: "home", home_stat_1_label: "home",
    home_stat_2_icon: "home", home_stat_2_number: "home", home_stat_2_label: "home",
    home_stat_3_icon: "home", home_stat_3_number: "home", home_stat_3_label: "home",
    sw_title: "home", sw_subtitle: "home", sw_tabs_json: "home",
    ind_subtitle: "home", ind_title: "home", ind_slides_json: "home",
    about_hero_title: "about", about_hero_subtitle: "about",
    about_stat_years_number: "about", about_stat_years_label: "about",
    about_stat_customers_number: "about", about_stat_customers_label: "about",
    about_stat_support_number: "about", about_stat_support_label: "about",
    about_mission_title: "about", about_mission_desc: "about",
    about_vision_title: "about", about_vision_desc: "about",
    about_cta_title: "about", about_cta_desc: "about",
    about_cta_phone: "about", about_cta_phone_display: "about", about_cta_zalo: "about",
  };

  await Promise.all(
    Object.entries(body).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: value ?? "" },
        create: { key, value: value ?? "", group: GROUP[key] ?? "general" },
      })
    )
  );

  return NextResponse.json({ ok: true });
}
