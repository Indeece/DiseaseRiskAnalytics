import React, { useState } from 'react';

export default function Authorization() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Авторизация:', form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans"
    >
      <label className="block mb-2 font-semibold text-gray-700">Email:</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
      />

      <label className="block mb-2 font-semibold text-gray-700">Пароль:</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
      />

      <button
        type="submit"
        className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
      >
        Войти
      </button>
    </form>
  );
}
