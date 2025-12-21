const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  
  
  PATHS: {
    AUTH: {
      LOGIN: '/auth/signIn',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh'
    },
    HEALTH: {
      RISK: '/heart/risk'  // Для сердечно-сосудистой системы
    },
    DIABETES: {
      PREDICT: '/diabetes/risk'  // Для диабета
    }
  }
};

export default API_CONFIG;