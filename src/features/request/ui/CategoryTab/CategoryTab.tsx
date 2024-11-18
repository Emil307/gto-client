"use client";

import Image from "next/image";
import React from "react";
import styles from "../../styles/styles.module.scss";
import requestState from "@/src/entities/request/store/requestState";
import { observer } from "mobx-react-lite";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";

const categories = [
  {
    id: 1,
    label: "Любитель",
    value: "amateur",
  },
  {
    id: 2,
    label: "Профессионал",
    value: "professional",
  },
  {
    id: 3,
    label: "КМС",
    value: "сms",
  },
  {
    id: 4,
    label: "Мастер спорта",
    value: "master",
  },
];

export const CatagoryTab = observer(() => {
  function handleSelectCategory(value: string) {
    requestState.setCategory(value);
  }

  return (
    <div className={styles.categoryTab}>
      <div className={styles.ageCategory}>
        <Image src="/icons/info.svg" width={24} height={24} alt="info" />
        <p>Ваша возрастная категория: 18-34</p>
      </div>
      <div className={styles.categories}>
        <h5>Выберите одну из доступных вам категорий:</h5>
        {categories.map((category) => (
          <button
            style={{
              background:
                requestState.category === category.value ? "#F70115" : "",
            }}
            onClick={() => handleSelectCategory(category.value)}
            key={category.id}
            className={styles.category}
          >
            {category.label}
          </button>
        ))}
      </div>
      <ParallelogramButton disabled={Boolean(!requestState.category)}>
        Далее
      </ParallelogramButton>
      <p className={styles.credits}>
        Нажимая на кнопку «Далее», вы подтверждаете, что заполненные вами данные
        соответствуют действительности и введены корректно. Вы случае
        предоставления ложной информации ваша заявка будет аннулирована.
      </p>
    </div>
  );
});
