import { Layout, Row, Col, Typography, Space } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

export default function Footer() {
  return (
    <AntFooter style={{ 
      background: '#1e293b',
      padding: '60px 24px 24px',
      marginTop: 0
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Main Footer Content */}
        <Row gutter={[32, 32]} style={{ marginBottom: 40 }}>
          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: 20 }}>
              <div style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                padding: '8px',
                borderRadius: 8,
                display: 'inline-block',
                marginBottom: 12
              }}>
                <span style={{ fontSize: 20 }}>⚽</span>
              </div>
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                FootballPro
              </Title>
            </div>
            <Text style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 16 }}>
              Nền tảng đặt sân bóng đá hàng đầu Việt Nam. Nhanh chóng, tiện lợi và đáng tin cậy.
            </Text>
            <Space size="middle">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <FacebookOutlined style={{ color: 'white', fontSize: 18 }} />
                </div>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <TwitterOutlined style={{ color: 'white', fontSize: 18 }} />
                </div>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <InstagramOutlined style={{ color: 'white', fontSize: 18 }} />
                </div>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <YoutubeOutlined style={{ color: 'white', fontSize: 18 }} />
                </div>
              </a>
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={12} md={6}>
            <Title level={5} style={{ color: 'white', marginBottom: 20 }}>
              Liên kết nhanh
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Trang chủ
              </Link>
              <Link to="/fields" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Danh sách sân
              </Link>
              <Link to="/login" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Đăng nhập
              </Link>
              <Link to="/register" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Đăng ký
              </Link>
            </div>
          </Col>

          {/* Support */}
          <Col xs={12} sm={12} md={6}>
            <Title level={5} style={{ color: 'white', marginBottom: 20 }}>
              Hỗ trợ
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Về chúng tôi
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Điều khoản sử dụng
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Chính sách bảo mật
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Câu hỏi thường gặp
              </a>
            </div>
          </Col>

          {/* Contact */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: 'white', marginBottom: 20 }}>
              Liên hệ
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <EnvironmentOutlined style={{ color: '#10B981', fontSize: 18, marginTop: 2 }} />
                <Text style={{ color: 'rgba(255,255,255,0.7)', flex: 1 }}>
                  Đại học Hùng Vương, Hưng Yên, Việt Nam
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <PhoneOutlined style={{ color: '#10B981', fontSize: 18 }} />
                <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
                  1900 xxxx
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <MailOutlined style={{ color: '#10B981', fontSize: 18 }} />
                <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
                  support@footballpro.vn
                </Text>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
            © 2024 FootballPro. All rights reserved.
          </Text>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              Điều khoản
            </a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              Bảo mật
            </a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </AntFooter>
  );
}
