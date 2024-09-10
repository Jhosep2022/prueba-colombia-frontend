import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-50" htmlFor={label}>
        {label}
      </label>
      <input
        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900"
        type={type}
        placeholder={placeholder}
        id={label}
        value={value} 
        onChange={onChange} 
      />
    </div>
  );
};

export default InputField;
