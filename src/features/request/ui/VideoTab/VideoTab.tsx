"use client";

import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import React from "react";
import styles from "../../styles/styles.module.scss";
import { RecordVideo, useRecorder } from "@/src/features/recordVideo";
import requestState from "@/src/entities/request/store/requestState";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export const VideoTab = observer(() => {
  const router = useRouter();
  const { status, videoRef, startRecording, stopRecording } = useRecorder();

  function handleSendRequest() {
    requestState.setVideoStatus("record");
    router.replace("/lk");
    toast.success("Заявка успешно отправлена");
  }

  return (
    <div className={styles.videoTab}>
      {requestState.videoStatus === "record" && (
        <>
          <div className={styles.videoTabSquare}></div>
          <div className={styles.videoTabBottom}>
            <ParallelogramButton
              onClick={() => requestState.setVideoStatus("recording")}
            >
              Снять видео
            </ParallelogramButton>
            <p className={styles.credits}>
              Нажимая на кнопку «Снять видео», вы подтверждаете, что заполненные
              вами данные соответствуют действительности и введены корректно. Вы
              случае предоставления ложной информации ваша заявка будет
              аннулирована.
            </p>
          </div>
        </>
      )}
      {requestState.videoStatus === "recording" && (
        <div className={styles.recordingContainer}>
          <video
            muted={status === "recording"}
            ref={videoRef}
            className={styles.videoRecording}
            playsInline
            // style={{
            //   transform: facing === "user" ? "scale(-1, 1)" : "",
            // }}
          />
          <RecordVideo
            status={status}
            startRecording={startRecording}
            stopRecording={stopRecording}
          />
        </div>
      )}
      {requestState.videoStatus === "watch" && (
        <>
          <div className={styles.videoWatchingWrapper}>
            <video
              muted
              ref={videoRef}
              className={styles.videoWatching}
              playsInline
              loop
            />
            <div className={styles.deleteVideo}>
              <button onClick={() => requestState.setVideoStatus("record")}>
                <Image
                  src="/icons/delete.svg"
                  width={36}
                  height={36}
                  alt="Delete"
                />
              </button>
            </div>
          </div>
          <div className={styles.videoTabBottom}>
            <ParallelogramButton onClick={handleSendRequest}>
              Отправить заявку
            </ParallelogramButton>
            <p className={styles.credits}>
              Нажимая на кнопку «Отправить заявку», вы подтверждаете, что
              заполненные вами данные соответствуют действительности и введены
              корректно. Вы случае предоставления ложной информации ваша заявка
              будет аннулирована.
            </p>
          </div>
        </>
      )}
    </div>
  );
});
