import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Вход выполнен успешно!');
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      message.error('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/LoginPage.js" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <Title level={2} data-easytag="id2-react/src/pages/LoginPage.js">Вход</Title>
          <p className="text-gray-500">Войдите в свой аккаунт</p>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          data-easytag="id3-react/src/pages/LoginPage.js"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
            data-easytag="id4-react/src/pages/LoginPage.js"
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Email"
              data-easytag="id5-react/src/pages/LoginPage.js"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' }
            ]}
            data-easytag="id6-react/src/pages/LoginPage.js"
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Пароль"
              data-easytag="id7-react/src/pages/LoginPage.js"
            />
          </Form.Item>

          <Form.Item data-easytag="id8-react/src/pages/LoginPage.js">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
              data-easytag="id9-react/src/pages/LoginPage.js"
            >
              Войти
            </Button>
          </Form.Item>

          <div className="text-center" data-easytag="id10-react/src/pages/LoginPage.js">
            <Link to="/register" className="text-blue-600 hover:text-blue-800" data-easytag="id11-react/src/pages/LoginPage.js">
              Нет аккаунта? Зарегистрироваться
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
