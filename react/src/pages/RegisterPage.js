import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Layout } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await register({
        email: values.email,
        username: values.username,
        password: values.password,
        first_name: values.first_name || '',
        last_name: values.last_name || '',
      });
      message.success('Регистрация прошла успешно!');
      navigate('/profile');
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.email?.[0] ||
                          error.response?.data?.username?.[0] ||
                          error.response?.data?.detail ||
                          'Ошибка регистрации. Попробуйте еще раз.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout data-easytag="id1-react/src/pages/RegisterPage.js" className="min-h-screen" style={{ background: '#f0f2f5' }}>
      <Content className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg" data-easytag="id2-react/src/pages/RegisterPage.js">
          <div className="text-center mb-6">
            <Title level={2} data-easytag="id3-react/src/pages/RegisterPage.js">
              <UserAddOutlined className="mr-2" />
              Регистрация
            </Title>
            <Paragraph data-easytag="id4-react/src/pages/RegisterPage.js">
              Создайте новый аккаунт для доступа к приложению
            </Paragraph>
          </div>
          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            data-easytag="id5-react/src/pages/RegisterPage.js"
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
                data-easytag="id6-react/src/pages/RegisterPage.js"
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
                data-easytag="id7-react/src/pages/RegisterPage.js"
              />
            </Form.Item>

            <Form.Item
              label="Имя"
              name="first_name"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Иван"
                data-easytag="id8-react/src/pages/RegisterPage.js"
              />
            </Form.Item>

            <Form.Item
              label="Фамилия"
              name="last_name"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Иванов"
                data-easytag="id9-react/src/pages/RegisterPage.js"
              />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль!' },
                { min: 8, message: 'Пароль должен содержать минимум 8 символов!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="********"
                data-easytag="id10-react/src/pages/RegisterPage.js"
              />
            </Form.Item>

            <Form.Item
              label="Подтверждение пароля"
              name="confirm_password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Пожалуйста, подтвердите пароль!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="********"
                data-easytag="id11-react/src/pages/RegisterPage.js"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
                data-easytag="id12-react/src/pages/RegisterPage.js"
              >
                Зарегистрироваться
              </Button>
            </Form.Item>

            <div className="text-center" data-easytag="id13-react/src/pages/RegisterPage.js">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Войти
              </Link>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default RegisterPage;
