import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import API_CONFIG from './config';
import API_CONFIG from '../config';
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const setTokens = (token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    setAccessToken(token);
    setRefreshToken(refreshToken);
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.PATHS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Ответ от сервера:', data);
        
        setTokens(data.token, data.refreshToken);
        
        const userData = {
          username: username,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true };
      } else {
        const errorData = await response.text();
        return { 
          success: false, 
          error: errorData || 'Ошибка авторизации' 
        };
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      return { 
        success: false, 
        error: 'Не удалось подключиться к серверу' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.PATHS.AUTH.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password
        }),
      });

      if (response.ok) {
        const loginResult = await login(userData.username, userData.password);
        return loginResult;
      } else {
        const errorData = await response.text();
        return { 
          success: false, 
          error: errorData || 'Ошибка регистрации' 
        };
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      return { 
        success: false, 
        error: 'Не удалось подключиться к серверу' 
      };
    }
  };

  const value = {
    user,
    token: accessToken,
    accessToken,
    refreshToken,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!accessToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};