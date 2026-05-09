import { Table, Tag, Button, Typography, message, Empty } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BookingTableSkeleton } from '../components/LoadingSkeleton';

const { Title } = Typography;

export default function MyBookingsPage() {
  const { user, isAuthenticated } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // Nếu chưa đăng nhập
  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <Empty 
          description="Vui lòng đăng nhập để xem lịch đặt sân"
        />
        <Button 
          type="primary" 
          size="large"
          onClick={() => navigate('/login')}
          style={{ marginTop: 16 }}
        >
          Đăng nhập
        </Button>
      </div>
    );
  }

  // Lấy bookings của user hiện tại
  const userBookings = bookings.filter(b => b.userId === user?.id);

  const handleCancel = (bookingId: string) => {
    cancelBooking(bookingId);
    message.success('Đã hủy lịch đặt sân');
  };

  const columns = [
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
      render: (price: number) => `${price.toLocaleString('vi-VN')} đ`
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
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        record.status === 'confirmed' && (
          <Button 
            danger
            onClick={() => handleCancel(record.id)}
          >
            Hủy lịch
          </Button>
        )
      )
    }
  ];

  return (
    <div>
      <Title level={2}>Lịch Đặt Sân Của Tôi</Title>
      
      {loading ? (
        <BookingTableSkeleton />
      ) : userBookings.length === 0 ? (
        <Empty 
          description="Bạn chưa có lịch đặt sân nào"
          style={{ marginTop: 60 }}
        />
      ) : (
        <Table 
          dataSource={userBookings}
          columns={columns}
          rowKey="id"
        />
      )}
    </div>
  );
}
