"use client";

import React from "react";
import Image from "next/image";
import styles from "../../styles/styles.module.scss";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import { useRouter } from "next/navigation";

export const ProfileInfo: React.FC = () => {
  const router = useRouter();

  function handleEditInfo() {
    router.replace("/profile/edit");
  }

  return (
    <div className={styles.container}>
      <div className={styles.params}>
        <Image
          src="/img/avatar.png"
          width={124}
          height={124}
          className={styles.avatar}
          alt="avatar"
        />
        <h1 className={styles.fullname}>Карпов Иван Иванович</h1>
      </div>
      <div className={styles.params}>
        <div className={styles.param}>
          <p className={styles.paramTitle}>Пол</p>
          <p className={styles.paramValue}>Мужской</p>
        </div>
        <div className={styles.param}>
          <p className={styles.paramTitle}>Возраст</p>
          <p className={styles.paramValue}>21</p>
        </div>
        <div className={styles.param}>
          <p className={styles.paramTitle}>Регион</p>
          <p className={styles.paramValue}>Оренбургская область</p>
        </div>
        <div className={styles.param}>
          <p className={styles.paramTitle}>Город</p>
          <p className={styles.paramValue}>Оренбург</p>
        </div>
      </div>
      <ParallelogramButton onClick={handleEditInfo}>
        Редактировать
      </ParallelogramButton>
    </div>
  );
};
