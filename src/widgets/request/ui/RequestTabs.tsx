"use client";

import React from "react";
import styles from "../styles/styles.module.scss";
import { CategoryTab, InfoTab, VideoTab } from "@/src/features/request";
import { observer } from "mobx-react-lite";
import requestState from "@/src/entities/request/store/requestState";
import { Tabs } from "@/src/shared";

const tabs = [
  {
    id: 1,
    label: "Данные",
    value: "info",
    onClick: () => requestState.setActiveTab("info"),
  },
  {
    id: 2,
    label: "Категория",
    value: "category",
    onClick: () => requestState.setActiveTab("category"),
  },
  {
    id: 3,
    label: "Видео",
    value: "video",
    onClick: () => requestState.setActiveTab("video"),
  },
];

export const RequestTabs: React.FC = observer(() => {
  return (
    <div className={styles.container}>
      <Tabs tabs={tabs} activeTab={requestState.activeTab} />

      {requestState.activeTab === "info" && <InfoTab />}
      {requestState.activeTab === "category" && <CategoryTab />}
      {requestState.activeTab === "video" && <VideoTab />}
    </div>
  );
});
