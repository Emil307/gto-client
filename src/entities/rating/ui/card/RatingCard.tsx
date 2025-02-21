import React, { useState } from "react";
import styles from "./styles.module.scss";
import { IRating } from "../../types";
import Image from "next/image";

interface IRatingCardProps {
  rating: IRating;
  isMy: boolean;
}

export const RatingCard: React.FC<IRatingCardProps> = ({ rating, isMy }) => {
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.container}
        onClick={() => setIsShowingDetails(!isShowingDetails)}
      >
        <div className={styles.infoWrapper}>
          {rating.rank === "1" ? (
            <Image src="/icons/1.svg" width={32} height={32} alt="1" />
          ) : rating.rank === "2" ? (
            <Image src="/icons/2.svg" width={32} height={32} alt="2" />
          ) : rating.rank === "3" ? (
            <Image src="/icons/3.svg" width={32} height={32} alt="3" />
          ) : (
            <h5 className={styles.rank}>{rating.rank}.</h5>
          )}
          {(rating.rank === "1" ||
            rating.rank === "2" ||
            rating.rank === "3") &&
            rating.video_file && (
              <video
                width={64}
                height={64}
                muted
                controls
                src={`${API}${rating.video_file}`}
                className={styles.video}
              />
            )}
          <div className={styles.info}>
            <div className={styles.nameWrapper}>
              {isMy && <span>(Вы)</span>}
              <p className={styles.name}>
                {rating.surname} {rating.name} {rating.patronymic}
              </p>
            </div>
            <div className={styles.result}>
              <span className={styles.resultKey}>Результат: </span>{" "}
              <p className={styles.resultValue}>
                {rating.result_minutes} мин {rating.result_seconds} сек
              </p>
            </div>
          </div>
        </div>
        <Image
          src="/icons/arrow-white.svg"
          width={24}
          height={24}
          alt="open"
          style={{
            rotate: isShowingDetails ? "180deg" : "0deg",
            transition: "all .2s ",
          }}
        />
      </button>
      {isShowingDetails && (
        <div className={styles.details}>
          <div className={styles.detailsRow}>
            <h5 className={styles.detailsKey}>Возраст:</h5>
            <p className={styles.detailsValue}>{rating.user.age}</p>
          </div>
          <div className={styles.detailsRow}>
            <h5 className={styles.detailsKey}>Категория:</h5>
            <p className={styles.detailsValue}>{rating.category.title}</p>
          </div>
          <div className={styles.detailsRow}>
            <h5 className={styles.detailsKey}>Возрастная категория:</h5>
            <p className={styles.detailsValue}>{rating.age_category}</p>
          </div>
          <div className={styles.detailsRow}>
            <h5 className={styles.detailsKey}>Местоположение:</h5>
            <p className={styles.detailsValue}>
              {rating.user?.region} {rating.user?.city}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
