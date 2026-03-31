import { Row, Col, Card, Statistic, Typography, Table, Tag } from 'antd';
import { 
  ShopOutlined, 
  CalendarOutlined, 
  DollarOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';
import { mockFields } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;

export default function OwnerDashboard() {
  const { bookings } = useBooking();
  const { user } = useAuth();

  // Lấy sân của owner (giả sử owner1 sở hữu tất cả sân trong mock)
  const myFields = mockFields.filter(f => f.ownerId === 'owner1');
  const myFieldIds = myFields.map(f => f.id);

  // Lấy bookings của sân mình
  const myBookings = bookings.filter(b => myFieldIds.includes(b.fieldId));
  
  // Stats
  const totalBookings = myBookings.length;
  const pendingBookings = myBookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = myBookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = myBookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  // Revenue chart data
  const revenueData = [
    { date: '20/03', revenue: 1200000, bookings: 4 },
    { date: '21/03', revenue: 1800000, bookings: 6 },
    { date: '22/03', revenue: 1500000, bookings: 5 },
    { date: '23/03', revenue: 2100000, bookings: 7 },
    { date: '24/03', revenue: 1900000, bookings: 6 },
    { date: '25/03', revenue: totalRevenue, bookings: totalBookings },
  ];

  // Recent bookings
  const recentBookings = [...myBookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const columns = [
    {
      title: 'Sân',
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
        <Title level={2} style={{ margin: 0 }}>Dashboard Chủ Sân</Title>
        <Text type="secondary">Tổng quan hoạt động kinh doanh</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Tổng Sân"
              value={myFields.length}
              prefix={<ShopOutlined style={{ color: '#10B981' }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Tổng Booking"
              value={totalBookings}
              prefix={<CalendarOutlined style={{ color: '#3b82f6' }} />}
              suffix={
                <span style={{ fontSize: 14, color: '#10B981', marginLeft: 8 }}>
                  <ArrowUpOutlined /> 15%
                </span>
              }
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Chờ Xác Nhận"
              value={pendingBookings}
              prefix={<CheckCircleOutlined style={{ color: '#f59e0b' }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Doanh Thu"
              value={totalRevenue}
              prefix={<DollarOutlined style={{ color: '#10B981' }} />}
              suffix="đ"
            />
          </Card>
        </Col>
      </Row>

      {/* Revenue Chart */}
      <Card 
        title="Doanh thu 7 ngày qua" 
        style={{ marginTop: 24, borderRadius: 16 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={3}
              name="Doanh thu (đ)"
            />
            <Line 
              type="monotone" 
              dataKey="bookings" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Số booking"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Bookings */}
      <Card 
        title="Booking Gần Đây" 
        style={{ marginTop: 24, borderRadius: 16 }}
      >
        <Table
          dataSource={recentBookings}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
}
