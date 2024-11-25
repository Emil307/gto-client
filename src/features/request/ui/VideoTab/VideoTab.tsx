"use client";

import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import React from "react";
import styles from "../../styles/styles.module.scss";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import requestState from "@/src/entities/request/store/requestState";

export const VideoTab = observer(() => {
  const router = useRouter();

  return (
    <div className={styles.videoTab}>
      {requestState.videoStatus === "record" && (
        <>
          <div className={styles.videoTabSquare}></div>
          <div className={styles.videoTabBottom}>
            <ParallelogramButton onClick={() => router.replace("/recordVideo")}>
              Снять видео
            </ParallelogramButton>
            <p className={styles.credits}>
              Нажимая на кнопку «Далее», вы подтверждаете, что заполненные вами
              данные соответствуют действительности и введены корректно. Вы
              случае предоставления ложной информации ваша заявка будет
              аннулирована.
            </p>
          </div>
        </>
      )}
      {requestState.videoStatus === "watch" && <></>}
    </div>
  );
});
