import axios from 'axios';

const userAxios = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

userAxios.interceptors.request.use(
  (config) => {
    //TODO: here we can later intercept the request and add token header and all
    return config;
  },
  (error) => Promise.reject(error)
);


const handleResponse = (response: any) => response.data;
const handleError = (error: any) => Promise.reject(error.response?.data);

userAxios.interceptors.response.use(handleResponse, handleError);

export { userAxios };