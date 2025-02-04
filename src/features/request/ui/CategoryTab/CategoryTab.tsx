"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../../styles/styles.module.scss";
import requestState from "@/src/entities/request/store/requestState";
import { observer } from "mobx-react-lite";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import { getCategoryInfo, getMyCategories } from "@/src/entities/categories";

export type TCategory = {
  value: string;
  label: string;
};

export const CategoryTab = observer(() => {
  const [ageCategory, setAgeCategory] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [guide, setGuide] = useState("");
  const [rules, setRules] = useState("");

  useEffect(() => {
    handleGetCategories();
  }, []);

  function handleGetCategories() {
    getMyCategories()
      .then((res) => {
        const categories: any = [];

        res.data.forEach((category: any) => {
          categories.push({
            label: category.title,
            value: String(category.id),
          });
        });

        setCategories(categories);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleSelectCategory(value: string) {
    getCategoryInfo(value)
      .then((res) => {
        setAgeCategory(res.data.age_category);
        setGuide(res.data.guide);
        setRules(res.data.rules);
      })
      .catch((e) => {
        console.log(e);
      });
    requestState.setCategory(value);
  }

  console.log(rules);

  return (
    <div className={styles.categoryTab}>
      <div className={styles.ageCategory}>
        <Image
          priority={true}
          src="/icons/info.svg"
          width={24}
          height={24}
          alt="info"
        />
        <p>Ваша возрастная категория: {ageCategory}</p>
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
            key={category.value}
            className={styles.category}
          >
            {category.label}
          </button>
        ))}
      </div>
      {!requestState.category && (
        <div style={{ height: "110px", width: "100%" }}></div>
      )}
      {requestState.category && (
        <>
          <div className={styles.rules}>
            {guide && (
              <>
                <h3>Видеоинструкция для выполнения упражнений:</h3>
                <video
                  src={guide}
                  width={"100%"}
                  autoPlay={false}
                  controls
                  preload="auto"
                ></video>
              </>
            )}
            {rules && (
              <>
                <h3>Правила участия в данной категории:</h3>
                <p>{rules}</p>
              </>
            )}
          </div>
          <div style={{ height: "90px", width: "100%" }}></div>
        </>
      )}
      <div className={styles.creditsWrapper}>
        <ParallelogramButton
          onClick={() => requestState.setActiveTab("video")}
          disabled={Boolean(!requestState.category)}
        >
          Далее
        </ParallelogramButton>
        <p className={styles.credits}>
          Нажимая на кнопку «Далее», вы подтверждаете, что заполненные вами
          данные соответствуют действительности и введены корректно. Вы случае
          предоставления ложной информации ваша заявка будет аннулирована.
        </p>
      </div>
    </div>
  );
});
