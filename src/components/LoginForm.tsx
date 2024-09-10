import React, { useState } from 'react';
import InputField from './InputField';
import SocialButton from './SocialButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const LoginForm: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); 
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      await login(identifier, password);
      navigate('/home');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Credenciales incorrectas o el usuario no existe.'); 
    }
  };

  return (
    <div className="w-full p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">SIGN IN</h2>
      <p className="text-sm mb-6">Sign in with username or email address</p>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        <InputField 
          label="Username or Email"
          type="text" 
          placeholder="Your username or email" 
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <InputField 
          label="Password" 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-md hover:from-purple-600 hover:to-blue-600 transition-colors">
          Sign In
        </button>
      </form>

      <div className="flex items-center justify-between my-6">
        <hr className="w-full border-gray-300" />
        <span className="px-3 text-gray-500">Or continue with</span>
        <hr className="w-full border-gray-300" />
      </div>

      <div className="flex justify-between">
        <SocialButton platform="google" color="bg-red-500">
          Google
        </SocialButton>
        <SocialButton platform="facebook" color="bg-blue-700">
          Facebook
        </SocialButton>
      </div>

      <p className="text-sm text-gray-400 mt-6">
        If you don't have an account,{" "}
        <Link to="/signup" className="text-purple-500 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
