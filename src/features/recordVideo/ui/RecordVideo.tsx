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
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRecordingIntro, setIsRecordingIntro] = useState<boolean>(true);

  function handleStartRecording() {
    startRecording();
  }

  function handleStartTimer() {
    setIsRecordingIntro(false);

    setTimeout(() => {
      console.log("start");
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

  function secundsmerSecond() {
    setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }

  useEffect(() => {
    second();
  }, [timeToStartRecording]);

  useEffect(() => {
    if (
      status === "recording" &&
      !isRecordingIntro &&
      timeToStartRecording === 0
    ) {
      secundsmerSecond();

      if (seconds === 60) {
        setSeconds(0);
        setMins(mins + 1);
      }
    }
  }, [status, isRecordingIntro, timeToStartRecording, seconds]);

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
      {status === "recording" &&
        !isRecordingIntro &&
        timeToStartRecording === 0 && (
          <div className={styles.secondsmer}>
            <p className={styles.secondsmerValue}>
              {String(mins).length === 1 ? `0${mins}` : mins}:
              {String(seconds).length === 1 ? `0${seconds}` : seconds}
            </p>
          </div>
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
            {!isRecordingIntro && (
              <>
                <button onClick={handleStopRecording} className={styles.stop}>
                  <div className={styles.stopInner}></div>
                </button>
                <p>Остановить видео</p>
              </>
            )}
            {isRecordingIntro && (
              <>
                <button onClick={handleStartTimer} className={styles.start}>
                  <Image
                    src="/icons/startTimer.svg"
                    width={44}
                    height={44}
                    alt="start timer"
                  />
                </button>
                <p>Запустить таймер</p>
              </>
            )}
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
