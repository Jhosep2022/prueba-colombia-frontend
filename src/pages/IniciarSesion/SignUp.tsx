import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import backgroundImage from '../../assets/imagen1.png';

const SignUp = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row bg-[#160430] rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div
          className="hidden md:block md:w-1/2 bg-cover"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>

        <div className="w-full md:w-1/2 p-8">
          <SignUpForm /> 
        </div>
      </div>
    </div>
  );
};

export default SignUp;
