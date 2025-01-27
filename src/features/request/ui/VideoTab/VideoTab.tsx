"use client";

import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import React, { useState } from "react";
import styles from "../../styles/styles.module.scss";
import { RecordVideo, useRecorder } from "@/src/features/recordVideo";
import requestState from "@/src/entities/request/store/requestState";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { RequestDTO, sendRequest } from "@/src/entities/request";
import { Loader } from "@/src/shared";

export const VideoTab = observer(() => {
  const router = useRouter();
  const {
    status,
    videoRef,
    previewVideoRef,
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleSendRequest() {
    setIsLoading(true);

    const newRequest: RequestDTO = {
      surname: String(requestState.infoData?.surname),
      name: String(requestState.infoData?.name),
      patronymic: String(requestState.infoData?.patronymic),
      birthDate: "2025-01-23",
      email: String(requestState.infoData?.email),
      region: String(requestState.infoData?.region),
      category_id: String(requestState.category),
      phone: String(requestState.infoData?.phone),
    };

    sendRequest(newRequest)
      .then(() => {
        requestState.setInfoData(null);
        requestState.setCategory("");
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
      });
  }

  function toggleFacing() {
    setError(null);
    setPreviewError(null);
  }

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
    </div>
  );
});
