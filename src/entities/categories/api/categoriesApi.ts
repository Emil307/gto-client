import { $api } from "@/src/shared";
import { AxiosResponse } from "axios";
import { GetMyCategoriesRequestDTO } from "./types";

export async function getCategories(): Promise<AxiosResponse> {
  return await $api.get(`/api/applications/categories`);
}

export async function getMyCategories(
  data: GetMyCategoriesRequestDTO
): Promise<AxiosResponse> {
  return await $api.post(`/api/applications/categories/me`, data);
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
