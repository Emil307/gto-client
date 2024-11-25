import { $api } from "@/src/shared/api";
import { AxiosResponse } from "axios";
import { efitProfileDto, IUser } from "./types";

export async function editProfile(
  data: efitProfileDto
): Promise<AxiosResponse<IUser>> {
  return await $api.post("/api/users/me/", data);
}

export async function getMe(): Promise<AxiosResponse<IUser>> {
  return await $api.get("/api/users/me/");
}
