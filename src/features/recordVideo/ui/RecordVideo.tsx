"use client";

import React from "react";
import useRecorder from "../hooks/useRecorder";
import styles from "../styles/styles.module.scss";

export const RecordVideo = () => {
  const { status, videoRef, startRecording, stopRecording, downloadRecording } =
    useRecorder();

  return (
    <div>
      <video
        muted={status === "recording"}
        ref={videoRef}
        className={styles.video}
      />
      {status === "idle" && <button onClick={startRecording}>Start</button>}
      {status !== "idle" && <button onClick={stopRecording}>Stop</button>}
      <button onClick={downloadRecording}>Download</button>
    </div>
  );
};
