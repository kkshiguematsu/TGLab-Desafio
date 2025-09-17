import axios from 'axios';

const baseURL = import.meta.env.API_BASE_URL || 'http://localhost:3000/';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  },
);
