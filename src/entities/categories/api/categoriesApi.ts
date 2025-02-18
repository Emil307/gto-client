import { $api } from "@/src/shared";
import { AxiosResponse } from "axios";

export async function getCategories(): Promise<AxiosResponse> {
  return await $api.get(`/api/applications/categories`);
}

export async function getMyCategories(
  birthDate: string | null
): Promise<AxiosResponse> {
  return await $api.post(`/api/applications/categories/me`, {
    birthDate: birthDate,
  });
}

export async function getCategoryInfo(
  categoryId: string,
  birthDate: string | null
): Promise<AxiosResponse> {
  return await $api.post(`/api/applications/category/age/`, {
    category_id: Number(categoryId),
    birthDate: birthDate,
  });
}
