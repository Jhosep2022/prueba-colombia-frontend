import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SignUp from '../pages/IniciarSesion/SignUp';
import Home from '../pages/Home/Home';
import Users from '../pages/User/Users';
import Roles from '../pages/Rol/Roles';
import ForbiddenPage from '../pages/ForbiddenPage/ForbiddenPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path='/roles' element={<Roles />} /> 
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<Login />} /> 

      </Routes>
    </Router>
  );
};

export default AppRouter;
