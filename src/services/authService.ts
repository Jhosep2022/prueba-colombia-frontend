import apiService from './apiService';
import { LoginDto } from '../model/LoginDto';
import { AuthResponse } from '../model/AuthResponse';

interface DecodedToken {
  username: string;
  sub: number;
  rol: number;
  iat: number;
  exp: number;
}

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

const authService = {
  login: async (loginData: LoginDto): Promise<{ token: string; role: number }> => {
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', loginData, '');

      if (!response.data) {
        throw new Error('Credenciales inválidas o usuario no encontrado.');
      }

      const token = response.data;
      const decodedToken: DecodedToken = parseJwt(token);

      console.log('Decoded token:', decodedToken);

      return { token, role: decodedToken.rol };
    } catch (error: unknown) {
      console.error('Error during login:', error);
      throw new Error((error as Error).message || 'Error durante el login.');
    }
  },
};

export default authService;