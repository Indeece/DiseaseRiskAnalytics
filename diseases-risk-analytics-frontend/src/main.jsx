import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HealthForm from "./HealthForm.jsx";
import DiabetesForm from "./DiabetesForm.jsx"; // Импортируем новую форму
import Authorization from "./authorization.jsx";
import Registration from "./Registration.jsx";
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import OsteoporosisForm from './OsteoporosisForm.jsx';

// Компонент приложения, который использует аутентификацию
function AppContent() {
  const { isAuthenticated, loading, logout, user } = useAuth();

  if (loading) {
    return (
      <div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-slate-100 flex flex-col items-center justify-start py-8 overflow-auto">
      
      {/* Меню навигации */}
      <nav className="mb-8 p-3 bg-white rounded-xl shadow-sm flex gap-6 font-medium items-center">
        {!isAuthenticated ? (
          <>
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 transition-colors" : "text-slate-600 hover:text-blue-600 transition-colors"
              }
            >
              Вход
            </NavLink>

            <NavLink 
              to="/register" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 transition-colors" : "text-slate-600 hover:text-blue-600 transition-colors"
              }
            >
              Регистрация
            </NavLink>
          </>
        ) : (
          <>
            <div className="text-gray-600 mr-4">
              Пользователь: <span className="font-semibold">{user?.username}</span>
            </div>
            <NavLink 
              to="/health" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 transition-colors" : "text-slate-600 hover:text-blue-600 transition-colors"
              }
            >
              Сердечно-сосудистая
            </NavLink>
            
            <NavLink 
              to="/diabetes" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 transition-colors" : "text-slate-600 hover:text-blue-600 transition-colors"
              }
            >
              Диабет
            </NavLink>

            <NavLink 
              to="/osteoporosis" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 transition-colors" : "text-slate-600 hover:text-blue-600 transition-colors"
              }
            >
              Остеопороз
            </NavLink>
            
            <button 
              onClick={logout}
              className="text-slate-600 hover:text-red-600 transition-colors ml-auto"
            >
              Выйти
            </button>
          </>
        )}
      </nav>

      {/* Контейнер формы */}
      <div className="w-full max-w-md px-4"> 
        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/health" /> : <Navigate to="/login" />
          } />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/health" element={
            <ProtectedRoute>
              <HealthForm />
            </ProtectedRoute>
          } />
          <Route path="/diabetes" element={
            <ProtectedRoute>
              <DiabetesForm />
            </ProtectedRoute>
          } />
          <Route path="/osteoporosis" element={
            <ProtectedRoute>
              <OsteoporosisForm />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

// Главный компонент, который оборачивает приложение в провайдеры
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

// Рендерим приложение
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);