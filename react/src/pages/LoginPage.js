import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Layout } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Вход выполнен успешно!');
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.detail || 'Неверные учетные данные';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout data-easytag="id1-react/src/pages/LoginPage.js" className="min-h-screen" style={{ background: '#f0f2f5' }}>
      <Content className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg" data-easytag="id2-react/src/pages/LoginPage.js">
          <div className="text-center mb-6">
            <Title level={2} data-easytag="id3-react/src/pages/LoginPage.js">
              <LoginOutlined className="mr-2" />
              Вход
            </Title>
            <Paragraph data-easytag="id4-react/src/pages/LoginPage.js">
              Войдите в свой аккаунт
            </Paragraph>
          </div>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            data-easytag="id5-react/src/pages/LoginPage.js"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email!' },
                { type: 'email', message: 'Некорректный email!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="example@mail.com"
                data-easytag="id6-react/src/pages/LoginPage.js"
              />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="********"
                data-easytag="id7-react/src/pages/LoginPage.js"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
                data-easytag="id8-react/src/pages/LoginPage.js"
              >
                Войти
              </Button>
            </Form.Item>

            <div className="text-center" data-easytag="id9-react/src/pages/LoginPage.js">
              Нет аккаунта?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800">
                Зарегистрироваться
              </Link>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
