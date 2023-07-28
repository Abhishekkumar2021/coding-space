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
import Problems from './components/Problems';
import AddProblem from './components/AddProblem';
import EditProblem from './components/EditProblem';
import ViewById from './components/ViewById';

function App() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Routes>
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/forgot-password" element = {<ForgotPassword />} />
        <Route path = "/verify-email" element = {<VerifyEmail />} />
        <Route element = {<PrivateRoutes/>} >
          {/* Home */}
          <Route path = "/" element = {<Home />} />

          {/* Profile related */}
          <Route path = "/profile" element = {<Profile />} />
          <Route path = "/edit-profile" element = {<EditProfile />} />
          
          {/* Problem related */}
          <Route path = "/problems" element = {<Problems />} />
          <Route path = "/problems/:id" element = {<ViewById />} />
          <Route path = "/problems/add" element = {<AddProblem />} />
          <Route path = "/problems/edit/:id" element = {<EditProblem />} />

        </Route>
      </Routes>
    </Box>
  );
}

export default App;
