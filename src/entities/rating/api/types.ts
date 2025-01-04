import { IRating } from "../types";

type TGender = "male" | "female";

export interface RatingFilters {
  age?: number;
  gender?: TGender;
  category?: string | null;
  region?: string | null;
  city?: string | null;
  district?: string | null;
}

export interface RatingRequestDTO {
  limit?: number;
  offset?: number;
  filters: RatingFilters;
  search?: string;
}

export interface RatingResponseDTO {
  user_rating: IRating | null;
  rating: IRating[];
}
