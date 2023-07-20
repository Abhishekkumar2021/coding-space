import React from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom';
import VerifyEmail from './components/VerifyEmail';
import PrivateRoutes from './components/PrivateRoutes';
import { Box } from '@mui/material';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

function App() {
  const backgroundImage = 'https://images.unsplash.com/photo-1526894826544-0f81b0a5796d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80';
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} >
      <Routes>
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/forgot-password" element = {<ForgotPassword />} />
        <Route path = "/verify-email" element = {<VerifyEmail />} />
        <Route element = {<PrivateRoutes/>} >
          <Route path = "/" element = {<Home />} />
          <Route path = "/profile" element = {<Profile />} />
          <Route path = "/edit-profile" element = {<EditProfile />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
