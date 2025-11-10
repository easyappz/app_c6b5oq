import instance from './axios';

export const register = async (userData) => {
  const response = await instance.post('/api/register/', userData);
  return response.data;
};

export const login = async (email, password) => {
  const response = await instance.post('/api/login/', { email, password });
  return response.data;
};

export const logout = async () => {
  try {
    await instance.post('/api/logout/');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};
