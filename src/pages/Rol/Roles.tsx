import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import ConfirmationModal from '../../components/ConfirmationModal';
import SuccessModal from '../../components/SuccessModal';
import { useRolesStore } from '../../store/rolesStore';
import { useAuthStore } from '../../store/authStore';
import CreateRoleForm from '../../components/CreateRoleForm'; // Importar el formulario

const Roles: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false); // Estado para mostrar u ocultar el formulario
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [deniedMessage, setDeniedMessage] = useState<string | null>(null); // Para el mensaje de denegación
  const navigate = useNavigate();

  const { roles, fetchRoles } = useRolesStore();
  const { token, role } = useAuthStore();

  useEffect(() => {
    if (role !== 2) {
      navigate('/forbidden');
    } else if (token) {
      fetchRoles(token);
    }
  }, [token, role, fetchRoles, navigate]);

  const handleDelete = (roleDescription: string) => {
    setSelectedRole(roleDescription);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRole) {
      const roleToDelete = roles.find(r => r.description === selectedRole);
      if (roleToDelete && roleToDelete.id) {
        if (roleToDelete.id === 3) {
          setDeniedMessage('No puedes eliminar el rol "Generico".');
          setIsDeleteModalOpen(false);
        } else {
          try {
            await useRolesStore.getState().deleteRole(roleToDelete.id, token!);
            setIsDeleteModalOpen(false);
            setIsSuccessModalOpen(true);
          } catch (error) {
            console.error('Error deleting role:', error);
          }
        }
      }
    }
  };

  const handleCreateRole = () => {
    setIsCreateFormOpen(true); // Abrir el formulario de creación de roles
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full p-6 bg-[#160430]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Roles</h1>
          <button 
            className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            onClick={handleCreateRole} // Mostrar el formulario de creación
          >
            <FaPlus className="mr-2" />
            Crear Rol
          </button>
        </div>

        {deniedMessage && (
          <div className="mb-4 p-4 text-red-500 bg-red-100 rounded-md">
            {deniedMessage}
          </div>
        )}

        {/* Mostrar u ocultar el formulario de creación de roles */}
        {isCreateFormOpen && <CreateRoleForm />}

        <ul role="list" className="divide-y divide-gray-100 bg-white shadow-md rounded-md border border-gray-200">
          {roles.map((role) => (
            <li key={role.id} className="flex justify-between gap-x-6 py-5 px-4">
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
