import { useEffect, useMemo, useState } from 'react';
import { Table, Button, Space, Tag, Avatar, Input, Select, message, Switch, Alert } from 'antd';
import { SearchOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { adminAPI } from '../../services/api';
import { BookingTableSkeleton } from '../../components/LoadingSkeleton';

const { Search } = Input;

interface AdminUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'owner' | 'admin';
  status: 'ACTIVE' | 'BLOCKED';
}

export default function ManageUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminAPI.getUsers(1);
      if (response.success) {
        setUsers(response.data.map((user: any) => ({
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          phone: user.phone || '',
          role: user.role.toLowerCase(),
          status: user.status || 'ACTIVE'
        })));
      } else {
        setError(response.message || 'Không thể tải users');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleStatus = async (userId: string) => {
    try {
      const response = await adminAPI.blockUser(userId);
      if (response.success) {
        message.success(response.message || 'Đã cập nhật trạng thái user');
        await loadUsers();
      } else {
        message.error(response.message || 'Không thể cập nhật trạng thái user');
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Không thể cập nhật trạng thái user');
    }
  };

  const filteredUsers = useMemo(() => users.filter((user) => {
    const matchSearch = user.name.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchRole = filterRole === 'all' || user.role === filterRole;
    return matchSearch && matchRole;
  }), [users, searchText, filterRole]);

  const columns = [
    {
      title: 'Avatar',
      key: 'avatar',
      width: 80,
      render: (_: any, record: AdminUser) => (
        <Avatar size={40} style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', fontWeight: 'bold' }}>
          {record.name.charAt(0).toUpperCase()}
        </Avatar>
      )
    },
    { title: 'Tên', dataIndex: 'name', key: 'name', width: 180 },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 220 },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone', width: 140 },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: string) => {
        const colorMap: any = { user: 'blue', owner: 'green', admin: 'red' };
        return <Tag color={colorMap[role]}>{role.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 140,
      render: (_: any, record: AdminUser) => (
        <Switch checked={record.status === 'ACTIVE'} checkedChildren="Active" unCheckedChildren="Blocked" onChange={() => handleToggleStatus(record.id)} />
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      render: (_: any, record: AdminUser) => (
        <Space size="small">
          <Button type="text" icon={<UserOutlined />} />
          <Button type="text" danger icon={<LockOutlined />} onClick={() => handleToggleStatus(record.id)} />
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Quản lý người dùng</h2>
        <p style={{ margin: 0, color: '#6b7280' }}>Tổng số: {users.length} người dùng</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <Search placeholder="Tìm theo tên hoặc email..." allowClear enterButton={<SearchOutlined />} size="large" style={{ width: 400 }} onSearch={setSearchText} onChange={(e) => setSearchText(e.target.value)} />
        <Select value={filterRole} onChange={setFilterRole} size="large" style={{ width: 200 }}>
          <Select.Option value="all">Tất cả vai trò</Select.Option>
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="owner">Owner</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      {loading ? <BookingTableSkeleton /> : <Table columns={columns} dataSource={filteredUsers} rowKey="id" pagination={{ pageSize: 10 }} />}
    </div>
  );
}
