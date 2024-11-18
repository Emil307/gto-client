import { makeAutoObservable } from "mobx";

class RequestState {
  category: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCategory(value: string) {
    this.category = value;
  }
}

export default new RequestState();
