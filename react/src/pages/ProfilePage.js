import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Spin, Space, Typography } from 'antd';
import { UserOutlined, MailOutlined, LogoutOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, logout } from '../api/auth';

const { Title } = Typography;

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setUserData(data);
      form.setFieldsValue({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name
      });
    } catch (error) {
      message.error('Ошибка при загрузке профиля');
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values) => {
    try {
      setLoading(true);
      const updatedData = await updateProfile({
        first_name: values.first_name,
        last_name: values.last_name
      });
      setUserData(updatedData);
      setEditMode(false);
      message.success('Профиль успешно обновлен');
    } catch (error) {
      message.error('Ошибка при обновлении профиля');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Вы успешно вышли из системы');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      logout();
      navigate('/login');
    }
  };

  const handleCancel = () => {
    form.setFieldsValue({
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name
    });
    setEditMode(false);
  };

  if (loading && !userData) {
    return (
      <div data-easytag="id1-react/src/pages/ProfilePage.js" className="flex items-center justify-center min-h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div data-easytag="id2-react/src/pages/ProfilePage.js" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card
          data-easytag="id3-react/src/pages/ProfilePage.js"
          className="shadow-lg rounded-lg"
          title={
            <div className="flex items-center justify-between">
              <Title level={2} className="mb-0">
                Профиль
              </Title>
              <Button
                data-easytag="id4-react/src/pages/ProfilePage.js"
                type="default"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </div>
          }
        >
          <Spin spinning={loading}>
            {!editMode ? (
              <div data-easytag="id5-react/src/pages/ProfilePage.js" className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MailOutlined className="text-xl text-gray-500 mr-3 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="text-lg font-medium text-gray-900">{userData?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <UserOutlined className="text-xl text-gray-500 mr-3 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Имя</p>
                        <p className="text-lg font-medium text-gray-900">
                          {userData?.first_name || <span className="text-gray-400 italic">Не указано</span>}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <UserOutlined className="text-xl text-gray-500 mr-3 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Фамилия</p>
                        <p className="text-lg font-medium text-gray-900">
                          {userData?.last_name || <span className="text-gray-400 italic">Не указано</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  data-easytag="id6-react/src/pages/ProfilePage.js"
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => setEditMode(true)}
                  size="large"
                  block
                >
                  Редактировать профиль
                </Button>
              </div>
            ) : (
              <Form
                data-easytag="id7-react/src/pages/ProfilePage.js"
                form={form}
                onFinish={handleSave}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  label="Email"
                  name="email"
                >
                  <Input
                    data-easytag="id8-react/src/pages/ProfilePage.js"
                    prefix={<MailOutlined />}
                    disabled
                    size="large"
                  />
                </Form.Item>
                
                <Form.Item
                  label="Имя"
                  name="first_name"
                >
                  <Input
                    data-easytag="id9-react/src/pages/ProfilePage.js"
                    prefix={<UserOutlined />}
                    placeholder="Введите ваше имя"
                    size="large"
                  />
                </Form.Item>
                
                <Form.Item
                  label="Фамилия"
                  name="last_name"
                >
                  <Input
                    data-easytag="id10-react/src/pages/ProfilePage.js"
                    prefix={<UserOutlined />}
                    placeholder="Введите вашу фамилию"
                    size="large"
                  />
                </Form.Item>
                
                <Space className="w-full" size="middle">
                  <Button
                    data-easytag="id11-react/src/pages/ProfilePage.js"
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    size="large"
                    className="flex-1"
                  >
                    Сохранить
                  </Button>
                  <Button
                    data-easytag="id12-react/src/pages/ProfilePage.js"
                    onClick={handleCancel}
                    icon={<CloseOutlined />}
                    size="large"
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                </Space>
              </Form>
            )}
          </Spin>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
