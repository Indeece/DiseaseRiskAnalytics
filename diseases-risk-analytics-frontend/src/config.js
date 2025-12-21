const API_CONFIG = {
  // Для разработки - локальный gateway
  // Для продакшена в Docker - будет заменено через переменные окружения
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090',
  
  
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
      PREDICT: '/api/diabetes/risk'  // Для диабета
    }
  }
};

export default API_CONFIG;