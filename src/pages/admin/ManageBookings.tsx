import { useState } from 'react';
import { Table, Button, Space, Tag, Select, DatePicker, message, Modal } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useBooking } from '../../contexts/BookingContext';
import { Booking } from '../../types';
import dayjs from 'dayjs';

export default function ManageBookings() {
  const { bookings, cancelBooking } = useBooking();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleViewDetail = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailModalVisible(true);
  };

  const handleConfirm = (bookingId: string) => {
    message.success('Đã xác nhận booking');
  };

  const handleCancel = (bookingId: string) => {
    Modal.confirm({
      title: 'Hủy booking',
      content: 'Bạn có chắc muốn hủy booking này?',
      okText: 'Hủy booking',
      cancelText: 'Đóng',
      okButtonProps: { danger: true },
      onOk: () => {
        cancelBooking(bookingId);
        message.success('Đã hủy booking');
      }
    });
  };

  const filteredBookings = bookings.filter(booking => {
    const matchStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchDate = !selectedDate || booking.date === selectedDate.format('YYYY-MM-DD');
    return matchStatus && matchDate;
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
          {id.slice(0, 12)}...
        </span>
      )
    },
    {
      title: 'Sân bóng',
      dataIndex: 'fieldName',
      key: 'fieldName',
      width: 200,
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 120,
      render: (userId: string) => (
        <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
          {userId.slice(0, 8)}
        </span>
      )
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Giờ',
      key: 'time',
      width: 140,
      render: (_: any, record: Booking) => (
        <span style={{ fontWeight: 500 }}>
          {record.startTime} - {record.endTime}
        </span>
      )
    },
    {
      title: 'Giá',
      dataIndex: 'totalPrice',
      key: 'price',
      width: 120,
      render: (price: number) => (
        <span style={{ color: '#10B981', fontWeight: 600 }}>
          {price.toLocaleString('vi-VN')}đ
        </span>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
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
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (date: string) => new Date(date).toLocaleString('vi-VN')
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      render: (_: any, record: Booking) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          />
          {record.status === 'pending' && (
            <>
              <Button 
                type="text" 
                icon={<CheckOutlined />}
                style={{ color: '#10B981' }}
                onClick={() => handleConfirm(record.id)}
              />
              <Button 
                type="text" 
                danger
                icon={<CloseOutlined />}
                onClick={() => handleCancel(record.id)}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Quản lý booking</h2>
        <p style={{ margin: 0, color: '#6b7280' }}>Tổng số: {bookings.length} booking</p>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: 16, 
        marginBottom: 24,
        flexWrap: 'wrap'
      }}>
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          size="large"
          style={{ width: 200 }}
        >
          <Select.Option value="all">Tất cả trạng thái</Select.Option>
          <Select.Option value="pending">Chờ xác nhận</Select.Option>
          <Select.Option value="confirmed">Đã xác nhận</Select.Option>
          <Select.Option value="cancelled">Đã hủy</Select.Option>
          <Select.Option value="completed">Hoàn thành</Select.Option>
        </Select>

        <DatePicker
          placeholder="Lọc theo ngày"
          size="large"
          style={{ width: 200 }}
          onChange={setSelectedDate}
          format="DD/MM/YYYY"
        />

        <Button 
          size="large"
          onClick={() => {
            setFilterStatus('all');
            setSelectedDate(null);
          }}
        >
          Reset
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredBookings}
        rowKey="id"
        scroll={{ x: 1400 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} booking`
        }}
      />

      {/* Detail Modal */}
      <Modal
        title="Chi tiết booking"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={600}
      >
        {selectedBooking && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: 16 }}>
              <strong>Booking ID:</strong> {selectedBooking.id}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Sân bóng:</strong> {selectedBooking.fieldName}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>User ID:</strong> {selectedBooking.userId}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Ngày:</strong> {new Date(selectedBooking.date).toLocaleDateString('vi-VN')}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Giờ:</strong> {selectedBooking.startTime} - {selectedBooking.endTime}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Giá:</strong> {selectedBooking.totalPrice.toLocaleString('vi-VN')}đ
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Trạng thái:</strong>{' '}
              <Tag color={
                selectedBooking.status === 'confirmed' ? 'green' :
                selectedBooking.status === 'pending' ? 'orange' :
                selectedBooking.status === 'cancelled' ? 'red' : 'blue'
              }>
                {selectedBooking.status}
              </Tag>
            </div>
            <div>
              <strong>Ngày tạo:</strong> {new Date(selectedBooking.createdAt).toLocaleString('vi-VN')}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
