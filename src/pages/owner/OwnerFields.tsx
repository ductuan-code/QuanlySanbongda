import { useState } from 'react';
import { Card, Row, Col, Typography, Tag, Button, Switch, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { mockFields } from '../../data/mockData';
import { FootballField } from '../../types';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function OwnerFields() {
  const [fields, setFields] = useState<FootballField[]>(
    mockFields.filter(f => f.ownerId === 'owner1')
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState<FootballField | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingField(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (field: FootballField) => {
    setEditingField(field);
    form.setFieldsValue(field);
    setModalVisible(true);
  };

  const handleToggleStatus = (fieldId: string) => {
    message.success('Đã cập nhật trạng thái sân');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingField) {
        setFields(fields.map(f => 
          f.id === editingField.id ? { ...f, ...values } : f
        ));
        message.success('Cập nhật sân thành công');
      } else {
        const newField: FootballField = {
          id: 'field-' + Date.now(),
          ...values,
          images: ['https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800'],
          amenities: values.amenities?.split(',').map((a: string) => a.trim()) || [],
          rating: 4.5,
          ownerId: 'owner1'
        };
        setFields([...fields, newField]);
        message.success('Thêm sân thành công');
      }
      
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24 
      }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Quản lý sân của tôi</Title>
          <Text type="secondary">Tổng số: {fields.length} sân</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
        >
          Thêm sân mới
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {fields.map(field => (
          <Col xs={24} md={12} lg={8} key={field.id}>
            <Card
              cover={
                <div style={{ position: 'relative' }}>
                  <img 
                    alt={field.name}
                    src={field.images[0]}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'white',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}>
                    <Tag color="green">Đang hoạt động</Tag>
                  </div>
                </div>
              }
              style={{ borderRadius: 16 }}
              actions={[
                <Button 
                  type="text" 
                  icon={<EyeOutlined />}
                  onClick={() => window.open(`/fields/${field.id}`, '_blank')}
                >
                  Xem
                </Button>,
                <Button 
                  type="text" 
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(field)}
                >
                  Sửa
                </Button>,
                <Switch 
                  defaultChecked 
                  onChange={() => handleToggleStatus(field.id)}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                />
              ]}
            >
              <Card.Meta
                title={<span style={{ fontSize: 16, fontWeight: 600 }}>{field.name}</span>}
                description={
                  <>
                    <div style={{ marginTop: 8 }}>
                      <Text type="secondary">{field.address}</Text>
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      <Tag color="blue">{field.fieldType}</Tag>
                      <Tag color="green">⭐ {field.rating}</Tag>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#10B981' }}>
                        {field.pricePerHour.toLocaleString('vi-VN')}đ/giờ
                      </Text>
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Add/Edit */}
      <Modal
        title={editingField ? 'Chỉnh sửa sân' : 'Thêm sân mới'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        width={600}
        okText={editingField ? 'Cập nhật' : 'Thêm'}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="name"
            label="Tên sân"
            rules={[{ required: true, message: 'Vui lòng nhập tên sân!' }]}
          >
            <Input placeholder="VD: Sân Bóng Thể Thao Quận 1" size="large" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input placeholder="VD: 123 Nguyễn Huệ" size="large" />
          </Form.Item>

          <Form.Item
            name="district"
            label="Quận/Huyện"
            rules={[{ required: true, message: 'Vui lòng chọn quận!' }]}
          >
            <Select placeholder="Chọn quận" size="large">
              <Select.Option value="Quận 1">Quận 1</Select.Option>
              <Select.Option value="Quận 2">Quận 2</Select.Option>
              <Select.Option value="Phú Nhuận">Phú Nhuận</Select.Option>
              <Select.Option value="Tân Bình">Tân Bình</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="fieldType"
            label="Loại sân"
            rules={[{ required: true, message: 'Vui lòng chọn loại sân!' }]}
          >
            <Select placeholder="Chọn loại sân" size="large">
              <Select.Option value="5v5">Sân 5v5</Select.Option>
              <Select.Option value="7v7">Sân 7v7</Select.Option>
              <Select.Option value="11v11">Sân 11v11</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="pricePerHour"
            label="Giá thuê (đ/giờ)"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <InputNumber 
              placeholder="300000"
              style={{ width: '100%' }}
              size="large"
              min={0}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <TextArea 
              rows={3}
              placeholder="Mô tả về sân bóng..."
            />
          </Form.Item>

          <Form.Item
            name="amenities"
            label="Tiện nghi (cách nhau bởi dấu phẩy)"
          >
            <Input 
              placeholder="VD: Đèn chiếu sáng, Phòng thay đồ, Bãi đỗ xe"
              size="large"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
