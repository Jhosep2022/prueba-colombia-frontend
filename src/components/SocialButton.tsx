import React, { ReactNode } from 'react';

interface SocialButtonProps {
  platform: string;
  color: string;
  children: ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({ platform, color, children }) => {
  return (
    <button
      className={`flex items-center justify-center ${color} text-white w-full py-2 rounded-md`}
    >
      <i className={`fab fa-${platform} mr-2`}></i>
      {children}
    </button>
  );
};

export default SocialButton;
