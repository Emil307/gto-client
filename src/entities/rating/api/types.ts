import { IRating } from "../types";

type TGender = "male" | "female";

type TCategory = "amateur" | "professional" | "kms" | "master";

export interface RatingRequestDTO {
  limit?: number;
  offset?: number;
  filters: {
    age?: number;
    gender?: TGender;
    category?: TCategory;
    region?: string;
    city?: string;
    district?: string;
  };
}

export interface RatingResponseDTO {
  user_rating: IRating | null;
  rating: IRating[];
}
