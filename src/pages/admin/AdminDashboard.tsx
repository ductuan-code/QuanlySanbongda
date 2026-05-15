import { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Table, Tag, Alert } from 'antd';
import { ShopOutlined, CalendarOutlined, DollarOutlined, TeamOutlined } from '@ant-design/icons';
import { adminAPI } from '../../services/api';
import { DashboardSkeleton } from '../../components/LoadingSkeleton';

const { Title, Text } = Typography;

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ users: 0, fields: 0, bookings: 0, revenue: 0, confirmed: 0, cancelled: 0, pending: 0 });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentFields, setRecentFields] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [usersRes, fieldsRes, revenueRes, bookingsRes] = await Promise.all([
          adminAPI.getUsers(1),
          adminAPI.getAllFields(1),
          adminAPI.getRevenueReport('2026-01-01', '2026-12-31'),
          adminAPI.getBookingsReport('2026-01-01', '2026-12-31')
        ]);

        const users = usersRes.success ? usersRes.data : [];
        const fields = fieldsRes.success ? fieldsRes.data : [];
        const revenue = revenueRes.success ? revenueRes.data : { totalRevenue: 0 };
        const bookings = bookingsRes.success ? bookingsRes.data : { totalBookings: 0, confirmedBookings: 0, cancelledBookings: 0, pendingBookings: 0 };

        setRecentUsers(users);
        setRecentFields(fields);
        setStats({
          users: users.length,
          fields: fields.length,
          bookings: bookings.totalBookings || 0,
          revenue: revenue.totalRevenue || 0,
          confirmed: bookings.confirmedBookings || 0,
          cancelled: bookings.cancelledBookings || 0,
          pending: bookings.pendingBookings || 0,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải dashboard admin');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const userColumns = [
    { title: 'Tên', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Vai trò', dataIndex: 'role', key: 'role', render: (role: string) => <Tag color={role === 'ADMIN' ? 'red' : role === 'OWNER' ? 'green' : 'blue'}>{role}</Tag> },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status}</Tag> },
  ];

  const fieldColumns = [
    { title: 'Tên sân', dataIndex: 'name', key: 'name' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status}</Tag> },
  ];

  if (loading) return <DashboardSkeleton />;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0 }}>Dashboard Quản Trị</Title>
        <Text type="secondary">Tổng quan hệ thống đặt sân bóng</Text>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}><Card style={{ borderRadius: 16 }}><Statistic title="Tổng Users" value={stats.users} prefix={<TeamOutlined style={{ color: '#10B981' }} />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card style={{ borderRadius: 16 }}><Statistic title="Tổng Booking" value={stats.bookings} prefix={<CalendarOutlined style={{ color: '#3b82f6' }} />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card style={{ borderRadius: 16 }}><Statistic title="Tổng Sân" value={stats.fields} prefix={<ShopOutlined style={{ color: '#8b5cf6' }} />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card style={{ borderRadius: 16 }}><Statistic title="Doanh Thu" value={stats.revenue} prefix={<DollarOutlined style={{ color: '#f59e0b' }} />} suffix="đ" /></Card></Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Tóm tắt booking" style={{ borderRadius: 16 }}>
            <p>Đã xác nhận: <strong>{stats.confirmed}</strong></p>
            <p>Chờ xác nhận: <strong>{stats.pending}</strong></p>
            <p>Đã hủy: <strong>{stats.cancelled}</strong></p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Users gần đây" style={{ borderRadius: 16 }}>
            <Table dataSource={recentUsers} columns={userColumns} rowKey="id" pagination={false} />
          </Card>
        </Col>
      </Row>

      <Card title="Sân gần đây" style={{ marginTop: 24, borderRadius: 16 }}>
        <Table dataSource={recentFields} columns={fieldColumns} rowKey="id" pagination={false} />
      </Card>
    </div>
  );
}
