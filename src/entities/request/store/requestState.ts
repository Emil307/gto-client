import { makeAutoObservable } from "mobx";

type TTab = "info" | "category" | "video";
type TVideoStatus = "record" | "watch";

class RequestState {
  activeTab: TTab = "info";
  category: string = "";
  videoStatus: TVideoStatus = "record";

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTab(value: TTab) {
    this.activeTab = value;
  }

  setCategory(category: string) {
    this.category = category;
  }

  setVideoStatus(status: TVideoStatus) {
    this.videoStatus = status;
  }
}

export default new RequestState();
