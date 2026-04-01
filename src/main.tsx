import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import { UserProvider } from './context/UserContext'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <App />
  </UserProvider>
);