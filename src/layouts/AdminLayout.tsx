import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ShopOutlined,
  TeamOutlined,
  CalendarOutlined,
  HomeOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard'
    },
    {
      key: '/admin/fields',
      icon: <ShopOutlined />,
      label: 'Quản lý sân'
    },
    {
      key: '/admin/users',
      icon: <TeamOutlined />,
      label: 'Quản lý user'
    },
    {
      key: '/admin/bookings',
      icon: <CalendarOutlined />,
      label: 'Quản lý booking'
    },
    {
      type: 'divider' as const
    },
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Về trang chủ'
    },
    {
      key: '/logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        }}
      >
        <div style={{
          padding: '24px 16px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            padding: '12px',
            borderRadius: 12,
            display: 'inline-block',
            marginBottom: 12
          }}>
            <span style={{ fontSize: 24 }}>⚽</span>
          </div>
          <div style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            Admin Panel
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            background: 'transparent',
            border: 'none'
          }}
        />
      </Sider>

      <Layout>
        <Header style={{
          background: 'white',
          padding: '0 32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#1e293b'
          }}>
            Quản trị hệ thống
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              A
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>Admin</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>admin@footballpro.com</div>
            </div>
          </div>
        </Header>

        <Content style={{
          margin: '32px',
          padding: '32px',
          background: 'white',
          borderRadius: 16,
          minHeight: 'calc(100vh - 128px)'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
