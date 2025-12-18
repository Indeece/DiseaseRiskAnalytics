import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DiabetesForm from "./DiabetesForm.jsx";
import HealthForm from "./HealthForm.jsx";
import Authorization from "./Authorization.jsx";
import Registration from "./Registration.jsx";
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="w-screen h-screen bg-slate-100 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Меню навигации */}
        <nav className="mb-8 p-3 bg-white rounded-xl shadow-sm flex gap-6 font-medium">
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

        </nav>

        {/* Контейнер формы */}
        <div className="w-full max-w-md px-4"> 
          <Routes>
            <Route path="/" element={<Authorization />} />
            <Route path="/login" element={<Authorization />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/health" element={<HealthForm />} />
            <Route path="/diabetes" element={<DiabetesForm />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  </StrictMode>
);
