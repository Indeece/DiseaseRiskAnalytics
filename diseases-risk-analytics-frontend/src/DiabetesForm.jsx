import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

export default function DiabetesForm() {
  const { user, token } = useAuth(); // Добавляем useAuth для получения данных пользователя и токена
  
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    Insulin: '',
    BMI: '',
    Age: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  // Функция валидации данных
  const validateForm = () => {
    const requiredFields = ['Pregnancies', 'Glucose', 'BloodPressure', 'Insulin', 'BMI', 'Age'];
    
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setError(`Поле "${field}" обязательно для заполнения`);
        return false;
      }
      
      const numValue = parseFloat(formData[field]);
      if (isNaN(numValue)) {
        setError(`Поле "${field}" должно быть числом`);
        return false;
      }
      
      // Проверка на отрицательные значения
      if (numValue < 0) {
        setError(`Поле "${field}" не может быть отрицательным`);
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        Pregnancies: parseInt(formData.Pregnancies, 10),
        Glucose: parseFloat(formData.Glucose),
        BloodPressure: parseInt(formData.BloodPressure, 10),
        Insulin: parseFloat(formData.Insulin),
        BMI: parseFloat(formData.BMI),
        Age: parseInt(formData.Age, 10),
      };

      console.log('Отправка данных для модели диабета:', payload);
      
      // Отправка данных на защищенный эндпоинт
      const response = await fetch('http://localhost:4000/api/diabetes/risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Результат от сервера:', result);
        
        // В зависимости от ответа сервера
        setSuccess('Данные успешно отправлены! Результат: ' + (result.prediction || 'обработка завершена'));
        
        // Можно сбросить форму после успешной отправки
        // setFormData({
        //   Pregnancies: '',
        //   Glucose: '',
        //   BloodPressure: '',
        //   Insulin: '',
        //   BMI: '',
        //   Age: ''
        // });
      } else {
        const errorText = await response.text();
        setError(`Ошибка отправки: ${errorText}`);
      }
    } catch (err) {
      console.error('Ошибка при отправке данных:', err);
      setError('Не удалось подключиться к серверу');
    } finally {
      setLoading(false);
    }
  };

  // Общий класс для инпутов
  const inputClassName = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-black disabled:bg-gray-100";

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 w-full"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
        Проверка на диабет
      </h2>
      
      <p className="text-gray-600 text-sm mb-6 text-center">
        Пользователь: {user?.username}
      </p>

      {/* Сообщения об ошибках и успехе */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <div className="space-y-4">
        
        {/* Pregnancies: int */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700 text-sm">
            Количество беременностей
          </label>
          <input
            type="number"
            name="Pregnancies"
            value={formData.Pregnancies}
            onChange={handleChange}
            required
            min="0"
            step="1"
            placeholder="Например: 1"
            className={inputClassName}
            disabled={loading}
          />
        </div>

        {/* Glucose: float */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700 text-sm">
            Уровень глюкозы (Glucose)
          </label>
          <input
            type="number"
            name="Glucose"
            value={formData.Glucose}
            onChange={handleChange}
            required
            min="0"
            step="0.1" 
            placeholder="Например: 120.5"
            className={inputClassName}
            disabled={loading}
          />
        </div>

        {/* BloodPressure: int */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700 text-sm">
            Артериальное давление (BloodPressure)
          </label>
          <input
            type="number"
            name="BloodPressure"
            value={formData.BloodPressure}
            onChange={handleChange}
            required
            min="0"
            step="1"
            placeholder="Например: 80"
            className={inputClassName}
            disabled={loading}
          />
        </div>

        {/* Insulin: float */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700 text-sm">
            Инсулин (Insulin)
          </label>
          <input
            type="number"
            name="Insulin"
            value={formData.Insulin}
            onChange={handleChange}
            required
            min="0"
            step="0.1"
            placeholder="Например: 85.2"
            className={inputClassName}
            disabled={loading}
          />
        </div>

        {/* BMI: float */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700 text-sm">
            Индекс массы тела (BMI)
          </label>
          <input
            type="number"
            name="BMI"
            value={formData.BMI}
            onChange={handleChange}
            required
            min="0"
            step="0.1"
            placeholder="Например: 24.5"
            className={inputClassName}
            disabled={loading}
          />
        </div>

        {/* Age: int */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700 text-sm">
            Возраст (Age)
          </label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
            min="0"
            step="1"
            placeholder="Например: 35"
            className={inputClassName}
            disabled={loading}
          />
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Отправка...' : 'Проверить'}
      </button>
      
      {/* Информация о формате данных */}
      <div className="mt-4 text-xs text-gray-500">
        <p>Все поля обязательны для заполнения.</p>
        <p>Данные отправляются на защищенный сервер для анализа.</p>
      </div>
    </form>
  );
}