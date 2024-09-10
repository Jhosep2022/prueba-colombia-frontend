import { create } from 'zustand';
import authService from '../services/authService';

interface AuthState {
  token: string | null;
  role: number | null;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,

  login: async (identifier: string, password: string) => {
    try {
      const { token, role } = await authService.login({ usernameOrEmail: identifier, password });
      
      console.log("Token y role establecidos:", token, role);
      
      set({ token, role });
    } catch (error) {
      console.error('Error durante el login:', error);
      throw new Error('Error durante el login');
    }
  },

  logout: () => {
    console.log("Cerrando sesión");
    set({ token: null, role: null });
  },
}));