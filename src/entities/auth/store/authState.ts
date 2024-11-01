import { makeAutoObservable } from "mobx";
import { login, loginDto, logout, registration, registrationDto } from "../api";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";
import userState from "@/src/entities/user";

const API = process.env.NEXT_PUBLIC_API_URL;

class AuthState {
  isAuth: boolean = false;
  email: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }

  setEmail(email: string) {
    this.email = email;
  }

  async login(data: loginDto) {
    try {
      const response = await login(data);
      localStorage.setItem("token", response.data.access_token);
      this.setIsAuth(true);
      setCookie("refresh", response.data.refresh_token);

      userState.setUser(response.data.user);
    } catch (e: any) {
      console.log(e?.response?.data?.message || "Неизвестная ошибка");
    }
  }

  async registration(data: registrationDto) {
    try {
      const response = await registration(data);
      localStorage.setItem("token", response.data.access_token);
      this.setIsAuth(true);
      setCookie("refresh", response.data.refresh_token);

      userState.setUser(response.data.user);
    } catch (e: any) {
      console.log(e?.response?.data?.message || "Неизвестная ошибка");
    }
  }

  async logout() {
    try {
      await logout();
      localStorage.removeItem("token");
      setCookie("refresh", "");
      this.setIsAuth(false);

      userState.setUser(null);
    } catch (e: any) {
      console.log(e?.response?.data?.message || "Неизвестная ошибка");
    }
  }

  async checkAuth() {
    try {
      const response = await axios.post(`${API}/token-refresh/`, {
        refresh: getCookie("refresh"),
      });
      localStorage.setItem("token", response.data.access_token);
      this.setIsAuth(true);

      userState.setUser(response.data.user);
    } catch (e: any) {
      console.log(e?.response?.data?.message || "Неизвестная ошибка");
    }
  }
}

export default new AuthState();
