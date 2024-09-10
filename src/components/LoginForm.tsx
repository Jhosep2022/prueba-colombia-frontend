import React from 'react';
import InputField from './InputField';
import SocialButton from './SocialButton';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  return (
    <div className="w-full p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">SIGN IN</h2>
      <p className="text-sm mb-6">Sign in with email address</p>

      <form>
        <InputField label="Email Address" type="email" placeholder="Yourname@gmail.com" />
        <InputField label="Password" type="password" placeholder="••••••••" />

        <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-md hover:from-purple-600 hover:to-blue-600 transition-colors">
          <Link to="/home">Sign In</Link>
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
