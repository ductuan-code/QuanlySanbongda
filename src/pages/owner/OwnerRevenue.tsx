import { Card, Row, Col, Statistic, DatePicker, Select, Typography } from 'antd';
import { DollarOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { useBooking } from '../../contexts/BookingContext';
import { mockFields } from '../../data/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function OwnerRevenue() {
  const { bookings } = useBooking();

  // Lấy sân của owner
  const myFields = mockFields.filter(f => f.ownerId === 'owner1');
  const myFieldIds = myFields.map(f => f.id);
  const myBookings = bookings.filter(b => myFieldIds.includes(b.fieldId));

  // Tính doanh thu
  const totalRevenue = myBookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const thisMonthRevenue = totalRevenue; // Mock
  const lastMonthRevenue = totalRevenue * 0.85; // Mock
  const growth = ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1);

  // Doanh thu theo ngày
  const dailyRevenue = [
    { date: '20/03', revenue: 1200000 },
    { date: '21/03', revenue: 1800000 },
    { date: '22/03', revenue: 1500000 },
    { date: '23/03', revenue: 2100000 },
    { date: '24/03', revenue: 1900000 },
    { date: '25/03', revenue: 2400000 },
    { date: '26/03', revenue: 2200000 },
  ];

  // Doanh thu theo sân
  const revenueByField = myFields.map(field => ({
    name: field.name,
    revenue: Math.floor(Math.random() * 5000000 + 2000000)
  }));

  // Doanh thu theo khung giờ
  const revenueByTime = [
    { time: '6-9h', revenue: 1200000, color: '#3b82f6' },
    { time: '9-12h', revenue: 800000, color: '#10B981' },
    { time: '12-15h', revenue: 600000, color: '#f59e0b' },
    { time: '15-18h', revenue: 1500000, color: '#8b5cf6' },
    { time: '18-21h', revenue: 3200000, color: '#ef4444' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0 }}>Thống kê doanh thu</Title>
        <Text type="secondary">Theo dõi hiệu quả kinh doanh</Text>
      </div>

      {/* Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col>
          <RangePicker size="large" />
        </Col>
        <Col>
          <Select
            defaultValue="all"
            size="large"
            style={{ width: 200 }}
          >
            <Select.Option value="all">Tất cả sân</Select.Option>
            {myFields.map(f => (
              <Select.Option key={f.id} value={f.id}>{f.name}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Tổng Doanh Thu"
              value={totalRevenue}
              prefix={<DollarOutlined style={{ color: '#10B981' }} />}
              suffix="đ"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Doanh Thu Tháng Này"
              value={thisMonthRevenue}
              prefix={<DollarOutlined style={{ color: '#3b82f6' }} />}
              suffix="đ"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic
              title="Tăng Trưởng"
              value={growth}
              prefix={parseFloat(growth) > 0 ? <RiseOutlined /> : <FallOutlined />}
              suffix="%"
              valueStyle={{ color: parseFloat(growth) > 0 ? '#10B981' : '#ef4444' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {/* Daily Revenue */}
        <Col xs={24} lg={16}>
          <Card title="Doanh thu theo ngày" style={{ borderRadius: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyRevenue}>
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
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Revenue by Time */}
        <Col xs={24} lg={8}>
          <Card title="Doanh thu theo khung giờ" style={{ borderRadius: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueByTime}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: any) => `${props.time}: ${((props.percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {revenueByTime.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Revenue by Field */}
        <Col xs={24}>
          <Card title="Doanh thu theo sân" style={{ borderRadius: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByField}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10B981" name="Doanh thu (đ)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
