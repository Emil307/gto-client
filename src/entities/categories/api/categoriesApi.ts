import { $api } from "@/src/shared";
import { AxiosResponse } from "axios";

export async function getCategories(): Promise<AxiosResponse> {
  return await $api.get(`/api/application/categories`);
}

export async function getMyCategories(): Promise<AxiosResponse> {
  return await $api.get(`/api/application/categories/me`);
}

export async function getCategoryInfo(
  categoryId: string
): Promise<AxiosResponse> {
  return await $api.post(`/api/application/category/age`, {
    category_id: Number(categoryId),
  });
}
