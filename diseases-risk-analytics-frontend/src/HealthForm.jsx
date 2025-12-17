import React, { useState } from "react";

export default function HealthForm() {
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

  const current = questions[step];

  function next(value) {
    setAnswers(prev => ({ ...prev, [current.key]: value }));
    setError("");

    if (step === questions.length - 1) {
      console.log("Результат:", { ...answers, [current.key]: value });
      alert("Все ответы заполнены! Смотрите результат в консоли.");
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

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 rounded-2xl shadow-lg bg-white text-black">
      <h2 className="text-xl font-semibold mb-4">
        Вопрос {step + 1} из {questions.length}
      </h2>

      <label className="block mb-3 text-lg">
        {current.label}
      </label>

      {current.type === "choice" ? (
        <div className="flex gap-4 mt-4">
          {current.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => next(current.values[idx])}
              className="flex-1 py-2 rounded-xl border bg-slate-100 hover:bg-slate-200 text-white"
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
              ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-emerald-400"}`}
            placeholder="Введите значение"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            onClick={handleNext}
            className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700"
          >
            Далее
          </button>
        </>
      )}
    </div>
  );
}
