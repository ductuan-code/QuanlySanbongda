import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking } from '../types';
import { bookingsAPI } from '../services/api';
import { message } from 'antd';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (bookingData: CreateBookingData) => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  getBookingsByUser: (userId: string) => Booking[];
  refreshBookings: () => Promise<void>;
  loading: boolean;
}

interface CreateBookingData {
  fieldId: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  note?: string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Load bookings from API
  const refreshBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsAPI.getMyBookings();
      if (response.success) {
        const mappedBookings: Booking[] = response.data.map((booking: any) => ({
          id: booking.id.toString(),
          userId: booking.userId?.toString() || '',
          fieldId: booking.fieldId.toString(),
          timeSlotId: booking.id.toString(),
          date: booking.bookingDate,
          startTime: booking.startTime,
          endTime: booking.endTime,
          totalPrice: booking.totalPrice,
          status: booking.status.toLowerCase() as 'pending' | 'confirmed' | 'cancelled' | 'completed',
          createdAt: booking.createdAt,
          fieldName: booking.fieldName
        }));
        setBookings(mappedBookings);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load bookings on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      refreshBookings();
    }
  }, []);

  const addBooking = async (bookingData: CreateBookingData): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await bookingsAPI.createBooking(bookingData);
      
      if (response.success) {
        const newBooking: Booking = {
          id: response.data.id.toString(),
          userId: response.data.userId?.toString() || '',
          fieldId: response.data.fieldId.toString(),
          timeSlotId: response.data.id.toString(),
          date: response.data.bookingDate,
          startTime: response.data.startTime,
          endTime: response.data.endTime,
          totalPrice: response.data.totalPrice,
          status: response.data.status.toLowerCase() as 'pending' | 'confirmed' | 'cancelled' | 'completed',
          createdAt: new Date().toISOString(),
          fieldName: response.data.fieldName
        };
        
        setBookings(prev => [newBooking, ...prev]);
        await refreshBookings();
        message.success('Đặt sân thành công!');
        return true;
      } else {
        message.error(response.message || 'Đặt sân thất bại');
        return false;
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.message || 'Đặt sân thất bại';
      message.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await bookingsAPI.cancelBooking(bookingId);
      
      if (response.success) {
        setBookings(prev => 
          prev.map(b => 
            b.id === bookingId 
              ? { ...b, status: 'cancelled' as const } 
              : b
          )
        );
        message.success('Hủy booking thành công!');
        return true;
      } else {
        message.error(response.message || 'Hủy booking thất bại');
        return false;
      }
    } catch (error: any) {
      console.error('Cancel booking error:', error);
      const errorMessage = error.response?.data?.message || 'Hủy booking thất bại';
      message.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getBookingsByUser = (userId: string) => {
    return bookings.filter(b => b.userId === userId);
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      addBooking, 
      cancelBooking, 
      getBookingsByUser,
      refreshBookings,
      loading
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
