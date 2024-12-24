"use client";

import React from "react";
import { RecordVideo } from "@/src/features/recordVideo";
import styles from "../styles/styles.module.scss";
import { useRecorder } from "@/src/features/recordVideo";

export const RecordVideoWidget = () => {
  const { status, videoRef, startRecording, stopRecording } = useRecorder();

  return (
    <div className={styles.container}>
      <video
        muted={status === "recording"}
        ref={videoRef}
        className={styles.video}
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
  );
};
