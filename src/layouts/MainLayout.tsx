import { Layout, Menu, Button, Dropdown, Badge } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  HomeOutlined, 
  UnorderedListOutlined, 
  CalendarOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, isOwner, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: 'my-bookings',
      icon: <CalendarOutlined />,
      label: 'Lịch đặt của tôi',
      onClick: () => navigate('/my-bookings')
    },
    ...(isOwner || isAdmin ? [
      {
        type: 'divider' as const,
      },
      {
        key: 'owner',
        icon: <DashboardOutlined />,
        label: 'Owner Panel',
        onClick: () => navigate('/owner')
      }
    ] : []),
    ...(isAdmin ? [
      {
        key: 'admin',
        icon: <DashboardOutlined />,
        label: 'Admin Panel',
        onClick: () => navigate('/admin')
      }
    ] : []),
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
      danger: true
    },
  ];

  const menuItems = [
    { key: '/', label: 'Trang chủ', icon: <HomeOutlined /> },
    { key: '/fields', label: 'Danh sách sân', icon: <UnorderedListOutlined /> },
    { key: '/my-bookings', label: 'Lịch đặt', icon: <CalendarOutlined /> },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: '#F9FAFB' }}>
      {/* Sticky Header with Glassmorphism */}
      <Header 
        className="glass-effect"
        style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          padding: '0 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.1)'
        }}>
        {/* Logo */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          <div style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            padding: '8px 12px',
            borderRadius: 12,
            marginRight: 12
          }}>
            <span style={{ fontSize: 20, fontWeight: 'bold' }}>⚽</span>
          </div>
          <span style={{ 
            fontSize: 20, 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            FootballPro
          </span>
        </div>

        {/* Center Menu */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ 
            flex: 1,
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            fontWeight: 500
          }}
        />

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {isAuthenticated && user ? (
            <>
              <Badge count={3} size="small">
                <Button 
                  type="text" 
                  icon={<BellOutlined style={{ fontSize: 18 }} />}
                  shape="circle"
                  size="large"
                />
              </Badge>
              
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Button 
                  type="text"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    height: 40,
                    padding: '0 16px',
                    borderRadius: 12,
                    fontWeight: 500
                  }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isAdmin 
                      ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                      : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div>{user.name}</div>
                    {isAdmin && (
                      <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 600 }}>
                        ADMIN
                      </div>
                    )}
                  </div>
                </Button>
              </Dropdown>
            </>
          ) : (
            <>
              <Button 
                onClick={() => navigate('/login')}
                style={{ 
                  borderRadius: 12,
                  fontWeight: 500
                }}
              >
                Đăng nhập
              </Button>
              <Button 
                type="primary" 
                onClick={() => navigate('/register')}
                style={{ 
                  borderRadius: 12,
                  fontWeight: 600
                }}
              >
                Đăng ký
              </Button>
            </>
          )}
        </div>
      </Header>

      <Content style={{ padding: '32px 48px', minHeight: 'calc(100vh - 134px)' }}>
        <Outlet />
      </Content>

      <Footer style={{ 
        textAlign: 'center',
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '24px 48px'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ 
              fontSize: 18, 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              FootballPro
            </span>
          </div>
          <div style={{ color: '#6b7280', fontSize: 14 }}>
            © 2026 FootballPro. Hệ thống đặt sân bóng thông minh.
          </div>
        </div>
      </Footer>
    </Layout>
  );
}
