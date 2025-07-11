// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Perubahan di sini
import './index.css';
import App from './App';

// Gunakan createRoot() untuk merender aplikasi di React 18
const root = ReactDOM.createRoot(document.getElementById('root')); // Perubahan di sini
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
