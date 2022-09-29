import axios from "axios";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Access-Control-Expose-Headers": "Authorization",
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 30000,
  });
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
  return axiosInstance;
};
export const useAxios = () => createAxiosInstance();
export const getAxios = () => createAxiosInstance();
export const api = getAxios();
