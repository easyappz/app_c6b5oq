import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Card, Form, Input, Button, Typography, message, Spin } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined, SaveOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '../api/profile';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const { logout, updateUser } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfileData(data);
      form.setFieldsValue({
        email: data.email,
        username: data.username,
        first_name: data.first_name || '',
        last_name: data.last_name || '',
      });
    } catch (error) {
      console.error('Profile load error:', error);
      message.error('Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const onFinish = async (values) => {
    setSaving(true);
    try {
      const data = await updateProfile({
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
      });
      setProfileData(data);
      updateUser(data);
      message.success('Профиль обновлен успешно!');
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.username?.[0] ||
                          error.response?.data?.detail ||
                          'Ошибка обновления профиля';
      message.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Главная',
      onClick: () => navigate('/'),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => navigate('/profile'),
    },
  ];

  return (
    <Layout data-easytag="id1-react/src/pages/ProfilePage.js" className="min-h-screen">
      <Header className="flex items-center justify-between" style={{ background: '#001529' }}>
        <div className="flex items-center">
          <div className="text-white text-xl font-bold mr-8">Мое Приложение</div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={['profile']}
            items={menuItems}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
        <div>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </div>
      </Header>
      <Content className="p-8" style={{ background: '#f0f2f5' }}>
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg" data-easytag="id2-react/src/pages/ProfilePage.js">
            <Title level={2} data-easytag="id3-react/src/pages/ProfilePage.js">
              <UserOutlined className="mr-2" />
              Настройки профиля
            </Title>
            {loading ? (
              <div className="text-center py-8">
                <Spin size="large" />
              </div>
            ) : (
              <Form
                form={form}
                name="profile"
                onFinish={onFinish}
                layout="vertical"
                size="large"
                data-easytag="id4-react/src/pages/ProfilePage.js"
              >
                <Form.Item
                  label="Email"
                  name="email"
                >
                  <Input
                    prefix={<UserOutlined />}
                    disabled
                    data-easytag="id5-react/src/pages/ProfilePage.js"
                  />
                </Form.Item>

                <Form.Item
                  label="Имя пользователя"
                  name="username"
                  rules={[
                    { required: true, message: 'Пожалуйста, введите имя пользователя!' },
                    { min: 3, message: 'Минимум 3 символа!' },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="username"
                    data-easytag="id6-react/src/pages/ProfilePage.js"
                  />
                </Form.Item>

                <Form.Item
                  label="Имя"
                  name="first_name"
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Иван"
                    data-easytag="id7-react/src/pages/ProfilePage.js"
                  />
                </Form.Item>

                <Form.Item
                  label="Фамилия"
                  name="last_name"
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Иванов"
                    data-easytag="id8-react/src/pages/ProfilePage.js"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={saving}
                    icon={<SaveOutlined />}
                    size="large"
                    data-easytag="id9-react/src/pages/ProfilePage.js"
                  >
                    Сохранить изменения
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Card>
        </div>
      </Content>
      <Footer className="text-center" style={{ background: '#001529', color: '#fff' }}>
        Мое Приложение ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default ProfilePage;
