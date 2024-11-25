"use client";

import React from "react";
import styles from "../styles/styles.module.scss";
import { CategoryTab, InfoTab, VideoTab } from "@/src/features/request";
import { observer } from "mobx-react-lite";
import requestState from "@/src/entities/request/store/requestState";

export const RequestTabs: React.FC = observer(() => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          onClick={() => requestState.setCategory("info")}
          className={styles.tabsButton}
          style={{
            opacity: requestState.category === "info" ? "1" : "0.5",
          }}
        >
          Данные
        </button>
        <button
          onClick={() => requestState.setCategory("category")}
          className={styles.tabsButton}
          style={{
            opacity: requestState.category === "category" ? "1" : "0.5",
          }}
        >
          Категория
        </button>
        <button
          onClick={() => requestState.setCategory("video")}
          className={styles.tabsButton}
          style={{
            opacity: requestState.category === "video" ? "1" : "0.5",
          }}
        >
          Видео
        </button>
      </div>

      {requestState.category === "info" && <InfoTab />}
      {requestState.category === "category" && <CategoryTab />}
      {requestState.category === "video" && <VideoTab />}
    </div>
  );
});
