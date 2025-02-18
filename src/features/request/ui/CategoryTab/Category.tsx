import { getCategoryInfo, ICategory } from "@/src/entities/categories";
import requestState from "@/src/entities/request/store/requestState";
import React from "react";
import styles from "../../styles/styles.module.scss";

interface CategoryProps {
  category: ICategory;
  setAgeCategory: (category: string) => void;
  setGuideType: (type: "video" | "iframe" | null) => void;
  setGuide: (guide: string) => void;
  setRules: (rules: string) => void;
}

export const Category: React.FC<CategoryProps> = ({
  category,
  setAgeCategory,
  setGuideType,
  setGuide,
  setRules,
}) => {
  function handleSelectCategory(value: string) {
    getCategoryInfo(
      value,
      requestState.infoData?.birthDate ? requestState.infoData?.birthDate : null
    )
      .then((res) => {
        setAgeCategory(res.data.age_category);
        setGuideType(res.data.type);
        setGuide(res.data.guide);
        setRules(res.data.rules);

        requestState.setCategory(value);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <button
      style={{
        background:
          requestState.category === String(category.id) ? "#F70115" : "",
      }}
      onClick={() => handleSelectCategory(String(category.id))}
      key={category.id}
      className={styles.category}
    >
      {category.title}
    </button>
  );
};
