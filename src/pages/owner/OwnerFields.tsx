import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Tag, Button, Alert, Empty } from 'antd';
import { EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ownerAPI } from '../../services/api';
import { FieldListSkeleton } from '../../components/LoadingSkeleton';
import FieldFormModal, { FieldFormValues } from '../../components/FieldFormModal';

const { Title, Text } = Typography;

const numberToFieldType: Record<number, string> = {
  1: '5v5',
  2: '7v7',
  3: '11v11',
};

// Cắt 'HH:mm:ss' -> 'HH:mm' để đổ vào TimePicker
const trimTime = (time?: string) => (time ? time.slice(0, 5) : undefined);

interface OwnerField extends FieldFormValues {
  id: string;
  images: string[];
  rating: number;
  status: string;
}

export default function OwnerFields() {
  const [fields, setFields] = useState<OwnerField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State điều khiển modal: null = thêm mới, có giá trị = sửa
  const [modalOpen, setModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<FieldFormValues | null>(null);

  const loadFields = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ownerAPI.getMyFields();
      if (response.success) {
        const mappedFields: OwnerField[] = response.data.map((field: any) => ({
          id: field.id.toString(),
          name: field.name,
          description: field.description || '',
          address: field.address || '',
          district: field.district || '',
          city: field.city || '',
          fieldType: numberToFieldType[field.fieldType] || '5v5',
          openTime: trimTime(field.openTime),
          closeTime: trimTime(field.closeTime),
          images: field.images || [],
          rating: field.averageRating || 0,
          status: field.status || 'ACTIVE',
        }));
        setFields(mappedFields);
      } else {
        setError(response.message || 'Không thể tải sân của bạn');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải sân của bạn');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  const handleAddNew = () => {
    setEditingField(null);
    setModalOpen(true);
  };

  const handleEdit = (field: OwnerField) => {
    setEditingField({
      id: field.id,
      name: field.name,
      description: field.description,
      address: field.address,
      district: field.district,
      city: field.city,
      fieldType: field.fieldType,
      openTime: field.openTime,
      closeTime: field.closeTime,
    });
    setModalOpen(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Quản lý sân của tôi</Title>
          <Text type="secondary">Tổng số: {fields.length} sân</Text>
        </div>
        <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleAddNew}>
          Thêm sân
        </Button>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      {loading ? (
        <FieldListSkeleton />
      ) : fields.length === 0 ? (
        <Empty description="Bạn chưa có sân nào. Bấm 'Thêm sân' để tạo mới." style={{ marginTop: 60 }} />
      ) : (
        <Row gutter={[24, 24]}>
          {fields.map((field) => (
            <Col xs={24} md={12} lg={8} key={field.id}>
              <Card
                cover={<img alt={field.name} src={field.images[0] || '/san-bong-da-truong-an.png'} style={{ height: 200, objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/san-bong-da-truong-an.png'; }} />}
                style={{ borderRadius: 16 }}
                actions={[
                  <Button type="text" icon={<EyeOutlined />} onClick={() => window.open(`/fields/${field.id}`, '_blank')}>
                    Xem
                  </Button>,
                  <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(field)}>
                    Sửa
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={<span style={{ fontSize: 16, fontWeight: 600 }}>{field.name}</span>}
                  description={
                    <>
                      <div style={{ marginTop: 8 }}><Text type="secondary">{field.address}</Text></div>
                      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <Tag color="blue">{field.fieldType}</Tag>
                        <Tag color="green">⭐ {field.rating}</Tag>
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <Tag color={field.status === 'ACTIVE' ? 'green' : 'red'}>
                          {field.status === 'ACTIVE' ? 'Đang hoạt động' : 'Tạm ngưng'}
                        </Tag>
                      </div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <FieldFormModal
        open={modalOpen}
        editingField={editingField}
        onClose={() => setModalOpen(false)}
        onSuccess={loadFields}
      />
    </div>
  );
}
