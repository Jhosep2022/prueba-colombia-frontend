import apiService from "./apiService";
import { UsuarioDto } from '../model/UsuarioDto';
import { NewUsuarioDto } from "../model/newUsuarioDto";

const usuarioService = {
    getAllUsuarios: async (token: string) =>{
        const response = await apiService.get<UsuarioDto[]>('/usuarios', token);
        return response;
    },
    

    createUsuario: async (usuarioData: NewUsuarioDto, token: string) => {
        return await apiService.post<UsuarioDto>('/usuarios', usuarioData, token);
    },

    updateUsuario: async (id: number, usuarioData: UsuarioDto, token: string) => {
        return await apiService.put<UsuarioDto>(`/usuarios/${id}`, usuarioData, token);
    },

    deleteUsuario: async (id: number, token: string) => {
        return await apiService.delete<UsuarioDto>(`/usuarios/${id}`, token);
    },
};

export default usuarioService;
