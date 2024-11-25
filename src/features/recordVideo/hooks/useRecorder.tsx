"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";

type StatusType = "idle" | "recording" | "paused";

const useRecorder = () => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType>("idle");
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef() as RefObject<HTMLVideoElement>;

  useEffect(() => {
    if (status === "recording" && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [status, videoRef.current]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);

      const mediaRecorder = new MediaRecorder(stream);
      setRecorder(mediaRecorder);

      mediaRecorder.onstart = () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      };

      mediaRecorder.onpause = () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      };

      mediaRecorder.onresume = () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      };

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }

        const blob = new Blob(chunks, { type: "video/webm" });
        setBlob(blob);

        const blobURL = URL.createObjectURL(blob);
        setBlobUrl(blobURL);

        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = blobURL;
          videoRef.current.play();
        }
      };

      mediaRecorder.start();
      setStatus("recording");
    } catch (error: any) {
      console.error("Error getting access", error);
    }
  };

  const stopRecording = () => {
    if (recorder && status !== "idle") {
      recorder.stop();
      recorder.stream.getTracks().map((track) => track.stop());
      setRecorder(null);
      setStream(null);
      setStatus("idle");
    }
  };

  const pauseRecording = () => {
    if (recorder && status === "recording") {
      recorder.pause();
      setStatus("paused");
    }
  };

  const resumeRecording = () => {
    if (recorder && status === "paused") {
      recorder.resume();
      setStatus("recording");
    }
  };

  const downloadRecording = () => {
    if (blob) {
      saveAs(blob, `Video-${Date.now()}.webm`);
    }
  };

  return {
    blob,
    blobUrl,
    status,
    videoRef,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    downloadRecording,
  };
};

export default useRecorder;
