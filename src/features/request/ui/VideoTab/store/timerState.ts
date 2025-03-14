import { makeAutoObservable } from "mobx";

class TimerState {
  timeToStart = 3000;
  introTime = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setTimeToStart(time: number) {
    this.timeToStart = time;
  }

  setIntroTime(time: number) {
    this.introTime = time;
  }
}

export default new TimerState();
