import React from "react";
import styles from "./styles.module.scss";
import { IRating } from "../../types";

interface IRatingCardProps {
  rating: IRating;
  isMy: boolean;
}

export const RatingCard: React.FC<IRatingCardProps> = ({ rating, isMy }) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.rank}>{rating.rank}.</h5>
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
