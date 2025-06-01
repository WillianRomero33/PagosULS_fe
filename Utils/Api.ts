// Utils/api.ts
import axios from 'axios';

// Configura según tu entorno de desarrollo
const BASE_URL = __DEV__
  ? 'http://127.0.0.1:8000/api' // Android emulator
  : 'http://tu-ip-local:8000/api'; // Cambia por tu IP o dominio

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;