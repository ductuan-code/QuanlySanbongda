import { Input, Card, Row, Col, Typography, Button, Select, DatePicker, Avatar } from 'antd';
import { SearchOutlined, EnvironmentOutlined, CalendarOutlined, FireOutlined, ThunderboltOutlined, SafetyOutlined, CreditCardOutlined, CustomerServiceOutlined, CheckCircleOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { mockFields } from '../data/mockData';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

export default function HomePage() {
  const featuredFields = mockFields.slice(0, 3);

  return (
    <div style={{ margin: '-32px -48px 0', overflowX: 'hidden' }}>
      {/* Hero Section với Floating Search Bar */}
      <div style={{ 
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        backgroundImage: 'url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        padding: '80px 24px 120px',
        position: 'relative',
        marginBottom: 60
      }}
      className="hero-section"
      >
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
          <Title 
            level={1}
            style={{ 
              color: 'white', 
              fontSize: 'clamp(28px, 6vw, 56px)',
              fontWeight: 800,
              marginBottom: 16,
              textShadow: '0 4px 12px rgba(0,0,0,0.2)',
              letterSpacing: '-1px'
            }}
          >
            Đặt sân bóng nhanh chóng & dễ dàng
          </Title>
          
          <Text style={{ 
            color: 'rgba(255,255,255,0.95)', 
            fontSize: 'clamp(14px, 2vw, 18px)',
            display: 'block',
            marginBottom: 32
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
          <Row gutter={[24, 16]} style={{ marginTop: 40 }}>
            <Col xs={8}>
              <Title level={2} style={{ color: 'white', margin: 0, fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: 800 }}>
                500+
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(12px, 2vw, 15px)' }}>Sân bóng</Text>
            </Col>
            <Col xs={8}>
              <Title level={2} style={{ color: 'white', margin: 0, fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: 800 }}>
                10K+
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(12px, 2vw, 15px)' }}>Lượt đặt</Text>
            </Col>
            <Col xs={8}>
              <Title level={2} style={{ color: 'white', margin: 0, fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: 800 }}>
                63
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(12px, 2vw, 15px)' }}>Tỉnh thành</Text>
            </Col>
          </Row>
        </div>
      </div>

      {/* Featured Fields */}
      <div style={{ padding: '0 24px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 12,
          marginBottom: 24 
        }}
        className="section-header"
        >
          <div>
            <Title level={2} style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700 }}>
              Sân nổi bật
            </Title>
            <Text type="secondary" style={{ fontSize: 'clamp(13px, 2vw, 15px)' }}>
              Những sân được đặt nhiều nhất tuần này
            </Text>
          </div>
          <Link to="/fields">
            <Button 
              type="link" 
              style={{ 
                color: '#10B981', 
                fontWeight: 600,
                fontSize: 15,
                padding: 0
              }}
            >
              Xem tất cả →
            </Button>
          </Link>
        </div>

        <Row gutter={[16, 16]}>
          {featuredFields.map((field, index) => (
            <Col xs={24} sm={12} lg={8} key={field.id}>
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

      {/* Features Section */}
      <div style={{ 
        background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)',
        padding: '60px 24px'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, marginBottom: 12 }}>
              Tại sao chọn FootballPro?
            </Title>
            <Text type="secondary" style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}>
              Trải nghiệm đặt sân hiện đại, nhanh chóng và tiện lợi
            </Text>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={12} sm={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 'clamp(60px, 15vw, 80px)',
                  height: 'clamp(60px, 15vw, 80px)',
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                }}>
                  <ThunderboltOutlined style={{ fontSize: 'clamp(24px, 5vw, 36px)', color: 'white' }} />
                </div>
                <Title level={4} style={{ marginBottom: 8, fontSize: 'clamp(14px, 2.5vw, 18px)' }}>
                  Đặt sân nhanh
                </Title>
                <Text type="secondary" style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>
                  Chỉ 3 bước đơn giản, hoàn tất trong 2 phút
                </Text>
              </div>
            </Col>

            <Col xs={12} sm={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 'clamp(60px, 15vw, 80px)',
                  height: 'clamp(60px, 15vw, 80px)',
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                }}>
                  <SafetyOutlined style={{ fontSize: 'clamp(24px, 5vw, 36px)', color: 'white' }} />
                </div>
                <Title level={4} style={{ marginBottom: 8, fontSize: 'clamp(14px, 2.5vw, 18px)' }}>
                  An toàn & Bảo mật
                </Title>
                <Text type="secondary" style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>
                  Thông tin được mã hóa và bảo vệ tuyệt đối
                </Text>
              </div>
            </Col>

            <Col xs={12} sm={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 'clamp(60px, 15vw, 80px)',
                  height: 'clamp(60px, 15vw, 80px)',
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
                }}>
                  <CreditCardOutlined style={{ fontSize: 'clamp(24px, 5vw, 36px)', color: 'white' }} />
                </div>
                <Title level={4} style={{ marginBottom: 8, fontSize: 'clamp(14px, 2.5vw, 18px)' }}>
                  Thanh toán linh hoạt
                </Title>
                <Text type="secondary" style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>
                  Hỗ trợ nhiều hình thức thanh toán tiện lợi
                </Text>
              </div>
            </Col>

            <Col xs={12} sm={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 'clamp(60px, 15vw, 80px)',
                  height: 'clamp(60px, 15vw, 80px)',
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
                }}>
                  <CustomerServiceOutlined style={{ fontSize: 'clamp(24px, 5vw, 36px)', color: 'white' }} />
                </div>
                <Title level={4} style={{ marginBottom: 8, fontSize: 'clamp(14px, 2.5vw, 18px)' }}>
                  Hỗ trợ 24/7
                </Title>
                <Text type="secondary" style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>
                  Đội ngũ chăm sóc khách hàng luôn sẵn sàng
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ padding: '60px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Title level={2} style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
            Cách thức hoạt động
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Đặt sân chỉ với 3 bước đơn giản
          </Text>
        </div>

        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: 28,
                fontWeight: 800,
                color: 'white',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
              }}>
                1
              </div>
              <Title level={4} style={{ marginBottom: 12, fontSize: 20 }}>
                Tìm kiếm sân
              </Title>
              <Text type="secondary" style={{ fontSize: 15 }}>
                Chọn địa điểm, ngày giờ và loại sân phù hợp với bạn
              </Text>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: 28,
                fontWeight: 800,
                color: 'white',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
              }}>
                2
              </div>
              <Title level={4} style={{ marginBottom: 12, fontSize: 20 }}>
                Chọn khung giờ
              </Title>
              <Text type="secondary" style={{ fontSize: 15 }}>
                Xem lịch trống và chọn khung giờ bạn muốn đặt
              </Text>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: 28,
                fontWeight: 800,
                color: 'white',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
              }}>
                3
              </div>
              <Title level={4} style={{ marginBottom: 12, fontSize: 20 }}>
                Xác nhận & Thanh toán
              </Title>
              <Text type="secondary" style={{ fontSize: 15 }}>
                Hoàn tất đặt sân và nhận xác nhận ngay lập tức
              </Text>
            </div>
          </Col>
        </Row>
      </div>

      {/* Testimonials */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        padding: '80px 48px',
        marginTop: 60
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Title level={2} style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
              Khách hàng nói gì về chúng tôi
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Hơn 10,000 lượt đặt sân thành công
            </Text>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card style={{ 
                borderRadius: 16, 
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}>
                <div style={{ marginBottom: 16 }}>
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18 }} />
                </div>
                <Text style={{ fontSize: 15, lineHeight: 1.7, display: 'block', marginBottom: 20 }}>
                  "Đặt sân cực kỳ nhanh và tiện lợi. Giao diện đẹp, dễ sử dụng. Tôi đã giới thiệu cho cả đội bóng của mình!"
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar size={48} style={{ background: '#10B981' }}>N</Avatar>
                  <div>
                    <div style={{ fontWeight: 600 }}>Nguyễn Văn A</div>
                    <Text type="secondary" style={{ fontSize: 13 }}>Đội trưởng FC Saigon</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card style={{ 
                borderRadius: 16, 
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}>
                <div style={{ marginBottom: 16 }}>
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18 }} />
                </div>
                <Text style={{ fontSize: 15, lineHeight: 1.7, display: 'block', marginBottom: 20 }}>
                  "Tìm được sân gần nhà với giá tốt. Hệ thống xác nhận nhanh, không lo bị trùng lịch. Rất hài lòng!"
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar size={48} style={{ background: '#3b82f6' }}>T</Avatar>
                  <div>
                    <div style={{ fontWeight: 600 }}>Trần Minh B</div>
                    <Text type="secondary" style={{ fontSize: 13 }}>Thành viên thường xuyên</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card style={{ 
                borderRadius: 16, 
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}>
                <div style={{ marginBottom: 16 }}>
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18, marginRight: 4 }} />
                  <StarFilled style={{ color: '#fbbf24', fontSize: 18 }} />
                </div>
                <Text style={{ fontSize: 15, lineHeight: 1.7, display: 'block', marginBottom: 20 }}>
                  "App tuyệt vời! Quản lý lịch đặt sân rất dễ dàng. Hỗ trợ khách hàng nhiệt tình. Highly recommended!"
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar size={48} style={{ background: '#f59e0b' }}>L</Avatar>
                  <div>
                    <div style={{ fontWeight: 600 }}>Lê Thị C</div>
                    <Text type="secondary" style={{ fontSize: 13 }}>Người dùng mới</Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        padding: '80px 48px',
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        <Card style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          borderRadius: 24,
          border: 'none',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <Title level={2} style={{ 
            color: 'white', 
            fontSize: 36, 
            fontWeight: 700,
            marginBottom: 16 
          }}>
            Sẵn sàng đặt sân ngay hôm nay?
          </Title>
          <Text style={{ 
            color: 'rgba(255,255,255,0.95)', 
            fontSize: 18,
            display: 'block',
            marginBottom: 32
          }}>
            Tham gia cùng hàng ngàn người chơi bóng đá đã tin dùng FootballPro
          </Text>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/fields">
              <Button 
                size="large"
                style={{
                  height: 56,
                  padding: '0 40px',
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 12,
                  background: 'white',
                  color: '#10B981',
                  border: 'none'
                }}
              >
                Tìm sân ngay
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                size="large"
                style={{
                  height: 56,
                  padding: '0 40px',
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 12,
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white'
                }}
              >
                Đăng ký miễn phí
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
