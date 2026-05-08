# BÁO CÁO ĐỒ ÁN - HỆ THỐNG ĐẶT SÂN THỂ THAO

## PHẦN 1: PHÂN TÍCH USE CASE

### 1.1. Tổng quan Use Case Diagram

Hệ thống có 3 actor chính:
- **User (Khách hàng)**: Người dùng đặt sân
- **Chủ sân (Field Owner)**: Người quản lý sân
- **Admin (Quản trị viên)**: Người quản lý hệ thống

**Đặc điểm Use Case Diagram**:
- Use case **"Đăng nhập"** là use case trung tâm
- Tất cả các chức năng chính đều `<<include>>` "Đăng nhập" (bắt buộc phải đăng nhập)
- Các use case được nhóm theo actor sử dụng

---

## 1.2. CHI TIẾT CÁC USE CASE

### USE CASE TRUNG TÂM: ĐĂNG NHẬP

#### Use Case: Đăng nhập
**Actor**: User, Chủ sân, Admin  
**Mô tả**: Xác thực người dùng để truy cập hệ thống

**Các use case phụ thuộc (<<include>> Đăng nhập)**:
- Quản lý tài khoản
- Tìm kiếm và xem sân
- Đặt sân
- Thanh toán
- Booking (Quản lý đặt sân)
- Quản lý sân (Chủ sân)
- Quản lý lịch hoạt động (Chủ sân)
- Quản lý booking (Chủ sân)
- Quản lý user (Admin)
- Kiểm tra sân (Admin)
- Báo cáo thống kê (Admin)
- Cấu hình hệ thống (Admin)

---

### NHÓM 1: USE CASE CHO USER (KHÁCH HÀNG)

#### 1.1. Quản lý tài khoản
**Actor**: User  
**Mô tả**: Quản lý thông tin tài khoản cá nhân

**Mối quan hệ**:
```
User ─────> Quản lý tài khoản
              │
              └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Xem thông tin cá nhân
- Cập nhật thông tin (tên, email, số điện thoại)
- Đổi mật khẩu
- Thay đổi avatar

---

#### 1.2. Tìm kiếm và xem sân
**Actor**: User  
**Mô tả**: Tìm kiếm và xem thông tin các sân thể thao

**Mối quan hệ**:
```
User ─────> Tìm kiếm và xem sân
              │
              └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Xem danh sách tất cả sân
- Tìm kiếm sân theo tên, khu vực
- Lọc sân theo giá, loại sân
- Xem chi tiết sân (hình ảnh, giá, địa chỉ, đánh giá)
- Xem lịch trống của sân

---

#### 1.3. Đặt sân
**Actor**: User  
**Mô tả**: Đặt sân thể thao theo ngày giờ

**Mối quan hệ**:
```
User ─────> Đặt sân
              │
              └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Chọn sân muốn đặt
- Chọn ngày và khung giờ
- Nhập thông tin liên hệ
- Thêm ghi chú (tùy chọn)
- Xác nhận thông tin đặt sân

---

#### 1.4. Thanh toán
**Actor**: User  
**Mô tả**: Thanh toán cho đơn đặt sân

**Mối quan hệ**:
```
User ─────> Thanh toán
              │
              └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Chọn phương thức thanh toán (Online/Tại sân)
- Thanh toán online (VNPay, Momo)
- Áp dụng mã giảm giá (tùy chọn)
- Xem hóa đơn

---

#### 1.5. Booking (Quản lý đặt sân của tôi)
**Actor**: User  
**Mô tả**: Quản lý các đơn đặt sân của khách hàng

**Mối quan hệ**:
```
User ─────> Booking
              │
              └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Xem lịch sử đặt sân
- Xem chi tiết đơn đặt sân
- Hủy đặt sân
- Đánh giá sân sau khi sử dụng
- Lọc đơn đặt theo trạng thái (Đã đặt, Đã hủy, Hoàn thành)

---

### NHÓM 2: USE CASE CHO CHỦ SÂN

#### 2.1. Quản lý sân
**Actor**: Chủ sân  
**Mô tả**: Quản lý thông tin các sân thể thao

**Mối quan hệ**:
```
Chủ sân ─────> Quản lý sân
                 │
                 └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Xem danh sách sân của mình
- Thêm sân mới
- Sửa thông tin sân (tên, địa chỉ, giá, mô tả)
- Xóa sân
- Cập nhật hình ảnh sân
- Cập nhật giá theo khung giờ

---

#### 2.2. Quản lý lịch hoạt động
**Actor**: Chủ sân  
**Mô tả**: Quản lý lịch trống và lịch bận của sân

**Mối quan hệ**:
```
Chủ sân ─────> Quản lý lịch hoạt động
                 │
                 └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Xem lịch hoạt động của sân
- Khóa khung giờ (bảo trì, sửa chữa)
- Mở khung giờ
- Xem lịch đặt sân

---

#### 2.3. Quản lý booking
**Actor**: Chủ sân  
**Mô tả**: Quản lý các đơn đặt sân của khách hàng

**Mối quan hệ**:
```
Chủ sân ─────> Quản lý booking
                 │
                 └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Xem danh sách đặt sân
- Xác nhận đặt sân
- Từ chối đặt sân
- Đánh dấu hoàn thành
- Xem doanh thu theo ngày/tháng

---

### NHÓM 3: USE CASE CHO ADMIN

#### 3.1. Quản lý user
**Actor**: Admin  
**Mô tả**: Quản lý tài khoản người dùng trong hệ thống

**Mối quan hệ**:
```
Admin ─────> Quản lý user
               │
               └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Xem danh sách tất cả người dùng
- Xem chi tiết thông tin người dùng
- Khóa/Mở khóa tài khoản
- Phê duyệt chủ sân mới
- Xóa tài khoản
- Phân quyền người dùng

---

#### 3.2. Kiểm tra sân
**Actor**: Admin  
**Mô tả**: Kiểm tra và quản lý các sân trong hệ thống

**Mối quan hệ**:
```
Admin ─────> Kiểm tra sân
               │
               └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Xem danh sách tất cả sân
- Xem chi tiết thông tin sân
- Phê duyệt sân mới
- Ẩn/Hiện sân
- Xóa sân vi phạm

---

#### 3.3. Báo cáo thống kê
**Actor**: Admin  
**Mô tả**: Xem báo cáo và thống kê hệ thống

**Mối quan hệ**:
```
Admin ─────> Báo cáo thống kê
               │
               └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Thống kê tổng quan (số user, số sân, số booking)
- Báo cáo doanh thu hệ thống
- Báo cáo người dùng mới
- Báo cáo đặt sân theo thời gian
- Xuất báo cáo (PDF, Excel)

---

#### 3.4. Cấu hình hệ thống
**Actor**: Admin  
**Mô tả**: Cấu hình các thông số hệ thống

**Mối quan hệ**:
```
Admin ─────> Cấu hình hệ thống
               │
               └──<<include>>── Đăng nhập
```

**Chức năng chi tiết**:
- Quản lý loại sân (Sân 5, Sân 7, Sân 11)
- Quản lý khu vực
- Quản lý dịch vụ thêm
- Cấu hình phương thức thanh toán
- Cấu hình mã giảm giá

---

## 1.3. BẢNG TỔNG HỢP USE CASE

| STT | Use Case | Actor | Độ ưu tiên | Mô tả ngắn |
|-----|----------|-------|------------|------------|
| 0 | **Đăng nhập** | **Tất cả** | **Cao** | **Xác thực và truy cập hệ thống** |
| **NHÓM USER** |
| 1 | Quản lý tài khoản | User | Cao | Quản lý thông tin cá nhân |
| 2 | Tìm kiếm và xem sân | User | Cao | Tìm và xem thông tin sân |
| 3 | Đặt sân | User | Cao | Đặt sân theo ngày giờ |
| 4 | Thanh toán | User | Cao | Thanh toán đơn đặt sân |
| 5 | Booking | User | Trung bình | Quản lý đặt sân của tôi |
| **NHÓM CHỦ SÂN** |
| 6 | Quản lý sân | Chủ sân | Cao | Quản lý thông tin sân |
| 7 | Quản lý lịch hoạt động | Chủ sân | Cao | Quản lý lịch trống/bận |
| 8 | Quản lý booking | Chủ sân | Cao | Quản lý đặt sân của khách |
| **NHÓM ADMIN** |
| 9 | Quản lý user | Admin | Cao | Quản lý tài khoản người dùng |
| 10 | Kiểm tra sân | Admin | Cao | Kiểm tra và phê duyệt sân |
| 11 | Báo cáo thống kê | Admin | Trung bình | Xem báo cáo hệ thống |
| 12 | Cấu hình hệ thống | Admin | Trung bình | Cấu hình thông số hệ thống |

---

## 1.4. SƠ ĐỒ USE CASE TỔNG QUAN

```
                    ┌─────────────────────────────────────────────────┐
                    │   Quản lý sân bóng đá và đặt lịch               │
                    │                                                 │
                    │                                                 │
    User ──────────>│  Quản lý tài khoản ──<<include>>──┐            │
       │            │                                    │            │
       │            │  Tìm kiếm và xem sân ──<<include>>┤            │
       │            │                                    │            │
       │            │  Đặt sân ──<<include>>────────────┤            │
       │            │                                    │            │
       │            │  Thanh toán ──<<include>>─────────┤            │
       │            │                                    ▼            │
       │            │  Booking ──<<include>>────────> ĐĂNG NHẬP      │
       │            │                                    ▲            │
       │            │                                    │            │
       │            │  Quản lý sân ──<<include>>────────┤            │
       │            │                                    │            │
    Chủ sân ───────>│  Quản lý lịch hoạt động <<include>>│           │
       │            │                                    │            │
       │            │  Quản lý booking ──<<include>>────┤            │
       │            │                                    │            │
       │            │  Quản lý user ──<<include>>───────┤            │
       │            │                                    │            │
    Admin ─────────>│  Kiểm tra sân ──<<include>>───────┤            │
                    │                                    │            │
                    │  Báo cáo thống kê ──<<include>>───┤            │
                    │                                    │            │
                    │  Cấu hình hệ thống ──<<include>>──┘            │
                    │                                                 │
                    └─────────────────────────────────────────────────┘
```

---

## 1.5. HƯỚNG DẪN VẼ USE CASE DIAGRAM

### Quy tắc vẽ theo diagram của bạn:

1. **Đăng nhập là use case trung tâm**:
   - Đặt ở giữa diagram
   - Tất cả use case khác đều kết nối vào đây

2. **Mối quan hệ <<include>>**:
   - Mũi tên: Từ use case chức năng → Đăng nhập
   - Ý nghĩa: Tất cả chức năng BẮT BUỘC phải đăng nhập trước
   - Vẽ bằng mũi tên nét đứt với nhãn `<<include>>`

3. **Nhóm use case theo actor**:
   - **Bên trái**: Use case của User (Khách hàng)
   - **Bên dưới**: Use case của Chủ sân
   - **Bên phải**: Use case của Admin

4. **Kết nối Actor với Use Case**:
   - User → các use case bên trái
   - Chủ sân → các use case bên dưới
   - Admin → các use case bên phải

### Lưu ý khi vẽ:

- Đặt "Đăng nhập" to hơn các use case khác (vì là trung tâm)
- Sắp xếp use case đối xứng xung quanh "Đăng nhập"
- Dùng màu hoặc vùng để phân biệt nhóm use case
- Đặt tên use case ngắn gọn, rõ ràng
- Không vẽ quá nhiều use case trong 1 diagram (tối đa 12-15)

---

## PHẦN 2: MÔ TẢ CHI TIẾT USE CASE

### Use Case Specification: Đặt sân

**Use Case ID**: UC-003  
**Use Case Name**: Đặt sân  
**Actor**: User (Khách hàng)  
**Mô tả**: Khách hàng đặt sân thể thao theo ngày giờ mong muốn  

**Điều kiện tiên quyết**: 
- Khách hàng đã đăng nhập vào hệ thống
- Sân còn trống trong khung giờ mong muốn

**Luồng chính**:
1. Khách hàng chọn sân muốn đặt từ danh sách
2. Hệ thống hiển thị thông tin chi tiết sân và lịch trống
3. Khách hàng chọn ngày đặt sân
4. Khách hàng chọn khung giờ muốn đặt
5. Hệ thống kiểm tra tính khả dụng của khung giờ
6. Khách hàng nhập thông tin liên hệ (số điện thoại, ghi chú)
7. Khách hàng xác nhận thông tin đặt sân
8. Hệ thống tạo đơn đặt sân với trạng thái "Chờ thanh toán"
9. Hệ thống chuyển đến trang thanh toán
10. Khách hàng chọn phương thức thanh toán
11. Hệ thống xử lý thanh toán
12. Hệ thống cập nhật trạng thái đơn đặt sân thành "Đã đặt"
13. Hệ thống gửi xác nhận qua email/SMS cho khách hàng
14. Use case kết thúc

**Luồng thay thế**:

**5a. Khung giờ đã được đặt**:
- Hệ thống thông báo "Khung giờ này đã được đặt"
- Hệ thống đề xuất các khung giờ trống khác
- Quay lại bước 4

**11a. Thanh toán thất bại**:
- Hệ thống thông báo lỗi thanh toán
- Hệ thống giữ đơn đặt sân trong 15 phút
- Quay lại bước 10

**11b. Khách hàng hủy thanh toán**:
- Hệ thống hỏi xác nhận hủy
- Nếu xác nhận: Hệ thống hủy đơn đặt sân
- Use case kết thúc

**Điều kiện sau**: 
- Đơn đặt sân được tạo và lưu vào hệ thống
- Lịch sân được cập nhật (khung giờ đã đặt)
- Khách hàng nhận được xác nhận qua email/SMS

---

*Tài liệu này sẽ được cập nhật thêm các phần khác...*


---

## PHẦN 3: MÔ TẢ MỐI QUAN HỆ GIỮA CÁC LỚP (CLASS ASSOCIATIONS)

### 3.1. MỐI QUAN HỆ GIỮA CÁC LỚP

#### 1. User - Field (Association)

**Mô tả**: Một chủ sân có thể sở hữu nhiều sân bóng, mỗi sân chỉ thuộc về một chủ sân duy nhất.

**Ý nghĩa**: Theo dõi quyền sở hữu và quản lý sân của từng chủ sân trong hệ thống.

---

#### 2. User - Booking (Association)

**Mô tả**: Một người dùng có thể tạo nhiều đơn đặt sân, mỗi đơn đặt sân chỉ thuộc về một người dùng duy nhất.

**Ý nghĩa**: Lưu trữ lịch sử đặt sân của từng người dùng, phục vụ cho việc quản lý và tra cứu.

---

#### 3. Field - Booking (Association)

**Mô tả**: Một sân có thể có nhiều đơn đặt sân, mỗi đơn đặt sân chỉ liên quan đến một sân cụ thể.

**Ý nghĩa**: Theo dõi lịch đặt sân và tình trạng sử dụng của từng sân bóng.

---

#### 4. Booking - Payment (Association)

**Mô tả**: Mỗi đơn đặt sân có một giao dịch thanh toán, mỗi giao dịch thanh toán chỉ liên quan đến một đơn đặt sân.

**Ý nghĩa**: Quản lý thông tin thanh toán cho từng đơn đặt sân, đảm bảo tính minh bạch trong giao dịch.

---

#### 5. User - Review (Association)

**Mô tả**: Một người dùng có thể tạo nhiều đánh giá cho các sân khác nhau, mỗi đánh giá chỉ thuộc về một người dùng.

**Ý nghĩa**: Theo dõi các đánh giá và nhận xét của người dùng về chất lượng sân.

---

#### 6. Field - Review (Association)

**Mô tả**: Một sân có thể nhận nhiều đánh giá từ các người dùng khác nhau, mỗi đánh giá chỉ liên quan đến một sân cụ thể.

**Ý nghĩa**: Tổng hợp đánh giá và xếp hạng chất lượng của từng sân bóng.

---

#### 7. Booking - Review (Association)

**Mô tả**: Mỗi đơn đặt sân có thể có không hoặc một đánh giá, mỗi đánh giá liên quan đến một đơn đặt sân cụ thể.

**Ý nghĩa**: Đảm bảo người dùng chỉ đánh giá sân sau khi đã sử dụng dịch vụ (có đơn đặt sân hoàn thành).

---

#### 8. Field - FieldImage (Association)

**Mô tả**: Một sân có thể có nhiều hình ảnh, mỗi hình ảnh chỉ thuộc về một sân duy nhất.

**Ý nghĩa**: Lưu trữ và hiển thị hình ảnh minh họa cho từng sân bóng, giúp người dùng dễ dàng đánh giá chất lượng sân.

---

#### 9. Field - FieldPriceRule (Association)

**Mô tả**: Một sân có thể có nhiều quy tắc giá theo khung giờ và ngày trong tuần, mỗi quy tắc giá chỉ áp dụng cho một sân.

**Ý nghĩa**: Quản lý giá linh hoạt theo thời gian, cho phép chủ sân thiết lập giá khác nhau cho các khung giờ và ngày khác nhau.

---

#### 10. Field - FieldBlockSlot (Association)

**Mô tả**: Một sân có thể có nhiều khung giờ bị khóa (bảo trì, sửa chữa), mỗi khung giờ khóa chỉ áp dụng cho một sân.

**Ý nghĩa**: Quản lý lịch bảo trì và khóa khung giờ không cho phép đặt sân, đảm bảo chất lượng sân luôn được duy trì tốt.

---

### 3.2. BẢNG TỔNG HỢP MỐI QUAN HỆ

| STT | Mối quan hệ | Bội số | Mô tả ngắn |
|-----|-------------|--------|------------|
| 1 | User (Owner) - Field | 1 - * | Một chủ sân quản lý nhiều sân |
| 2 | User (Customer) - Booking | 1 - * | Một khách hàng có nhiều đơn đặt sân |
| 3 | Field - Booking | 1 - * | Một sân có nhiều đơn đặt sân |
| 4 | Booking - Payment | 1 - 1 | Một đơn đặt sân có một thanh toán |
| 5 | User - Review | 1 - * | Một người dùng có nhiều đánh giá |
| 6 | Field - Review | 1 - * | Một sân có nhiều đánh giá |
| 7 | Booking - Review | 1 - 0..1 | Một đơn đặt sân có không hoặc một đánh giá |
| 8 | Field - FieldImage | 1 - * | Một sân có nhiều hình ảnh |
| 9 | Field - FieldPriceRule | 1 - * | Một sân có nhiều quy tắc giá |
| 10 | Field - FieldBlockSlot | 1 - * | Một sân có nhiều khung giờ khóa |

---

*Tài liệu này sẽ được cập nhật thêm các phần khác...*


---

## PHẦN 4: CÁC YÊU CẦU PHI CHỨC NĂNG

### 4.1. Hiệu năng

Hệ thống phải đảm bảo thời gian tải trang không vượt quá 2 giây trong điều kiện mạng bình thường. Thời gian phản hồi của các chức năng tra cứu, tìm kiếm và lọc sân phải hiển thị kết quả trong vòng 1 giây. Quá trình đặt sân và thanh toán hoàn tất trong vòng 3 giây.

---

### 4.2. Tính khả dụng

Hệ thống hoạt động ổn định 24/7 với thời gian ngừng hoạt động không quá 1% trong một tháng. Trong các khung giờ cao điểm, hệ thống phải đảm bảo phục vụ đồng thời tối thiểu 200 người dùng mà không ảnh hưởng đến chất lượng phản hồi.

---

### 4.3. Bảo mật

Toàn bộ dữ liệu người dùng phải được mã hóa khi truyền tải qua giao thức HTTPS. Hệ thống áp dụng cơ chế xác thực khi đăng nhập và tự động đăng xuất sau 30 phút không hoạt động. Mật khẩu được mã hóa bằng thuật toán hash mạnh trước khi lưu vào cơ sở dữ liệu.

---

### 4.4. Tính dễ sử dụng

Giao diện được thiết kế trực quan, người dùng mới có thể tự thao tác các chức năng chính mà không cần hướng dẫn. Các nút điều khiển phải hiển thị rõ ràng và dễ thao tác. Hệ thống hỗ trợ responsive design, tương thích tốt trên các thiết bị di động và máy tính để bàn.

---

### 4.5. Khả năng mở rộng

Hệ thống được thiết kế với kiến trúc module hóa, cho phép dễ dàng mở rộng thêm các chức năng mới trong tương lai. Cơ sở dữ liệu có khả năng mở rộng để lưu trữ lượng lớn dữ liệu khi số lượng người dùng và sân bóng tăng lên.

---

*Tài liệu này sẽ được cập nhật thêm các phần khác...*


---

## PHẦN 5: DANH SÁCH GIAO DIỆN HỆ THỐNG

### 5.1. Tài khoản demo để chụp giao diện

**Admin (Quản trị viên)**:
- Email: `admin@demo.com`
- Password: `admin123`

**Owner (Chủ sân)**:
- Email: `owner@demo.com`
- Password: `owner123`

**User (Khách hàng)**:
- Email: `user@demo.com`
- Password: `user123`

---

### 5.2. Giao diện chung (Không cần đăng nhập)

#### 5.2.1. Trang chủ (Home Page)
- **URL**: `/`
- **Mô tả**: Trang chủ hiển thị banner giới thiệu hệ thống, các sân nổi bật, hướng dẫn sử dụng
- **Chức năng**: Xem thông tin tổng quan, điều hướng đến các trang khác

#### 5.2.2. Trang đăng nhập (Login)
- **URL**: `/login`
- **Mô tả**: Form đăng nhập với email và mật khẩu
- **Chức năng**: Xác thực người dùng, chuyển hướng theo role

#### 5.2.3. Trang đăng ký (Register)
- **URL**: `/register`
- **Mô tả**: Form đăng ký tài khoản mới
- **Chức năng**: Tạo tài khoản khách hàng hoặc chủ sân

---

### 5.3. Giao diện User (Khách hàng)

#### 5.3.1. Danh sách sân
- **URL**: `/fields`
- **Mô tả**: Hiển thị danh sách tất cả sân bóng với hình ảnh, tên, địa chỉ, giá
- **Chức năng**: Tìm kiếm, lọc sân theo khu vực, giá, loại sân

#### 5.3.2. Chi tiết sân
- **URL**: `/fields/:id`
- **Mô tả**: Hiển thị thông tin chi tiết sân: hình ảnh, mô tả, giá theo khung giờ, địa chỉ, đánh giá
- **Chức năng**: Xem lịch trống, chọn ngày giờ để đặt sân

#### 5.3.3. Trang đặt sân
- **URL**: Khi click "Đặt sân" ở trang chi tiết
- **Mô tả**: Form chọn ngày, khung giờ, nhập thông tin liên hệ
- **Chức năng**: Xác nhận thông tin đặt sân, chuyển sang thanh toán

#### 5.3.4. Trang thanh toán
- **URL**: Sau khi xác nhận đặt sân
- **Mô tả**: Hiển thị thông tin đơn đặt sân, tổng tiền, chọn phương thức thanh toán
- **Chức năng**: Thanh toán online hoặc tại sân, áp dụng mã giảm giá

#### 5.3.5. Quản lý đặt sân của tôi
- **URL**: `/my-bookings`
- **Mô tả**: Danh sách các đơn đặt sân của khách hàng
- **Chức năng**: Xem chi tiết, hủy đặt sân, đánh giá sân, lọc theo trạng thái

#### 5.3.6. Trang cá nhân (Profile)
- **URL**: `/profile`
- **Mô tả**: Hiển thị thông tin tài khoản: tên, email, số điện thoại
- **Chức năng**: Cập nhật thông tin cá nhân, đổi mật khẩu

---

### 5.4. Giao diện Owner (Chủ sân)

#### 5.4.1. Dashboard chủ sân
- **URL**: `/owner`
- **Mô tả**: Tổng quan thống kê: số sân, số booking, doanh thu
- **Chức năng**: Xem biểu đồ thống kê, điều hướng nhanh

#### 5.4.2. Quản lý sân
- **URL**: `/owner/fields`
- **Mô tả**: Danh sách các sân của chủ sân
- **Chức năng**: Thêm sân mới, sửa thông tin sân, xóa sân, cập nhật hình ảnh và giá

#### 5.4.3. Thêm sân mới
- **URL**: `/owner/fields` (Click nút "Thêm sân")
- **Mô tả**: Form nhập thông tin sân mới: tên, địa chỉ, loại sân, giá, hình ảnh
- **Chức năng**: Tạo sân mới trong hệ thống

#### 5.4.4. Quản lý booking
- **URL**: `/owner/bookings`
- **Mô tả**: Danh sách đặt sân của khách hàng cho các sân của chủ sân
- **Chức năng**: Xác nhận, từ chối, đánh dấu hoàn thành đơn đặt sân

#### 5.4.5. Doanh thu
- **URL**: `/owner/revenue`
- **Mô tả**: Thống kê doanh thu theo ngày, tuần, tháng
- **Chức năng**: Xem biểu đồ doanh thu, lọc theo thời gian, xuất báo cáo

---

### 5.5. Giao diện Admin (Quản trị viên)

#### 5.5.1. Dashboard admin
- **URL**: `/admin`
- **Mô tả**: Tổng quan hệ thống: tổng số user, sân, booking, doanh thu
- **Chức năng**: Xem thống kê tổng quan, biểu đồ, điều hướng nhanh

#### 5.5.2. Quản lý người dùng
- **URL**: `/admin/users`
- **Mô tả**: Danh sách tất cả người dùng trong hệ thống
- **Chức năng**: Xem chi tiết, khóa/mở khóa tài khoản, phê duyệt chủ sân, xóa tài khoản

#### 5.5.3. Quản lý sân
- **URL**: `/admin/fields`
- **Mô tả**: Danh sách tất cả sân trong hệ thống
- **Chức năng**: Xem chi tiết, phê duyệt sân mới, ẩn/hiện sân, xóa sân vi phạm

#### 5.5.4. Quản lý booking
- **URL**: `/admin/bookings`
- **Mô tả**: Danh sách tất cả đơn đặt sân trong hệ thống
- **Chức năng**: Xem chi tiết, thống kê theo trạng thái, theo thời gian

#### 5.5.5. Báo cáo thống kê
- **URL**: `/admin/reports`
- **Mô tả**: Báo cáo chi tiết về doanh thu, người dùng, đặt sân
- **Chức năng**: Xem biểu đồ, lọc theo thời gian, xuất báo cáo PDF/Excel

---

### 5.6. Bảng tổng hợp giao diện

| STT | Tên giao diện | URL | Vai trò | Mô tả ngắn |
|-----|---------------|-----|---------|------------|
| **PHẦN CHUNG** |
| 1 | Trang chủ | `/` | Tất cả | Giới thiệu hệ thống |
| 2 | Đăng nhập | `/login` | Tất cả | Form đăng nhập |
| 3 | Đăng ký | `/register` | Tất cả | Form đăng ký |
| **PHẦN USER** |
| 4 | Danh sách sân | `/fields` | User | Xem và tìm kiếm sân |
| 5 | Chi tiết sân | `/fields/:id` | User | Thông tin chi tiết sân |
| 6 | Đặt sân | Modal/Page | User | Form đặt sân |
| 7 | Thanh toán | Modal/Page | User | Thanh toán đơn đặt |
| 8 | Quản lý đặt sân | `/my-bookings` | User | Lịch sử đặt sân |
| 9 | Trang cá nhân | `/profile` | User | Thông tin tài khoản |
| **PHẦN OWNER** |
| 10 | Dashboard | `/owner` | Owner | Tổng quan chủ sân |
| 11 | Quản lý sân | `/owner/fields` | Owner | Danh sách sân của mình |
| 12 | Thêm sân | `/owner/fields` | Owner | Form thêm sân mới |
| 13 | Quản lý booking | `/owner/bookings` | Owner | Đơn đặt sân của khách |
| 14 | Doanh thu | `/owner/revenue` | Owner | Thống kê doanh thu |
| **PHẦN ADMIN** |
| 15 | Dashboard | `/admin` | Admin | Tổng quan hệ thống |
| 16 | Quản lý user | `/admin/users` | Admin | Danh sách người dùng |
| 17 | Quản lý sân | `/admin/fields` | Admin | Danh sách tất cả sân |
| 18 | Quản lý booking | `/admin/bookings` | Admin | Danh sách tất cả booking |
| 19 | Báo cáo | `/admin/reports` | Admin | Báo cáo thống kê |

---

### 5.7. Hướng dẫn chụp giao diện

**Chuẩn bị**:
1. Chạy ứng dụng: `npm start`
2. Mở trình duyệt ở chế độ full screen
3. Chuẩn bị công cụ chụp màn hình (Snipping Tool, Lightshot, ...)

**Quy trình chụp**:
1. Đăng nhập với tài khoản tương ứng
2. Điều hướng đến từng trang theo danh sách
3. Chụp full màn hình bao gồm header/sidebar
4. Đặt tên file theo format: `[STT]-[role]-[page-name].png`
   - Ví dụ: `01-common-home.png`, `04-user-field-list.png`, `10-owner-dashboard.png`

**Lưu ý**:
- Chụp khi có dữ liệu mẫu để giao diện đẹp hơn
- Chụp cả các trạng thái: form đang điền, thông báo thành công/lỗi
- Đảm bảo chụp rõ nét, không bị mờ
- Nên chụp ở độ phân giải 1920x1080 trở lên

---

*Tài liệu này sẽ được cập nhật thêm các phần khác...*
