import React, { useState } from 'react';

const passwordRequirements = [
  "Не менее 8 символов"
];

function validatePassword(password) {
  return password.length >= 8;
}

export default function Registration() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (!validatePassword(form.password)) {
      setError('Пароль должен быть не менее 8 символов');
      return;
    }
    console.log('Регистрация:', form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans"
    >
      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}

      <label className="block mb-2 font-semibold text-gray-700">Имя:</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
      />

      <label className="block mb-2 font-semibold text-gray-700">Email:</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
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
        className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
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
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
      />

      <button
        type="submit"
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
      >
        Зарегистрироваться
      </button>
    </form>
  );
}
