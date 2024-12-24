"use client";

import React, { useEffect, useState } from "react";
import { StatusType } from "../hooks/useRecorder";
import styles from "../styles/styles.module.scss";
import Image from "next/image";
import requestState from "@/src/entities/request/store/requestState";
// import { useRouter } from "next/navigation";
// import requestState from "@/src/entities/request/store/requestState";

type Timer = 3 | 5 | 10;

interface IRecordVideoProps {
  status: StatusType;
  startRecording: () => void;
  stopRecording: () => void;
}

export const RecordVideo: React.FC<IRecordVideoProps> = ({
  status,
  startRecording,
  stopRecording,
}) => {
  // const router = useRouter();
  const [timeToStartRecording, setTimeToStartRecording] = useState<number>(0);
  const [currentTimer, setCurrentTimer] = useState<Timer>(3);

  function handleStartRecording() {
    setTimeout(() => {
      startRecording();
    }, currentTimer * 1000);

    setTimeToStartRecording(currentTimer);
  }

  function handleChangeTimer() {
    if (currentTimer === 3) {
      setCurrentTimer(5);
      return;
    }
    if (currentTimer === 5) {
      setCurrentTimer(10);
      return;
    }
    if (currentTimer === 10) {
      setCurrentTimer(3);
      return;
    }
  }

  function second() {
    setTimeout(() => {
      if (timeToStartRecording > 0) {
        setTimeToStartRecording(timeToStartRecording - 1);
      }
    }, 1000);
  }

  useEffect(() => {
    second();
  }, [timeToStartRecording]);

  function handleStopRecording() {
    stopRecording();
    requestState.setVideoStatus("watch");
    // router.replace("/request");
    // requestState.setCategory("video");
    // requestState.setVideoStatus("watch");
  }

  return (
    <>
      {timeToStartRecording ? (
        <div className={styles.timer}>
          <p>{timeToStartRecording}</p>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.buttons}>
        {/* <button
          className={styles.rotate}
          onClick={() => setFacing(facing === "user" ? "environment" : "user")}
        >
          <Image
            src="/icons/rotate.svg"
            width={24}
            height={24}
            alt="Перевернуть камеру"
          />
        </button> */}
        <div className={styles.rotate}></div>
        {status === "idle" && (
          <div className={styles.recordWrapper}>
            <button onClick={handleStartRecording} className={styles.start}>
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
          onClick={handleChangeTimer}
          disabled={status !== "idle"}
        >
          <Image src="/icons/timer.svg" width={24} height={24} alt="timer" />
          <>{currentTimer} сек</>
        </button>
      </div>
    </>
  );
};
