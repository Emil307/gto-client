"use client";

import React, { useEffect } from "react";
import styles from "../styles/styles.module.scss";
import { List } from "@/src/entities/history";
import historyState from "@/src/entities/history/store/historyState";

export const History: React.FC = () => {
  useEffect(() => {
    historyState.getHistory();
  }, []);

  return (
    <div className={styles.container}>
      <List />
    </div>
  );
};
