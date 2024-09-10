import React, { useState } from 'react';
import InputField from './InputField';
import { Link } from 'react-router-dom';
import SuccessModal from './SuccessModal'; 
import { useUsuariosStore } from '../store/usuariosStore';
import { NewUsuarioDto } from '../model/newUsuarioDto';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rolId] = useState(3); 

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createUsuario = useUsuariosStore((state) => state.createUsuario);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !name || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const newUsuario: NewUsuarioDto = {
      username,
      email,
      name,
      password,
      rolId,
    };

    try {
      const token = ''; 
      await createUsuario(newUsuario, token);
      setIsSuccessModalOpen(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Hubo un error al crear el usuario. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="w-full p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">SIGN UP</h2>
      <p className="text-sm mb-6">Create your account</p>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        <InputField 
          label="Username" 
          type="text" 
          placeholder="Enter your username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField 
          label="Email" 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField 
          label="Name" 
          type="text" 
          placeholder="Enter your full name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField 
          label="Password" 
          type="password" 
          placeholder="Create a password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-md hover:from-purple-600 hover:to-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-purple-500 hover:underline">
          Sign In here
        </Link>
      </p>

      <SuccessModal
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        title="Usuario creado exitosamente"
        description="El usuario ha sido creado correctamente."
      />
    </div>
  );
};

export default SignUpForm;
