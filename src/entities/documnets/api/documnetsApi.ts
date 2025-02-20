import { $api } from "@/src/shared";
import { AxiosResponse } from "axios";

export async function getCateriesDocument(): Promise<AxiosResponse> {
  return await $api.get(`/api/settings/documents/categories/`);
}

export async function getParticipationDocument(): Promise<AxiosResponse> {
  return await $api.get(`/api/settings/documents/participation/`);
}

export async function getParticipationChildDocument(): Promise<AxiosResponse> {
  return await $api.get(`/api/settings/documents/participation/child/`);
}
