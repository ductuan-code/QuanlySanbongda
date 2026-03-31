import { useState } from 'react';
import { Table, Button, Space, Tag, Avatar, Input, Select, message, Switch } from 'antd';
import { SearchOutlined, UserOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { User } from '../../types';

const { Search } = Input;

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'user-1',
      email: 'user1@example.com',
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      role: 'user'
    },
    {
      id: 'user-2',
      email: 'user2@example.com',
      name: 'Trần Thị B',
      phone: '0902345678',
      role: 'user'
    },
    {
      id: 'owner-1',
      email: 'owner1@example.com',
      name: 'Lê Văn C',
      phone: '0903456789',
      role: 'owner'
    },
    {
      id: 'admin-1',
      email: 'admin@example.com',
      name: 'Admin System',
      phone: '0904567890',
      role: 'admin'
    }
  ]);

  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const handleToggleStatus = (userId: string) => {
    message.success('Đã cập nhật trạng thái user');
  };

  const handleChangeRole = (userId: string, newRole: 'user' | 'owner' | 'admin') => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
    message.success('Đã cập nhật vai trò');
  };

  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchRole = filterRole === 'all' || user.role === filterRole;
    return matchSearch && matchRole;
  });

  const columns = [
    {
      title: 'Avatar',
      key: 'avatar',
      width: 80,
      render: (_: any, record: User) => (
        <Avatar 
          size={40}
          style={{ 
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            fontWeight: 'bold'
          }}
        >
          {record.name.charAt(0).toUpperCase()}
        </Avatar>
      )
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 220,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      render: (_: any, record: User) => (
        <Select
          value={record.role}
          onChange={(value: 'user' | 'owner' | 'admin') => handleChangeRole(record.id, value)}
          style={{ width: 120 }}
          size="small"
        >
          <Select.Option value="user">
            <Tag color="blue">User</Tag>
          </Select.Option>
          <Select.Option value="owner">
            <Tag color="green">Owner</Tag>
          </Select.Option>
          <Select.Option value="admin">
            <Tag color="red">Admin</Tag>
          </Select.Option>
        </Select>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 120,
      render: (_: any, record: User) => (
        <Switch 
          defaultChecked 
          checkedChildren="Active"
          unCheckedChildren="Locked"
          onChange={() => handleToggleStatus(record.id)}
        />
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      render: (_: any, record: User) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<UserOutlined />}
            onClick={() => message.info('Xem chi tiết user')}
          />
          <Button 
            type="text" 
            danger
            icon={<LockOutlined />}
            onClick={() => message.warning('Khóa tài khoản')}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Quản lý người dùng</h2>
        <p style={{ margin: 0, color: '#6b7280' }}>Tổng số: {users.length} người dùng</p>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: 16, 
        marginBottom: 24,
        flexWrap: 'wrap'
      }}>
        <Search
          placeholder="Tìm theo tên hoặc email..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: 400 }}
          onSearch={setSearchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Select
          value={filterRole}
          onChange={setFilterRole}
          size="large"
          style={{ width: 200 }}
        >
          <Select.Option value="all">Tất cả vai trò</Select.Option>
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="owner">Owner</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} người dùng`
        }}
      />
    </div>
  );
}
