import { makeAutoObservable } from "mobx";

type TGender = "male" | "female";

class RatingState {
  genderFilter: TGender = "male";
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
