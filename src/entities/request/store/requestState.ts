import { makeAutoObservable } from "mobx";

type TTab = "info" | "category" | "video";
type TVideoStatus = "record" | "recording" | "watch";

export interface IInfoData {
  surname: string;
  name: string;
  patronymic: string;
  email: string;
  phone: string;
  gender: string | null;
  region: string | null;
}

class RequestState {
  activeTab: TTab = "info";
  category: string = "";
  videoStatus: TVideoStatus = "record";

  infoData: IInfoData = {
    surname: "",
    name: "",
    patronymic: "",
    email: "",
    phone: "",
    gender: null,
    region: null,
  };

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

  setInfoData(data: IInfoData) {
    this.infoData = data;
  }
}

export default new RequestState();
