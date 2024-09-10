import { RolDto } from "./RolDto";

export interface UsuarioDto {
    id?: number;
    username: string;
    email: string;
    password?: string;
    name: string;
    rol: RolDto;
    createdAt?: Date;
    status?: boolean;
}
