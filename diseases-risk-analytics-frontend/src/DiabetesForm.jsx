import React, { useState } from 'react';

export default function DiabetesForm() {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    Insulin: '',
    BMI: '',
    Age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      Pregnancies: parseInt(formData.Pregnancies, 10),
      Glucose: parseFloat(formData.Glucose),
      BloodPressure: parseInt(formData.BloodPressure, 10),
      Insulin: parseFloat(formData.Insulin),
      BMI: parseFloat(formData.BMI),
      Age: parseInt(formData.Age, 10),
    };

    console.log('Данные для модели диабета:', payload);
    alert('Данные отправлены! (см. консоль)');
  };

  // Общий класс для инпутов, чтобы не дублировать код
  // Добавил 'text-black', чтобы текст ввода был черным
  const inputClassName = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-black";

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 w-full"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Проверка на диабет
      </h2>

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
          />
        </div>

      </div>

      <button
        type="submit"
        className="w-full mt-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-md"
      >
        Проверить
      </button>
    </form>
  );
}
