import { Modal, Form, Input, Select, TimePicker, Row, Col, message } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ownerAPI } from '../services/api';

const { TextArea } = Input;

// Map loại sân: text hiển thị <-> số backend yêu cầu
const fieldTypeToNumber: Record<string, number> = {
  '5v5': 1,
  '7v7': 2,
  '11v11': 3,
};


export interface FieldFormValues {
  id?: string;
  name: string;
  description?: string;
  address: string;
  district?: string;
  city?: string;
  fieldType: string; // '5v5' | '7v7' | '11v11'
  openTime?: string; // 'HH:mm'
  closeTime?: string; // 'HH:mm'
}

interface FieldFormModalProps {
  open: boolean;
  // null = thêm mới, có giá trị = chỉnh sửa
  editingField: FieldFormValues | null;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * Modal dùng chung cho cả Thêm sân và Sửa sân của Chủ sân.
 * - Thêm mới: gọi POST /api/owner/fields
 * - Chỉnh sửa: gọi PUT /api/owner/fields/{id}
 */
export default function FieldFormModal({
  open,
  editingField,
  onClose,
  onSuccess,
}: FieldFormModalProps) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!editingField;

  // Đổ dữ liệu vào form khi mở modal
  useEffect(() => {
    if (open) {
      if (editingField) {
        form.setFieldsValue({
          name: editingField.name,
          description: editingField.description,
          address: editingField.address,
          district: editingField.district,
          city: editingField.city,
          fieldType: editingField.fieldType,
          openTime: editingField.openTime ? dayjs(editingField.openTime, 'HH:mm') : undefined,
          closeTime: editingField.closeTime ? dayjs(editingField.closeTime, 'HH:mm') : undefined,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, editingField, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      // Chuẩn hóa payload theo CreateFieldDto của backend
      const payload = {
        name: values.name,
        description: values.description || '',
        address: values.address,
        district: values.district || '',
        city: values.city || '',
        fieldType: fieldTypeToNumber[values.fieldType] ?? 1,
        openTime: values.openTime ? values.openTime.format('HH:mm:ss') : null,
        closeTime: values.closeTime ? values.closeTime.format('HH:mm:ss') : null,
      };

      const response = isEditing
        ? await ownerAPI.updateField(editingField!.id!, payload)
        : await ownerAPI.createField(payload);

      if (response.success) {
        message.success(response.message || (isEditing ? 'Cập nhật sân thành công!' : 'Thêm sân thành công!'));
        onSuccess();
        onClose();
      } else {
        message.error(response.message || 'Thao tác thất bại');
      }
    } catch (err: any) {
      // validateFields ném lỗi validate -> bỏ qua, chỉ báo lỗi API
      if (err?.errorFields) return;
      message.error(err.response?.data?.message || 'Thao tác thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={isEditing ? '✏️ Chỉnh sửa sân bóng' : '➕ Thêm sân bóng mới'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={isEditing ? 'Lưu thay đổi' : 'Thêm sân'}
      cancelText="Hủy"
      confirmLoading={submitting}
      width={640}
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="Tên sân"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sân!' }]}
        >
          <Input placeholder="VD: Sân bóng Trường An" size="large" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={3} placeholder="Mô tả ngắn về sân (cỏ, tiện nghi...)" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input placeholder="Số nhà, tên đường..." size="large" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Quận / Huyện" name="district">
              <Input placeholder="VD: Văn Lâm" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Tỉnh / Thành phố" name="city">
              <Input placeholder="VD: Hưng Yên" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Loại sân"
              name="fieldType"
              rules={[{ required: true, message: 'Chọn loại sân!' }]}
            >
              <Select size="large" placeholder="Chọn loại sân">
                <Select.Option value="5v5">Sân 5v5</Select.Option>
                <Select.Option value="7v7">Sân 7v7</Select.Option>
                <Select.Option value="11v11">Sân 11v11</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item label="Giờ mở cửa" name="openTime">
              <TimePicker format="HH:mm" size="large" style={{ width: '100%' }} placeholder="VD: 06:00" />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item label="Giờ đóng cửa" name="closeTime">
              <TimePicker format="HH:mm" size="large" style={{ width: '100%' }} placeholder="VD: 22:00" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
