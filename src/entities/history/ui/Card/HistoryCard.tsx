import React from "react";
import { IHistory } from "../../types";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import Video from "next-video";

interface IHistoryCardProps {
  history: IHistory;
}

export const HistoryCard: React.FC<IHistoryCardProps> = ({ history }) => {
  // const [isShowingVideo, setIsShowingVideo] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  console.log(`${API}${history.video_file}`);

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

      <Video src={`${API}${history.video_file}`} />

      {/* <button className={styles.button} onClick={() => setIsShowingVideo(true)}>
        Открыть видео заявки
      </button> */}
    </div>
  );
};
