import { makeAutoObservable } from "mobx";

type TCategory = "info" | "category" | "video";
type TVideoStatus = "record" | "watch";

class RequestState {
  category: TCategory = "info";
  videoStatus: TVideoStatus = "record";

  constructor() {
    makeAutoObservable(this);
  }

  setCategory(value: TCategory) {
    this.category = value;
  }

  setVideoStatus(status: TVideoStatus) {
    this.videoStatus = status;
  }
}

export default new RequestState();
