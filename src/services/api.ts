import axios from 'axios';

// Base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5120/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }) => {
    // Remove role field as backend doesn't expect it
    const { role, ...registerData } = userData;
    const response = await api.post('/Auth/register', registerData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/Auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/Auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/Auth/logout');
    return response.data;
  },
};

// Fields API
export const fieldsAPI = {
  getFields: async (params?: {
    keyword?: string;
    district?: string;
    fieldType?: number;
    page?: number;
  }) => {
    const response = await api.get('/fields', { params });
    return response.data;
  },

  getFieldById: async (id: string) => {
    const response = await api.get(`/fields/${id}`);
    return response.data;
  },

  getFieldSchedule: async (id: string, date: string) => {
    const response = await api.get(`/fields/${id}/schedule`, {
      params: { date }
    });
    return response.data;
  },
};

// Bookings API
export const bookingsAPI = {
  createBooking: async (bookingData: {
    fieldId: number;
    bookingDate: string;
    startTime: string;
    endTime: string;
    note?: string;
  }) => {
    const { bookingDate, ...rest } = bookingData;
    const response = await api.post('/bookings', {
      ...rest,
      date: bookingDate,
    });
    return response.data;
  },

  getMyBookings: async () => {
    const response = await api.get('/bookings/my');
    return response.data;
  },

  getBookingById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id: string) => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },
};

// Payments API
export const paymentsAPI = {
  processPayment: async (paymentData: {
    bookingId: number;
    method: string;
  }) => {
    const response = await api.post('/payments', paymentData);
    return response.data;
  },
};

// Owner API
export const ownerAPI = {
  createField: async (fieldData: any) => {
    const response = await api.post('/owner/fields', fieldData);
    return response.data;
  },

  updateField: async (id: string, fieldData: any) => {
    const response = await api.put(`/owner/fields/${id}`, fieldData);
    return response.data;
  },


  getMyFields: async () => {
    const response = await api.get('/owner/fields');
    return response.data;
  },

  getFieldBookings: async (fieldId?: number, date?: string) => {
    const response = await api.get('/owner/bookings', {
      params: { fieldId, date }
    });
    return response.data;
  },

  confirmBooking: async (id: string) => {
    const response = await api.put(`/owner/bookings/${id}/confirm`);
    return response.data;
  },

  blockSlot: async (blockData: {
    fieldId: number;
    blockDate: string;
    startTime: string;
    endTime: string;
    reason: string;
  }) => {
    const { blockDate, ...rest } = blockData;
    const response = await api.post('/owner/block-slot', {
      ...rest,
      date: blockDate,
    });
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  getUsers: async (page?: number) => {
    const response = await api.get('/admin/users', { params: { page } });
    return response.data;
  },

  blockUser: async (id: string) => {
    const response = await api.put(`/admin/users/${id}/block`);
    return response.data;
  },

  getAllFields: async (page?: number) => {
    const response = await api.get('/admin/fields', { params: { page } });
    return response.data;
  },

  getAllBookings: async (page?: number) => {
    const response = await api.get('/admin/bookings', { params: { page } });
    return response.data;
  },

  deleteField: async (id: string) => {
    const response = await api.delete(`/admin/fields/${id}`);
    return response.data;
  },

  getRevenueReport: async (startDate: string, endDate: string) => {
    const response = await api.get('/admin/report/revenue', {
      params: { startDate, endDate }
    });
    return response.data;
  },

  getBookingsReport: async (startDate: string, endDate: string) => {
    const response = await api.get('/admin/report/bookings', {
      params: { startDate, endDate }
    });
    return response.data;
  },
};

export default api;