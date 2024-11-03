import React from "react";
import styles from "../../styles/styles.module.scss";
import { ProfileInfo } from "@/src/features/profile";

export const Profile: React.FC = () => {
  return (
    <div className={styles.container}>
      <ProfileInfo />
    </div>
  );
};
