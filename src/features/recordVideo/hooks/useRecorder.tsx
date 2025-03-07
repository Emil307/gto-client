"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";

export type StatusType = "idle" | "recording" | "paused";
export type FacingType = "user" | "environment";

export const useRecorder = () => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [status, setStatus] = useState<StatusType>("idle");
  const [facing, setFacing] = useState<FacingType>("user");
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [previewError, setPreviewError] = useState<unknown | null>(null);

  const videoRef = useRef() as RefObject<HTMLVideoElement>;
  const previewVideoRef = useRef() as RefObject<HTMLVideoElement>;

  useEffect(() => {
    if (status === "recording" && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [status, videoRef.current]);

  async function be() {
    if (previewVideoRef.current) {
      try {
        const previewStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facing === "user" ? "user" : { exact: "environment" },
          },
          audio: true,
        });
        previewVideoRef.current.srcObject = previewStream;

        const mediaRecorder = new MediaRecorder(previewStream);

        mediaRecorder.onstart = () => {
          if (previewVideoRef.current) {
            previewVideoRef.current.play();
          }
        };

        mediaRecorder.start();
      } catch (e: unknown) {
        setPreviewError(e);
      }
    }
  }

  useEffect(() => {
    be();
  }, [previewVideoRef.current, facing]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing === "user" ? "user" : { exact: "environment" },
        },
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
          setChunks([...chunks, e.data]);
        }
      };

      mediaRecorder.onstop = async () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }

        const blob = new Blob(chunks, { type: "video/mp4" });
        setBlob(blob);

        const blobURL = URL.createObjectURL(blob);
        setBlobUrl(blobURL);

        const formData = new FormData();
        formData.append("file", blob, "chunk.mp4");
        formData.append("upload_id", "1");
        formData.append("chunk_number", "1");
        formData.append("total_chunks", "1");
        formData.append("application_id", "1");

        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = blobURL;
          videoRef.current.play();
        }
      };

      mediaRecorder.start();
      setStatus("recording");
    } catch (error: unknown) {
      setError(error);
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
      saveAs(blob, `Video-${Date.now()}.mp4`);
    }
  };

  return {
    blob,
    blobUrl,
    chunks,
    status,
    facing,
    previewVideoRef,
    videoRef,
    error,
    previewError,
    startRecording,
    stopRecording,
    pauseRecording,
    setFacing,
    resumeRecording,
    downloadRecording,
    setError,
    setPreviewError,
  };
};
