import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const passwordRequirements = [
  "Не менее 8 символов"
];

function validatePassword(password) {
  return password.length >= 8;
}

export default function Registration() {
  const [form, setForm] = useState({
    username: '', // Только username, email и пароли
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверки
    if (!form.username.trim()) {
      setError('Введите имя пользователя');
      return;
    }
    
    if (!form.email.trim()) {
      setError('Введите email');
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    if (!validatePassword(form.password)) {
      setError('Пароль должен быть не менее 8 символов');
      return;
    }

    setLoading(true);
    setError('');

    // Подготовка данных для регистрации БЕЗ поля name
    const userData = {
      username: form.username,
      email: form.email,
      password: form.password
    };

    const result = await register(userData);
    
    if (result.success) {
      navigate('/health');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans"
    >
      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}

      <label className="block mb-2 font-semibold text-gray-700">Имя пользователя (ник):</label>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        required
        disabled={loading}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black disabled:bg-gray-100"
        placeholder="Придумайте ник для входа"
      />

      <label className="block mb-2 font-semibold text-gray-700">Email:</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        disabled={loading}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black disabled:bg-gray-100"
        placeholder="example@email.com"
      />

      <label className="block mb-2 font-semibold text-gray-700">Пароль:</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
        onChange={handleChange}
        required
        minLength={8}
        disabled={loading}
        className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black disabled:bg-gray-100"
        placeholder="Не менее 8 символов"
      />

      {(passwordFocus || form.password) && (
        <ul className="mb-4 text-sm text-gray-600 space-y-1 list-disc list-inside">
          {passwordRequirements.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}

      <label className="block mb-2 font-semibold text-gray-700">Повторите пароль:</label>
      <input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        required
        disabled={loading}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black disabled:bg-gray-100"
        placeholder="Повторите пароль"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Уже есть аккаунт?{' '}
          <a 
            href="/login" 
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Войдите
          </a>
        </p>
      </div>
    </form>
  );
}