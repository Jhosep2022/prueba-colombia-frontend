import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Sidebar from '../../components/Sidebar';
import ConfirmationModal from '../../components/ConfirmationModal';
import SuccessModal from '../../components/SuccessModal';

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
];

const Users: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = (user: string) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCreateUser = () => {
    navigate('/forbidden');
  };

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
          {people.map((person) => (
            <li key={person.email} className="flex justify-between gap-x-6 py-5 px-4">
              <div className="flex min-w-0 gap-x-4">
                <img
                  alt={person.name}
                  src={person.imageUrl}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                </div>
              </div>

              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                {person.lastSeen ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(person.name)}>
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
