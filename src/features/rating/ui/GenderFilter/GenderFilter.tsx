"use client";

import React from "react";
import ratingState from "@/src/entities/rating/store/ratingState";
import { Tabs } from "@/src/shared";
import { observer } from "mobx-react-lite";

const tabs = [
  {
    id: 1,
    label: "Мужчины",
    value: "male",
    isDisabled: false,
    onClick: () => ratingState.setGenderFilter("male"),
  },
  {
    id: 2,
    label: "Женщины",
    value: "female",
    isDisabled: false,
    onClick: () => ratingState.setGenderFilter("female"),
  },
];

export const GenderFilter: React.FC = observer(() => {
  return (
    <Tabs
      tabs={tabs}
      activeTab={
        ratingState.filters.gender ? ratingState.filters.gender : "male"
      }
    />
  );
});
