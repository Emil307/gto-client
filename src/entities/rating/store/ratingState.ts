import { makeAutoObservable } from "mobx";

type TGender = "male" | "female" | null;

class RatingState {
  genderFilter: TGender = null;
  searchTerm: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setGenderFilter(value: TGender) {
    this.genderFilter = value;
  }

  setSearchTerm(value: string | null) {
    this.searchTerm = value;
  }
}

export default new RatingState();
