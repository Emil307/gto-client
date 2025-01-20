import { $api } from "@/src/shared";
import { AxiosResponse } from "axios";

export async function getCategories(): Promise<AxiosResponse> {
  return await $api.get(`/api/application/categories`);
}
