import apiService from './apiService';
import { RolDto } from '../model/RolDto';

const rolesService = {
  getAllRoles: async (token: string) => {
    return await apiService.get<RolDto[]>('/roles', token);
  },

  createRole: async (roleData: RolDto, token: string) => {
    return await apiService.post<RolDto>('/roles', roleData, token);
  },

  updateRole: async (roleId: number, roleData: RolDto, token: string) => {
    return await apiService.put<RolDto>(`/roles/${roleId}`, roleData, token);
  },

  deleteRole: async (roleId: number, token: string) => {
    return await apiService.delete<RolDto>(`/roles/${roleId}`, token);
  },
};

export default rolesService;
