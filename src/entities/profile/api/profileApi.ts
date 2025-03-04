import { $api } from "@/src/shared/api";
import { AxiosResponse } from "axios";
import { editProfileDto } from "./types";
import { IUser } from "@/src/entities/user";
import { $apiFile } from "@/src/shared/api/default";

export async function getMe(): Promise<AxiosResponse<IUser>> {
  return await $api.get(`/api/users/me`);
}

export async function getRegions(): Promise<AxiosResponse> {
  return await $api.get("/api/settings/regions");
}

export async function getCities(region: string): Promise<AxiosResponse> {
  return await $api.get(`/api/settings/cities?region_name=${region}`);
}

export async function editProfile(
  data: editProfileDto
): Promise<AxiosResponse<IUser>> {
  return await $api.patch(`/api/users/me/`, data);
}

export async function uploadAvatar(file: any) {
  const form = new FormData();

  form.append("avatar", file, file?.name);

  return await $apiFile.post(`api/users/avatar/`, form);
}
