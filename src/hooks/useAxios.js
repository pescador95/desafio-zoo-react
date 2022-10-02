import Axios from "axios";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

const axiosRefresh = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
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
      "Content-Type": "application/json",
      "Access-Control-Expose-Headers": "Authorization",
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 10000,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const user = getLocalStorage("user", {});

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
        const user = getLocalStorage("user", {});

        try {
          const refreshedData = await axiosRefresh.post("/auth/refresh", {
            refreshToken: user?.refreshToken,
          });

          setLocalStorage("user", refreshedData?.data);
          window.location.reload(true);
        } catch (error) {}
      }
    }
  );

  return axiosInstance;
};

export const useAxios = () => createAxiosInstance();
export const getAxios = () => createAxiosInstance();
