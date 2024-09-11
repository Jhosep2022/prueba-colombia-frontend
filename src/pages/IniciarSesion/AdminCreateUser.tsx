import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import Sidebar from '../../components/Sidebar';

const AdminCreateUser: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full p-8 bg-[#160430]">
        <h1 className="text-3xl font-bold text-white mb-6">Crear Nuevo Usuario</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default AdminCreateUser;
