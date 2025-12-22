import React, { useState, useEffect } from "react";
import { useAuth } from './context/AuthContext';
import API_CONFIG from './config';

export default function HealthForm() {
  const { user, token } = useAuth();
  const questions = [
    { key: "male", label: "Ваш пол", type: "choice", options: ["Мужской", "Женский"], values: [1, 0] },
    { key: "age", label: "Ваш возраст", type: "number" },
    { key: "currentSmoker", label: "Вы курите сейчас?", type: "choice", options: ["Да", "Нет"], values: [1, 0] },
    { key: "cigsPerDay", label: "Сколько сигарет в день вы курите", type: "number" },
    { key: "BPMeds", label: "Вы принимаете лекарства от давления?", type: "choice", options: ["Да", "Нет"], values: [1, 0] },
    { key: "prevalentStroke", label: "Были ли у вас инсульты?", type: "choice", options: ["Да", "Нет"], values: [1, 0] },
    { key: "prevalentHyp", label: "У вас есть гипертония?", type: "choice", options: ["Да", "Нет"], values: [1, 0] },
    { key: "diabetes", label: "У вас есть диабет?", type: "choice", options: ["Да", "Нет"], values: [1, 0] },
    { key: "totChol", label: "Укажите ваш уровень холестерина (mg/dL)", type: "number" },
    { key: "sysBP", label: "Укажите ваше систолическое давление", type: "number" },
    { key: "diaBP", label: "Укажите ваше диастолическое давление", type: "number" },
    { key: "BMI", label: "Индекс массы тела (BMI)", type: "number" },
    { key: "heartRate", label: "Укажите ваш пульс (уд/мин)", type: "number" },
    { key: "glucose", label: "Укажите ваш уровень глюкозы", type: "number" },
  ];

  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const current = questions[step];

  // Функция для отправки данных на сервер
  const submitFormData = async (formData) => {
    setLoading(true);
    setError("");
    
    try {
      // Преобразуем данные в числовые значения
      const payload = {
        male: parseInt(formData.male) || 0,
        age: parseInt(formData.age) || 0,
        currentSmoker: parseInt(formData.currentSmoker) || 0,
        cigsPerDay: parseInt(formData.cigsPerDay) || 0,
        BPMeds: parseInt(formData.BPMeds) || 0,
        prevalentStroke: parseInt(formData.prevalentStroke) || 0,
        prevalentHyp: parseInt(formData.prevalentHyp) || 0,
        diabetes: parseInt(formData.diabetes) || 0,
        totChol: parseInt(formData.totChol) || 0,
        sysBP: parseInt(formData.sysBP) || 0,
        diaBP: parseInt(formData.diaBP) || 0,
        BMI: parseFloat(formData.BMI) || 0,
        heartRate: parseInt(formData.heartRate) || 0,
        glucose: parseInt(formData.glucose) || 0,
      };

      console.log('Отправка данных:', payload);

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.PATHS.HEALTH.RISK}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const riskValue = await response.json(); // Получаем Double
        
        // Преобразуем в процент и округляем
        const riskPercentage = Math.round(riskValue * 100) / 100;
        
        console.log('Получен риск:', riskValue, 'Процент:', riskPercentage + '%');
        
        setResult({
          raw: riskValue,
          percentage: riskPercentage,
          interpretation: interpretRisk(riskPercentage)
        });
        
        return riskPercentage;
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Ошибка при отправке данных');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Функция для интерпретации риска
  const interpretRisk = (percentage) => {
    if (percentage < 35) {
      return "Низкий риск";
    } else if (percentage < 50) {
      return "Умеренный риск";
    } else if (percentage < 75) {
      return "Повышенный риск";
    } else {
      return "Высокий риск - требуется консультация врача";
    }
  };

  // Функция для форматирования процента
  const formatPercentage = (value) => {
    return value.toFixed(2);
  };

  function next(value) {
    setAnswers(prev => ({ ...prev, [current.key]: value }));
    setError("");

    if (step === questions.length - 1) {
      // Последний вопрос - отправляем данные
      const finalAnswers = { ...answers, [current.key]: value };
      console.log("Результат:", finalAnswers);
      
      // Отправляем данные на сервер
      submitFormData(finalAnswers);
      return;
    }
    setInputValue("");
    setStep(step + 1);
  }

  function handleNext() {
    if (inputValue === "") {
      setError("Поле не может быть пустым");
      return;
    }

    if (Number(inputValue) < 0) {
      setError("Значение не может быть меньше 0");
      return;
    }

    setError("");
    next(Number(inputValue));
  }

  // Сброс формы
  const resetForm = () => {
    setAnswers({});
    setStep(0);
    setInputValue("");
    setError("");
    setResult(null);
    setLoading(false);
  };

  // Отображение результата
  if (result) {
    return (
      <div className="max-w-lg mx-auto p-6 mt-10 rounded-2xl shadow-lg bg-white text-black">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            Анализ завершен!
          </h2>
          <p className="text-gray-600 text-center mb-2">
            Пользователь: {user?.username}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {formatPercentage(result.percentage)}%
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Риск сердечно-сосудистых заболеваний
            </div>
          </div>

          <div className="mb-6">
            <div className={`p-4 rounded-lg text-center ${
              result.percentage < 5 ? 'bg-green-100 text-green-800' :
              result.percentage < 10 ? 'bg-yellow-100 text-yellow-800' :
              result.percentage < 20 ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              <span className="font-bold">Интерпретация:</span> {result.interpretation}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg">
              <div className="text-gray-500">Исходное значение</div>
              <div className="font-bold">{result.raw}</div>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="text-gray-500">Процент риска</div>
              <div className="font-bold">{formatPercentage(result.percentage)}%</div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p className="mb-2">⚠️ <strong>Важно:</strong> Этот результат является прогнозом на основе математической модели.</p>
          <p>Для точной диагностики обратитесь к врачу.</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={resetForm}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium"
          >
            Заполнить снова
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-300 text-black py-3 rounded-xl hover:bg-gray-400 font-medium"
          >
            Распечатать результат
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 rounded-2xl shadow-lg bg-white text-black">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Анализ сердечно-сосудистых рисков</h2>
        <p className="text-gray-600">Пользователь: {user?.username}</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Прогресс</span>
          <span className="text-sm font-medium">{step + 1} из {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Вопрос {step + 1} из {questions.length}
      </h2>

      <label className="block mb-3 text-lg font-medium">
        {current.label}
      </label>

      {current.type === "choice" ? (
        <div className="flex gap-4 mt-4">
          {current.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => next(current.values[idx])}
              className="flex-1 py-2 rounded-xl border bg-blue-100 hover:bg-blue-200 text-black font-medium disabled:bg-gray-100"
              disabled={loading}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <>
          <input
            type="number"
            min="0"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (Number(e.target.value) < 0) {
                setError("Значение не может быть меньше 0");
              } else {
                setError("");
              }
            }}
            className={`w-full p-3 border rounded-xl bg-slate-50 text-black
              placeholder:text-slate-500 focus:outline-none focus:ring-2 
              ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}
              disabled:bg-gray-100`}
            placeholder="Введите значение"
            disabled={loading}
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            onClick={handleNext}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Обработка...' : (step === questions.length - 1 ? 'Отправить на анализ' : 'Далее')}
          </button>
        </>
      )}

      {step > 0 && (
        <button
          onClick={() => {
            setStep(step - 1);
            setInputValue("");
            setError("");
          }}
          className="mt-4 w-full bg-gray-300 text-black py-2 rounded-xl hover:bg-gray-400 disabled:bg-gray-200"
          disabled={loading}
        >
          Назад
        </button>
      )}
    </div>
  );
}