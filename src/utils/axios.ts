import axios, { AxiosError, AxiosResponse } from 'axios';

const userAxios = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

userAxios.interceptors.request.use(
  (config) => {
    //TODO: here we can later intercept the request and add token header and all
    return config;
  },
  (error) => Promise.reject(error)
);


const handleResponse = (response: AxiosResponse) => response;
const handleError = (error: AxiosError) => Promise.reject(error.response?.data);

userAxios.interceptors.response.use(handleResponse, handleError);

export { userAxios };