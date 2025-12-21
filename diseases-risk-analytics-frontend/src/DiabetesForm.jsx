import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import API_CONFIG from './config';

export default function DiabetesForm() {
  const { user, token } = useAuth();

  // Конфигурация вопросов для пошаговой формы
  const questions = [
    { 
      key: "Pregnancies", 
      label: "Количество беременностей", 
      type: "number", 
      placeholder: "Например: 1",
      step: "1",
      parser: (val) => parseInt(val, 10)
    },
    { 
      key: "Glucose", 
      label: "Уровень глюкозы", 
      type: "number", 
      placeholder: "Например: 120.5",
      step: "0.1",
      parser: (val) => parseFloat(val)
    },
    { 
      key: "BloodPressure", 
      label: "Артериальное давление", 
      type: "number", 
      placeholder: "Например: 80",
      step: "1",
      parser: (val) => parseInt(val, 10)
    },
    { 
      key: "Insulin", 
      label: "Инсулин", 
      type: "number", 
      placeholder: "Например: 85.2",
      step: "0.1",
      parser: (val) => parseFloat(val)
    },
    { 
      key: "BMI", 
      label: "Индекс массы тела (BMI)", 
      type: "number", 
      placeholder: "Например: 24.5",
      step: "0.1",
      parser: (val) => parseFloat(val)
    },
    { 
      key: "Age", 
      label: "Возраст", 
      type: "number", 
      placeholder: "Например: 35",
      step: "1",
      parser: (val) => parseInt(val, 10)
    }
  ];

  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const current = questions[step];

  // Функция интерпретации результата (из старого DiabetesForm)
  const interpretDiabetesRisk = (riskValue) => {
    const percentage = riskValue;
    
    if (percentage < 30) {
      return { text: "Низкий риск", color: "bg-green-100 text-green-800", description: "Вероятность диабета минимальна" };
    } else if (percentage < 60) {
      return { text: "Умеренный риск", color: "bg-yellow-100 text-yellow-800", description: "Рекомендуется наблюдение" };
    } else if (percentage < 80) {
      return { text: "Высокий риск", color: "bg-orange-100 text-orange-800", description: "Необходима консультация врача" };
    } else {
      return { text: "Очень высокий риск", color: "bg-red-100 text-red-800", description: "Срочно обратитесь к эндокринологу" };
    }
  };

  // Функция отправки данных
  const submitFormData = async (finalAnswers) => {
    setLoading(true);
    setError('');
    
    try {
      // Формируем payload, используя парсеры из конфига вопросов или дефолтные значения
      const payload = {
        Pregnancies: parseInt(finalAnswers.Pregnancies) || 0,
        Glucose: parseFloat(finalAnswers.Glucose) || 0,
        BloodPressure: parseInt(finalAnswers.BloodPressure) || 0,
        Insulin: parseFloat(finalAnswers.Insulin) || 0,
        BMI: parseFloat(finalAnswers.BMI) || 0,
        Age: parseInt(finalAnswers.Age) || 0,
      };

      console.log('Отправка данных для диабета:', payload);
      
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
        
        const riskPercentage = Math.round(riskValue * 100) / 100;
        const interpretation = interpretDiabetesRisk(riskValue);
        
        console.log('Получен риск диабета:', riskValue, 'Процент:', riskPercentage + '%');
        
        setResult({
          raw: riskValue,
          percentage: riskPercentage,
          interpretation: interpretation
        });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Ошибка отправки данных');
      }
    } catch (err) {
      console.error('Ошибка при отправке данных:', err);
      setError(err.message || 'Не удалось подключиться к серверу');
    } finally {
      setLoading(false);
    }
  };

  // Переход к следующему шагу
  function next(value) {
    // Сохраняем значение в общем стейте
    const updatedAnswers = { ...answers, [current.key]: value };
    setAnswers(updatedAnswers);
    setError("");

    if (step === questions.length - 1) {
      // Последний вопрос - отправляем данные
      submitFormData(updatedAnswers);
      return;
    }

    setInputValue("");
    setStep(step + 1);
  }

  // Обработчик кнопки "Далее" для инпутов
  function handleNext() {
    if (inputValue === "") {
      setError("Поле не может быть пустым");
      return;
    }

    const numValue = parseFloat(inputValue);

    if (isNaN(numValue)) {
      setError("Значение должно быть числом");
      return;
    }

    if (numValue < 0) {
      setError("Значение не может быть отрицательным");
      return;
    }

    setError("");
    // Используем парсер вопроса если он есть (для int/float), иначе просто число
    const parsedValue = current.parser ? current.parser(inputValue) : numValue;
    next(parsedValue);
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

  // --- Рендер результата (стиль как в HealthForm) ---
  if (result) {
    return (
      <div className="max-w-lg mx-auto p-6 mt-10 rounded-2xl shadow-lg bg-white text-black">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Анализ завершен!
          </h2>
          <p className="text-gray-600 text-center mb-2">
            Пользователь: {user?.username}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {result.percentage.toFixed(2)}%
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Риск развития диабета
            </div>
          </div>

          <div className="mb-6">
            <div className={`p-4 rounded-lg text-center ${result.interpretation.color}`}>
              <div className="font-bold text-lg mb-1">{result.interpretation.text}</div>
              <div className="text-sm">
                {result.interpretation.description}
              </div>
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
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium"
          >
            Новый анализ
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-300 text-black py-3 rounded-xl hover:bg-gray-400 font-medium"
          >
            Распечатать
          </button>
        </div>
      </div>
    );
  }

  // --- Основной рендер формы ---
  return (
    <div className="max-w-lg mx-auto p-6 mt-10 rounded-2xl shadow-lg bg-white text-black">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Проверка на диабет</h2>
        <p className="text-gray-600">Пользователь: {user?.username}</p>
      </div>

      {/* Прогресс бар */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Прогресс</span>
          <span className="text-sm font-medium">{step + 1} из {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
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

      {/* Для диабета все поля числовые, но структуру оставляем гибкой */}
      {current.type === "choice" ? (
         <div className="flex gap-4 mt-4">
           {/* Логика для choice если понадобится в будущем */}
         </div>
      ) : (
        <>
          <input
            type="number"
            min="0"
            step={current.step || "1"}
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
            placeholder={current.placeholder || "Введите значение"}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNext();
            }}
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            onClick={handleNext}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Анализ...' : (step === questions.length - 1 ? 'Отправить на анализ' : 'Далее')}
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
          className="mt-4 w-full bg-gray-300 text-black py-2 rounded-xl hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
          disabled={loading}
        >
          Назад
        </button>
      )}
    </div>
  );
}