"use client";

import React from "react";
import ratingState from "../../store/ratingState";
import { observer } from "mobx-react-lite";

export const RatingList: React.FC = observer(() => {
  return (
    <div>
      {ratingState.rating.map((rating) => (
        <div key={rating.id}>{rating.name}</div>
      ))}
    </div>
  );
});
