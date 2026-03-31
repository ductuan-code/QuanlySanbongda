import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import OwnerLayout from './layouts/OwnerLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import FieldListPage from './pages/FieldListPage';
import FieldDetailPage from './pages/FieldDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageFields from './pages/admin/ManageFields';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBookings from './pages/admin/ManageBookings';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import OwnerFields from './pages/owner/OwnerFields';
import OwnerBookings from './pages/owner/OwnerBookings';
import OwnerRevenue from './pages/owner/OwnerRevenue';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="fields" element={<FieldListPage />} />
              <Route path="fields/:id" element={<FieldDetailPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="my-bookings" element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              } />
            </Route>

            {/* Admin Routes - Protected */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="fields" element={<ManageFields />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="bookings" element={<ManageBookings />} />
            </Route>

            {/* Owner Routes - Protected */}
            <Route path="/owner" element={
              <ProtectedRoute requireOwner>
                <OwnerLayout />
              </ProtectedRoute>
            }>
              <Route index element={<OwnerDashboard />} />
              <Route path="fields" element={<OwnerFields />} />
              <Route path="bookings" element={<OwnerBookings />} />
              <Route path="revenue" element={<OwnerRevenue />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;