import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SignUp from '../pages/IniciarSesion/SignUp';
import Home from '../pages/Home/Home';
import Users from '../pages/User/Users';
import Roles from '../pages/Rol/Roles';
import ForbiddenPage from '../pages/ForbiddenPage/ForbiddenPage';
import ProtectedRoute from './ProtectedRoute';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        
        {/* Proteger la ruta de usuarios */}
        <Route element={<ProtectedRoute requiredRole={2} />}>
          <Route path="/users" element={<Users />} />
        </Route>

        {/* Proteger la ruta de roles */}
        <Route element={<ProtectedRoute requiredRole={2} />}>
          <Route path='/roles' element={<Roles />} />
        </Route>

        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
