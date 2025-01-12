import React from "react";
import styles from "../styles/styles.module.scss";
import { GenderFilter, Search } from "@/src/features/rating";
import { Filters } from "@/src/features/rating/ui/Filters";

export const RatingFilters: React.FC = () => {
  return (
    <div className={styles.container}>
      <GenderFilter />
      <Search />
      <Filters />
    </div>
  );
};
