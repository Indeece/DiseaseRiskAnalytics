import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Authorization() {
  const [form, setForm] = useState({
    username: '', // Изменяем email на username
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.username.trim()) {
      setError('Введите имя пользователя');
      return;
    }
    
    if (!form.password.trim()) {
      setError('Введите пароль');
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(form.username, form.password);
    
    if (result.success) {
      navigate('/health');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans"
    >
      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}
      
      <label className="block mb-2 font-semibold text-gray-700">Имя пользователя:</label>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        required
        disabled={loading}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 disabled:bg-gray-100"
        placeholder="Введите ваш ник"
      />

      <label className="block mb-2 font-semibold text-gray-700">Пароль:</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        disabled={loading}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black disabled:bg-gray-100"
        placeholder="Введите пароль"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Вход...' : 'Войти'}
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Нет аккаунта?{' '}
          <a 
            href="/register" 
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Зарегистрируйтесь
          </a>
        </p>
      </div>
    </form>
  );
}