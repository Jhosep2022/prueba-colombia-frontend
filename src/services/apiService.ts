import config from '../environment/env';

interface ApiService {
    get: <T>(endpoint: string, token: string) => Promise<T>;
    post: <T>(endpoint: string, data: unknown, token: string) => Promise<T>;
    put: <T>(endpoint: string, data: unknown, token: string) => Promise<T>;
    delete: <T>(endpoint: string, token: string) => Promise<T>;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error en la solicitud');
    }
    return await response.json();
};

const apiService: ApiService = {
    get: async <T>(endpoint: string, token: string): Promise<T> => {
        const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return await handleResponse<T>(response);
    },

    post: async <T>(endpoint: string, data: unknown, token: string): Promise<T> => {
        const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return await handleResponse<T>(response);
    },

    put: async <T>(endpoint: string, data: unknown, token: string): Promise<T> => {
        const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return await handleResponse<T>(response);
    },

    delete: async <T>(endpoint: string, token: string): Promise<T> => {
        const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return await handleResponse<T>(response);
    }
};

export default apiService;
