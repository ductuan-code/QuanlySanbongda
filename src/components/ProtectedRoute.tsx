import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireOwner?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  requireOwner = false 
}: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isOwner } = useAuth();

  // Chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Yêu cầu admin nhưng không phải admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Yêu cầu owner nhưng không phải owner
  if (requireOwner && !isOwner && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
