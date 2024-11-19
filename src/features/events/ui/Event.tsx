import React from "react";
import styles from "../styles/styles.module.scss";
import Image from "next/image";
import { Button } from "@/src/shared";

export const Event: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image
        priority={true}
        src="/icons/event-logo.svg"
        width={100}
        height={24}
        alt="event logo"
      />
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.dates}>26 октября – 2 ноября</div>
          <h3 className={styles.title}>
            Тренировочные сборы федерации многоборья ГТО России
          </h3>
        </div>
        <div className={styles.buttons}>
          <Button>Положение</Button>
          <Button>Категории</Button>
        </div>
      </div>
    </div>
  );
};
