import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SignUp from '../pages/IniciarSesion/SignUp';
import Home from '../pages/Home/Home';
import Users from '../pages/User/Users';
import Roles from '../pages/Rol/Roles';
import AdminCreateUser from '../pages/IniciarSesion/AdminCreateUser';
import ForbiddenPage from '../pages/ForbiddenPage/ForbiddenPage';
import ProtectedRoute from './ProtectedRoute';
import AdminCreateRole from '../pages/Rol/AdminCreateRole';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />

        <Route element={<ProtectedRoute requiredRole={[2, 3]} />}>
          <Route path="/users" element={<Users />} />
          <Route path="/admin/create-user" element={<AdminCreateUser />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole={[2]} />}>
          <Route path='/roles' element={<Roles />} />
          <Route path="/admin/create-role" element={<AdminCreateRole />} />
        </Route>

        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
