import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import ConfirmationModal from '../../components/ConfirmationModal';
import SuccessModal from '../../components/SuccessModal'; 

const roles = [
  { description: 'Admin' },
  { description: 'User' },
  { description: 'Moderator' },
  { description: 'Viewer' },
  { description: 'Editor' },
];

const Roles: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleDelete = (role: string) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full p-6 bg-[#160430]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Roles</h1>
          <button className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
            <FaPlus className="mr-2" />
            Crear Rol
          </button>
        </div>

        <ul role="list" className="divide-y divide-gray-100 bg-white shadow-md rounded-md border border-gray-200">
          {roles.map((role, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5 px-4">
              <div className="flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{role.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(role.description)}>
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ConfirmationModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        title="Eliminar rol"
        description={`¿Estás seguro que deseas eliminar el rol "${selectedRole}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
      />

      <SuccessModal
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        title="Eliminación exitosa"
        description={`El rol "${selectedRole}" ha sido eliminado correctamente.`}
      />
    </div>
  );
};

export default Roles;
