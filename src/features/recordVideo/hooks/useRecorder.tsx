"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
// import axios from "axios";

export type StatusType = "idle" | "recording" | "paused";
// type FacingType = "user" | "environment";

export const useRecorder = () => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType>("idle");
  // const [facing, setFacing] = useState<FacingType>("user");
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
        // video: {
        //   facingMode: facing === "user" ? "user" : { exact: "environment" },
        // },
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
          console.log(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }

        const blob = new Blob(chunks, { type: "video/webm" });
        setBlob(blob);

        const blobURL = URL.createObjectURL(blob);
        setBlobUrl(blobURL);

        const formData = new FormData();
        formData.append("file", blob, "chunk.webm");
        formData.append("upload_id", "1");
        formData.append("chunk_number", "1");
        formData.append("total_chunks", "1");
        formData.append("application_id", "1");

        // const API = process.env.NEXT_PUBLIC_API_URL;

        // const access = localStorage.getItem("token");

        // const response = await axios({
        //   url: `${API}/api/application/chunk/upload`,
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${access}`,
        //     "Content-Type": "multipart/form-data; boundary=something",
        //   },
        //   data: formData,
        // });

        // console.log("Ответ сервера:", response.data);

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
    // facing,
    videoRef,
    startRecording,
    stopRecording,
    pauseRecording,
    // setFacing,
    resumeRecording,
    downloadRecording,
  };
};
