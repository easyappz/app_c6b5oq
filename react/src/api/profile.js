import axios from './axios';

export const getProfile = async () => {
  const response = await axios.get('/api/profile/');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axios.put('/api/profile/', data);
  return response.data;
};
