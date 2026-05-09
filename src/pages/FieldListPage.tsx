import { Card, Row, Col, Select, Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { mockFields } from '../data/mockData';
import { useState, useEffect } from 'react';
import { FieldListSkeleton } from '../components/LoadingSkeleton';

const { Title } = Typography;

export default function FieldListPage() {
  const [district, setDistrict] = useState<string>('all');
  const [fieldType, setFieldType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Simulate API call
    return () => clearTimeout(timer);
  }, [district, fieldType]);

  const filteredFields = mockFields.filter(field => {
    if (district !== 'all' && field.district !== district) return false;
    if (fieldType !== 'all' && field.fieldType !== fieldType) return false;
    return true;
  });

  return (
    <div>
      <Title level={2}>Danh Sách Sân Bóng</Title>
      
      {/* Filters */}
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

      {/* Field List */}
      {loading ? (
        <FieldListSkeleton />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredFields.map(field => (
            <Col xs={24} sm={12} md={8} key={field.id}>
              <Link to={`/fields/${field.id}`}>
                <Card
                  hoverable
                  cover={
                    <img 
                      alt={field.name}
                      src={field.images[0]}
                      style={{ height: 200, objectFit: 'cover' }}
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
