"use client";

import React, { useEffect, useState } from "react";
import useRecorder from "../hooks/useRecorder";
import styles from "../styles/styles.module.scss";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import requestState from "@/src/entities/request/store/requestState";

export const RecordVideo = () => {
  // const router = useRouter();
  const { status, videoRef, startRecording, stopRecording } = useRecorder();
  const [timeToStartRecording, setTimeToStartRecording] = useState<number>(0);

  function handleStartLater() {
    setTimeout(() => {
      startRecording();
    }, 3000);

    setTimeToStartRecording(3);
  }

  function second() {
    setTimeout(() => {
      setTimeToStartRecording(timeToStartRecording - 1);
    }, 1000);
  }

  useEffect(() => {
    if (timeToStartRecording > 0) {
      second();
    }
  }, [timeToStartRecording]);

  function handleStopRecording() {
    stopRecording();
    // router.replace("/request");
    // requestState.setCategory("video");
    // requestState.setVideoStatus("watch");
  }

  return (
    <div className={styles.container}>
      <video
        muted={status === "recording"}
        ref={videoRef}
        className={styles.video}
        playsInline
      />
      {timeToStartRecording ? (
        <div className={styles.timer}>{timeToStartRecording}</div>
      ) : (
        <></>
      )}
      <div className={styles.buttons}>
        <div className={styles.rotate}></div>
        {status === "idle" && (
          <div className={styles.recordWrapper}>
            <button onClick={startRecording} className={styles.start}>
              <div className={styles.startInner}></div>
            </button>
            <p>Начать запись</p>
          </div>
        )}
        {status !== "idle" && (
          <div className={styles.recordWrapper}>
            <button onClick={handleStopRecording} className={styles.stop}>
              <div className={styles.stopInner}></div>
            </button>
            <p>Остановить видео</p>
          </div>
        )}
        <button
          className={styles.startLater}
          onClick={handleStartLater}
          disabled={status !== "idle"}
        >
          <Image src="/icons/timer.svg" width={24} height={24} alt="timer" />
          <>3 сек</>
        </button>
      </div>
    </div>
  );
};
