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
          onClick={() => requestState.setActiveTab("info")}
          className={styles.tabsButton}
          style={{
            opacity: requestState.activeTab === "info" ? "1" : "0.5",
          }}
        >
          Данные
        </button>
        <button
          onClick={() => requestState.setActiveTab("category")}
          className={styles.tabsButton}
          style={{
            opacity: requestState.activeTab === "category" ? "1" : "0.5",
          }}
        >
          Категория
        </button>
        <button
          onClick={() => requestState.setActiveTab("video")}
          className={styles.tabsButton}
          style={{
            opacity: requestState.activeTab === "video" ? "1" : "0.5",
          }}
        >
          Видео
        </button>
      </div>

      {requestState.activeTab === "info" && <InfoTab />}
      {requestState.activeTab === "category" && <CategoryTab />}
      {requestState.activeTab === "video" && <VideoTab />}
    </div>
  );
});
