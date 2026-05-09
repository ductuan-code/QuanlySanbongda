import { Skeleton, Card, Row, Col } from 'antd';

// Loading cho danh sách sân
export function FieldListSkeleton() {
  return (
    <Row gutter={[16, 16]}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item}>
          <Card>
            <Skeleton.Image active style={{ width: '100%', height: 200 }} />
            <Skeleton active paragraph={{ rows: 3 }} style={{ marginTop: 16 }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

// Loading cho chi tiết sân
export function FieldDetailSkeleton() {
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Skeleton.Image active style={{ width: '100%', height: 400 }} />
        </Col>
        <Col xs={24} md={12}>
          <Skeleton active paragraph={{ rows: 8 }} />
        </Col>
      </Row>
      <div style={{ marginTop: 40 }}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    </div>
  );
}

// Loading cho bảng booking
export function BookingTableSkeleton() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((item) => (
        <Card key={item} style={{ marginBottom: 16 }}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
      ))}
    </div>
  );
}

// Loading cho dashboard
export function DashboardSkeleton() {
  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[1, 2, 3, 4].map((item) => (
          <Col xs={24} sm={12} md={6} key={item}>
            <Card>
              <Skeleton active paragraph={{ rows: 1 }} />
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card>
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// Loading spinner đơn giản
export function PageLoading() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '400px' 
    }}>
      <Skeleton active paragraph={{ rows: 4 }} style={{ width: '100%', maxWidth: 600 }} />
    </div>
  );
}
