import React from 'react';
import './App.css';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import AuthProvider from './providers/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Private from './components/Private';
import { Home } from '@mui/icons-material';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route element = {<PrivateRoutes/>} >
          <Route path = "/" element = {<Home />} />
          <Route path = "/private" element = {<Private />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
