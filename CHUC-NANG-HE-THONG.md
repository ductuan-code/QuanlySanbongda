# DANH SÁCH CHỨC NĂNG HỆ THỐNG ĐẶT SÂN BÓNG

## 1. CHỨC NĂNG USER (Người dùng)

### 1.1 Quản lý tài khoản
- Đăng ký tài khoản mới
- Đăng nhập/Đăng xuất  
- Xem thông tin cá nhân
- Cập nhật thông tin cá nhân
- Đổi mật khẩu

### 1.2 Tìm kiếm và xem sân
- Xem danh sách tất cả sân bóng
- Xem chi tiết từng sân (hình ảnh, giá, tiện nghi)
- Tìm kiếm sân theo tên
- Lọc sân theo khu vực/quận
- Lọc sân theo loại (5v5, 7v7, 11v11)
- Lọc sân theo mức giá
- Xem đánh giá và rating của sân

### 1.3 Đặt sân
- Chọn sân muốn đặt
- Chọn ngày đặt sân
- Xem lịch trống theo ngày (các khung giờ available)
- Chọn khung giờ muốn đặt
- Xem tổng tiền cần thanh toán
- Xác nhận thông tin đặt sân
- Thanh toán online
- Nhận xác nhận đặt sân

### 1.4 Quản lý booking
- Xem danh sách lịch đặt của mình
- Xem chi tiết từng booking
- Hủy booking (nếu còn thời gian)
- Xem lịch sử đặt sân
- Xem trạng thái booking (pending, confirmed, cancelled, completed)

## 2. CHỨC NĂNG OWNER (Chủ sân)

### 2.1 Quản lý sân bóng
- Thêm sân bóng mới
- Cập nhật thông tin sân (tên, địa chỉ, mô tả, hình ảnh)
- Cập nhật giá theo khung giờ
- Cập nhật tiện nghi sân
- Xóa sân (nếu không có booking)
- Xem danh sách sân của mình

### 2.2 Quản lý booking
- Xem tất cả booking của các sân mình
- Lọc booking theo sân, theo ngày
- Xác nhận booking từ khách hàng
- Hủy booking (với lý do)
- Xem thống kê booking theo ngày/tháng

### 2.3 Quản lý lịch sân
- Xem lịch đặt của từng sân
- Khóa khung giờ (maintenance, sự kiện riêng)
- Mở khóa khung giờ
- Cập nhật giá theo khung giờ đặc biệt

### 2.4 Báo cáo doanh thu
- Xem doanh thu theo ngày/tháng/năm
- Xem biểu đồ doanh thu
- Xuất báo cáo Excel/PDF
- Thống kê sân được đặt nhiều nhất

## 3. CHỨC NĂNG ADMIN (Quản trị viên)

### 3.1 Quản lý người dùng
- Xem danh sách tất cả user
- Tìm kiếm user theo email/tên
- Xem chi tiết thông tin user
- Khóa/mở khóa tài khoản user
- Thay đổi role user (user ↔ owner)
- Xóa tài khoản user

### 3.2 Quản lý sân bóng
- Xem danh sách tất cả sân trong hệ thống
- Duyệt sân mới từ owner
- Từ chối sân không đạt yêu cầu
- Xóa sân vi phạm quy định
- Cập nhật trạng thái sân (active, inactive, banned)

### 3.3 Quản lý booking
- Xem tất cả booking trong hệ thống
- Lọc booking theo trạng thái, ngày, sân
- Hủy booking có vấn đề
- Xử lý khiếu nại từ user/owner
- Hoàn tiền cho user (nếu cần)

### 3.4 Báo cáo và thống kê
- Dashboard tổng quan hệ thống
- Thống kê số lượng user, owner, sân, booking
- Báo cáo doanh thu toàn hệ thống
- Thống kê sân hot nhất, owner có doanh thu cao
- Xuất báo cáo tổng hợp

### 3.5 Quản lý hệ thống
- Cấu hình thông số hệ thống
- Quản lý phí hoa hồng từ owner
- Backup/restore dữ liệu
- Xem log hoạt động hệ thống

## 4. CHỨC NĂNG CHUNG

### 4.1 Authentication & Authorization
- JWT token authentication
- Role-based access control
- Session management
- Password encryption

### 4.2 Notification
- Email xác nhận đăng ký
- Email xác nhận booking
- Thông báo hủy booking
- Reminder trước giờ đá bóng

### 4.3 Payment
- Tích hợp VNPay/Momo
- Thanh toán bằng thẻ
- Lịch sử giao dịch
- Hoàn tiền tự động

### 4.4 Search & Filter
- Full-text search
- Advanced filtering
- Sorting options
- Pagination

## 5. BUSINESS RULES

### 5.1 Booking Rules
- Chỉ được đặt sân tối thiểu 2 giờ trước
- Tối đa đặt 7 ngày trước
- Mỗi user tối đa 3 booking pending cùng lúc
- Hủy booking phải trước 4 giờ để được hoàn tiền

### 5.2 Payment Rules
- Thanh toán ngay khi đặt sân
- Hoàn tiền 80% nếu hủy trước 24h
- Hoàn tiền 50% nếu hủy trước 4h
- Không hoàn tiền nếu hủy trong 4h

### 5.3 Field Rules
- Sân phải có ít nhất 3 hình ảnh
- Giá sân từ 100,000đ - 1,000,000đ/giờ
- Mở cửa từ 6h - 22h hàng ngày
- Owner phải xác nhận booking trong 2 giờ

## 6. TECHNICAL REQUIREMENTS

### 6.1 Performance
- Load time < 3 seconds
- Support 1000+ concurrent users
- 99.9% uptime

### 6.2 Security
- HTTPS encryption
- SQL injection prevention
- XSS protection
- Rate limiting

### 6.3 Compatibility
- Responsive design (mobile, tablet, desktop)
- Cross-browser support
- PWA capabilities