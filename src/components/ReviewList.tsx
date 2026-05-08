import { Rate, List, Avatar, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <Empty 
        description="Chưa có đánh giá nào" 
        style={{ padding: '40px 0' }}
      />
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={reviews}
      renderItem={(review) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>{review.userName}</span>
                <Rate disabled value={review.rating} style={{ fontSize: 14 }} />
              </div>
            }
            description={
              <div>
                <p style={{ margin: '8px 0', color: '#000' }}>{review.comment}</p>
                <span style={{ fontSize: 12, color: '#999' }}>
                  {new Date(review.createdAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}
