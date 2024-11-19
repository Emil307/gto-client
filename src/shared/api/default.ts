import axios from "axios";
import { getCookie } from "cookies-next";
import { tokenInterceptor } from "./interceptors/request";

const API = process.env.NEXT_PUBLIC_API_URL;

export const $api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

$api.interceptors.request.use(tokenInterceptor);

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(`${API}/api/users/token-refresh/`, {
          refresh_token: getCookie("refresh"),
        });
        localStorage.setItem("token", response.data.access_token);
        return $api.request(originalRequest);
      } catch (e: any) {
        console.log(e?.response?.data?.message || "Неизвестная ошибка");
      }
    }
    throw error;
  }
);
