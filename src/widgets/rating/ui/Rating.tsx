import React from "react";
import { RatingFilters } from "@/src/widgets/ratingFilters";
import { RatingList } from "@/src/entities/rating";
import styles from "../styles/styles.module.scss";

export const Rating: React.FC = () => {
  return (
    <div className={styles.container}>
      <RatingFilters />
      <RatingList />
    </div>
  );
};
