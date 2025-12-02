# Disease Risk Analytics Backend

## Описание

1. **Eureka Server** - сервис регистрации и обнаружения микросервисов.  
2. **API Gateway** - маршрутизирует запросы к соответствующим сервисам и выполняет базовую фильтрацию и аутентификацию.  
3. **Heart Disease Service** - сервис для вычисления риска сердечно-сосудистых заболеваний на основе входных данных пользователя.


## Heart Disease Service

### DTOs

**RiskRequest** — входные данные для модели:

| Поле             | Тип      | Описание                                        |
|-----------------|----------|--------------------------------------------------|
| male            | int      | Пол (1 — мужчина, 0 — женщина)                   |
| age             | int      | Возраст пациента                                 |
| currentSmoker   | int      | Курит ли пациент (1 — да, 0 — нет)               |
| cigsPerDay      | float    | Количество сигарет в день                        |
| BPMeds          | float    | Принимает ли пациент препараты от давления       |
| prevalentStroke | int      | Был ли инсульт ранее                             |
| prevalentHyp    | int      | Гипертония (1 — да, 0 — нет)                     |
| diabetes        | int      | Диабет (1 — да, 0 — нет)                         |
| totChol         | float    | Общий уровень холестерина                        |
| sysBP           | float    | Систолическое давление                           |
| diaBP           | float    | Диастолическое давление                          |
| BMI             | float    | Индекс массы тела                                |
| heartRate       | float    | Пульс                                            |
| glucose         | float    | Уровень глюкозы                                  |

**RiskResponse** — ответ модели:

| Поле         | Тип   | Описание                     |
|--------------|-------|------------------------------|
| diseaseRisk  | float | Вероятность заболевания (%)  |

---

После запуска можно делать POST-запрос на:

```
POST http://localhost:8084/api/risk
Content-Type: application/json
```

С телом:

```
{
    "male": 1,
    "age": 55,
    "currentSmoker": 1,
    "cigsPerDay": 10,
    "BPMeds": 0,
    "prevalentStroke": 0,
    "prevalentHyp": 1,
    "diabetes": 0,
    "totChol": 200,
    "sysBP": 120,
    "diaBP": 80,
    "BMI": 25,
    "heartRate": 70,
    "glucose": 85
}
```

Ответ:

```
{
    "prediction": 42.75
}
```
