import { Input, Card, Row, Col, Typography, Button, Select, DatePicker } from 'antd';
import { SearchOutlined, EnvironmentOutlined, CalendarOutlined, FireOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { mockFields } from '../data/mockData';

const { Title, Text } = Typography;

export default function HomePage() {
  const featuredFields = mockFields.slice(0, 3);

  return (
    <div style={{ margin: '-32px -48px 0' }}>
      {/* Hero Section với Floating Search Bar */}
      <div style={{ 
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        backgroundImage: 'url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        padding: '120px 48px 160px',
        position: 'relative',
        marginBottom: 80
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.92) 0%, rgba(5, 150, 105, 0.92) 100%)',
          zIndex: 1
        }} />

        {/* Content */}
        <div style={{ 
          position: 'relative', 
          zIndex: 2,
          maxWidth: 1200,
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <Title style={{ 
            color: 'white', 
            fontSize: 56,
            fontWeight: 800,
            marginBottom: 16,
            textShadow: '0 4px 12px rgba(0,0,0,0.2)',
            letterSpacing: '-1px'
          }}>
            Đặt sân bóng nhanh chóng & dễ dàng
          </Title>
          
          <Text style={{ 
            color: 'rgba(255,255,255,0.95)', 
            fontSize: 18,
            display: 'block',
            marginBottom: 48
          }}>
            Tìm sân, chọn giờ và thanh toán trong vài phút. Trải nghiệm đặt sân thông minh.
          </Text>

          {/* Floating Search Bar */}
          <Card 
            className="glass-effect"
            style={{ 
              borderRadius: 20,
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              maxWidth: 900,
              margin: '0 auto',
              border: 'none'
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={7}>
                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 13, color: '#374151' }}>
                    <EnvironmentOutlined /> Địa điểm
                  </Text>
                </div>
                <Select
                  size="large"
                  placeholder="Chọn tỉnh thành"
                  style={{ width: '100%' }}
                  bordered={false}
                  suffixIcon={null}
                >
                  <Select.Option value="hcm">TP. Hồ Chí Minh</Select.Option>
                  <Select.Option value="hn">Hà Nội</Select.Option>
                  <Select.Option value="dn">Đà Nẵng</Select.Option>
                </Select>
              </Col>

              <Col xs={24} md={7}>
                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 13, color: '#374151' }}>
                    <CalendarOutlined /> Ngày đặt
                  </Text>
                </div>
                <DatePicker 
                  size="large"
                  placeholder="Chọn ngày"
                  style={{ width: '100%' }}
                  bordered={false}
                  suffixIcon={null}
                />
              </Col>

              <Col xs={24} md={6}>
                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 13, color: '#374151' }}>
                    Loại sân
                  </Text>
                </div>
                <Select
                  size="large"
                  placeholder="Tất cả"
                  style={{ width: '100%' }}
                  bordered={false}
                  suffixIcon={null}
                >
                  <Select.Option value="all">Tất cả</Select.Option>
                  <Select.Option value="5v5">Sân 5v5</Select.Option>
                  <Select.Option value="7v7">Sân 7v7</Select.Option>
                  <Select.Option value="11v11">Sân 11v11</Select.Option>
                </Select>
              </Col>

              <Col xs={24} md={4}>
                <div style={{ marginBottom: 8, visibility: 'hidden' }}>
                  <Text>.</Text>
                </div>
                <Button 
                  type="primary" 
                  size="large"
                  icon={<SearchOutlined />}
                  block
                  style={{ 
                    height: 48,
                    fontSize: 16,
                    fontWeight: 700
                  }}
                >
                  Tìm
                </Button>
              </Col>
            </Row>
          </Card>

          {/* Stats */}
          <Row gutter={[48, 16]} style={{ marginTop: 60 }}>
            <Col xs={8}>
              <Title level={2} style={{ color: 'white', margin: 0, fontSize: 42, fontWeight: 800 }}>
                500+
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15 }}>Sân bóng</Text>
            </Col>
            <Col xs={8}>
              <Title level={2} style={{ color: 'white', margin: 0, fontSize: 42, fontWeight: 800 }}>
                10K+
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15 }}>Lượt đặt</Text>
            </Col>
            <Col xs={8}>
              <Title level={2} style={{ color: 'white', margin: 0, fontSize: 42, fontWeight: 800 }}>
                63
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15 }}>Tỉnh thành</Text>
            </Col>
          </Row>
        </div>
      </div>

      {/* Featured Fields */}
      <div style={{ padding: '0 48px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 32 
        }}>
          <div>
            <Title level={2} style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>
              Sân nổi bật
            </Title>
            <Text type="secondary" style={{ fontSize: 15 }}>
              Những sân được đặt nhiều nhất tuần này
            </Text>
          </div>
          <Link to="/fields">
            <Button 
              type="link" 
              style={{ 
                color: '#10B981', 
                fontWeight: 600,
                fontSize: 15
              }}
            >
              Xem tất cả →
            </Button>
          </Link>
        </div>

        <Row gutter={[24, 24]}>
          {featuredFields.map((field, index) => (
            <Col xs={24} sm={12} md={8} key={field.id}>
              <Link to={`/fields/${field.id}`}>
                <Card
                  hoverable
                  cover={
                    <div className="card-image-wrapper" style={{ position: 'relative' }}>
                      <img 
                        alt={field.name}
                        src={field.images[0]}
                        style={{ height: 220, objectFit: 'cover', width: '100%' }}
                      />
                      {/* Badge */}
                      <div style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        display: 'flex',
                        gap: 8
                      }}>
                        {index === 0 && (
                          <span className="badge-hot">
                            <FireOutlined /> Hot
                          </span>
                        )}
                        <span className="badge-discount">
                          Sẵn {Math.floor(Math.random() * 5 + 5)} slot
                        </span>
                      </div>
                    </div>
                  }
                  style={{ 
                    borderRadius: 16, 
                    overflow: 'hidden',
                    border: 'none'
                  }}
                  bodyStyle={{ padding: 20 }}
                >
                  <Title level={4} style={{ margin: 0, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>
                    {field.name}
                  </Title>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <EnvironmentOutlined style={{ marginRight: 6, color: '#6b7280' }} />
                    <Text type="secondary" style={{ fontSize: 14 }}>
                      {field.district}
                    </Text>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 12,
                    borderTop: '1px solid #f3f4f6'
                  }}>
                    <div>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>
                        ⭐ {field.rating} • {field.fieldType}
                      </Text>
                    </div>
                    <Text style={{ 
                      color: '#10B981', 
                      fontWeight: 700,
                      fontSize: 18
                    }}>
                      {field.pricePerHour.toLocaleString('vi-VN')}đ
                    </Text>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
