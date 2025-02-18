import React from "react";
import { IHistory } from "../../types";
import { HistoryCard } from "../Card";
import styles from "./styles.module.scss";

interface IHistoryListProps {
  historyList: IHistory[];
}

export const List: React.FC<IHistoryListProps> = ({ historyList }) => {
  return (
    <div className={styles.container}>
      {historyList.map((history) => (
        <HistoryCard history={history} key={history.id} />
      ))}
    </div>
  );
};
