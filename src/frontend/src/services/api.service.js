import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          /* window.location.href = '/logout'; */
          break;
        case 403:
          /* window.location.href = '/home'; */
          break;
        case 404:
          /* window.location.href = '/home'; */
          break;
        case 500:
          /* window.location.href = '/home'; */
          break;
        default:
          console.error('Erro desconhecido:', error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;