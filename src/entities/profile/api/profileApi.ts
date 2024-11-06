import { $api } from "@/src/shared/api";
import { AxiosResponse } from "axios";

export async function getRegions(): Promise<AxiosResponse> {
  return await $api.get("/api/users/regions");
}

export async function getCities(region: string): Promise<AxiosResponse> {
  return await $api.get(`/api/users/cities?region_name=${region}`);
}
