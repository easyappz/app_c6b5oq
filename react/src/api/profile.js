import instance from './axios';

export const getProfile = async () => {
  const response = await instance.get('/api/profile/');
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await instance.put('/api/profile/', userData);
  return response.data;
};
