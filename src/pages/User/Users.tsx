import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../../components/Sidebar';
import ConfirmationModal from '../../components/ConfirmationModal';
import SuccessModal from '../../components/SuccessModal';
import { useUsuariosStore } from '../../store/usuariosStore';
import { useAuthStore } from '../../store/authStore';

const Users: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const { usuarios, fetchUsuarios, deleteUsuario } = useUsuariosStore();
  const { token } = useAuthStore(); 

  useEffect(() => {
    if (token) {
      fetchUsuarios(token); 
    }
  }, [token, fetchUsuarios]);

  const handleDelete = (user: string) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      const userToDelete = usuarios.find(u => u.name === selectedUser);
      if (userToDelete && userToDelete.id) {
        try {
          await deleteUsuario(userToDelete.id, token!);
          setIsDeleteModalOpen(false);
          setIsSuccessModalOpen(true);
        } catch (error) {
          console.error('Error deleting usuario:', error);
        }
      }
    }
  };

  const handleCreateUser = () => {
    navigate('/forbidden');
  };

  const defaultImageUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full p-6 bg-[#160430]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Usuarios</h1>
          <button
            className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            onClick={handleCreateUser}
          >
            <FaPlus className="mr-2" />
            Crear Usuario
          </button>
        </div>

        <ul role="list" className="divide-y divide-gray-100 bg-white shadow-md rounded-md border border-gray-200">
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="flex justify-between gap-x-6 py-5 px-4">
              <div className="flex min-w-0 gap-x-4">
                <img
                  alt={usuario.name}
                  src={defaultImageUrl} // Usamos la imagen por defecto para todos
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{usuario.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{usuario.email}</p>
                </div>
              </div>

              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {usuario.rol?.description || 'Sin rol asignado'} {/* Maneja casos donde no haya un rol */}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(usuario.name)}>
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
        title="Eliminar usuario"
        description={`¿Estás seguro que deseas eliminar al usuario "${selectedUser}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
      />

      <SuccessModal
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        title="Eliminación exitosa"
        description={`El usuario "${selectedUser}" ha sido eliminado correctamente.`}
      />
    </div>
  );
};

export default Users;
