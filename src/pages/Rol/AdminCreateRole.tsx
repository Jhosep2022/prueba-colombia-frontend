import React from 'react';
import Sidebar from '../../components/Sidebar';
import CreateRoleForm from '../../components/CreateRoleForm';

const AdminCreateRole: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full p-8 bg-[#160430]">
        <h1 className="text-3xl font-bold text-white mb-6">Crear Nuevo Rol</h1>
        <CreateRoleForm />
      </div>
    </div>
  );
};

export default AdminCreateRole;
