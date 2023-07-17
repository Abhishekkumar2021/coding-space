import React from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import Signup from './components/Signup';
import PrivateRoutes from './components/PrivateRoutes';
import AuthProvider from './providers/AuthProvider';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/forgot-password" element = {<ForgotPassword />} />
        <Route element = {<PrivateRoutes/>} >
          <Route path = "/" element = {<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
