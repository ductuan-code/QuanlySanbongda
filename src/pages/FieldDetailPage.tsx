import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Tag, Button, message, Divider, Card, Alert, DatePicker } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import TimeSlotTable from '../components/TimeSlotTable';
import BookingModal from '../components/BookingModal';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { FieldDetailSkeleton } from '../components/LoadingSkeleton';
import { Review, TimeSlot } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { useBookingSelection } from '../hooks/useBookingSelection';
import { useFieldDetail, useFieldSchedule } from '../hooks/useFields';

const { Title, Text } = Typography;

export default function FieldDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { bookings, addBooking } = useBooking();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [reviews, setReviews] = useState<Review[]>([]);
  const { field, loading, error } = useFieldDetail(id || '');
  const { schedule, loading: scheduleLoading, error: scheduleError } = useFieldSchedule(id || '', selectedDate);
  
  // Custom hook quản lý booking selection
  const {
    selectedSlots,
    isSlotSelected,
    isSlotDisabled,
    toggleSlot,
    clearSelection,
    hasSelection
  } = useBookingSelection();


  if (loading) {
    return <FieldDetailSkeleton />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (!field) {
    return <div>Không tìm thấy sân bóng</div>;
  }

  const timeSlots: TimeSlot[] = schedule.map((slot: any, index: number) => ({
    id: [id, selectedDate, slot.startTime, index].join('-'),
    fieldId: id || '',
    date: selectedDate,
    startTime: slot.startTime,
    endTime: slot.endTime,
    price: slot.price,
    status: slot.status === 'AVAILABLE' ? 'available' : 'booked',
  }));
  
  // Lấy danh sách slot đã được đặt
  const bookedSlotIds = [
    ...bookings
      .filter(b => b.fieldId === id && b.status !== 'cancelled')
      .map(b => b.timeSlotId),
    ...timeSlots.filter(slot => slot.status !== 'available').map(slot => slot.id),
  ];

  // Mở modal xác nhận
  const handleOpenModal = () => {
    if (!hasSelection) {
      message.warning('Vui lòng chọn ít nhất 1 khung giờ!');
      return;
    }

    if (!isAuthenticated) {
      message.warning('Vui lòng đăng nhập để đặt sân!');
      navigate('/login');
      return;
    }

    setModalVisible(true);
  };

  // Xác nhận booking
  const handleConfirmBooking = async () => {
    if (!user) return;

    const sortedSlots = [...selectedSlots].sort((a, b) => a.startTime.localeCompare(b.startTime));
    const bookingData = {
      fieldId: parseInt(field.id),
      bookingDate: selectedDate,
      startTime: sortedSlots[0].startTime,
      endTime: sortedSlots[sortedSlots.length - 1].endTime,
      note: 'Đặt sân từ website'
    };
    
    const success = await addBooking(bookingData);
    if (success) {
      clearSelection();
      setModalVisible(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Xử lý submit review
  const handleSubmitReview = (rating: number, comment: string) => {
    if (!user) return;

    const newReview: Review = {
      id: `r${Date.now()}`,
      userId: user.id,
      userName: user.name,
      fieldId: id!,
      bookingId: 'temp-booking-id',
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    setReviews([newReview, ...reviews]);
  };

  // Tính rating trung bình
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <img 
            src={field.images[0] || '/san-bong-da-truong-an.png'}
            alt={field.name}
            style={{ width: '100%', borderRadius: 8 }} onError={(e) => { e.currentTarget.src = '/san-bong-da-truong-an.png'; }}
          />
        </Col>
        
        <Col xs={24} md={12}>
          <Title level={2}>{field.name}</Title>
          <Text type="secondary">{field.address}</Text>
          
          <div style={{ marginTop: 16 }}>
            <Tag color="blue">{field.fieldType}</Tag>
            <Tag color="green">⭐ {averageRating} ({reviews.length} đánh giá)</Tag>
          </div>

          <div style={{ marginTop: 16 }}>
            <Title level={4} style={{ color: '#1890ff' }}>
              {field.pricePerHour.toLocaleString('vi-VN')} đ/giờ
            </Title>
          </div>

          <div style={{ marginTop: 16 }}>
            <Text>{field.description}</Text>
          </div>

          <div style={{ marginTop: 16 }}>
            <Title level={5}>Tiện nghi:</Title>
            {field.amenities.length > 0 && field.amenities.map((amenity, index) => (
              <Tag key={index}>{amenity}</Tag>
            ))}
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: 40 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16 
        }}>
          <Title level={3} style={{ margin: 0 }}>
            Lịch Trống - {dayjs(selectedDate).format('DD/MM/YYYY')}
          </Title>
          
          <DatePicker
            value={dayjs(selectedDate)}
            onChange={(date) => {
              clearSelection();
              setSelectedDate((date || dayjs()).format('YYYY-MM-DD'));
            }}
            format="DD/MM/YYYY"
          />
          
          {hasSelection && (
            <Button 
              type="primary" 
              size="large"
              onClick={handleOpenModal}
            >
              Đặt sân ({selectedSlots.length} khung giờ)
            </Button>
          )}
        </div>

        {scheduleError && <Alert type="error" message={scheduleError} style={{ marginBottom: 16 }} />}

        {scheduleLoading ? (
          <FieldDetailSkeleton />
        ) : (
          <TimeSlotTable 
          timeSlots={timeSlots}
          selectedSlots={selectedSlots}
          bookedSlotIds={bookedSlotIds}
          isSlotSelected={isSlotSelected}
          isSlotDisabled={isSlotDisabled}
          onSelectSlot={toggleSlot}
        />
        )}
      </div>

      <BookingModal
        visible={modalVisible}
        onClose={handleCloseModal}
        timeSlots={selectedSlots}
        field={field}
        onConfirm={handleConfirmBooking}
      />

      {/* Phần đánh giá */}
      <Divider />
      
      <div style={{ marginTop: 40 }}>
        <Title level={3}>Đánh giá từ khách hàng</Title>
        <Card style={{ marginTop: 16 }}>
          <ReviewForm 
            fieldId={id!} 
            onSubmit={handleSubmitReview}
          />
          
          <Divider />
          
          <ReviewList reviews={reviews} />
        </Card>
      </div>
    </div>
  );
}
