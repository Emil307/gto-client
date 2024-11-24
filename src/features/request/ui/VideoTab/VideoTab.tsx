"use client";

import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import React from "react";
import styles from "../../styles/styles.module.scss";
import { useRouter } from "next/navigation";

export const VideoTab = () => {
  const router = useRouter();

  return (
    <div className={styles.videoTab}>
      <div className={styles.videoTabSquare}></div>
      <div className={styles.videoTabBottom}>
        <ParallelogramButton
          onClick={() => router.replace("/request/record-video")}
        >
          Снять видео
        </ParallelogramButton>
        <p className={styles.credits}>
          Нажимая на кнопку «Далее», вы подтверждаете, что заполненные вами
          данные соответствуют действительности и введены корректно. Вы случае
          предоставления ложной информации ваша заявка будет аннулирована.
        </p>
      </div>
    </div>
  );
};
