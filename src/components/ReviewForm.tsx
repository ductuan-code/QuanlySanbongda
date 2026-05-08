import { useState } from 'react';
import { Form, Rate, Input, Button, message } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const { TextArea } = Input;

interface ReviewFormProps {
  fieldId: string;
  bookingId?: string;
  onSubmit: (rating: number, comment: string) => void;
}

export default function ReviewForm({ fieldId, bookingId, onSubmit }: ReviewFormProps) {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { rating: number; comment: string }) => {
    if (!user) {
      message.error('Vui lòng đăng nhập để đánh giá');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(values.rating, values.comment);
      form.resetFields();
      message.success('Đánh giá thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ 
        padding: '24px', 
        background: '#f5f5f5', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p>Vui lòng đăng nhập để đánh giá sân</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '24px', 
      background: '#f9f9f9', 
      borderRadius: '8px',
      marginBottom: '24px'
    }}>
      <h3 style={{ marginBottom: '16px' }}>Đánh giá sân</h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ rating: 5 }}
      >
        <Form.Item
          name="rating"
          label="Đánh giá"
          rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          name="comment"
          label="Nhận xét"
          rules={[
            { required: true, message: 'Vui lòng nhập nhận xét' },
            { min: 10, message: 'Nhận xét phải có ít nhất 10 ký tự' }
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Chia sẻ trải nghiệm của bạn về sân này..."
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Gửi đánh giá
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
