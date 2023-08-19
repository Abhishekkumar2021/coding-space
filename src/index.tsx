import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import ColorModeProvider from './providers/ColorModeProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ColorModeProvider>
        <App />
        </ColorModeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

