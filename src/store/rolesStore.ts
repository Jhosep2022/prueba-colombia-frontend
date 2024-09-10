import { create } from 'zustand';
import rolesService from '../services/rolesService';
import { RolDto } from '../model/RolDto';

interface RolesState {
  roles: RolDto[];
  fetchRoles: (token: string) => Promise<void>;
  createRole: (role: RolDto, token: string) => Promise<void>;
  updateRole: (roleId: number, roleData: RolDto, token: string) => Promise<void>;
  deleteRole: (id: number, token: string) => Promise<void>;
}

export const useRolesStore = create<RolesState>((set) => ({
  roles: [],

  fetchRoles: async (token: string) => {
    try {
      const response = await rolesService.getAllRoles(token);
      set({ roles: response.data });
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  },

  createRole: async (role: RolDto, token: string) => {
    try {
      const response = await rolesService.createRole(role, token);
      set((state) => ({ roles: [...state.roles, response.data] }));
    } catch (error) {
      console.error('Error creating role:', error);
    }
  },

  updateRole: async (roleId: number, roleData: RolDto, token: string) => {
    try {
      const response = await rolesService.updateRole(roleId, roleData, token);
      set((state) => ({
        roles: state.roles.map((role) =>
          role.id === roleId ? response.data : role
        ),
      }));
    } catch (error) {
      console.error('Error updating role:', error);
    }
  },

  deleteRole: async (id: number, token: string) => {
    try {
      await rolesService.deleteRole(id, token);
      set((state) => ({
        roles: state.roles.filter((role) => role.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  },
}));
