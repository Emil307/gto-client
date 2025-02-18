"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.scss";
import { getHistory, IHistory } from "@/src/entities/history";
import { List } from "@/src/entities/history";

export const History: React.FC = () => {
  const [hsitory, setHistory] = useState<IHistory[]>([]);

  useEffect(() => {
    getHistory()
      .then((res) => {
        setHistory(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className={styles.container}>
      <List historyList={hsitory} />
    </div>
  );
};
