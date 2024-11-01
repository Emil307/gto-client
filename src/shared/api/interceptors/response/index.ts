import axios from "axios";
import $api from "../../default";
import { getCookie } from "cookies-next";

export const refreshRequest = async (error: any) => {
  const originalRequest = error.config;

  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.post(`${API}/token/refresh/`, {
        refresh: getCookie("refresh"),
      });
      localStorage.setItem("token", response.data.access);
      return $api.request(originalRequest);
    } catch (e: any) {
      console.log(e?.response?.data?.message || "Неизвестная ошибка");
    }
  }
  throw error;
};
