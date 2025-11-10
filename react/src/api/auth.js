import axios from './axios';

export const login = async (email, password) => {
  const response = await axios.post('/api/login/', { email, password });
  
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);
  
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post('/api/register/', userData);
  
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
