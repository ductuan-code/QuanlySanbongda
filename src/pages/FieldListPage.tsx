import { Card, Row, Col, Select, Typography, Tag, Alert, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FieldListSkeleton } from '../components/LoadingSkeleton';
import { useFields } from '../hooks/useFields';

const { Title } = Typography;

const fieldTypeMap: Record<string, number | undefined> = {
  all: undefined,
  '5v5': 1,
  '7v7': 2,
  '11v11': 3,
};

export default function FieldListPage() {
  const [district, setDistrict] = useState<string>('all');
  const [fieldType, setFieldType] = useState<string>('all');
  const { fields, loading, error } = useFields({
    district: district === 'all' ? undefined : district,
    fieldType: fieldTypeMap[fieldType],
  });

  return (
    <div>
      <Title level={2}>Danh Sách Sân Bóng</Title>
      
      <div style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
        <Select
          style={{ width: 200 }}
          placeholder="Chọn quận"
          value={district}
          onChange={setDistrict}
        >
          <Select.Option value="all">Tất cả huyện/thành phố</Select.Option>
          <Select.Option value="TP Hưng Yên">TP Hưng Yên</Select.Option>
          <Select.Option value="Văn Lâm">Văn Lâm</Select.Option>
          <Select.Option value="Văn Giang">Văn Giang</Select.Option>
          <Select.Option value="Yên Mỹ">Yên Mỹ</Select.Option>
          <Select.Option value="Ân Thi">Ân Thi</Select.Option>
          <Select.Option value="Khoái Châu">Khoái Châu</Select.Option>
          <Select.Option value="Mỹ Hào">Mỹ Hào</Select.Option>
          <Select.Option value="Tiên Lữ">Tiên Lữ</Select.Option>
          <Select.Option value="Phù Cừ">Phù Cừ</Select.Option>
          <Select.Option value="Kim Động">Kim Động</Select.Option>
        </Select>

        <Select
          style={{ width: 200 }}
          placeholder="Loại sân"
          value={fieldType}
          onChange={setFieldType}
        >
          <Select.Option value="all">Tất cả loại sân</Select.Option>
          <Select.Option value="5v5">Sân 5v5</Select.Option>
          <Select.Option value="7v7">Sân 7v7</Select.Option>
          <Select.Option value="11v11">Sân 11v11</Select.Option>
        </Select>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      {loading ? (
        <FieldListSkeleton />
      ) : fields.length === 0 ? (
        <Empty description="Không có sân phù hợp" />
      ) : (
        <Row gutter={[16, 16]}>
          {fields.map(field => (
            <Col xs={24} sm={12} md={8} key={field.id}>
              <Link to={`/fields/${field.id}`}>
                <Card
                  hoverable
                  cover={
                    <img 
                      alt={field.name}
                      src={field.images[0] || '/san-bong-da-truong-an.png'}
                      style={{ height: 200, objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/san-bong-da-truong-an.png'; }}
                    />
                  }
                >
                  <Card.Meta
                    title={field.name}
                    description={
                      <>
                        <div>{field.address}</div>
                        <div style={{ marginTop: 8 }}>
                          <Tag color="blue">{field.fieldType}</Tag>
                          <Tag color="green">⭐ {field.rating}</Tag>
                        </div>
                        <div style={{ marginTop: 8, color: '#1890ff', fontWeight: 'bold', fontSize: 16 }}>
                          {field.pricePerHour.toLocaleString('vi-VN')} đ/giờ
                        </div>
                      </>
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
