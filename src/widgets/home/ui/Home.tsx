import React from "react";
import styles from "../styles/styles.module.scss";
import { Event } from "@/src/features/events";

export const Home: React.FC = () => {
  return (
    <div>
      <div className={styles.offer}>
        <h1 className={styles.title}>
          Привет, <span>Даша</span>
        </h1>
        <p className={styles.quote}>
          То, что не убивает нас – делает нас сильнее – испытай себя уже
          сегодня!
        </p>
      </div>
      <Event />
    </div>
  );
};
