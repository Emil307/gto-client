"use client";

import React from "react";
import { HistoryCard } from "../Card";
import styles from "./styles.module.scss";
import historyState from "../../store/historyState";
import { observer } from "mobx-react-lite";

export const List: React.FC = observer(() => {
  return (
    <div className={styles.container}>
      {historyState.history.map((history) => (
        <HistoryCard history={history} key={history.id} />
      ))}
    </div>
  );
});
