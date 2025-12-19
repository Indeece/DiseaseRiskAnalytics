import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token') || null); // Изменяем на 'token'
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token'); // Изменяем на 'token'
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

  const setTokens = (token, refreshToken) => { // Первый параметр теперь token, а не accessToken
    localStorage.setItem('token', token); // Сохраняем как 'token'
    localStorage.setItem('refreshToken', refreshToken);
    setAccessToken(token);
    setRefreshToken(refreshToken);
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8090/auth/signIn', {
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
        console.log('Ответ от сервера:', data); // Для отладки
        
        // Используем data.token и data.refreshToken
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
    localStorage.removeItem('token'); // Удаляем 'token'
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:8090/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // После успешной регистрации автоматически входим по username
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

  const refreshAccessToken = async (currentRefreshToken) => {
    if (!currentRefreshToken) return null;
    
    try {
      const response = await fetch('http://localhost:8090/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: currentRefreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          token: data.token, // Используем data.token
          refreshToken: data.refreshToken
        };
      }
      return null;
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error);
      return null;
    }
  };

  const refreshTokens = async () => {
    const currentRefreshToken = localStorage.getItem('refreshToken');
    const newTokens = await refreshAccessToken(currentRefreshToken);
    
    if (newTokens) {
      setTokens(newTokens.token, newTokens.refreshToken); // Используем newTokens.token
      return newTokens.token;
    } else {
      logout();
      return null;
    }
  };

  const value = {
    user,
    token: accessToken, // Экспортируем как token для удобства
    accessToken, // Оставляем для обратной совместимости
    refreshToken,
    loading,
    login,
    logout,
    register,
    refreshTokens,
    isAuthenticated: !!accessToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};