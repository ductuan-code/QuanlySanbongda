import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';
import { message } from 'antd';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  loading: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user từ token khi app khởi động
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await authAPI.getMe();
          if (response.success) {
            const userData = response.data;
            const mappedUser: User = {
              id: userData.id.toString(),
              email: userData.email,
              name: userData.fullName,
              phone: userData.phone,
              role: userData.role.toLowerCase() as 'user' | 'owner' | 'admin'
            };
            setUser(mappedUser);
          }
        } catch (error) {
          console.error('Failed to get user info:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // 🎯 DEMO ACCOUNTS - Tài khoản demo tạm thời
    const demoAccounts = {
      'admin@demo.com': {
        id: 'demo-admin',
        email: 'admin@demo.com',
        name: 'Admin Demo',
        phone: '0123456789',
        role: 'admin' as const,
        password: 'admin123'
      },
      'owner@demo.com': {
        id: 'demo-owner',
        email: 'owner@demo.com', 
        name: 'Chủ Sân Demo',
        phone: '0987654321',
        role: 'owner' as const,
        password: 'owner123'
      },
      'user@demo.com': {
        id: 'demo-user',
        email: 'user@demo.com',
        name: 'User Demo', 
        phone: '0555666777',
        role: 'user' as const,
        password: 'user123'
      }
    };

    // Kiểm tra tài khoản demo trước
    const demoAccount = demoAccounts[email as keyof typeof demoAccounts];
    if (demoAccount && password === demoAccount.password) {
      setUser(demoAccount);
      localStorage.setItem('authToken', `demo-token-${demoAccount.role}`);
      localStorage.setItem('currentUser', JSON.stringify(demoAccount));
      message.success(`Đăng nhập demo thành công! Role: ${demoAccount.role.toUpperCase()}`);
      return true;
    }

    // Nếu không phải demo account, gọi API thật
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        const { token, user: userData } = response.data;
        
        // Save token
        localStorage.setItem('authToken', token);
        
        // Map user data
        const mappedUser: User = {
          id: userData.id.toString(),
          email: userData.email,
          name: userData.fullName,
          phone: userData.phone || '',
          role: userData.role.toLowerCase() as 'user' | 'owner' | 'admin'
        };
        
        setUser(mappedUser);
        localStorage.setItem('currentUser', JSON.stringify(mappedUser));
        
        message.success('Đăng nhập thành công!');
        return true;
      } else {
        message.error(response.message || 'Đăng nhập thất bại');
        return false;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
      message.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authAPI.register({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        role: userData.role || 'USER'
      });
      
      if (response.success) {
        message.success('Đăng ký thành công! Vui lòng đăng nhập.');
        return true;
      } else {
        message.error(response.message || 'Đăng ký thất bại');
        return false;
      }
    } catch (error: any) {
      console.error('Register error:', error);
      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
      message.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      message.success('Đăng xuất thành công!');
    }
  };

  const isAdmin = user?.role === 'admin';
  const isOwner = user?.role === 'owner';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register,
      logout, 
      isAuthenticated: !!user,
      isAdmin,
      isOwner,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
