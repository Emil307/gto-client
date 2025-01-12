import { makeAutoObservable } from "mobx";
import { IRating } from "../types";
import { getRating, RatingFilters, RatingRequestDTO } from "../api";

type TGender = "male" | "female";

class RatingState {
  rating: IRating[] = [];
  myRating: IRating | null = null;
  isLoading: boolean = false;
  filters: RatingFilters = {
    gender: "male",
    category: null,
    region: null,
    city: null,
    district: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  getRating(data: RatingRequestDTO) {
    this.isLoading = true;

    data.filters.gender = this.filters.gender;

    getRating(data)
      .then((res) => {
        this.rating = res.data.rating;
        this.myRating = res.data.user_rating;
        this.filters = data.filters;
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  setGenderFilter(gender: TGender) {
    this.isLoading = true;

    const newFilters = {
      gender: gender,
      category: this.filters.category,
      region: this.filters.region,
      city: this.filters.city,
      district: this.filters.district,
    };

    getRating({ filters: newFilters })
      .then((res) => {
        this.rating = res.data.rating;
        this.myRating = res.data.user_rating;
        this.filters = newFilters;
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export default new RatingState();
