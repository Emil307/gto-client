import { makeAutoObservable } from "mobx";
import { login, loginDto, logout, registration, registrationDto } from "../api";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";
import userState from "@/src/entities/user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_API_URL;

type Step = "info" | "privacy";

class AuthState {
  isAuth: boolean = false;
  registerDto: registrationDto | null = null;
  step: Step = "info";

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }

  setStep(step: Step) {
    this.step = step;
  }

  setRegisterDto(registerDto: registrationDto) {
    this.registerDto = registerDto;
  }

  async login(data: loginDto, router: AppRouterInstance) {
    try {
      const response = await login(data);
      localStorage.setItem("token", response.data.access_token);
      this.setIsAuth(true);
      setCookie("refresh", response.data.refresh_token);

      userState.setUser(response.data.user);
      router.replace("/lk");
    } catch (e: any) {
      toast.error(
        e?.response?.data?.message ||
          e.response.data.detail ||
          "Неизвестная ошибка"
      );
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

  async logout(router: AppRouterInstance) {
    try {
      await logout();
      localStorage.removeItem("token");
      setCookie("refresh", "");
      this.setIsAuth(false);

      userState.setUser(null);

      router.replace("/");
    } catch (e: any) {
      console.log(e?.response?.data?.message || "Неизвестная ошибка");
    }
  }

  async checkAuth(router: AppRouterInstance) {
    try {
      const response = await axios.post(`${API}/api/users/token-refresh/`, {
        refresh_token: getCookie("refresh"),
      });
      localStorage.setItem("token", response.data.access_token);
      this.setIsAuth(true);
      userState.setUser(response.data.user);

      router.replace("/lk");
    } catch (e: any) {
      console.log(e?.response?.data?.message || "Неизвестная ошибка");
    }
  }
}

export default new AuthState();
