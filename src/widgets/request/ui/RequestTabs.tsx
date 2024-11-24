"use client";

import React from "react";
import { Tabs } from "@mantine/core";
import styles from "../styles/styles.module.scss";
import { CategoryTab, InfoTab, VideoTab } from "@/src/features/request";

export const RequestTabs: React.FC = () => {
  return (
    <Tabs defaultValue="info" classNames={styles}>
      <Tabs.List justify="center">
        <Tabs.Tab value="info">Данные</Tabs.Tab>
        <Tabs.Tab value="category">Категория</Tabs.Tab>
        <Tabs.Tab value="video">Видео</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="info">
        <InfoTab />
      </Tabs.Panel>

      <Tabs.Panel value="category">
        <CategoryTab />
      </Tabs.Panel>

      <Tabs.Panel value="video">
        <VideoTab />
      </Tabs.Panel>
    </Tabs>
  );
};
