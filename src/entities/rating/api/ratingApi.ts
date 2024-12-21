import { $api } from "@/src/shared";
import { AxiosResponse } from "axios";
import { RatingRequestDTO, RatingResponseDTO } from "./types";

export async function getRating(
  data: RatingRequestDTO
): Promise<AxiosResponse<RatingResponseDTO>> {
  return await $api.post("/api/application/rating", data);
}
