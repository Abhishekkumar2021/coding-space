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
  const backgroundImage = 'https://source.unsplash.com/random/1920x1080/?nature,water,sky,space,coding,technology,food,architecture';
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
