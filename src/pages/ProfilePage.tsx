import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Avatar, Typography, Row, Col, Tabs, message, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { PageLoading } from '../components/LoadingSkeleton';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function ProfilePage() {
  const { user } = useAuth();
  const { getBookingsByUser } = useBooking();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const userBookings = user ? getBookingsByUser(user.id) : [];

  const handleSave = (values: any) => {
    // Cập nhật thông tin user (mock)
    const updatedUser = {
      ...user,
      name: values.name,
      phone: values.phone,
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    message.success('Cập nhật thông tin thành công!');
    setIsEditing(false);
    window.location.reload(); // Reload để cập nhật context
  };

  const handleChangePassword = (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp!');
      return;
    }
    message.success('Đổi mật khẩu thành công!');
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(16px, 3vw, 24px)' }}>
      <Title level={2} style={{ marginBottom: 24, fontSize: 'clamp(20px, 4vw, 28px)' }}>
        Thông tin cá nhân
      </Title>

      <Row gutter={[16, 16]}>
        {/* Left Column - Avatar & Basic Info */}
        <Col xs={24} lg={8}>
          <Card style={{ textAlign: 'center' }}>
            <Avatar 
              size={120} 
              icon={<UserOutlined />}
              style={{ 
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                marginBottom: 16
              }}
            />
            <Title level={4} style={{ marginBottom: 8 }}>
              {user.name}
            </Title>
            <Text type="secondary">{user.email}</Text>
            
            <Divider />
            
            <div style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: 12 }}>
                <Text type="secondary">Vai trò:</Text>
                <div style={{ marginTop: 4 }}>
                  <Text strong>
                    {user.role === 'admin' ? 'Quản trị viên' : 
                     user.role === 'owner' ? 'Chủ sân' : 'Người dùng'}
                  </Text>
                </div>
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <Text type="secondary">Số điện thoại:</Text>
                <div style={{ marginTop: 4 }}>
                  <Text strong>{user.phone}</Text>
                </div>
              </div>
              
              <div>
                <Text type="secondary">Tổng số lượt đặt:</Text>
                <div style={{ marginTop: 4 }}>
                  <Text strong style={{ color: '#10B981', fontSize: 20 }}>
                    {userBookings.length}
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Column - Tabs */}
        <Col xs={24} lg={16}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Thông tin chung" key="1">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <Title level={4} style={{ margin: 0 }}>
                    Thông tin tài khoản
                  </Title>
                  {!isEditing && (
                    <Button 
                      type="primary" 
                      icon={<EditOutlined />}
                      onClick={() => {
                        setIsEditing(true);
                        form.setFieldsValue({
                          name: user.name,
                          email: user.email,
                          phone: user.phone,
                        });
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                </div>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSave}
                  initialValues={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                  }}
                >
                  <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                  >
                    <Input 
                      prefix={<UserOutlined />}
                      size="large"
                      disabled={!isEditing}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                  >
                    <Input 
                      prefix={<MailOutlined />}
                      size="large"
                      disabled
                    />
                  </Form.Item>

                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                  >
                    <Input 
                      prefix={<PhoneOutlined />}
                      size="large"
                      disabled={!isEditing}
                    />
                  </Form.Item>

                  {isEditing && (
                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit"
                        icon={<SaveOutlined />}
                        size="large"
                        style={{ marginRight: 8 }}
                      >
                        Lưu thay đổi
                      </Button>
                      <Button 
                        size="large"
                        onClick={() => setIsEditing(false)}
                      >
                        Hủy
                      </Button>
                    </Form.Item>
                  )}
                </Form>
              </TabPane>

              <TabPane tab="Đổi mật khẩu" key="2">
                <Title level={4} style={{ marginBottom: 24 }}>
                  Thay đổi mật khẩu
                </Title>

                <Form
                  layout="vertical"
                  onFinish={handleChangePassword}
                >
                  <Form.Item
                    label="Mật khẩu hiện tại"
                    name="currentPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined />}
                      size="large"
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                      { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                    ]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined />}
                      size="large"
                      placeholder="Nhập mật khẩu mới"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Xác nhận mật khẩu mới"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined />}
                      size="large"
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      size="large"
                    >
                      Đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Lịch sử đặt sân" key="3">
                <Title level={4} style={{ marginBottom: 24 }}>
                  Lịch sử đặt sân ({userBookings.length})
                </Title>

                {userBookings.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Text type="secondary">Bạn chưa có lượt đặt sân nào</Text>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {userBookings.map((booking) => (
                      <Card 
                        key={booking.id}
                        size="small"
                        style={{ borderLeft: `4px solid ${
                          booking.status === 'confirmed' ? '#10B981' :
                          booking.status === 'pending' ? '#f59e0b' :
                          booking.status === 'cancelled' ? '#ef4444' : '#6b7280'
                        }` }}
                      >
                        <Row justify="space-between" align="middle">
                          <Col>
                            <Text strong style={{ fontSize: 16 }}>
                              {booking.fieldName || 'Sân bóng'}
                            </Text>
                            <div style={{ marginTop: 4 }}>
                              <Text type="secondary">
                                {booking.date} • {booking.startTime} - {booking.endTime}
                              </Text>
                            </div>
                          </Col>
                          <Col style={{ textAlign: 'right' }}>
                            <Text strong style={{ fontSize: 18, color: '#10B981' }}>
                              {booking.totalPrice.toLocaleString('vi-VN')}đ
                            </Text>
                            <div style={{ marginTop: 4 }}>
                              <Text 
                                style={{ 
                                  color: booking.status === 'confirmed' ? '#10B981' :
                                         booking.status === 'pending' ? '#f59e0b' :
                                         booking.status === 'cancelled' ? '#ef4444' : '#6b7280'
                                }}
                              >
                                {booking.status === 'confirmed' ? 'Đã xác nhận' :
                                 booking.status === 'pending' ? 'Chờ xác nhận' :
                                 booking.status === 'cancelled' ? 'Đã hủy' : 'Hoàn thành'}
                              </Text>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </div>
                )}
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
