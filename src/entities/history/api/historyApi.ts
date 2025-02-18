import { $api } from "@/src/shared";
import { AxiosResponse } from "axios";
import { IHistory } from "../types";

export async function getHistory(): Promise<AxiosResponse<IHistory[]>> {
  return await $api.get(`/api/applications/history/`);
}
