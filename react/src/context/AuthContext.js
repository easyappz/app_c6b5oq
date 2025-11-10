import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginApi, register as registerApi, logout as logoutApi } from '../api/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user_data');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    setUser(data.member);
    localStorage.setItem('user_data', JSON.stringify(data.member));
    return data;
  };

  const register = async (userData) => {
    const data = await registerApi(userData);
    setUser(data.member);
    localStorage.setItem('user_data', JSON.stringify(data.member));
    return data;
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    localStorage.removeItem('user_data');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
