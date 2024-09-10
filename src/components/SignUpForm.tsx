import React, { useState } from 'react';
import InputField from './InputField';
import { Link } from 'react-router-dom';
import SuccessModal from './SuccessModal'; 

const SignUpForm = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="w-full p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">SIGN UP</h2>
      <p className="text-sm mb-6">Create your account</p>

      <form onSubmit={handleSubmit}>
        <InputField label="Username" type="text" placeholder="Enter your username" />
        <InputField label="Email" type="email" placeholder="Enter your email" />
        <InputField label="Name" type="text" placeholder="Enter your full name" />
        <InputField label="Password" type="password" placeholder="Create a password" />

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
