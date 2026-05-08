import { FootballField, TimeSlot, Booking, Review } from '../types';

export const mockFields: FootballField[] = [
  {
    id: '1',
    name: 'Sân Bóng Thể Thao Hưng Yên',
    address: '123 Nguyễn Văn Linh, TP Hưng Yên',
    district: 'TP Hưng Yên',
    fieldType: '5v5',
    pricePerHour: 200000,
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'
    ],
    description: 'Sân bóng chất lượng cao, cỏ nhân tạo mới, đầy đủ tiện nghi',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Nước uống'],
    rating: 4.5,
    ownerId: 'owner1'
  },
  {
    id: '2',
    name: 'Sân Bóng Văn Lâm',
    address: '456 Đường Lê Lợi, Văn Lâm',
    district: 'Văn Lâm',
    fieldType: '7v7',
    pricePerHour: 350000,
    images: [
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800'
    ],
    description: 'Sân rộng rãi, thoáng mát, phù hợp cho các trận đấu lớn',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Căng tin'],
    rating: 4.8,
    ownerId: 'owner2'
  },
  {
    id: '3',
    name: 'Sân Bóng Văn Giang',
    address: '789 Quốc Lộ 5, Văn Giang',
    district: 'Văn Giang',
    fieldType: '5v5',
    pricePerHour: 180000,
    images: [
      'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800'
    ],
    description: 'Giá rẻ, chất lượng tốt, gần trung tâm huyện',
    amenities: ['Đèn chiếu sáng', 'Bãi đỗ xe'],
    rating: 4.2,
    ownerId: 'owner1'
  },
  {
    id: '4',
    name: 'Sân Bóng Yên Mỹ',
    address: '234 Đường Trần Phú, Yên Mỹ',
    district: 'Yên Mỹ',
    fieldType: '7v7',
    pricePerHour: 300000,
    images: [
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800'
    ],
    description: 'Sân đẹp, cỏ mềm, view đẹp, có mái che',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Căng tin', 'Wifi'],
    rating: 4.7,
    ownerId: 'owner2'
  },
  {
    id: '5',
    name: 'Sân Bóng Ân Thi',
    address: '567 Đường Hùng Vương, Ân Thi',
    district: 'Ân Thi',
    fieldType: '5v5',
    pricePerHour: 170000,
    images: [
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800'
    ],
    description: 'Gần trường học, giá học sinh, sân mới xây',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe'],
    rating: 4.3,
    ownerId: 'owner1'
  },
  {
    id: '6',
    name: 'Sân Bóng Khoái Châu',
    address: '890 Đường Nguyễn Trãi, Khoái Châu',
    district: 'Khoái Châu',
    fieldType: '5v5',
    pricePerHour: 190000,
    images: [
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'
    ],
    description: 'Trung tâm huyện, tiện di chuyển, cỏ nhân tạo cao cấp',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Nước uống', 'Wifi'],
    rating: 4.6,
    ownerId: 'owner2'
  },
  {
    id: '7',
    name: 'Sân Bóng Mỹ Hào',
    address: '123 Đường Lý Thường Kiệt, Mỹ Hào',
    district: 'Mỹ Hào',
    fieldType: '7v7',
    pricePerHour: 320000,
    images: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800'
    ],
    description: 'Sân rộng, có khán đài, phù hợp tổ chức giải đấu',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Căng tin', 'Khán đài'],
    rating: 4.9,
    ownerId: 'owner1'
  },
  {
    id: '8',
    name: 'Sân Bóng Tiên Lữ',
    address: '456 Đường Hoàng Hoa Thám, Tiên Lữ',
    district: 'Tiên Lữ',
    fieldType: '5v5',
    pricePerHour: 160000,
    images: [
      'https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800'
    ],
    description: 'Sân mới, tiện nghi hiện đại, giá cả phải chăng',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Nước uống', 'Wifi'],
    rating: 4.8,
    ownerId: 'owner2'
  },
  {
    id: '9',
    name: 'Sân Bóng Phù Cừ',
    address: '789 Đường Hai Bà Trưng, Phù Cừ',
    district: 'Phù Cừ',
    fieldType: '5v5',
    pricePerHour: 150000,
    images: [
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800'
    ],
    description: 'Giá tốt nhất tỉnh, chất lượng ổn, phù hợp đá thường xuyên',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe'],
    rating: 4.1,
    ownerId: 'owner1'
  },
  {
    id: '10',
    name: 'Sân Bóng Kim Động',
    address: '234 Đường Lê Duẩn, Kim Động',
    district: 'Kim Động',
    fieldType: '7v7',
    pricePerHour: 280000,
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800'
    ],
    description: 'Sân mới, cỏ đẹp, không gian thoáng đãng',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Căng tin'],
    rating: 4.4,
    ownerId: 'owner2'
  },
  {
    id: '11',
    name: 'Sân Bóng Đông Mỹ',
    address: '567 Đường Phan Chu Trinh, Đông Mỹ',
    district: 'Đông Mỹ',
    fieldType: '5v5',
    pricePerHour: 140000,
    images: [
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800'
    ],
    description: 'Giá rẻ nhất khu vực, sân sạch sẽ, đầy đủ tiện nghi',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Nước uống'],
    rating: 4.0,
    ownerId: 'owner1'
  },
  {
    id: '12',
    name: 'Sân Bóng Văn Lâm Center',
    address: '890 Đường Nguyễn Du, Văn Lâm',
    district: 'Văn Lâm',
    fieldType: '5v5',
    pricePerHour: 210000,
    images: [
      'https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=800'
    ],
    description: 'Sân đẹp, cỏ mềm, có mái che một phần',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Mái che'],
    rating: 4.5,
    ownerId: 'owner2'
  }
];

export const mockTimeSlots: TimeSlot[] = [
  // Sân 1 - Ngày 25/03/2026
  { id: 'ts1-1', fieldId: '1', date: '2026-03-25', startTime: '06:00', endTime: '07:00', price: 300000, status: 'available' },
  { id: 'ts1-2', fieldId: '1', date: '2026-03-25', startTime: '07:00', endTime: '08:00', price: 300000, status: 'available' },
  { id: 'ts1-3', fieldId: '1', date: '2026-03-25', startTime: '08:00', endTime: '09:00', price: 350000, status: 'available' },
  { id: 'ts1-4', fieldId: '1', date: '2026-03-25', startTime: '09:00', endTime: '10:00', price: 350000, status: 'booked' },
  { id: 'ts1-5', fieldId: '1', date: '2026-03-25', startTime: '10:00', endTime: '11:00', price: 350000, status: 'available' },
  { id: 'ts1-6', fieldId: '1', date: '2026-03-25', startTime: '17:00', endTime: '18:00', price: 400000, status: 'available' },
  { id: 'ts1-7', fieldId: '1', date: '2026-03-25', startTime: '18:00', endTime: '19:00', price: 400000, status: 'available' },
  { id: 'ts1-8', fieldId: '1', date: '2026-03-25', startTime: '19:00', endTime: '20:00', price: 450000, status: 'available' },
  { id: 'ts1-9', fieldId: '1', date: '2026-03-25', startTime: '20:00', endTime: '21:00', price: 450000, status: 'available' },
  
  // Sân 2
  { id: 'ts2-1', fieldId: '2', date: '2026-03-25', startTime: '06:00', endTime: '07:00', price: 500000, status: 'available' },
  { id: 'ts2-2', fieldId: '2', date: '2026-03-25', startTime: '07:00', endTime: '08:00', price: 500000, status: 'available' },
  { id: 'ts2-3', fieldId: '2', date: '2026-03-25', startTime: '17:00', endTime: '18:00', price: 600000, status: 'available' },
  
  // Sân 3
  { id: 'ts3-1', fieldId: '3', date: '2026-03-25', startTime: '06:00', endTime: '07:00', price: 250000, status: 'available' },
  { id: 'ts3-2', fieldId: '3', date: '2026-03-25', startTime: '07:00', endTime: '08:00', price: 250000, status: 'available' },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    userId: 'user1',
    fieldId: '1',
    timeSlotId: 'ts2',
    date: '2026-03-25',
    startTime: '07:00',
    endTime: '08:00',
    totalPrice: 300000,
    status: 'confirmed',
    createdAt: '2026-03-20T10:00:00Z',
    fieldName: 'Sân Bóng Thể Thao Quận 1'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    userId: 'demo-user',
    userName: 'User Demo',
    fieldId: '1',
    bookingId: 'b1',
    rating: 5,
    comment: 'Sân đẹp, cỏ mềm, chủ sân nhiệt tình. Sẽ quay lại lần sau!',
    createdAt: '2026-03-26T10:00:00Z'
  },
  {
    id: 'r2',
    userId: 'user2',
    userName: 'Nguyễn Văn A',
    fieldId: '1',
    bookingId: 'b2',
    rating: 4,
    comment: 'Sân tốt, giá hợp lý. Chỉ có điều bãi đỗ xe hơi nhỏ.',
    createdAt: '2026-03-24T15:30:00Z'
  },
  {
    id: 'r3',
    userId: 'user3',
    userName: 'Trần Thị B',
    fieldId: '1',
    bookingId: 'b3',
    rating: 5,
    comment: 'Rất hài lòng! Sân sạch sẽ, tiện nghi đầy đủ.',
    createdAt: '2026-03-23T18:00:00Z'
  },
  {
    id: 'r4',
    userId: 'user4',
    userName: 'Lê Văn C',
    fieldId: '2',
    bookingId: 'b4',
    rating: 5,
    comment: 'Sân rộng rãi, phù hợp cho đá 7v7. Đèn chiếu sáng tốt!',
    createdAt: '2026-03-22T20:00:00Z'
  },
  {
    id: 'r5',
    userId: 'user5',
    userName: 'Phạm Thị D',
    fieldId: '2',
    bookingId: 'b5',
    rating: 4,
    comment: 'Sân đẹp nhưng giá hơi cao so với khu vực.',
    createdAt: '2026-03-21T16:00:00Z'
  },
  {
    id: 'r6',
    userId: 'user6',
    userName: 'Hoàng Văn E',
    fieldId: '3',
    bookingId: 'b6',
    rating: 4,
    comment: 'Giá rẻ, chất lượng ổn. Phù hợp cho đá thường xuyên.',
    createdAt: '2026-03-20T14:00:00Z'
  },
  {
    id: 'r7',
    userId: 'user7',
    userName: 'Vũ Thị F',
    fieldId: '7',
    bookingId: 'b7',
    rating: 5,
    comment: 'Sân tuyệt vời! Có khán đài, rất phù hợp tổ chức giải đấu.',
    createdAt: '2026-03-19T19:00:00Z'
  },
  {
    id: 'r8',
    userId: 'user8',
    userName: 'Đỗ Văn G',
    fieldId: '8',
    bookingId: 'b8',
    rating: 5,
    comment: 'Sân mới, tiện nghi hiện đại. Rất đáng để thử!',
    createdAt: '2026-03-18T17:30:00Z'
  }
];
