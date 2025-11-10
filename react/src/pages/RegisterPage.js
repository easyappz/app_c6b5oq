import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';

const { Title } = Typography;

function RegisterPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await register({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password
      });

      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);

      message.success('Регистрация прошла успешно!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.email) {
          message.error(errorData.email[0] || 'Ошибка валидации email');
        } else if (errorData.password) {
          message.error(errorData.password[0] || 'Ошибка валидации пароля');
        } else if (errorData.detail) {
          message.error(errorData.detail);
        } else {
          message.error('Ошибка регистрации. Проверьте введенные данные.');
        }
      } else {
        message.error('Ошибка соединения с сервером');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/RegisterPage.js" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <Title level={2} data-easytag="id2-react/src/pages/RegisterPage.js">Регистрация</Title>
          <p className="text-gray-500">Создайте новый аккаунт</p>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          data-easytag="id3-react/src/pages/RegisterPage.js"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
            data-easytag="id4-react/src/pages/RegisterPage.js"
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Email"
              data-easytag="id5-react/src/pages/RegisterPage.js"
            />
          </Form.Item>

          <Form.Item
            name="first_name"
            label="Имя"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя!' }
            ]}
            data-easytag="id6-react/src/pages/RegisterPage.js"
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Имя"
              data-easytag="id7-react/src/pages/RegisterPage.js"
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Фамилия"
            rules={[
              { required: true, message: 'Пожалуйста, введите фамилию!' }
            ]}
            data-easytag="id8-react/src/pages/RegisterPage.js"
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Фамилия"
              data-easytag="id9-react/src/pages/RegisterPage.js"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
              { min: 8, message: 'Пароль должен содержать минимум 8 символов!' }
            ]}
            data-easytag="id10-react/src/pages/RegisterPage.js"
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Пароль"
              data-easytag="id11-react/src/pages/RegisterPage.js"
            />
          </Form.Item>

          <Form.Item data-easytag="id12-react/src/pages/RegisterPage.js">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
              data-easytag="id13-react/src/pages/RegisterPage.js"
            >
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div className="text-center" data-easytag="id14-react/src/pages/RegisterPage.js">
            <Link to="/login" className="text-blue-600 hover:text-blue-800" data-easytag="id15-react/src/pages/RegisterPage.js">
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default RegisterPage;
