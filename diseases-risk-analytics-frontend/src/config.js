// Конфигурация API
const API_CONFIG = {
  // Базовый URL через Eureka Gateway
  BASE_URL: 'http://localhost:8090',
  
  // Пути к API
  PATHS: {
    AUTH: {
      LOGIN: '/auth/signIn',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh'
    },
    HEALTH: {
      RISK: '/api/risk'  // Для сердечно-сосудистой системы
    },
    DIABETES: {
      PREDICT: '/api/diabetes/predict'  // Для диабета
    }
  }
};

export default API_CONFIG;