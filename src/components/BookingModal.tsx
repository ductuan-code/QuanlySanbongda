import { Modal, Descriptions, Button, message, Divider } from 'antd';
import { TimeSlot, FootballField } from '../types';
import { useState } from 'react';

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  timeSlots: TimeSlot[]; // Đổi từ timeSlot sang timeSlots (array)
  field: FootballField | null;
  onConfirm: () => void;
}

export default function BookingModal({ 
  visible, 
  onClose, 
  timeSlots, 
  field,
  onConfirm 
}: BookingModalProps) {
  const [loading, setLoading] = useState(false);

  if (timeSlots.length === 0 || !field) return null;

  // Tính tổng giá
  const totalPrice = timeSlots.reduce((sum, slot) => sum + slot.price, 0);
  
  // Sắp xếp slots theo thời gian
  const sortedSlots = [...timeSlots].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );
  
  // Lấy giờ bắt đầu và kết thúc
  const startTime = sortedSlots[0].startTime;
  const endTime = sortedSlots[sortedSlots.length - 1].endTime;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConfirm();
      message.success({
        content: `Đặt sân thành công ${timeSlots.length} khung giờ!`,
        duration: 3
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ fontSize: 18 }}>
          ⚽ Xác nhận đặt sân
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} size="large" disabled={loading}>
          Hủy
        </Button>,
        <Button 
          key="confirm" 
          type="primary" 
          onClick={handleConfirm}
          size="large"
          loading={loading}
        >
          Xác nhận đặt sân
        </Button>
      ]}
      width={600}
    >
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Sân bóng">
          <strong>{field.name}</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {field.address}
        </Descriptions.Item>
        <Descriptions.Item label="Loại sân">
          {field.fieldType}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          <strong>{new Date(sortedSlots[0].date).toLocaleDateString('vi-VN')}</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian">
          <strong style={{ color: '#1890ff' }}>
            {startTime} - {endTime}
          </strong>
          <span style={{ marginLeft: 8, color: '#666' }}>
            ({timeSlots.length} khung giờ)
          </span>
        </Descriptions.Item>
      </Descriptions>

      <Divider>Chi tiết giá</Divider>

      {/* Danh sách các khung giờ */}
      <div style={{ marginBottom: 16 }}>
        {sortedSlots.map((slot, index) => (
          <div 
            key={slot.id}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: index % 2 === 0 ? '#fafafa' : 'white',
              borderRadius: 4
            }}
          >
            <span>
              {slot.startTime} - {slot.endTime}
            </span>
            <span style={{ fontWeight: 'bold' }}>
              {slot.price.toLocaleString('vi-VN')} đ
            </span>
          </div>
        ))}
      </div>

      {/* Tổng tiền */}
      <div style={{ 
        padding: 16, 
        background: '#e6f7ff', 
        borderRadius: 8,
        border: '1px solid #91d5ff'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>
            Tổng thanh toán:
          </span>
          <span style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#1890ff' 
          }}>
            {totalPrice.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      {/* Lưu ý */}
      <div style={{ 
        marginTop: 16, 
        padding: 12, 
        background: '#fffbe6', 
        borderRadius: 4,
        border: '1px solid #ffe58f'
      }}>
        <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
          💡 <strong>Lưu ý:</strong> Vui lòng đến sân đúng giờ. Hủy lịch trước 2 giờ để được hoàn tiền 100%.
        </p>
      </div>
    </Modal>
  );
}
