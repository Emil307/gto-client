"use client";

import React, { useState } from "react";
import { IHistory } from "../../types";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import Video from "next-video";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import historyState from "../../store/historyState";
import { observer } from "mobx-react-lite";

interface IHistoryCardProps {
  history: IHistory;
}

export const HistoryCard: React.FC<IHistoryCardProps> = observer(
  ({ history }) => {
    const [isShowingVideo, setIsShowingVideo] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    const API = process.env.NEXT_PUBLIC_API_URL;

    function handleDelete() {
      historyState.deleteHistory(history.id);
      setIsModalActive(false);
    }

    return (
      <div className={styles.container}>
        <div className={styles.infoWrapper}>
          <div className={styles.infoBlock}>
            <p className={styles.p}>Дата: </p>
            <span className={styles.span}>
              {String(
                dayjs(history.created_at)
                  .format("DD/MM/YYYY")
                  .replaceAll("/", ".")
              )}
            </span>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.p}>Возрастная категория: </p>
            <span className={styles.span}>{history.age_category}</span>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.p}>Категория: </p>
            <span className={styles.span}>{history.category.title}</span>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.p}>Результат: </p>
            <span className={styles.span}>
              {history.result_minutes && <>{history.result_minutes} мин</>}{" "}
              {history.result_seconds} сек
            </span>
          </div>
        </div>

        {isShowingVideo && <Video src={`${API}${history.video_file}`} />}

        <button
          className={styles.button}
          onClick={() => setIsShowingVideo(true)}
          disabled={historyState.isDeleting}
        >
          Открыть видео заявки
        </button>
        <button
          className={styles.button}
          onClick={() => setIsModalActive(true)}
          disabled={historyState.isDeleting}
        >
          Удалить заявку
        </button>

        {isModalActive && (
          <div className={styles.modal} onClick={() => setIsModalActive(false)}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <p className={styles.modalText}>
                Вы действительно хотите удалить заявку? Эта операция необратима
              </p>
              <ParallelogramButton
                onClick={handleDelete}
                disabled={historyState.isDeleting}
              >
                Удалить
              </ParallelogramButton>
            </div>
          </div>
        )}
      </div>
    );
  }
);
