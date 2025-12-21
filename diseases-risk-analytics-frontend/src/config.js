const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api',
  
  
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
    },
    OSTEOPOROSIS: {
      PREDICT: '/osteoporosis/risk' // Для остеопороза
    }
  }
};

export default API_CONFIG;