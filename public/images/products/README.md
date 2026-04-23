# Product Images Directory

Thư mục này dùng để lưu trữ hình ảnh các sản phẩm trên trang About Us.

## Cấu trúc hình ảnh cần thiết:

### Các hình ảnh bắt buộc:
1. **pos-machine.png** - Ảnh máy POS bán hàng
2. **thermal-printer.png** - Ảnh máy in hóa đơn nhiệt
3. **label-printer.png** - Ảnh máy in tem & nhãn
4. **thermal-paper.png** - Ảnh giấy in nhiệt
5. **barcode-scanner.png** - Ảnh máy quét mã vạch

## Yêu cầu hình ảnh:
- **Định dạng**: PNG, JPG, WebP
- **Kích thước**: Tối thiểu 300x300px, tối ưu 400x400px hoặc 500x500px
- **Nền**: Nền trắng hoặc minh bạch để tương thích với background #f8f9fa của product-image
- **Hướng**: Ảnh sản phẩm cân bằng, dễ nhìn

## Hướng dẫn thêm ảnh:

1. Chuẩn bị các file PNG/JPG cho từng sản phẩm
2. Lưu vào thư mục này với tên tương ứng ở trên
3. Hình ảnh sẽ tự động hiển thị trên trang About Us

## Lưu ý:
- Các hình ảnh sẽ được hiển thị ở kích thước 200px x 200px (do CSS styling)
- Sử dụng `object-fit: contain` để đảm bảo hình ảnh không bị cắt và hiển thị toàn bộ
- Nếu hình ảnh chưa có, CSS sẽ hiển thị background là #f8f9fa (xám nhạt)
