import { create } from 'zustand';
import usuarioService from '../services/usuariosService';
import { UsuarioDto } from '../model/UsuarioDto';
import { NewUsuarioDto } from '../model/newUsuarioDto';

interface UsuariosState {
  usuarios: UsuarioDto[];
  fetchUsuarios: (token: string) => Promise<void>;
  createUsuario: (usuario: NewUsuarioDto, token: string) => Promise<void>;
  updateUsuario: (id: number, usuarioData: UsuarioDto, token: string) => Promise<void>;
  deleteUsuario: (id: number, token: string) => Promise<void>;
}

export const useUsuariosStore = create<UsuariosState>((set) => ({
  usuarios: [],

  fetchUsuarios: async (token: string) => {
    try {
      const response = await usuarioService.getAllUsuarios(token);
      set({ usuarios: response.data });
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  },

  createUsuario: async (usuario: NewUsuarioDto, token: string) => {
    try {
      const newUsuario = await usuarioService.createUsuario(usuario, token);
      set((state) => ({ usuarios: [...state.usuarios, newUsuario] }));
    } catch (error) {
      console.error('Error creating usuario:', error);
    }
  },

  updateUsuario: async (id: number, usuarioData: UsuarioDto, token: string) => {
    try {
      const updatedUsuario = await usuarioService.updateUsuario(id, usuarioData, token);
      set((state) => ({
        usuarios: state.usuarios.map((usuario) =>
          usuario.id === id ? updatedUsuario : usuario
        ),
      }));
    } catch (error) {
      console.error('Error updating usuario:', error);
    }
  },

  deleteUsuario: async (id: number, token: string) => {
    try {
      await usuarioService.deleteUsuario(id, token);
      set((state) => ({
        usuarios: state.usuarios.filter((usuario) => usuario.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting usuario:', error);
    }
  },
}));
