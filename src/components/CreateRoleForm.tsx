import React, { useState } from 'react';
import InputField from './InputField';
import SuccessModal from './SuccessModal';
import { useRolesStore } from '../store/rolesStore';
import { useAuthStore } from '../store/authStore'; // Importar el store de autenticación

const CreateRoleForm: React.FC = () => {
  const [roleDescription, setRoleDescription] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const createRole = useRolesStore((state) => state.createRole);
  const { token } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!roleDescription) {
      setError('Por favor, completa el campo de descripción.');
      return;
    }

    const newRole = {
      description: roleDescription,
      status: true,
    };

    try {
      await createRole(newRole, token!); 
      setIsSuccessModalOpen(true);
    } catch (error) {
      setError('Hubo un error al crear el rol. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="w-full p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">Crear Nuevo Rol</h2>
      <p className="text-sm mb-6">Asigna una descripción al nuevo rol</p>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        <InputField 
          label="Descripción del Rol" 
          type="text" 
          placeholder="Introduce la descripción del rol" 
          value={roleDescription}
          onChange={(e) => setRoleDescription(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-md hover:from-purple-600 hover:to-blue-600 transition-colors"
        >
          Crear Rol
        </button>
      </form>

      <SuccessModal
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        title="Rol creado exitosamente"
        description="El nuevo rol ha sido creado correctamente."
      />
    </div>
  );
};

export default CreateRoleForm;
