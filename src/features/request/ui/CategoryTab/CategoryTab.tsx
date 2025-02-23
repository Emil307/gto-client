"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../../styles/styles.module.scss";
import requestState from "@/src/entities/request/store/requestState";
import { observer } from "mobx-react-lite";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import { getMyCategories, ICategory } from "@/src/entities/categories";
import { Category } from "./Category";

interface IRule {
  id: number;
  p: string;
}

export const CategoryTab = observer(() => {
  const [ageCategory, setAgeCategory] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [guide, setGuide] = useState("");
  const [guideType, setGuideType] = useState<"video" | "iframe" | null>(null);
  const [rules, setRules] = useState<IRule[]>([]);
  const [document, setDocument] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    handleGetCategories();
  }, []);

  function handleGetCategories() {
    getMyCategories(
      requestState.infoData?.birthDate ? requestState.infoData?.birthDate : null
    )
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
          <Category
            category={category}
            setAgeCategory={setAgeCategory}
            setGuideType={setGuideType}
            setGuide={setGuide}
            setRules={setRules}
            setDocument={setDocument}
            key={category.id}
          />
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
                {guideType === "video" && (
                  <video
                    src={guide}
                    width={"100%"}
                    autoPlay={false}
                    controls
                    preload="auto"
                  ></video>
                )}
                {guideType === "iframe" && (
                  <iframe
                    width={"100%"}
                    src={guide}
                    allow="clipboard-write;autoplay;fullscreen;display-capture;encrypted-media;"
                    allowFullScreen
                  ></iframe>
                )}
              </>
            )}
            {document && (
              <a
                style={{ textDecoration: "underline" }}
                href={`${API}${document}`}
              >
                Подробная PDF-инструкция
              </a>
            )}
            {rules && (
              <>
                <h3>Правила участия в данной категории:</h3>
                {rules.map((rule) => (
                  <p key={rule.id}>{rule.p}</p>
                ))}
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
