import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.scss";
import timerState from "./store/timerState";
import { observer } from "mobx-react-lite";

interface VideoTimerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const VideoTimer: React.FC<VideoTimerProps> = observer(
  ({ videoRef }) => {
    const [time, setTime] = useState("00:00");
    const [isDelayed, setIsDelayed] = useState(true);
    const [startTime, setStartTime] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const updateTime = () => {
        if (isFinished) return;

        const elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        setTime(timeString);
      };

      const handlePlay = () => {
        setIsDelayed(true);
        setIsFinished(false);
        setTimeout(() => {
          setIsDelayed(false);
          setStartTime(Date.now());
        }, timerState.timeToStart + timerState.introTime);
      };

      const handleEnded = () => {
        setIsFinished(true);
      };

      const interval = setInterval(() => {
        if (!isDelayed) {
          updateTime();
        }
      }, 1000);

      video.addEventListener("play", handlePlay);
      video.addEventListener("ended", handleEnded);

      return () => {
        clearInterval(interval);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("ended", handleEnded);
      };
    }, [videoRef, isDelayed, startTime, isFinished]);

    return (
      <div className={styles.videoTimer}>
        <div className={styles.videoTimerContent}>{time}</div>
      </div>
    );
  }
);
