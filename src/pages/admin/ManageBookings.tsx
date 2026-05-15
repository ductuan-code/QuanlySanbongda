import { useEffect, useMemo, useState } from 'react';
import { Table, Tag, Select, DatePicker, Modal, Button, Alert } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { adminAPI } from '../../services/api';
import { BookingTableSkeleton } from '../../components/LoadingSkeleton';

interface AdminBooking {
  id: string;
  userId: string;
  userName: string;
  fieldId: string;
  fieldName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export default function ManageBookings() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminAPI.getAllBookings(1);
        if (response.success) {
          setBookings(response.data.map((booking: any) => ({
            id: booking.id.toString(),
            userId: booking.userId?.toString() || '',
            userName: booking.userName || '',
            fieldId: booking.fieldId.toString(),
            fieldName: booking.fieldName || '',
            date: booking.bookingDate,
            startTime: booking.startTime,
            endTime: booking.endTime,
            totalPrice: booking.totalPrice,
            status: booking.status.toLowerCase(),
            createdAt: booking.createdAt,
          })));
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải booking');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredBookings = useMemo(() => bookings.filter((booking) => {
    const matchStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchDate = !selectedDate || booking.date === selectedDate.format('YYYY-MM-DD');
    return matchStatus && matchDate;
  }), [bookings, filterStatus, selectedDate]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Sân bóng', dataIndex: 'fieldName', key: 'fieldName', width: 180 },
    { title: 'Khách', dataIndex: 'userName', key: 'userName', width: 160 },
    { title: 'Ngày', dataIndex: 'date', key: 'date', width: 120, render: (date: string) => new Date(date).toLocaleDateString('vi-VN') },
    { title: 'Giờ', key: 'time', width: 140, render: (_: any, record: AdminBooking) => `${record.startTime} - ${record.endTime}` },
    { title: 'Giá', dataIndex: 'totalPrice', key: 'price', width: 120, render: (price: number) => <span style={{ color: '#10B981', fontWeight: 600 }}>{price.toLocaleString('vi-VN')} đ</span> },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 140, render: (status: string) => {
      const colorMap: any = { pending: 'orange', confirmed: 'green', cancelled: 'red', completed: 'blue' };
      const textMap: any = { pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', cancelled: 'Đã hủy', completed: 'Hoàn thành' };
      return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
    }},
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt', width: 160, render: (date: string) => new Date(date).toLocaleString('vi-VN') },
    { title: 'Hành động', key: 'action', width: 100, render: (_: any, record: AdminBooking) => <Button type="text" icon={<EyeOutlined />} onClick={() => { setSelectedBooking(record); setDetailModalVisible(true); }} /> }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Quản lý booking</h2>
        <p style={{ margin: 0, color: '#6b7280' }}>Tổng số: {bookings.length} booking</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <Select value={filterStatus} onChange={setFilterStatus} size="large" style={{ width: 200 }}>
          <Select.Option value="all">Tất cả trạng thái</Select.Option>
          <Select.Option value="pending">Chờ xác nhận</Select.Option>
          <Select.Option value="confirmed">Đã xác nhận</Select.Option>
          <Select.Option value="cancelled">Đã hủy</Select.Option>
          <Select.Option value="completed">Hoàn thành</Select.Option>
        </Select>
        <DatePicker placeholder="Lọc theo ngày" size="large" style={{ width: 200 }} onChange={setSelectedDate} format="DD/MM/YYYY" />
        <Button size="large" onClick={() => { setFilterStatus('all'); setSelectedDate(null); }}>Reset</Button>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
      {loading ? <BookingTableSkeleton /> : <Table columns={columns} dataSource={filteredBookings} rowKey="id" scroll={{ x: 1200 }} pagination={{ pageSize: 10 }} />}

      <Modal title="Chi tiết booking" open={detailModalVisible} onCancel={() => setDetailModalVisible(false)} footer={[<Button key="close" onClick={() => setDetailModalVisible(false)}>Đóng</Button>]} width={600}>
        {selectedBooking && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: 16 }}><strong>Khách:</strong> {selectedBooking.userName}</div>
            <div style={{ marginBottom: 16 }}><strong>Sân bóng:</strong> {selectedBooking.fieldName}</div>
            <div style={{ marginBottom: 16 }}><strong>Ngày:</strong> {new Date(selectedBooking.date).toLocaleDateString('vi-VN')}</div>
            <div style={{ marginBottom: 16 }}><strong>Giờ:</strong> {selectedBooking.startTime} - {selectedBooking.endTime}</div>
            <div style={{ marginBottom: 16 }}><strong>Giá:</strong> {selectedBooking.totalPrice.toLocaleString('vi-VN')} đ</div>
            <div><strong>Ngày tạo:</strong> {new Date(selectedBooking.createdAt).toLocaleString('vi-VN')}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
