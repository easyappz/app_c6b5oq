import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Typography } from 'antd';
import { HomeOutlined, UserOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Главная',
      onClick: () => navigate('/'),
    },
  ];

  if (isAuthenticated) {
    menuItems.push({
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => navigate('/profile'),
    });
  }

  return (
    <Layout data-easytag="id1-react/src/pages/HomePage.js" className="min-h-screen">
      <Header className="flex items-center justify-between" style={{ background: '#001529' }}>
        <div className="flex items-center">
          <div className="text-white text-xl font-bold mr-8">Мое Приложение</div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={['home']}
            items={menuItems}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
        <div>
          {isAuthenticated ? (
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Выйти
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                type="default"
                icon={<LoginOutlined />}
                onClick={() => navigate('/login')}
              >
                Войти
              </Button>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => navigate('/register')}
              >
                Регистрация
              </Button>
            </div>
          )}
        </div>
      </Header>
      <Content className="p-12" style={{ background: '#f0f2f5' }}>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <Title level={1} data-easytag="id2-react/src/pages/HomePage.js">
            Добро пожаловать!
          </Title>
          <Paragraph className="text-lg" data-easytag="id3-react/src/pages/HomePage.js">
            Это главная страница приложения с системой регистрации и авторизации.
          </Paragraph>
          {isAuthenticated ? (
            <div data-easytag="id4-react/src/pages/HomePage.js">
              <Paragraph className="text-lg">
                Привет, <strong>{user?.first_name || user?.email}</strong>!
              </Paragraph>
              <Paragraph>
                Вы можете перейти в свой{' '}
                <Link to="/profile" className="text-blue-600 hover:text-blue-800">
                  профиль
                </Link>{' '}
                для просмотра и редактирования информации.
              </Paragraph>
            </div>
          ) : (
            <div data-easytag="id5-react/src/pages/HomePage.js">
              <Paragraph className="text-lg">
                Пожалуйста,{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800">
                  войдите
                </Link>{' '}
                или{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-800">
                  зарегистрируйтесь
                </Link>
                , чтобы продолжить.
              </Paragraph>
            </div>
          )}
        </div>
      </Content>
      <Footer className="text-center" style={{ background: '#001529', color: '#fff' }}>
        Мое Приложение ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default HomePage;
