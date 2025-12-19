import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";

export default function HealthForm() {
  const { user } = useAuth();
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
  const [submitted, setSubmitted] = useState(false);

  const current = questions[step];

  // Функция для отправки данных на сервер
  const submitFormData = async (formData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:4000/api/risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Данные успешно отправлены:', result);
        return result;
      } else {
        throw new Error('Ошибка при отправке данных');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      throw error;
    }
  };

  function next(value) {
    setAnswers(prev => ({ ...prev, [current.key]: value }));
    setError("");

    if (step === questions.length - 1) {
      // Последний вопрос - отправляем данные
      const finalAnswers = { ...answers, [current.key]: value };
      console.log("Результат:", finalAnswers);
      
      // Отправляем данные на сервер
      submitFormData(finalAnswers)
        .then(result => {
          alert("Форма успешно отправлена!");
          setSubmitted(true);
        })
        .catch(error => {
          alert("Ошибка при отправке формы: " + error.message);
        });
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
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto p-6 mt-10 rounded-2xl shadow-lg bg-white text-black text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Форма успешно отправлена!</h2>
        <p className="mb-6">Спасибо за предоставленную информацию, {user?.username}!</p>
        <button
          onClick={resetForm}
          className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700"
        >
          Заполнить снова
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 rounded-2xl shadow-lg bg-white text-black">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Форма здоровья</h2>
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
              className="flex-1 py-2 rounded-xl border bg-blue-100 hover:bg-blue-200 text-black font-medium"
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
              ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
            placeholder="Введите значение"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            onClick={handleNext}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium"
          >
            {step === questions.length - 1 ? 'Отправить форму' : 'Далее'}
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
          className="mt-4 w-full bg-gray-300 text-black py-2 rounded-xl hover:bg-gray-400"
        >
          Назад
        </button>
      )}
    </div>
  );
}