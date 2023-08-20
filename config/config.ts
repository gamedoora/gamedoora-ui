import axios from 'axios';
import { getCookie } from 'cookies-next';

export const axiosConfig = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosConfig.interceptors.request.use((config) => {
  const jwt = getCookie('jwt');
  config.headers.Authorization = `Bearer ${jwt}`;
  return config;
});
