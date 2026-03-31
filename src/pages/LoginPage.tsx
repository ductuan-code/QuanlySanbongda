import { Form, Input, Button, Typography, Divider, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = (values: any) => {
    login(values.email, values.password);
    navigate('/');
  };

  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      margin: -24 // Bù margin của Content
    }}>
      {/* Left Side - Hero */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #1a7a3e 0%, #0d5c2b 100%)',
        backgroundImage: 'url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1200)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(13, 92, 43, 0.9)',
          zIndex: 1
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: 40 
          }}>
            <div style={{
              background: 'white',
              padding: '8px 12px',
              borderRadius: 8,
              marginRight: 12
            }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>⚽</Text>
            </div>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
              FootballPro
            </Text>
          </div>

          <Title style={{ 
            color: 'white', 
            fontSize: 42,
            marginBottom: 16 
          }}>
            Đặt sân bóng<br />
            nhanh chóng<br />
            & tiện lợi
          </Title>

          <Text style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: 16,
            display: 'block',
            marginBottom: 40 
          }}>
            Tham gia cùng hơn 50,000+ người chơi bóng đá. Tìm sân, đặt lịch và thanh toán chi trong vài giây.
          </Text>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Text style={{ color: 'white' }}>✓</Text>
              </div>
              <Text style={{ color: 'white' }}>Đặt sân 24/7 mọi lúc mọi nơi</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Text style={{ color: 'white' }}>✓</Text>
              </div>
              <Text style={{ color: 'white' }}>Thanh toán an toàn, bảo mật</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Text style={{ color: 'white' }}>✓</Text>
              </div>
              <Text style={{ color: 'white' }}>Hỗ trợ khách hàng tận tâm</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        width: 480,
        background: 'white',
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: 360, margin: '0 auto', width: '100%' }}>
          <Title level={2} style={{ marginBottom: 8 }}>Đăng nhập</Title>
          <Text type="secondary">Chào mừng bạn trở lại! Vui lòng đăng nhập.</Text>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            style={{ marginTop: 32 }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Nhập email của bạn"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Nhập mật khẩu"
                size="large"
              />
            </Form.Item>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 24 
            }}>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              <a href="#" style={{ color: '#16a34a' }}>Quên mật khẩu?</a>
            </div>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                style={{ 
                  background: '#16a34a',
                  borderColor: '#16a34a',
                  height: 48,
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                Đăng nhập →
              </Button>
            </Form.Item>

            <Divider plain style={{ margin: '24px 0' }}>
              <Text type="secondary" style={{ fontSize: 13 }}>Hoặc</Text>
            </Divider>

            <Button 
              block 
              size="large"
              icon={<GoogleOutlined />}
              style={{ 
                height: 48,
                fontSize: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Đăng nhập bằng Google
            </Button>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Text type="secondary">
                Chưa có tài khoản?{' '}
                <Link to="/register" style={{ color: '#16a34a', fontWeight: 'bold' }}>
                  Đăng ký ngay
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
