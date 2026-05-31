# HƯỚNG DẪN BẢO VỆ ĐỒ ÁN — HỆ THỐNG ĐẶT & QUẢN LÝ SÂN BÓNG

> Tài liệu tổng hợp toàn bộ chức năng và kiến thức cốt lõi của dự án để học thuộc trước khi bảo vệ.
> Sinh viên: Nguyễn Đức Tuấn — Môn: Lập trình Web.

---

## 1. GIỚI THIỆU NGẮN GỌN (đọc khi mở đầu)

Đây là **website đặt và quản lý sân bóng đá trực tuyến**. Hệ thống có **3 vai trò**: Người dùng (User), Chủ sân (Owner) và Quản trị viên (Admin). Người dùng tìm sân, xem lịch trống, đặt sân và quản lý lịch của mình. Chủ sân quản lý sân, lịch đặt và xem doanh thu. Admin giám sát toàn hệ thống.

Đây là phần **Frontend (giao diện)** viết bằng **React + TypeScript**, giao tiếp với **Backend ASP.NET** qua **REST API**.

---

## 2. CÔNG NGHỆ SỬ DỤNG (phải nhớ chính xác)

| Thành phần | Công nghệ | Vai trò |
|---|---|---|
| Ngôn ngữ | **TypeScript** | JavaScript có kiểu dữ liệu, an toàn hơn |
| Thư viện UI | **React 19** | Xây dựng giao diện theo component |
| Thư viện giao diện | **Ant Design 6 (antd)** | Bộ component có sẵn: Table, Form, Modal, Card... |
| Định tuyến | **React Router DOM 7** | Chuyển trang không reload (SPA) |
| Gọi API | **Axios** | Gửi request HTTP đến backend |
| Biểu đồ | **Recharts** | Vẽ biểu đồ doanh thu |
| Khởi tạo dự án | **Create React App (react-scripts)** | Cấu hình sẵn build, dev server |

**Backend:** ASP.NET (chạy ở `http://localhost:5120/api`) — **Database:** SQL Server.

> Lưu ý: README cũ ghi "HTML, CSS, JavaScript" — thực tế dự án dùng **React + TypeScript + Ant Design**. Nếu thầy/cô hỏi thì trả lời theo bảng trên.

---

## 3. CẤU TRÚC THƯ MỤC (giải thích kiến trúc)

```
src/
├── types/        → Định nghĩa kiểu dữ liệu chung (User, FootballField, Booking, TimeSlot, Review)
├── services/     → api.ts: gom toàn bộ lời gọi API đến backend
├── contexts/     → State toàn cục: AuthContext (đăng nhập), BookingContext (đặt sân)
├── hooks/        → Logic tái sử dụng: useFields, useBookingSelection
├── components/   → Các thành phần dùng lại: BookingModal, TimeSlotTable, ProtectedRoute...
├── pages/        → Các trang theo vai trò: user / admin / owner
├── layouts/      → Khung giao diện: MainLayout, AdminLayout, OwnerLayout
├── data/         → mockData.ts (dữ liệu mẫu)
└── App.tsx       → Khai báo toàn bộ route (đường dẫn) của ứng dụng
```

**Ý tưởng kiến trúc:** Tách biệt rõ ràng — giao diện (pages/components), logic (hooks/contexts), và giao tiếp dữ liệu (services). Dễ bảo trì, dễ mở rộng.

---

## 4. CHỨC NĂNG THEO TỪNG VAI TRÒ

### 4.1. NGƯỜI DÙNG (User)
- **Đăng ký / Đăng nhập / Đăng xuất** (có xác thực bằng token JWT).
- **Trang chủ (HomePage):** banner, thanh tìm kiếm, sân nổi bật, giới thiệu cách hoạt động, đánh giá khách hàng.
- **Danh sách sân (FieldListPage):** xem tất cả sân, **lọc theo huyện/thành phố** và **lọc theo loại sân** (5v5 / 7v7 / 11v11).
- **Chi tiết sân (FieldDetailPage):** xem ảnh, thông tin, giá, tiện nghi, **xem lịch trống theo ngày**, **chọn nhiều khung giờ liên tiếp**, đặt sân.
- **Đặt sân:** chọn slot → xác nhận trong modal → gửi lên backend.
- **Lịch đặt của tôi (MyBookingsPage):** xem danh sách booking, **hủy lịch**.
- **Trang cá nhân (ProfilePage):** cập nhật thông tin, đổi mật khẩu, xem lịch sử đặt sân.
- **Đánh giá (Review):** viết nhận xét và chấm sao cho sân.

### 4.2. CHỦ SÂN (Owner)
- **Dashboard (OwnerDashboard):** thống kê tổng sân, tổng booking, booking chờ xác nhận, doanh thu, **biểu đồ doanh thu theo ngày** (Recharts), booking gần đây.
- **Quản lý sân (OwnerFields):** xem danh sách sân, **THÊM sân mới** và **SỬA thông tin sân** qua form (FieldFormModal).
- **Quản lý booking (OwnerBookings):** xem, **xác nhận booking**.
- **Doanh thu (OwnerRevenue):** xem báo cáo doanh thu.
- **Chặn khung giờ (block slot):** API có sẵn để khóa giờ không cho đặt.


### 4.3. QUẢN TRỊ VIÊN (Admin)
- **Dashboard (AdminDashboard):** tổng users, tổng sân, tổng booking, tổng doanh thu, tóm tắt trạng thái booking, users & sân gần đây.
- **Quản lý người dùng (ManageUsers):** xem danh sách, **tìm kiếm theo tên/email**, **lọc theo vai trò**, **khóa/mở tài khoản** (block).
- **Quản lý sân (ManageFields):** xem và quản lý toàn bộ sân, **xóa sân**.
- **Quản lý booking (ManageBookings):** xem toàn bộ lịch đặt trong hệ thống.
- **Báo cáo:** doanh thu theo thời gian, số lượng booking.

---

## 5. LUỒNG HOẠT ĐỘNG QUAN TRỌNG (nắm để trả lời "demo đi qua các bước nào")

### 5.1. Luồng đăng nhập
1. User nhập email + mật khẩu ở `LoginPage`.
2. Gọi `authAPI.login()` → backend trả về **token** + thông tin user.
3. Lưu token vào `localStorage` (`authToken`).
4. `AuthContext` lưu user vào state toàn cục → toàn app biết user đã đăng nhập.
5. Mỗi request sau đó tự gắn token vào header `Authorization: Bearer <token>` (qua **axios interceptor**).
6. Nếu token hết hạn (lỗi 401) → tự động xóa token và chuyển về trang login.

### 5.2. Luồng đặt sân (chức năng cốt lõi)
1. Vào chi tiết sân → chọn ngày bằng `DatePicker`.
2. Gọi API lấy lịch trống (`useFieldSchedule`) → hiển thị bảng khung giờ (`TimeSlotTable`).
3. User chọn các khung giờ. **Hook `useBookingSelection` xử lý:**
   - Chỉ cho chọn các khung giờ **liên tiếp nhau**.
   - Tự **tính tổng tiền**.
   - **Disable** các slot đã đặt hoặc không liền kề.
4. Bấm "Đặt sân" → mở `BookingModal` xác nhận.
5. Xác nhận → `BookingContext.addBooking()` gọi `bookingsAPI.createBooking()` → lưu vào backend.

### 5.3. Phân quyền (ProtectedRoute)
- Component `ProtectedRoute` bọc quanh các route cần bảo vệ.
- Chưa đăng nhập → chuyển về `/login`.
- Cần quyền admin mà không phải admin → chuyển về trang chủ.
- Cần quyền owner mà không phải owner → chuyển về trang chủ.

---

## 6. CÁC KHÁI NIỆM REACT PHẢI HIỂU (hay bị hỏi)

| Khái niệm | Giải thích ngắn | Dùng ở đâu trong bài |
|---|---|---|
| **Component** | Khối giao diện tái sử dụng | Tất cả file `.tsx` |
| **Props** | Dữ liệu cha truyền cho con | `TimeSlotTable`, `BookingModal` |
| **State (`useState`)** | Dữ liệu thay đổi trong component | Form, modal, danh sách... |
| **`useEffect`** | Chạy code khi component load / dữ liệu đổi | Gọi API khi mở trang |
| **`useMemo`** | Ghi nhớ kết quả tính toán, tránh tính lại | Tính tổng tiền, doanh thu |
| **Context API** | Chia sẻ state cho toàn app | `AuthContext`, `BookingContext` |
| **Custom Hook** | Tách logic ra dùng lại | `useFields`, `useBookingSelection` |
| **Routing** | Điều hướng giữa các trang | `App.tsx` với React Router |
| **Interceptor (Axios)** | Chặn request/response để xử lý chung | Gắn token, bắt lỗi 401 |

---

## 7. CÁC FILE QUAN TRỌNG NHẤT (nếu được hỏi "giải thích 1 file bất kỳ")

- **`src/services/api.ts`** — Trung tâm gọi API. Gom theo nhóm: `authAPI`, `fieldsAPI`, `bookingsAPI`, `paymentsAPI`, `ownerAPI`, `adminAPI`. Có 2 interceptor: 1 để gắn token, 1 để xử lý lỗi 401.
- **`src/contexts/AuthContext.tsx`** — Quản lý đăng nhập/đăng xuất, lưu user, kiểm tra vai trò (`isAdmin`, `isOwner`).
- **`src/contexts/BookingContext.tsx`** — Quản lý danh sách booking, thêm/hủy/làm mới booking.
- **`src/hooks/useBookingSelection.ts`** — Logic chọn nhiều khung giờ liên tiếp + tính tiền (điểm sáng của bài).
- **`src/components/ProtectedRoute.tsx`** — Bảo vệ route theo vai trò.
- **`src/App.tsx`** — Bản đồ toàn bộ đường dẫn của ứng dụng.

---

## 8. DỮ LIỆU CHÍNH (types) — phải nhớ các trường

- **User:** id, email, name, phone, role (`user` / `owner` / `admin`).
- **FootballField:** id, name, address, district, fieldType (5v5/7v7/11v11), pricePerHour, images, amenities, rating, ownerId.
- **TimeSlot:** id, fieldId, date, startTime, endTime, price, status (`available` / `booked` / `blocked`).
- **Booking:** id, userId, fieldId, date, startTime, endTime, totalPrice, status (`pending` / `confirmed` / `cancelled` / `completed`).
- **Review:** id, userId, userName, fieldId, rating (1–5 sao), comment.

---

## 8.5. CRUD CỦA HỆ THỐNG (RẤT HAY BỊ HỎI — HỌC KỸ)

CRUD = Create (Thêm) – Read (Xem) – Update (Sửa) – Delete (Xóa). Bài có **đầy đủ cả 4** và đều nối API thật:

| Thực thể | Create (Thêm) | Read (Xem) | Update (Sửa) | Delete (Xóa) |
|---|---|---|---|---|
| **Sân (Field)** | Owner thêm sân (`POST /owner/fields`) | Mọi người xem danh sách & chi tiết | Owner sửa sân (`PUT /owner/fields/{id}`) | Admin xóa sân (`DELETE /admin/fields/{id}`) |
| **Booking (Đặt sân)** | User đặt sân (`POST /bookings`) | User/Owner/Admin xem | User hủy, Owner xác nhận (`PUT .../cancel`, `.../confirm`) | — |
| **User (Tài khoản)** | Đăng ký (`POST /Auth/register`) | Admin xem danh sách | Admin khóa/mở (`PUT /admin/users/{id}/block`) | — |

**Cách trả lời mẫu khi giám khảo hỏi "Bài em có CRUD không?":**
> "Dạ có ạ. Rõ nhất là ở chức năng Quản lý sân của Chủ sân: em có **Thêm sân** và **Sửa sân** qua form, **Xem** danh sách sân, và **Xóa sân** ở phía Admin. Ngoài ra Booking và User cũng có các thao tác thêm/xem/cập nhật. Tất cả đều gọi API thật tới backend ASP.NET, lưu xuống SQL Server qua Entity Framework."

**Demo CRUD nhanh nhất:** Đăng nhập tài khoản **Owner** → vào **Quản lý sân** → bấm **Thêm sân** (điền form, lưu) → bấm **Sửa** trên một sân (đổi thông tin, lưu) → đăng nhập **Admin** → **Quản lý sân** → **Xóa** một sân.

**Về backend (kiến trúc 3 lớp) — nếu được hỏi:**
- **Controller** (vd `OwnerController`) nhận request HTTP, kiểm tra quyền bằng `[Authorize(Roles="OWNER")]`.
- **Service/BLL** (vd `OwnerService`) chứa logic nghiệp vụ: tạo/sửa sân, kiểm tra quyền sở hữu.
- **DAL + Entity Framework** thao tác với SQL Server (`_context.Fields.Add()`, `SaveChangesAsync()`).
- **DTO** (vd `CreateFieldDto`) là khuôn dữ liệu trao đổi giữa frontend và backend.

---

## 9. BỘ CÂU HỎI - TRẢ LỜI THƯỜNG GẶP KHI BẢO VỆ


**H: Vì sao chọn React mà không dùng HTML/JS thuần?**
Đ: React chia giao diện thành component tái sử dụng, quản lý state hiệu quả, là SPA nên chuyển trang nhanh không reload. Dùng TypeScript để bắt lỗi kiểu dữ liệu sớm.

**H: Phân quyền làm thế nào?**
Đ: Dùng component `ProtectedRoute` kiểm tra trạng thái đăng nhập và vai trò trong `AuthContext`. Nếu không đủ quyền sẽ điều hướng đi nơi khác.

**H: Token lưu ở đâu, bảo mật ra sao?**
Đ: Token JWT lưu trong `localStorage`. Mỗi request tự gắn token vào header. Khi token hết hạn (lỗi 401), hệ thống tự đăng xuất và chuyển về trang đăng nhập.

**H: Frontend giao tiếp với backend bằng cách nào?**
Đ: Qua REST API dùng thư viện Axios. Toàn bộ lời gọi gom trong `services/api.ts`. Dev có cấu hình proxy (`setupProxy.js`) chuyển `/api` sang `localhost:5120`.

**H: Chức năng nào khó/tâm đắc nhất?**
Đ: Logic đặt nhiều khung giờ liên tiếp trong `useBookingSelection` — phải kiểm tra slot liền kề, disable slot không hợp lệ và tự tính tổng tiền.

**H: Làm sao biết người dùng đã đăng nhập trên toàn app?**
Đ: Dùng Context API (`AuthContext`) để chia sẻ state người dùng cho mọi component, không phải truyền props qua nhiều cấp.

**H: State quản lý ở đâu?**
Đ: State cục bộ dùng `useState` trong từng component; state dùng chung (user, booking) đặt trong Context.

**H: Biểu đồ doanh thu vẽ bằng gì?**
Đ: Thư viện Recharts (`LineChart`), dữ liệu doanh thu theo ngày được gom bằng `useMemo` trong `OwnerDashboard`.

---

## 10. ĐIỂM CÓ THỂ CẢI TIẾN (nếu được hỏi hướng phát triển)

- Tích hợp **thanh toán online** thật (hiện đã có khung `paymentsAPI`).
- **Nối phần đánh giá (Review) vào API** để lưu vĩnh viễn (hiện đang lưu tạm trên giao diện).
- Gửi **email/thông báo** khi đặt sân thành công.
- **Tìm sân theo bản đồ** vị trí.
- Phát triển **ứng dụng di động**.

---

## 11. CHECKLIST TRƯỚC KHI DEMO

- [ ] Bật backend ASP.NET (cổng 5120) và SQL Server.
- [ ] Chạy `npm start` để mở frontend.
- [ ] Chuẩn bị sẵn tài khoản 3 vai trò: user, owner, admin.
- [ ] Demo theo thứ tự: Đăng nhập → Tìm/lọc sân → Đặt sân → Xem lịch của tôi → (đổi tài khoản) Owner xác nhận booking & xem doanh thu → Admin quản lý user/sân.
- [ ] Mở sẵn các file quan trọng ở mục 7 phòng khi cần giải thích code.

---
*Chúc bạn bảo vệ tốt! 💪*
