import axios from 'axios';
import { Platform } from 'react-native';

// Configuración para desarrollo local (ajusta según tu entorno)
const LOCAL_IP = '127.0.0.1'; // IP Local
const BASE_URL = __DEV__ 
  ? Platform.OS === 'android' 
    ? `http://${LOCAL_IP}:8000/api` 
    : 'http://localhost:8000/api'
  : 'https://tu-dominio.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir token a las peticiones
api.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Implementa esta función según tu almacenamiento de tokens
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const ProfileService = {
  async getProfile() {
    try {
      const response = await api.get('/student/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  async updateProfile(updatedData: any) {
    try {
      const response = await api.put('/student/profile', updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
};

// Función auxiliar para obtener el token (ejemplo usando AsyncStorage)
async function getToken() {
  // Implementa según tu sistema de almacenamiento
  return 'tu-token-de-autenticacion';
}

export default api;