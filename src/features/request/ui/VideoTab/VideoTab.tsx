"use client";

import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.scss";
import { RecordVideo, useRecorder } from "@/src/features/recordVideo";
import requestState from "@/src/entities/request/store/requestState";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { RequestDTO, sendChunk, sendRequest } from "@/src/entities/request";
import { Loader } from "@/src/shared";
import { FlushedInput } from "@/src/shared/ui/flushedInput";

export const VideoTab = observer(() => {
  const router = useRouter();
  const {
    status,
    videoRef,
    previewVideoRef,
    chunks,
    facing,
    error,
    previewError,
    startRecording,
    stopRecording,
    setFacing,
    setError,
    setPreviewError,
  } = useRecorder();
  const [isModalActive, setIsModalActive] = useState(true);
  const [isLoadingModalActive, setIsLoadingModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [link, setLink] = useState("");
  const [exercises, setExercises] = useState("");

  const CHUNK_SIZE = 1024 * 1024 * 5;

  function createChunks(blob: Blob): Blob[] {
    const chunks: Blob[] = [];
    let start = 0;
    while (start < blob.size) {
      const chunk = blob.slice(start, start + CHUNK_SIZE);
      chunks.push(chunk);
      start += CHUNK_SIZE;
    }
    return chunks;
  }

  function generateBlobId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  function getUploadedChunks(blobId: string): Set<number> {
    const uploadedChunks = JSON.parse(localStorage.getItem(blobId) || "[]");
    return new Set(uploadedChunks);
  }

  function markChunkAsUploaded(blobId: string, chunkIndex: number) {
    const uploadedChunks = getUploadedChunks(blobId);
    uploadedChunks.add(chunkIndex);
    localStorage.setItem(blobId, JSON.stringify(Array.from(uploadedChunks)));
  }

  async function uploadFile(applicationId: number, blob: Blob) {
    const blobId = generateBlobId(); // Генерируем уникальный ID для этого Blob
    const chunks = createChunks(blob);
    const uploadedChunks = getUploadedChunks(blobId);

    for (let i = 0; i < chunks.length; i++) {
      if (uploadedChunks.has(i)) {
        continue; // Этот чанк уже отправлен
      }

      try {
        await sendChunk(applicationId, i + 1, chunks.length, chunks[i]);
        markChunkAsUploaded(blobId, i);
      } catch (error) {
        console.error("Error uploading chunk:", error);
        break; // Можешь добавить логику повторной отправки
      }
    }
  }

  function handleSendRequest() {
    if (Number(minutes) * 60 + Number(seconds) <= 0) {
      return;
    }

    setIsLoading(true);
    setIsLoadingModalActive(true);

    const newRequest: RequestDTO = {
      surname: String(requestState.infoData?.surname),
      name: String(requestState.infoData?.name),
      patronymic: String(requestState.infoData?.patronymic),
      birthDate: requestState.infoData?.birthDate
        ? requestState.infoData?.birthDate
        : null,
      email: String(requestState.infoData?.email),
      region: String(requestState.infoData?.region),
      category_id: String(requestState.category?.id),
      phone: String(requestState.infoData?.phone),
      result_minutes: Number(minutes),
      result_seconds: Number(seconds),
      result_exercise: Number(exercises) ? Number(exercises) : null,
      blog_link: link ? link : null,
    };

    sendRequest(newRequest)
      .then((res) => {
        uploadFile(res.data.id, new Blob(chunks, { type: "video/mp4" }))
          .then(() => {
            requestState.setInfoData(null);
            requestState.setCategory(null);
            requestState.setActiveTab("info");
            requestState.setVideoStatus("record");
            router.replace("/lk");
            toast.success("Заявка успешно отправлена");
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            setIsLoading(false);
            setIsLoadingModalActive(false);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function toggleFacing() {
    setError(null);
    setPreviewError(null);
  }

  function handleInputMinutes(e: any) {
    if (e.target.value.length <= 2) {
      setMinutes(e.target.value);
    }
    if (e.target.value.length > 2 && minutes[0] === "0") {
      setMinutes(e.target.value.slice(1));
    }
  }

  function handleInputSeconds(e: any) {
    if (e.target.value.length <= 2) {
      setSeconds(e.target.value);
    }
    if (e.target.value.length > 2 && seconds[0] === "0") {
      setSeconds(e.target.value.slice(1));
    }
  }

  useEffect(() => {
    if (minutes.length === 1) {
      setMinutes(`0${minutes}`);
    }
    if (Number(minutes) > 59) {
      setMinutes("59");
    }
    if (Number(minutes) < 0) {
      setMinutes("00");
    }
  }, [minutes]);

  useEffect(() => {
    if (seconds.length === 1) {
      setSeconds(`0${seconds}`);
    }
    if (Number(seconds) > 59) {
      setSeconds("59");
    }
    if (Number(seconds) < 0) {
      setSeconds("00");
    }
  }, [seconds]);

  return (
    <div className={styles.videoTab}>
      {requestState.videoStatus === "record" && (
        <>
          <div className={styles.videoTabSquareWrapper}>
            <Image
              src="/img/upload-video.png"
              width={252}
              height={252}
              alt="Upload video"
              className={styles.videoTabSquare}
            />
          </div>
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
        <>
          <div className={styles.recordingContainer}>
            {status === "idle" && (
              <video
                muted
                ref={previewVideoRef}
                playsInline
                className={styles.videoRecording}
                onError={(e) => console.error("Ошибка видео:", e)}
                onAbort={(e) => console.error("Видео прервано:", e)}
                style={{
                  transform:
                    facing === "user" && !previewError ? "scale(-1, 1)" : "",
                }}
              />
            )}
            {status === "recording" && (
              <video
                muted
                ref={videoRef}
                playsInline
                className={styles.videoRecording}
                onError={(e) => console.error("Ошибка видео:", e)}
                onAbort={(e) => console.error("Видео прервано:", e)}
                style={{
                  transform: facing === "user" && !error ? "scale(-1, 1)" : "",
                }}
              />
            )}
            <RecordVideo
              status={status}
              facing={facing}
              startRecording={startRecording}
              stopRecording={stopRecording}
              setFacing={setFacing}
            />
          </div>
          {isModalActive && (
            <div
              className={styles.modal}
              onClick={() => setIsModalActive(false)}
            >
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <p className={styles.modalText}>
                  Входящие звонки могут прервать запись. Перед началом
                  рекомендуется включить режим “Не беспокоить”
                </p>
                <ParallelogramButton onClick={() => setIsModalActive(false)}>
                  Понятно
                </ParallelogramButton>
              </div>
            </div>
          )}
          {(error || previewError) && (
            <div className={styles.modal} onClick={toggleFacing}>
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <p className={styles.modalText}>
                  {error == "OverconstrainedError" ||
                  previewError == "OverconstrainedError" ||
                  error ||
                  previewError
                    ? "На вашем устройстве нет второй камеры"
                    : "Произошла ошибка, попробуйте позже"}
                </p>
                <ParallelogramButton onClick={toggleFacing}>
                  Понятно
                </ParallelogramButton>
              </div>
            </div>
          )}
        </>
      )}
      {requestState.videoStatus === "watch" && (
        <>
          <div>
            <div className={styles.videoWatchingWrapper}>
              <video
                muted
                ref={videoRef}
                className={styles.videoWatching}
                autoPlay
                playsInline
                controls
                onError={(e) => console.error("Ошибка видео:", e)}
                onAbort={(e) => console.error("Видео прервано:", e)}
              />
            </div>
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
            {requestState.category?.is_needed_time && (
              <div className={styles.secondsmer}>
                <h5 className={styles.secondsmerTitle}>
                  Укажите время выполнения упражнения:
                </h5>
                <div className={styles.secondsmerInputs}>
                  <input
                    placeholder="00"
                    type="number"
                    value={minutes}
                    onChange={handleInputMinutes}
                    className={styles.secondsmerInput}
                    maxLength={2}
                    min={0}
                    max={59}
                  />
                  <p className={styles.secondsmerValue}>:</p>
                  <input
                    placeholder="00"
                    type="number"
                    value={seconds}
                    onChange={handleInputSeconds}
                    className={styles.secondsmerInput}
                    maxLength={2}
                    min={0}
                    max={59}
                  />
                </div>
              </div>
            )}
            {requestState.category?.is_needed_exercise && (
              <div className={styles.secondsmer}>
                <FlushedInput
                  id="exercise"
                  required
                  name="exercise"
                  type="number"
                  placeholder="20"
                  label="Укажите количество выполнений упражнения"
                  value={exercises}
                  onChange={(e) => setExercises(e.target.value)}
                />
              </div>
            )}
            {requestState.category?.is_needed_blog && (
              <div className={styles.secondsmer}>
                <FlushedInput
                  id="link"
                  required
                  name="link"
                  type="text"
                  placeholder="https://blog.ru"
                  label="Вставьте ссылку на ваш блог"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className={styles.videoTabBottom}>
            <ParallelogramButton
              onClick={handleSendRequest}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : <>Отправить заявку</>}
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

      {isLoadingModalActive && (
        <div
          className={styles.modal}
          onClick={() => setIsLoadingModalActive(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={styles.modalText}>
              Ваша заявка отправляется, не закрывайте страницу отправки заявки и
              приложение Telegram до окнчания загрузки, иначе заявка не будет
              сохранена
            </p>
            <ParallelogramButton onClick={() => setIsLoadingModalActive(false)}>
              Понятно
            </ParallelogramButton>
          </div>
        </div>
      )}
    </div>
  );
});
