import Axios from "axios";
import { ENDPOINTS } from "../services/endpoints";
import { getSessionStorage, setSessionStorage } from "../utils/sessionStorage";

const axiosRefresh = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
    "Access-Control-Expose-Headers": "Authorization",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000,
});

const createAxiosInstance = () => {
  const axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Accept: "*/*",
      "Content-Type": "multipart/form-data",
      "Access-Control-Expose-Headers": "Authorization",
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 10000,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const user = getSessionStorage("user", {});

    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const statusCode = error?.response?.status;

      if (statusCode === 401) {
        const user = getSessionStorage("user", {});

        try {
          const refreshedData = await axiosRefresh.post(
            ENDPOINTS.auth.refresh,
            {
              refreshToken: user?.refreshToken,
            }
          );
          setSessionStorage("user", refreshedData?.data);
          window.location.reload(true);
        } catch (error) { }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const useAxios = () => createAxiosInstance();
export const getAxios = () => createAxiosInstance();
