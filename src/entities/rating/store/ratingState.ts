import { makeAutoObservable } from "mobx";
import { IRating } from "../types";
import { getRating, RatingRequestDTO } from "../api";

type TGender = "male" | "female";

class RatingState {
  rating: IRating[] = [];
  isLoading: boolean = false;

  genderFilter: TGender = "male";
  searchTerm: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getRating(data: RatingRequestDTO) {
    this.isLoading = true;
    getRating(data)
      .then((res) => {
        this.rating = res.data.rating;
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  setGenderFilter(value: TGender) {
    this.genderFilter = value;
  }

  setSearchTerm(value: string | null) {
    this.searchTerm = value;
  }
}

export default new RatingState();
