import { isServer } from '../utils/environment';
import axios from 'axios';

export const serverUrl = 'https://ka-fe-jobboard-assignment-api.azurewebsites.net/'

const baseURL = isServer() ? serverUrl : '/api'

const axiosInstance = axios.create({
  baseURL: `${baseURL}/jobs`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
