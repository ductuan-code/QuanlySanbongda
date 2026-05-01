# BÁO CÁO ĐỒ ÁN: HỆ THỐNG ĐẶT SÂN BÓNG TRỰC TUYẾN

## 1. THÔNG TIN CHUNG

**Tên đồ án:** Hệ thống đặt sân bóng trực tuyến (FootballPro)  
**Công nghệ:** React + TypeScript + Ant Design + Node.js API  
**Repository:** https://github.com/ductuan-code/QuanlySanbongda  

## 2. MÔ TẢ HỆ THỐNG

### 2.1 Mục tiêu
Xây dựng hệ thống web cho phép người dùng:
- Tìm kiếm và xem thông tin sân bóng
- Đặt sân trực tuyến
- Quản lý lịch đặt sân
- Thanh toán trực tuyến

### 2.2 Đối tượng sử dụng
- **User (Người dùng):** Đặt sân, xem lịch đặt
- **Owner (Chủ sân):** Quản lý sân, xác nhận booking
- **Admin (Quản trị viên):** Quản lý toàn hệ thống

## 3. PHÂN TÍCH HỆ THỐNG

### 3.1 Use Case Diagram

#### Use Case: Quản lý tài khoản
| Use Case ID | Tên Use Case | Actor | Tiền điều kiện | Hậu điều kiện |
|-------------|--------------|-------|----------------|---------------|
| UC-TK-01 | Đăng ký tài khoản | User | Người dùng chưa có tài khoản | Tài khoản mới được tạo thành công |
| UC-TK-02 | Đăng nhập/Đăng xuất | User | Người dùng đã có tài khoản | Người dùng đăng nhập thành công vào hệ thống |
| UC-TK-03 | Cập nhật thông tin cá nhân | User | Người dùng đã đăng nhập | Thông tin cá nhân được cập nhật |
| UC-TK-04 | Đổi mật khẩu | User | Người dùng đã đăng nhập | Mật khẩu được thay đổi thành công |

#### Use Case: Tìm kiếm và xem sân
| Use Case ID | Tên Use Case | Actor | Tiền điều kiện | Hậu điều kiện |
|-------------|--------------|-------|----------------|---------------|
| UC-TS-01 | Xem danh sách sân | User | Không | Hiển thị danh sách sân có sẵn |
| UC-TS-02 | Xem chi tiết sân | User | Đã chọn một sân | Hiển thị thông tin chi tiết sân |
| UC-TS-03 | Tìm kiếm theo khu vực | User | Không | Hiển thị sân theo khu vực được chọn |
| UC-TS-04 | Lọc theo giá | User | Không | Hiển thị sân theo mức giá |
| UC-TS-05 | Lọc theo loại sân | User | Không | Hiển thị sân theo loại (5v5, 7v7, 11v11) |
| UC-TS-06 | Xem lịch trống theo ngày | User | Đã chọn sân | Hiển thị các khung giờ còn trống |

#### Use Case: Đặt sân
| Use Case ID | Tên Use Case | Actor | Tiền điều kiện | Hậu điều kiện |
|-------------|--------------|-------|----------------|---------------|
| UC-DS-01 | Chọn khung giờ | User | Đã đăng nhập, đã chọn sân | Khung giờ được chọn |
| UC-DS-02 | Xác nhận đặt sân | User | Đã chọn khung giờ | Booking được tạo |
| UC-DS-03 | Thanh toán | User | Đã xác nhận đặt sân | Thanh toán thành công |
| UC-DS-04 | Xem lịch đặt của tôi | User | Đã đăng nhập | Hiển thị danh sách booking |
| UC-DS-05 | Hủy đặt sân | User | Có booking hợp lệ | Booking bị hủy |

### 3.2 Luồng sự kiện chính

#### UC-TK-01: Đăng ký tài khoản
**Luồng chính:**
1. Người dùng truy cập trang đăng ký
2. Người dùng nhập thông tin (họ tên, email, số điện thoại, mật khẩu)
3. Người dùng nhấn nút Đăng ký
4. Hệ thống kiểm tra dữ liệu hợp lệ
5. Hệ thống lưu thông tin vào cơ sở dữ liệu
6. Hệ thống thông báo đăng ký thành công

**Luồng phụ:**
- Thiếu hoặc sai thông tin → Hệ thống thông báo lỗi và yêu cầu nhập lại
- Email đã tồn tại → Hệ thống yêu cầu sử dụng email khác

#### UC-DS-01: Đặt sân
**Luồng chính:**
1. Người dùng đăng nhập vào hệ thống
2. Người dùng tìm kiếm và chọn sân
3. Người dùng chọn ngày đặt sân
4. Hệ thống hiển thị lịch trống
5. Người dùng chọn khung giờ
6. Người dùng xác nhận thông tin đặt sân
7. Hệ thống tạo booking và chờ thanh toán
8. Người dùng thanh toán
9. Hệ thống xác nhận đặt sân thành công

**Luồng phụ:**
- Khung giờ đã được đặt → Hệ thống thông báo và đề xuất khung giờ khác
- Thanh toán thất bại → Hệ thống hủy booking

## 4. THIẾT KẾ HỆ THỐNG

### 4.1 Kiến trúc hệ thống
```
Frontend (React)  ←→  Backend API  ←→  Database
     ↓
  Ant Design UI
```

### 4.2 Công nghệ sử dụng

**Frontend:**
- React 19.2.4 + TypeScript
- Ant Design 6.3.3 (UI Components)
- React Router 7.13.2 (Routing)
- Axios (HTTP Client)
- Recharts (Charts)

**Backend:**
- .NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication

### 4.3 Cấu trúc thư mục
```
src/
├── components/          # Shared components
├── contexts/           # React contexts (Auth, Booking)
├── hooks/              # Custom hooks
├── layouts/            # Layout components
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript types
└── data/               # Mock data
```

## 5. CHỨC NĂNG ĐÃ THỰC HIỆN

### 5.1 Chức năng User
✅ **Đăng ký/Đăng nhập:** Form validation, JWT authentication  
✅ **Trang chủ:** Hero section, featured fields, testimonials  
✅ **Danh sách sân:** Grid layout, responsive design  
✅ **Chi tiết sân:** Thông tin sân, bảng giá, hình ảnh  
✅ **Đặt sân:** Chọn khung giờ, modal xác nhận  
✅ **Profile:** Xem/sửa thông tin, đổi mật khẩu, lịch sử đặt sân  
✅ **Responsive:** Mobile-first design  

### 5.2 Chức năng Owner
✅ **Owner Dashboard:** Thống kê doanh thu, booking  
✅ **Quản lý sân:** CRUD operations  
✅ **Quản lý booking:** Xác nhận, hủy booking  
✅ **Báo cáo doanh thu:** Charts và statistics  

### 5.3 Chức năng Admin
✅ **Admin Dashboard:** Tổng quan hệ thống  
✅ **Quản lý users:** Danh sách, khóa tài khoản  
✅ **Quản lý sân:** Duyệt, xóa sân  
✅ **Báo cáo:** Revenue, booking statistics  

## 6. GIAO DIỆN NGƯỜI DÙNG

### 6.1 Thiết kế UI/UX
- **Design System:** Ant Design với custom theme
- **Color Scheme:** Green primary (#10B981), modern và professional
- **Typography:** Clean, readable fonts
- **Layout:** Responsive grid system
- **Components:** Reusable, consistent styling

### 6.2 Responsive Design
- **Mobile First:** Tối ưu cho mobile trước
- **Breakpoints:** xs, sm, md, lg, xl
- **Flexible Layout:** CSS Grid và Flexbox
- **Touch Friendly:** Button sizes, spacing

## 7. TÍCH HỢP API

### 7.1 Authentication
```typescript
// Login API call
const response = await authAPI.login({ email, password });
// JWT token được lưu trong localStorage
localStorage.setItem('authToken', response.data.token);
```

### 7.2 Booking Management
```typescript
// Create booking
const bookingData = {
  fieldId: parseInt(field.id),
  bookingDate: selectedDate,
  startTime: selectedSlots[0].startTime,
  endTime: selectedSlots[selectedSlots.length - 1].endTime
};
await bookingsAPI.createBooking(bookingData);
```

### 7.3 Error Handling
- Axios interceptors cho global error handling
- CORS configuration
- Loading states và user feedback

## 8. TESTING VÀ DEPLOYMENT

### 8.1 Testing
- Manual testing cho tất cả user flows
- Cross-browser compatibility
- Responsive testing trên nhiều devices

### 8.2 Version Control
- Git với meaningful commit messages
- GitHub repository với proper branching
- Code review và documentation

## 9. KẾT LUẬN

### 9.1 Kết quả đạt được
- ✅ Hoàn thành đầy đủ chức năng theo yêu cầu
- ✅ Giao diện đẹp, responsive, user-friendly
- ✅ Tích hợp thành công với backend API
- ✅ Code clean, có cấu trúc, dễ maintain

### 9.2 Hạn chế và hướng phát triển
**Hạn chế:**
- Chưa có real-time notifications
- Payment gateway chưa tích hợp thực tế
- Chưa có mobile app

**Hướng phát triển:**
- Thêm WebSocket cho real-time updates
- Tích hợp VNPay, Momo payment
- Phát triển mobile app với React Native
- Thêm AI recommendation system

### 9.3 Kinh nghiệm học được
- Làm việc với React ecosystem hiện đại
- Tích hợp frontend-backend qua REST API
- Xử lý authentication và authorization
- Responsive design và UX optimization
- Git workflow và collaboration

---

**Ngày hoàn thành:** 25/04/2026  
**Sinh viên thực hiện:** [Tên sinh viên]  
**Lớp:** [Tên lớp]  
**MSSV:** [Mã số sinh viên]