import { makeAutoObservable } from "mobx";
import { IUser } from "@/src/entities/user";

class UserState {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: IUser | null) {
    this.user = user;
  }
}

export default new UserState();
