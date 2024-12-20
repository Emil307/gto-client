"use client";

import React from "react";
import ratingState from "@/src/entities/rating/store/ratingState";

export const GenderFilter: React.FC = () => {
  return (
    <div>
      <button onClick={() => ratingState.setGenderFilter("male")}>
        Мужчины
      </button>
      <button onClick={() => ratingState.setGenderFilter("female")}>
        Женщины
      </button>
    </div>
  );
};
