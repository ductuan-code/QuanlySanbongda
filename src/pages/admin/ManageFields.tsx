import { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { mockFields } from '../../data/mockData';
import { FootballField } from '../../types';

const { TextArea } = Input;

export default function ManageFields() {
  const [fields, setFields] = useState<FootballField[]>(mockFields);
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

  const handleDelete = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
    message.success('Đã xóa sân bóng');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingField) {
        // Update
        setFields(fields.map(f => 
          f.id === editingField.id 
            ? { ...f, ...values }
            : f
        ));
        message.success('Cập nhật sân bóng thành công');
      } else {
        // Create
        const newField: FootballField = {
          id: 'field-' + Date.now(),
          ...values,
          images: ['https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800'],
          amenities: values.amenities?.split(',').map((a: string) => a.trim()) || [],
          rating: 4.5,
          ownerId: 'owner1'
        };
        setFields([...fields, newField]);
        message.success('Thêm sân bóng thành công');
      }
      
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id: string) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{id}</span>
    },
    {
      title: 'Tên sân',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 250,
    },
    {
      title: 'Quận',
      dataIndex: 'district',
      key: 'district',
      width: 120,
    },
    {
      title: 'Loại sân',
      dataIndex: 'fieldType',
      key: 'fieldType',
      width: 100,
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    {
      title: 'Giá/giờ',
      dataIndex: 'pricePerHour',
      key: 'pricePerHour',
      width: 120,
      render: (price: number) => (
        <span style={{ color: '#10B981', fontWeight: 600 }}>
          {price.toLocaleString('vi-VN')}đ
        </span>
      )
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 80,
      render: (rating: number) => `⭐ ${rating}`
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      render: (_: any, record: FootballField) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => window.open(`/fields/${record.id}`, '_blank')}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Xóa sân bóng"
            description="Bạn có chắc muốn xóa sân này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button 
              type="text" 
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24 
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Quản lý sân bóng</h2>
          <p style={{ margin: 0, color: '#6b7280' }}>Tổng số: {fields.length} sân</p>
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

      <Table
        columns={columns}
        dataSource={fields}
        rowKey="id"
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} sân`
        }}
      />

      {/* Modal Add/Edit */}
      <Modal
        title={editingField ? 'Chỉnh sửa sân bóng' : 'Thêm sân bóng mới'}
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
              <Select.Option value="Quận 3">Quận 3</Select.Option>
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
