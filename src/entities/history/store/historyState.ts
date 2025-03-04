import { makeAutoObservable } from "mobx";
import { getHistory } from "../api";
import { IHistory } from "../types";
import { deleteRequest } from "../../request";

class HistoryState {
  history: IHistory[] = [];
  isLoading: boolean = false;
  isDeleting: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getHistory() {
    this.isLoading = true;

    getHistory()
      .then((res) => {
        this.history = res.data;
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  deleteHistory(historyId: number) {
    this.isDeleting = true;

    deleteRequest(historyId)
      .then(() => {
        this.history = this.history.filter(
          (history) => history.id !== historyId
        );
      })
      .catch((e: any) => {
        console.log(e);
      })
      .finally(() => {
        this.isDeleting = false;
      });
  }
}

export default new HistoryState();
