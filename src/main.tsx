import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import Landing from './pages/Landing'
import { UserProvider } from './context/UserContext'
import './index.css'

// Простой роутинг: /landing → лендинг, всё остальное → приложение
const isLanding = window.location.pathname === '/landing' || window.location.pathname === '/landing/';

createRoot(document.getElementById("root")!).render(
  isLanding ? (
    <Landing />
  ) : (
    <UserProvider>
      <App />
    </UserProvider>
  )
);