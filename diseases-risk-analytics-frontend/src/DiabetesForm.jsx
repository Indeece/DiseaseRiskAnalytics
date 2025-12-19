import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import API_CONFIG from './config';

export default function DiabetesForm() {
  const { user, token } = useAuth();
  
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    Insulin: '',
    BMI: '',
    Age: ''
  });
  
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
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
      
      if (numValue < 0) {
        setError(`Поле "${field}" не может быть отрицательным`);
        return false;
      }
    }
    
    return true;
  };

  // Функция интерпретации результата диабета
  const interpretDiabetesRisk = (riskValue) => {
    // Предполагаем, что riskValue от 0 до 1
    const percentage = riskValue * 100;
    
    if (percentage < 30) {
      return { level: "Низкий", color: "bg-green-100 text-green-800" };
    } else if (percentage < 60) {
      return { level: "Умеренный", color: "bg-yellow-100 text-yellow-800" };
    } else if (percentage < 80) {
      return { level: "Высокий", color: "bg-orange-100 text-orange-800" };
    } else {
      return { level: "Очень высокий", color: "bg-red-100 text-red-800" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const payload = {
        Pregnancies: parseInt(formData.Pregnancies, 10),
        Glucose: parseFloat(formData.Glucose),
        BloodPressure: parseInt(formData.BloodPressure, 10),
        Insulin: parseFloat(formData.Insulin),
        BMI: parseFloat(formData.BMI),
        Age: parseInt(formData.Age, 10),
      };

      console.log('Отправка данных для диабета:', payload);
      
      // Отправка данных через Eureka Gateway
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.PATHS.DIABETES.PREDICT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const riskValue = await response.json(); // Получаем Double
        
        // Преобразуем в проценты
        const riskPercentage = Math.round(riskValue * 10000) / 100;
        const interpretation = interpretDiabetesRisk(riskValue);
        
        console.log('Получен риск диабета:', riskValue, 'Процент:', riskPercentage + '%');
        
        setResult({
          raw: riskValue,
          percentage: riskPercentage,
          interpretation: interpretation
        });
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

  // Сброс формы
  const resetForm = () => {
    setFormData({
      Pregnancies: '',
      Glucose: '',
      BloodPressure: '',
      Insulin: '',
      BMI: '',
      Age: ''
    });
    setError('');
    setResult(null);
    setLoading(false);
  };

  // Общий класс для инпутов
  const inputClassName = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-black disabled:bg-gray-100";

  // Отображение результата
  if (result) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
          Результат анализа
        </h2>
        
        <p className="text-gray-600 text-sm mb-6 text-center">
          Пользователь: {user?.username}
        </p>

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {result.percentage.toFixed(2)}%
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Риск развития диабета
            </div>
          </div>

          <div className={`p-4 rounded-lg text-center mb-6 ${result.interpretation.color}`}>
            <div className="font-bold text-lg mb-1">{result.interpretation.level} риск</div>
            <div className="text-sm">
              {result.interpretation.level === "Низкий" ? "Вероятность диабета минимальна" :
               result.interpretation.level === "Умеренный" ? "Рекомендуется наблюдение" :
               result.interpretation.level === "Высокий" ? "Необходима консультация врача" :
               "Срочно обратитесь к эндокринологу"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg">
              <div className="text-gray-500">Исходное значение</div>
              <div className="font-bold">{result.raw.toFixed(4)}</div>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="text-gray-500">Процент риска</div>
              <div className="font-bold">{result.percentage.toFixed(2)}%</div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p className="mb-2">⚠️ <strong>Важно:</strong> Результат основан на математической модели и не заменяет консультацию врача.</p>
          <p>Для точной диагностики обратитесь к эндокринологу.</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={resetForm}
            className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
          >
            Новый анализ
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-300 text-black py-3 rounded-md hover:bg-gray-400 font-semibold"
          >
            Распечатать
          </button>
        </div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
        Проверка на диабет
      </h2>
      
      <p className="text-gray-600 text-sm mb-6 text-center">
        Пользователь: {user?.username}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
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
        {loading ? 'Анализ...' : 'Проверить'}
      </button>
      
      {/* Информация о формате данных */}
      <div className="mt-4 text-xs text-gray-500">
        <p>Все поля обязательны для заполнения.</p>
        <p>Данные отправляются через Eureka Gateway на сервис анализа диабета.</p>
      </div>
    </form>
  );
}