import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import API_CONFIG from './config';

export default function OsteoporosisForm() {
  const { user, token } = useAuth();

  // Конфигурация вопросов для остеопороза (все бинарные выборы + возраст)
  const questions = [
    { 
      key: "Age", 
      label: "Ваш возраст", 
      type: "number", 
      placeholder: "Например: 55",
      step: "1",
      parser: (val) => parseInt(val, 10)
    },
    { 
      key: "Gender", 
      label: "Пол", 
      type: "choice",
      options: [
        { value: 0, label: "Мужской" },
        { value: 1, label: "Женский" }
      ]
    },
    { 
      key: "HormonalChanges", 
      label: "Гормональные изменения", 
      type: "choice",
      options: [
        { value: 0, label: "Нет (не постменопауза)" },
        { value: 1, label: "Да (постменопауза)" }
      ]
    },
    { 
      key: "FamilyHistory", 
      label: "Семейная история остеопороза", 
      type: "choice",
      options: [
        { value: 0, label: "Нет" },
        { value: 1, label: "Да" }
      ]
    },
    { 
      key: "BodyWeight", 
      label: "Вес тела", 
      type: "choice",
      options: [
        { value: 0, label: "Нормальный" },
        { value: 1, label: "Недостаточный" }
      ]
    },
    { 
      key: "CalciumIntake", 
      label: "Потребление кальция", 
      type: "choice",
      options: [
        { value: 0, label: "Достаточно" },
        { value: 1, label: "Недостаточно" }
      ]
    },
    { 
      key: "VitaminDIntake", 
      label: "Потребление витамина D", 
      type: "choice",
      options: [
        { value: 0, label: "Достаточно" },
        { value: 1, label: "Недостаточно" }
      ]
    },
    { 
      key: "PhysicalActivity", 
      label: "Физическая активность", 
      type: "choice",
      options: [
        { value: 0, label: "Активный образ жизни" },
        { value: 1, label: "Сидячий образ жизни" }
      ]
    },
    { 
      key: "Smoking", 
      label: "Курение", 
      type: "choice",
      options: [
        { value: 0, label: "Не курю" },
        { value: 1, label: "Курю" }
      ]
    },
    { 
      key: "AlcoholConsumption", 
      label: "Потребление алкоголя", 
      type: "choice",
      options: [
        { value: 0, label: "Не употребляю" },
        { value: 1, label: "Употребляю" }
      ]
    },
    { 
      key: "MedicalConditions", 
      label: "Сопутствующие заболевания", 
      type: "choice",
      options: [
        { value: 0, label: "Нет" },
        { value: 1, label: "Гипертиреоз" },
        { value: 2, label: "Ревматоидный артрит" }
      ]
    },
    { 
      key: "Medications", 
      label: "Прием кортикостероидов", 
      type: "choice",
      options: [
        { value: 0, label: "Нет" },
        { value: 1, label: "Да" }
      ]
    },
    { 
      key: "PriorFractures", 
      label: "Были ли ранее переломы", 
      type: "choice",
      options: [
        { value: 0, label: "Нет" },
        { value: 1, label: "Да" }
      ]
    }
  ];

  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const current = questions[step];

  // Функция интерпретации результата
  const interpretOsteoporosisRisk = (riskValue) => {
    const percentage = riskValue;
    
    if (percentage < 30) {
      return { text: "Низкий риск", color: "bg-green-100 text-green-800", description: "Вероятность остеопороза минимальна" };
    } else if (percentage < 60) {
      return { text: "Умеренный риск", color: "bg-yellow-100 text-yellow-800", description: "Рекомендуется профилактика" };
    } else if (percentage < 80) {
      return { text: "Высокий риск", color: "bg-orange-100 text-orange-800", description: "Необходима консультация ортопеда" };
    } else {
      return { text: "Очень высокий риск", color: "bg-red-100 text-red-800", description: "Срочно обратитесь к врачу" };
    }
  };

  // Функция отправки данных
  const submitFormData = async (finalAnswers) => {
    setLoading(true);
    setError('');
    
    try {
      const payload = {
        Age: parseInt(finalAnswers.Age) || 0,
        Gender: parseInt(finalAnswers.Gender) || 0,
        HormonalChanges: parseInt(finalAnswers.HormonalChanges) || 0,
        FamilyHistory: parseInt(finalAnswers.FamilyHistory) || 0,
        BodyWeight: parseInt(finalAnswers.BodyWeight) || 0,
        CalciumIntake: parseInt(finalAnswers.CalciumIntake) || 0,
        VitaminDIntake: parseInt(finalAnswers.VitaminDIntake) || 0,
        PhysicalActivity: parseInt(finalAnswers.PhysicalActivity) || 0,
        Smoking: parseInt(finalAnswers.Smoking) || 0,
        AlcoholConsumption: parseInt(finalAnswers.AlcoholConsumption) || 0,
        MedicalConditions: parseInt(finalAnswers.MedicalConditions) || 0,
        Medications: parseInt(finalAnswers.Medications) || 0,
        PriorFractures: parseInt(finalAnswers.PriorFractures) || 0,
      };
      
      console.log('Отправка данных для остеопороза:', payload);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.PATHS.OSTEOPOROSIS.PREDICT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const riskValue = await response.json();
        
        const riskPercentage = Math.round(riskValue * 100) / 100;
        const interpretation = interpretOsteoporosisRisk(riskValue);
        
        console.log('Получен риск остеопороза:', riskValue, 'Процент:', riskPercentage + '%');
        
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
    const updatedAnswers = { ...answers, [current.key]: value };
    setAnswers(updatedAnswers);
    setError("");

    if (step === questions.length - 1) {
      submitFormData(updatedAnswers);
      return;
    }

    setInputValue("");
    setSelectedChoice(null);
    setStep(step + 1);
  }

  // Обработчик кнопки "Далее" для числовых инпутов
  function handleNextNumber() {
    if (inputValue === "") {
      setError("Поле не может быть пустым");
      return;
    }

    const numValue = parseInt(inputValue);

    if (isNaN(numValue)) {
      setError("Значение должно быть числом");
      return;
    }

    if (numValue < 0) {
      setError("Возраст не может быть отрицательным");
      return;
    }

    setError("");
    const parsedValue = current.parser ? current.parser(inputValue) : numValue;
    next(parsedValue);
  }

  // Обработчик выбора для choice вопросов
  function handleChoice(value) {
    setSelectedChoice(value);
    setError("");
    next(value);
  }

  // Сброс формы
  const resetForm = () => {
    setAnswers({});
    setStep(0);
    setInputValue("");
    setSelectedChoice(null);
    setError("");
    setResult(null);
    setLoading(false);
  };

  // Рендер результата
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
              Риск развития остеопороза
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
          <p>Для точной диагностики обратитесь к ортопеду или эндокринологу.</p>
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

  // Основной рендер формы
  return (
    <div className="max-w-lg mx-auto p-6 mt-10 rounded-2xl shadow-lg bg-white text-black">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Проверка на остеопороз</h2>
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

      {current.type === "number" ? (
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
              if (e.key === 'Enter') handleNextNumber();
            }}
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            onClick={handleNextNumber}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Анализ...' : (step === questions.length - 1 ? 'Отправить на анализ' : 'Далее')}
          </button>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {current.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChoice(option.value)}
              disabled={loading}
              className={`p-4 rounded-xl border-2 font-medium transition-all ${
                selectedChoice === option.value
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-slate-50 text-black border-slate-200 hover:border-blue-300 hover:bg-blue-50'
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {error && current.type !== "number" && (
        <p className="text-red-500 text-sm mt-2">Пожалуйста, сделайте выбор</p>
      )}

      {step > 0 && (
        <button
          onClick={() => {
            setStep(step - 1);
            setInputValue("");
            setSelectedChoice(null);
            setError("");
          }}
          className="mt-6 w-full bg-gray-300 text-black py-2 rounded-xl hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
          disabled={loading}
        >
          Назад
        </button>
      )}
    </div>
  );
}
