import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaUserShield, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal'; 
import { useAuthStore } from '../store/authStore';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <>
      <div className={`flex flex-col h-screen p-3 bg-white text-[#160430] transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-lg font-bold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            MyApp
          </h1>
          <button 
            onClick={toggleSidebar} 
            className="text-[#160430] p-2 flex items-center justify-center w-10 h-10 rounded-full bg-[#160430] focus:outline-none"
          >
            {isOpen ? (
              <FaChevronLeft className="text-white" />
            ) : (
              <FaChevronRight className="text-white" style={{ marginLeft: '1px' }} />
            )}
          </button>
        </div>
        
        <div className="mt-4">
          <div className="relative flex items-center p-2 hover:bg-[#2d0b5a] hover:text-white rounded-md cursor-pointer">
            <FaHome className="text-xl" />
            <span className={`ml-4 text-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <Link to="/home">Home</Link>
            </span>
          </div>

          <div className="relative flex items-center p-2 hover:bg-[#2d0b5a] hover:text-white rounded-md cursor-pointer">
            <FaUserShield className="text-xl" />
            <span className={`ml-4 text-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <Link to="/roles">Roles</Link>
            </span>
          </div>

          <div className="relative flex items-center p-2 hover:bg-[#2d0b5a] hover:text-white rounded-md cursor-pointer">
            <FaUser className="text-xl" />
            <span className={`ml-4 text-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <Link to="/users">Usuarios</Link>
            </span>
          </div>
        </div>

        <div 
          className="relative flex items-center p-2 hover:bg-[#2d0b5a] hover:text-white rounded-md cursor-pointer mt-auto"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span className={`ml-4 text-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            Logout
          </span>
        </div>
      </div>

      <ConfirmationModal
        open={isLogoutModalOpen}
        setOpen={setIsLogoutModalOpen}
        title="Cerrar sesión"
        description="¿Estás seguro que deseas cerrar la sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Sidebar;
