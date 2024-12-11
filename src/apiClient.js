// src/apiClient.js
import axios from 'axios';

// Crea una instancia de Axios con la configuración necesaria
const apiClient = axios.create({
  baseURL: 'https://gimnasio-deploy.onrender.com/', // Cambia esto a la URL correcta de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agrega un interceptor para incluir el token en el encabezado de las solicitudes
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;
