"use client";

import React, { useEffect } from "react";
import ratingState from "../../store/ratingState";
import { observer } from "mobx-react-lite";

export const RatingList: React.FC = observer(() => {
  useEffect(() => {
    if (ratingState.rating.length === 0) {
      ratingState.getRating({
        filters: {},
      });
    }
  }, []);

  return (
    <div>
      {ratingState.rating.map((rating) => (
        <div key={rating.id}>{rating.name}</div>
      ))}
    </div>
  );
});
