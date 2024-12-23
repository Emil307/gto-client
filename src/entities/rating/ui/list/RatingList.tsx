"use client";

import React, { useEffect } from "react";
import ratingState from "../../store/ratingState";
import { observer } from "mobx-react-lite";
import { RatingCard } from "../card";
import styles from "./styles.module.scss";

export const RatingList: React.FC = observer(() => {
  useEffect(() => {
    if (ratingState.rating.length === 0) {
      ratingState.getRating({
        filters: {},
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      {ratingState.myRating && (
        <RatingCard isMy={true} rating={ratingState.myRating} />
      )}
      {ratingState.rating.map((rating) => (
        <RatingCard key={rating.id} rating={rating} isMy={false} />
      ))}
    </div>
  );
});
