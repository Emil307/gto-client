import { IRating } from "../types";

type TGender = "male" | "female";

export interface RatingRequestDTO {
  limit?: number;
  offset?: number;
  filters: {
    age?: number;
    gender?: TGender;
    category?: string | null;
    region?: string | null;
    city?: string | null;
    district?: string | null;
  };
}

export interface RatingResponseDTO {
  user_rating: IRating | null;
  rating: IRating[];
}
