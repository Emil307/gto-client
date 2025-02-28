import { makeAutoObservable } from "mobx";
import { ICategory } from "../../categories";

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
  is_child: boolean;
  birthDate: string | null;
}

class RequestState {
  activeTab: TTab = "info";
  isChild: boolean = false;
  category: ICategory | null = null;
  videoStatus: TVideoStatus = "record";
  blogLink: string = "";

  infoData: IInfoData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTab(value: TTab) {
    this.activeTab = value;
  }

  setIsChild(value: boolean) {
    this.isChild = value;
  }

  setCategory(category: ICategory | null) {
    this.category = category;
  }

  setVideoStatus(status: TVideoStatus) {
    this.videoStatus = status;
  }

  setInfoData(data: IInfoData | null) {
    this.infoData = data;
  }

  setBlogLink(link: string) {
    this.blogLink = link;
  }
}

export default new RequestState();
