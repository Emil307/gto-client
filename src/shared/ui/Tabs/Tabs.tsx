import React from "react";
import styles from "./styles.module.scss";

export interface ITab {
  id: number;
  label: string;
  value: string;
  onClick: () => void;
}

export interface ITabsProps {
  tabs: ITab[];
  activeTab: string;
}

export const Tabs: React.FC<ITabsProps> = ({ tabs, activeTab }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          onClick={tab.onClick}
          className={styles.tabsButton}
          style={{
            opacity: activeTab === tab.value ? "1" : "0.5",
          }}
          key={tab.id}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
