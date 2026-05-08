// Types cho toàn bộ ứng dụng

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'owner' | 'admin';
}

export interface FootballField {
  id: string;
  name: string;
  address: string;
  district: string;
  fieldType: '5v5' | '7v7' | '11v11';
  pricePerHour: number;
  images: string[];
  description: string;
  amenities: string[];
  rating: number;
  ownerId: string;
}

export interface TimeSlot {
  id: string;
  fieldId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'available' | 'booked' | 'blocked';
}

export interface Booking {
  id: string;
  userId: string;
  fieldId: string;
  timeSlotId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  fieldName?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  fieldId: string;
  bookingId: string;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: string;
}
