import { AxiosResponse } from "axios";
import { $api } from "./default";

export async function getDistricts(): Promise<AxiosResponse> {
  return await $api.get("/api/users/districts");
}
