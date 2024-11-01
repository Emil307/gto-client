import { $api } from "@/src/shared/api";
import { AxiosResponse } from "axios";
import { loginDto, AuthResponseDto, registrationDto } from "./types";

export async function login(
  data: loginDto
): Promise<AxiosResponse<AuthResponseDto>> {
  return await $api.post("/api/users/login/", data);
}

export async function registration(
  data: registrationDto
): Promise<AxiosResponse<AuthResponseDto>> {
  return await $api.post("/api/users/register/", data);
}

export async function requestEmailVerificationCode(
  email: string
): Promise<AxiosResponse<AuthResponseDto>> {
  return await $api.post("/api/users/send-code/", {
    email: email,
  });
}

export async function logout() {
  return await $api.post("/api/users/logout/");
}
