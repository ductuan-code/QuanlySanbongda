import { Form, Input, Button, Typography, Divider, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Register:', values);
    navigate('/login');
  };

  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      margin: -24
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
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(13, 92, 43, 0.9)',
          zIndex: 1
        }} />

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
            Tham gia cùng<br />
            50,000+ người<br />
            chơi bóng
          </Title>

          <Text style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: 16,
            display: 'block',
            marginBottom: 40 
          }}>
            Đăng ký ngay để trải nghiệm đặt sân bóng nhanh chóng và tiện lợi nhất.
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
              <Text style={{ color: 'white' }}>Miễn phí đăng ký</Text>
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
              <Text style={{ color: 'white' }}>Đặt sân ngay lập tức</Text>
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
              <Text style={{ color: 'white' }}>Ưu đãi độc quyền</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div style={{
        width: 480,
        background: 'white',
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflowY: 'auto'
      }}>
        <div style={{ maxWidth: 360, margin: '0 auto', width: '100%' }}>
          <Title level={2} style={{ marginBottom: 8 }}>Đăng ký</Title>
          <Text type="secondary">Tạo tài khoản mới để bắt đầu.</Text>

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            style={{ marginTop: 32 }}
          >
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Nhập họ và tên"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Nhập email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input 
                prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Nhập số điện thoại"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Nhập mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Xác nhận mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản')),
                },
              ]}
            >
              <Checkbox>
                Tôi đồng ý với{' '}
                <a href="#" style={{ color: '#16a34a' }}>Điều khoản dịch vụ</a>
                {' '}và{' '}
                <a href="#" style={{ color: '#16a34a' }}>Chính sách bảo mật</a>
              </Checkbox>
            </Form.Item>

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
                Đăng ký →
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
              Đăng ký bằng Google
            </Button>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Text type="secondary">
                Đã có tài khoản?{' '}
                <Link to="/login" style={{ color: '#16a34a', fontWeight: 'bold' }}>
                  Đăng nhập
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
