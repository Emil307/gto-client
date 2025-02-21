import { $api } from "@/src/shared";
import { AxiosResponse } from "axios";

export async function getRegistrationDocument(): Promise<AxiosResponse> {
  return await $api.get(`/api/settings/documents/user_terms/`);
}

export async function getCateriesDocument(): Promise<AxiosResponse> {
  return await $api.get(`/api/settings/documents/categories/`);
}

export async function getParticipationDocument(): Promise<AxiosResponse> {
  return await $api.get(`/api/settings/documents/participation/`);
}

export async function getPersonalTermsDocument(): Promise<AxiosResponse> {
  return await $api.get(`/api/settings/documents/personal_data_terms/`);
}

export async function getParticipationChildDocument(): Promise<AxiosResponse> {
  return await $api.get(`/api/settings/documents/participation/child/`);
}
