import { Row, Col, Card, Statistic, Typography, Table, Tag } from 'antd';
import { 
  ShopOutlined, 
  CalendarOutlined, 
  DollarOutlined,
  ArrowUpOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useBooking } from '../../contexts/BookingContext';
import { mockFields } from '../../data/mockData';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;

export default function AdminDashboard() {
  const { bookings } = useBooking();

  // Tính toán stats
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  // Data cho charts
  const bookingsByDate = [
    { date: '20/03', bookings: 12, revenue: 3600000 },
    { date: '21/03', bookings: 18, revenue: 5400000 },
    { date: '22/03', bookings: 15, revenue: 4500000 },
    { date: '23/03', bookings: 22, revenue: 6600000 },
    { date: '24/03', bookings: 19, revenue: 5700000 },
    { date: '25/03', bookings: totalBookings, revenue: totalRevenue },
  ];

  const bookingsByStatus = [
    { name: 'Đã xác nhận', value: confirmedBookings, color: '#10B981' },
    { name: 'Chờ xác nhận', value: bookings.filter(b => b.status === 'pending').length, color: '#f59e0b' },
    { name: 'Đã hủy', value: bookings.filter(b => b.status === 'cancelled').length, color: '#ef4444' },
    { name: 'Hoàn thành', value: bookings.filter(b => b.status === 'completed').length, color: '#3b82f6' },
  ];

  const topFields = mockFields.map(field => ({
    name: field.name,
    bookings: Math.floor(Math.random() * 20 + 5)
  })).sort((a, b) => b.bookings - a.bookings);

  // Recent bookings
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const bookingColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <Text code>{id.slice(0, 8)}</Text>
    },
    {
      title: 'Sân bóng',
      dataIndex: 'fieldName',
      key: 'fieldName',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Giờ',
      key: 'time',
      render: (_: any, record: any) => `${record.startTime} - ${record.endTime}`
    },
    {
      title: 'Giá',
      dataIndex: 'totalPrice',
      key: 'price',
      render: (price: number) => (
        <Text strong style={{ color: '#10B981' }}>
          {price.toLocaleString('vi-VN')}đ
        </Text>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: any = {
          pending: 'orange',
          confirmed: 'green',
          cancelled: 'red',
          completed: 'blue'
        };
        const textMap: any = {
          pending: 'Chờ xác nhận',
          confirmed: 'Đã xác nhận',
          cancelled: 'Đã hủy',
          completed: 'Hoàn thành'
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      }
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0 }}>Dashboard Quản Trị</Title>
        <Text type="secondary">Tổng quan hệ thống đặt sân bóng</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Tổng Booking"
              value={totalBookings}
              prefix={<CalendarOutlined style={{ color: '#10B981' }} />}
              suffix={
                <span style={{ fontSize: 14, color: '#10B981', marginLeft: 8 }}>
                  <ArrowUpOutlined /> 12%
                </span>
              }
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Đã Xác Nhận"
              value={confirmedBookings}
              prefix={<CalendarOutlined style={{ color: '#3b82f6' }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Tổng Sân"
              value={mockFields.length}
              prefix={<ShopOutlined style={{ color: '#8b5cf6' }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Doanh Thu"
              value={totalRevenue}
              prefix={<DollarOutlined style={{ color: '#f59e0b' }} />}
              suffix="đ"
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {/* Booking Trend */}
        <Col xs={24} lg={16}>
          <Card title="Xu hướng đặt sân" style={{ borderRadius: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingsByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Số booking"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  name="Doanh thu (đ)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Booking Status */}
        <Col xs={24} lg={8}>
          <Card title="Trạng thái booking" style={{ borderRadius: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bookingsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Top Fields */}
        <Col xs={24}>
          <Card title="Top sân được đặt nhiều nhất" style={{ borderRadius: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topFields}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10B981" name="Số lượt đặt" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings */}
      <Card 
        title="Booking Gần Đây" 
        style={{ marginTop: 24, borderRadius: 16 }}
      >
        <Table
          dataSource={recentBookings}
          columns={bookingColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
}
