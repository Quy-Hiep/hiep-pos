/**
 * Seed sample data: categories, products, articles, drivers
 * Run: npx tsx scripts/seed-data.mjs
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Bắt đầu seed dữ liệu mẫu...\n");

  // ==========================================
  // CATEGORIES
  // ==========================================
  const productCats = await Promise.all([
    upsertCategory({ slug: "may-pos", name: "Máy POS", type: "PRODUCT", showInMenu: true, menuOrder: 1 }),
    upsertCategory({ slug: "may-in", name: "Máy In Hóa Đơn", type: "PRODUCT", showInMenu: true, menuOrder: 2 }),
    upsertCategory({ slug: "may-quet-ma-vach", name: "Máy Quét Mã Vạch", type: "PRODUCT", showInMenu: true, menuOrder: 3 }),
    upsertCategory({ slug: "vat-tu", name: "Vật Tư - Giấy In", type: "PRODUCT", showInMenu: true, menuOrder: 4 }),
    upsertCategory({ slug: "phu-kien", name: "Phụ Kiện POS", type: "PRODUCT", showInMenu: true, menuOrder: 5 }),
  ]);

  const articleCats = await Promise.all([
    upsertCategory({ slug: "tin-tuc", name: "Tin Tức", type: "ARTICLE", showInMenu: false }),
    upsertCategory({ slug: "huong-dan", name: "Hướng Dẫn", type: "ARTICLE", showInMenu: false }),
  ]);

  const driverCats = await Promise.all([
    upsertCategory({ slug: "driver-may-in", name: "Driver Máy In", type: "DRIVER", showInMenu: false }),
    upsertCategory({ slug: "driver-may-quet", name: "Driver Máy Quét", type: "DRIVER", showInMenu: false }),
  ]);

  const [catPos, catIn, catMayQue, catVatTu, catPhuKien] = productCats;
  const [catTinTuc, catHuongDan] = articleCats;
  const [catDriverIn, catDriverQue] = driverCats;

  console.log("✅ Categories: " + (productCats.length + articleCats.length + driverCats.length));

  // ==========================================
  // PRODUCTS
  // ==========================================
  const products = [
    {
      categoryId: catPos.id,
      name: "Máy POS bán hàng tính tiền HiệpPOS Pro",
      slug: "may-pos-ban-hang-hieppos-pro",
      description: "Máy POS tích hợp đầy đủ: màn hình cảm ứng 15.6\", CPU Intel Core i3, RAM 4GB, hỗ trợ in hóa đơn, quản lý kho hàng, báo cáo doanh thu.",
      fullDescription: "<h3>Thông số kỹ thuật</h3><ul><li>Màn hình: 15.6\" Full HD cảm ứng</li><li>CPU: Intel Core i3 thế hệ 10</li><li>RAM: 4GB DDR4</li><li>Storage: SSD 128GB</li><li>OS: Windows 10 IoT</li></ul><h3>Tính năng</h3><ul><li>Kết nối máy in hóa đơn, két tiền, máy quét</li><li>Phần mềm HiệpPOS tích hợp sẵn</li><li>Hỗ trợ thanh toán QR Code</li></ul>",
      price: 15900000,
      originalPrice: 18500000,
      badge: "Bán chạy",
      warranty: "12 tháng",
      isFeatured: true,
      isActive: true,
      sortOrder: 1,
    },
    {
      categoryId: catIn.id,
      name: "Máy in hóa đơn nhiệt KV804",
      slug: "may-in-hoa-don-nhiet-kv804",
      description: "Máy in hóa đơn nhiệt tốc độ cao 250mm/s, khổ giấy 80mm, kết nối USB + LAN + Serial, thiết kế compact.",
      fullDescription: "<h3>Thông số kỹ thuật</h3><ul><li>Tốc độ in: 250mm/s</li><li>Khổ giấy: 80mm</li><li>Kết nối: USB, LAN, Serial</li><li>Nguồn: 12V/2A</li><li>Kích thước: 145x195x145mm</li></ul>",
      price: 1200000,
      originalPrice: 1500000,
      badge: "Giảm 20%",
      warranty: "12 tháng",
      isFeatured: true,
      isActive: true,
      sortOrder: 2,
    },
    {
      categoryId: catIn.id,
      name: "Máy in tem nhãn mã vạch 365B",
      slug: "may-in-tem-nhan-ma-vach-365b",
      description: "Máy in mã vạch nhiệt trực tiếp và nhiệt chuyển, tốc độ 127mm/s, độ phân giải 203dpi, hỗ trợ nhiều chuẩn mã vạch.",
      fullDescription: "<h3>Thông số kỹ thuật</h3><ul><li>Phương pháp in: Nhiệt trực tiếp / Nhiệt chuyển</li><li>Tốc độ in: 127mm/s</li><li>Độ phân giải: 203dpi</li><li>Khổ giấy: 25-108mm</li><li>Kết nối: USB, RS232</li></ul>",
      price: 2800000,
      originalPrice: null,
      badge: null,
      warranty: "12 tháng",
      isFeatured: false,
      isActive: true,
      sortOrder: 3,
    },
    {
      categoryId: catMayQue.id,
      name: "Máy quét mã vạch 1D/2D XL-6500A",
      slug: "may-quet-ma-vach-1d-2d-xl6500a",
      description: "Máy quét mã vạch laser 1D và 2D (QR Code), kết nối USB, tốc độ quét nhanh 1000 lần/giây, phù hợp siêu thị, nhà hàng.",
      fullDescription: "<h3>Thông số kỹ thuật</h3><ul><li>Loại: 1D/2D Imager</li><li>Tốc độ quét: 1000 lần/giây</li><li>Kết nối: USB HID</li><li>Nguồn: USB 5V</li><li>Khoảng cách đọc: 5-40cm</li></ul>",
      price: 850000,
      originalPrice: 1200000,
      badge: "Giảm 30%",
      warranty: "12 tháng",
      isFeatured: true,
      isActive: true,
      sortOrder: 4,
    },
    {
      categoryId: catMayQue.id,
      name: "Máy quét mã vạch 1D XL-2302",
      slug: "may-quet-ma-vach-1d-xl2302",
      description: "Máy quét mã vạch laser 1D giá rẻ, thiết kế cầm tay, kết nối USB, bền bỉ phù hợp dùng hàng ngày.",
      fullDescription: "<h3>Thông số kỹ thuật</h3><ul><li>Loại: 1D Laser</li><li>Kết nối: USB HID</li><li>Nguồn: USB 5V</li><li>Khoảng cách đọc: 5-50cm</li></ul>",
      price: 450000,
      originalPrice: null,
      badge: null,
      warranty: "6 tháng",
      isFeatured: false,
      isActive: true,
      sortOrder: 5,
    },
    {
      categoryId: catVatTu.id,
      name: "Giấy in hóa đơn nhiệt K80 (80x80mm)",
      slug: "giay-in-hoa-don-nhiet-k80",
      description: "Giấy in nhiệt cuộn K80 (80x80mm), dùng cho máy in hóa đơn khổ 80mm, giấy trắng bề mặt mịn, in sắc nét, chịu nhiệt tốt.",
      fullDescription: "<p>Cuộn giấy in nhiệt K80 tiêu chuẩn:</p><ul><li>Khổ: 80mm</li><li>Đường kính: 80mm</li><li>Lõi: 12mm</li><li>Loại: Giấy nhiệt không cần mực</li><li>Đóng gói: 10 cuộn/hộp</li></ul>",
      price: 85000,
      originalPrice: null,
      badge: null,
      warranty: null,
      isFeatured: false,
      isActive: true,
      sortOrder: 6,
    },
    {
      categoryId: catVatTu.id,
      name: "Giấy in tem trà sữa nhãn dán 50x30mm",
      slug: "giay-in-tem-tra-sua-50x30",
      description: "Giấy in tem trà sữa tự dính 50x30mm, phù hợp máy in tem nhãn, bề mặt nhãn bóng, keo dính chắc, chịu nước tốt.",
      fullDescription: "<p>Thông số cuộn tem nhãn:</p><ul><li>Kích thước: 50x30mm</li><li>Số nhãn/cuộn: 500 nhãn</li><li>Đóng gói: 5 cuộn/hộp</li><li>Chất liệu: Giấy tự dính bóng</li></ul>",
      price: 120000,
      originalPrice: null,
      badge: null,
      warranty: null,
      isFeatured: false,
      isActive: true,
      sortOrder: 7,
    },
    {
      categoryId: catPhuKien.id,
      name: "Két tiền dùng với máy POS (kết nối máy in)",
      slug: "ket-tien-dung-voi-may-pos",
      description: "Két tiền inox cao cấp, kết nối tự động với máy in hóa đơn qua cổng RJ11, 4 ngăn tờ + 8 ngăn xu, chốt khóa bảo mật.",
      fullDescription: "<h3>Thông số kỹ thuật</h3><ul><li>Kết nối: RJ11 (cổng két tiền máy in)</li><li>Ngăn tờ: 4 ngăn</li><li>Ngăn xu: 8 ngăn</li><li>Kích thước: 330x380x100mm</li><li>Vật liệu: Thép + Inox</li></ul>",
      price: 1650000,
      originalPrice: null,
      badge: null,
      warranty: "6 tháng",
      isFeatured: false,
      isActive: true,
      sortOrder: 8,
    },
    {
      categoryId: catPhuKien.id,
      name: "Màn hình hiển thị QR thanh toán khách hàng",
      slug: "man-hinh-hien-thi-qr-thanh-toan",
      description: "Màn hình phụ hiển thị QR thanh toán cho khách, tích hợp VietQR, kết nối USB, màn hình LCD 10.1 inch.",
      fullDescription: "<h3>Thông số kỹ thuật</h3><ul><li>Màn hình: LCD 10.1 inch</li><li>Độ phân giải: 1280x800</li><li>Kết nối: USB, HDMI</li><li>Tích hợp: VietQR, QR động</li></ul>",
      price: 0,
      originalPrice: null,
      badge: "Liên hệ",
      warranty: "12 tháng",
      isFeatured: false,
      isActive: true,
      sortOrder: 9,
    },
  ];

  let productCount = 0;
  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      await prisma.product.create({ data: p });
      productCount++;
    }
  }
  console.log(`✅ Sản phẩm: ${productCount} mới / ${products.length} tổng`);

  // ==========================================
  // ARTICLES
  // ==========================================
  const now = new Date();
  const articles = [
    {
      categoryId: catTinTuc.id,
      type: "NEWS",
      title: "Phần mềm Hiệp POS v3.2 - Nâng cấp toàn diện tính năng báo cáo",
      slug: "phan-mem-hiep-pos-v3-2-nang-cap-bao-cao",
      excerpt: "Phiên bản 3.2 mang đến giao diện báo cáo mới hoàn toàn, hỗ trợ xuất Excel, biểu đồ doanh thu trực quan và so sánh theo kỳ.",
      content: "<h2>Điểm mới trong HiệpPOS v3.2</h2><p>Chúng tôi vừa phát hành phiên bản 3.2 với nhiều cải tiến đáng kể:</p><ul><li>Giao diện báo cáo hoàn toàn mới</li><li>Xuất báo cáo Excel/PDF</li><li>Biểu đồ doanh thu theo ngày/tuần/tháng</li><li>So sánh doanh thu theo kỳ</li><li>Cảnh báo tồn kho thấp</li></ul><p>Cập nhật miễn phí cho tất cả khách hàng hiện tại.</p>",
      featuredImage: "/images/news-01.jpg",
      readingTime: 4,
      isPublished: true,
      publishedAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
    },
    {
      categoryId: catHuongDan.id,
      type: "GUIDE",
      title: "Hướng dẫn cài đặt và cấu hình máy in hóa đơn KV804",
      slug: "huong-dan-cai-dat-may-in-hoa-don-kv804",
      excerpt: "Hướng dẫn chi tiết từng bước cài đặt driver, kết nối và cấu hình máy in hóa đơn KV804 với phần mềm HiệpPOS.",
      content: "<h2>Bước 1: Cài đặt Driver</h2><p>Tải driver KV804 từ trang hỗ trợ của chúng tôi và chạy file cài đặt.</p><h2>Bước 2: Kết nối máy in</h2><p>Kết nối máy in với máy tính qua cổng USB hoặc LAN.</p><h2>Bước 3: Cấu hình trong HiệpPOS</h2><p>Vào Cài đặt → Máy in → Chọn máy in KV804 → Lưu.</p><h2>Bước 4: In thử</h2><p>Nhấn \"In thử\" để kiểm tra kết nối.</p>",
      featuredImage: "/images/news-02.jpg",
      readingTime: 6,
      isPublished: true,
      publishedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      categoryId: catTinTuc.id,
      type: "SECURITY",
      title: "Hiệp POS đạt chứng chỉ bảo mật dữ liệu ISO/IEC 27001:2022",
      slug: "hiep-pos-dat-chung-chi-bao-mat-iso-27001",
      excerpt: "Hệ thống HiệpPOS chính thức được cấp chứng nhận bảo mật thông tin ISO/IEC 27001:2022, khẳng định cam kết bảo vệ dữ liệu khách hàng.",
      content: "<p>Chúng tôi vui mừng thông báo HiệpPOS đã đạt chứng chỉ ISO/IEC 27001:2022 - tiêu chuẩn bảo mật thông tin quốc tế cao nhất.</p><h3>Ý nghĩa của chứng chỉ</h3><ul><li>Dữ liệu của bạn được mã hóa end-to-end</li><li>Hệ thống backup tự động 3 lần/ngày</li><li>Kiểm tra bảo mật định kỳ bởi bên thứ 3</li></ul>",
      featuredImage: "/images/news-03.jpg",
      readingTime: 3,
      isPublished: true,
      publishedAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
    },
    {
      categoryId: catHuongDan.id,
      type: "TIPS",
      title: "5 mẹo tối ưu doanh thu cuối tuần cho cửa hàng bán lẻ",
      slug: "5-meo-toi-uu-doanh-thu-cuoi-tuan",
      excerpt: "Áp dụng 5 chiến lược đơn giản sau đây để tăng doanh thu cuối tuần cho cửa hàng của bạn lên tới 30%.",
      content: "<h2>1. Chuẩn bị hàng tồn kho trước cuối tuần</h2><p>Kiểm tra báo cáo tồn kho vào thứ 5 và bổ sung hàng kịp thời.</p><h2>2. Tạo combo khuyến mãi cuối tuần</h2><p>Thiết lập combo sản phẩm với giá ưu đãi chỉ áp dụng thứ 7 - chủ nhật.</p><h2>3. Kích hoạt tích điểm thưởng</h2><p>Nhân đôi điểm tích lũy cho đơn hàng cuối tuần.</p><h2>4. Theo dõi giờ cao điểm</h2><p>Dùng báo cáo HiệpPOS để xác định khung giờ đông khách và bố trí nhân viên hợp lý.</p><h2>5. Gửi thông báo khuyến mãi</h2><p>Gửi SMS/Zalo thông báo khuyến mãi cho khách hàng thân thiết vào tối thứ 6.</p>",
      featuredImage: "/images/news-04.jpg",
      readingTime: 5,
      isPublished: true,
      publishedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      categoryId: catHuongDan.id,
      type: "GUIDE",
      title: "Quản lý kho hàng thông minh với phần mềm POS HiệpPOS",
      slug: "quan-ly-kho-hang-thong-minh-hieppos",
      excerpt: "Tính năng quản lý kho của HiệpPOS giúp bạn kiểm soát tồn kho real-time, cảnh báo hàng sắp hết và lập đơn nhập hàng tự động.",
      content: "<h2>Tính năng quản lý kho trong HiệpPOS</h2><p>Module kho hàng tích hợp trực tiếp với điểm bán giúp tự động trừ kho khi có giao dịch.</p><h3>Các tính năng chính</h3><ul><li>Cập nhật tồn kho real-time sau mỗi giao dịch</li><li>Cảnh báo khi tồn kho dưới ngưỡng tối thiểu</li><li>Báo cáo hàng chậm/nhanh chạy</li><li>Nhập kho bằng scan mã vạch</li><li>Kiểm kê kho định kỳ</li></ul>",
      featuredImage: "/images/news-05.jpg",
      readingTime: 7,
      isPublished: true,
      publishedAt: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000),
    },
    {
      categoryId: catTinTuc.id,
      type: "NEWS",
      title: "Hóa đơn điện tử bắt buộc từ 01/07/2025 - Doanh nghiệp cần chuẩn bị gì?",
      slug: "hoa-don-dien-tu-bat-buoc-2025",
      excerpt: "Theo Nghị định 123/2020/NĐ-CP, từ 01/07/2025 tất cả doanh nghiệp phải sử dụng hóa đơn điện tử. HiệpPOS đã sẵn sàng tích hợp.",
      content: "<h2>Quy định mới về hóa đơn điện tử</h2><p>Bộ Tài chính yêu cầu 100% doanh nghiệp chuyển sang hóa đơn điện tử từ 01/07/2025.</p><h3>HiệpPOS hỗ trợ gì?</h3><ul><li>Tích hợp với các nhà cung cấp HĐĐT uy tín</li><li>Phát hành HĐĐT tự động sau mỗi giao dịch</li><li>Lưu trữ và tra cứu HĐĐT dễ dàng</li><li>Hỗ trợ kết nối cơ quan thuế</li></ul>",
      featuredImage: "/images/news-06.jpg",
      readingTime: 5,
      isPublished: false,
      publishedAt: null,
    },
  ];

  let articleCount = 0;
  for (const a of articles) {
    const existing = await prisma.article.findUnique({ where: { slug: a.slug } });
    if (!existing) {
      await prisma.article.create({ data: a });
      articleCount++;
    }
  }
  console.log(`✅ Bài viết: ${articleCount} mới / ${articles.length} tổng`);

  // ==========================================
  // DRIVERS
  // ==========================================
  const drivers = [
    {
      categoryId: catDriverIn.id,
      name: "Driver Máy In KV804",
      slug: "driver-may-in-kv804",
      model: "KV804",
      description: "Driver chính thức cho máy in hóa đơn nhiệt KV804. Hỗ trợ Windows 7/8/10/11 (32/64-bit).",
      version: "v3.1.2",
      printerType: "Thermal",
      files: [
        { os: "Windows 10/11 64-bit", url: "/downloads/kv804-win64.zip", size: "12.5 MB" },
        { os: "Windows 7/8 32-bit", url: "/downloads/kv804-win32.zip", size: "11.2 MB" },
      ],
      isActive: true,
      sortOrder: 1,
    },
    {
      categoryId: catDriverIn.id,
      name: "Driver Máy In Tem Nhãn 365B",
      slug: "driver-may-in-tem-nhan-365b",
      model: "365B",
      description: "Driver cho máy in tem nhãn mã vạch 365B. Kèm phần mềm thiết kế nhãn BarTender Lite.",
      version: "v2.4.0",
      printerType: "Label",
      files: [
        { os: "Windows 10/11 64-bit", url: "/downloads/365b-win64.zip", size: "28.3 MB" },
        { os: "Windows 7/8 32-bit", url: "/downloads/365b-win32.zip", size: "26.1 MB" },
      ],
      isActive: true,
      sortOrder: 2,
    },
    {
      categoryId: catDriverIn.id,
      name: "Driver Máy In XPrinter XP-58",
      slug: "driver-may-in-xprinter-xp58",
      model: "XP-58",
      description: "Driver máy in hóa đơn nhiệt mini XPrinter XP-58 (khổ 58mm). Hỗ trợ kết nối Bluetooth và USB.",
      version: "v1.8.5",
      printerType: "Thermal",
      files: [
        { os: "Windows 10/11", url: "/downloads/xp58-win.zip", size: "8.7 MB" },
        { os: "Android", url: "/downloads/xp58-android.apk", size: "5.2 MB" },
      ],
      isActive: true,
      sortOrder: 3,
    },
    {
      categoryId: catDriverQue.id,
      name: "Driver Máy Quét XL-6500A",
      slug: "driver-may-quet-xl6500a",
      model: "XL-6500A",
      description: "Driver và công cụ cấu hình cho máy quét mã vạch XL-6500A. Hỗ trợ cấu hình chế độ đọc, suffix/prefix.",
      version: "v1.2.0",
      printerType: null,
      files: [
        { os: "Windows (All)", url: "/downloads/xl6500a-config.zip", size: "3.1 MB" },
      ],
      isActive: true,
      sortOrder: 4,
    },
    {
      categoryId: catDriverQue.id,
      name: "Driver Máy Quét XL-2302",
      slug: "driver-may-quet-xl2302",
      model: "XL-2302",
      description: "Driver Plug & Play cho máy quét XL-2302. Thường không cần cài driver, nhưng file này hỗ trợ Windows XP/7 cũ.",
      version: "v1.0.1",
      printerType: null,
      files: [
        { os: "Windows XP/7", url: "/downloads/xl2302-legacy.zip", size: "1.8 MB" },
      ],
      isActive: true,
      sortOrder: 5,
    },
    {
      categoryId: catDriverIn.id,
      name: "Driver Máy In Epson TM-T82",
      slug: "driver-may-in-epson-tmt82",
      model: "TM-T82",
      description: "Driver Epson TM-T82 chính thức từ Epson. Hỗ trợ kết nối USB, Serial, Ethernet.",
      version: "v7.6.0",
      printerType: "Thermal",
      files: [
        { os: "Windows 10/11 64-bit", url: "/downloads/epson-tmt82-win64.exe", size: "45.2 MB" },
        { os: "macOS", url: "/downloads/epson-tmt82-mac.pkg", size: "38.6 MB" },
      ],
      isActive: true,
      sortOrder: 6,
    },
  ];

  let driverCount = 0;
  for (const d of drivers) {
    const existing = await prisma.driver.findUnique({ where: { slug: d.slug } });
    if (!existing) {
      await prisma.driver.create({ data: d });
      driverCount++;
    }
  }
  console.log(`✅ Driver: ${driverCount} mới / ${drivers.length} tổng`);

  console.log("\n🎉 Seed hoàn thành!");
}

async function upsertCategory({ slug, name, type, showInMenu = false, menuOrder = 0 }) {
  return prisma.category.upsert({
    where: { slug },
    update: { name, showInMenu, menuOrder },
    create: { slug, name, type, showInMenu, menuOrder, isActive: true },
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
