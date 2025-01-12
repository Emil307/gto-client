import React from "react";
import styles from "./styles.module.scss";
import { IRating } from "../../types";
import Image from "next/image";

interface IRatingCardProps {
  rating: IRating;
  isMy: boolean;
}

export const RatingCard: React.FC<IRatingCardProps> = ({ rating, isMy }) => {
  return (
    <div className={styles.container}>
      {rating.rank === "1" ? (
        <Image src="/icons/1.svg" width={32} height={32} alt="1" />
      ) : rating.rank === "2" ? (
        <Image src="/icons/2.svg" width={32} height={32} alt="2" />
      ) : rating.rank === "3" ? (
        <Image src="/icons/3.svg" width={32} height={32} alt="3" />
      ) : (
        <h5 className={styles.rank}>{rating.rank}.</h5>
      )}
      {(rating.rank === "1" || rating.rank === "2" || rating.rank === "3") &&
        rating.video_file && (
          <video
            autoPlay
            muted
            playsInline
            src={`${process.env.NEXT_PUBLIC_API_URL}${rating.video_file}`}
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
          <p className={styles.resultValue}> {rating.result_in_minutes}</p>
        </div>
      </div>
    </div>
  );
};
