import { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, message, Popconfirm, Alert } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { adminAPI } from '../../services/api';
import { BookingTableSkeleton } from '../../components/LoadingSkeleton';

interface AdminField {
  id: string;
  name: string;
  address: string;
  district: string;
  fieldType: string;
  rating: number;
  status: string;
}

export default function ManageFields() {
  const [fields, setFields] = useState<AdminField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFields = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminAPI.getAllFields(1);
      if (response.success) {
        setFields(response.data.map((field: any) => ({
          id: field.id.toString(),
          name: field.name,
          address: field.address || '',
          district: field.district || '',
          fieldType: field.fieldType === 1 ? '5v5' : field.fieldType === 2 ? '7v7' : '11v11',
          rating: field.averageRating || 0,
          status: field.status || 'ACTIVE'
        })));
      } else {
        setError(response.message || 'Không thể tải sân bóng');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải sân bóng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await adminAPI.deleteField(id);
      if (response.success) {
        message.success(response.message || 'Đã xóa sân bóng');
        await loadFields();
      } else {
        message.error(response.message || 'Không thể xóa sân bóng');
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Không thể xóa sân bóng');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Tên sân', dataIndex: 'name', key: 'name', width: 220 },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address', width: 250 },
    { title: 'Quận', dataIndex: 'district', key: 'district', width: 120 },
    { title: 'Loại sân', dataIndex: 'fieldType', key: 'fieldType', width: 100, render: (type: string) => <Tag color="blue">{type}</Tag> },
    { title: 'Rating', dataIndex: 'rating', key: 'rating', width: 80, render: (rating: number) => `⭐ ${rating}` },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 120, render: (status: string) => <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status}</Tag> },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_: any, record: AdminField) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} onClick={() => window.open(`/fields/${record.id}`, '_blank')} />
          <Popconfirm title="Xóa sân bóng" description="Bạn có chắc muốn xóa sân này?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy" okButtonProps={{ danger: true }}>
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Quản lý sân bóng</h2>
        <p style={{ margin: 0, color: '#6b7280' }}>Tổng số: {fields.length} sân</p>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      {loading ? <BookingTableSkeleton /> : <Table columns={columns} dataSource={fields} rowKey="id" scroll={{ x: 1100 }} pagination={{ pageSize: 10 }} />}
    </div>
  );
}
