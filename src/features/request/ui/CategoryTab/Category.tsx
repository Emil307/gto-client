import { getCategoryInfo, ICategory } from "@/src/entities/categories";
import requestState from "@/src/entities/request/store/requestState";
import React, { useState } from "react";
import styles from "../../styles/styles.module.scss";
import Image from "next/image";

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
  const [isShowingSubcategories, setIsShowingSubcategories] = useState(false);

  function handleSelect(value: string) {
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

  function handleSelectCategory(value: string) {
    if (!category.is_able_to_choice) {
      setIsShowingSubcategories(!isShowingSubcategories);
      return;
    }

    handleSelect(value);
  }

  return (
    <>
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
        {category.subcategories.length > 0 && (
          <Image
            src="/icons/arrow-white.svg"
            width={24}
            height={24}
            alt="open"
            style={{
              rotate: isShowingSubcategories ? "180deg" : "0deg",
              transition: "all .2s ",
            }}
          />
        )}
      </button>
      {isShowingSubcategories && (
        <>
          {category.subcategories.map((subcategory) => (
            <button
              onClick={() => handleSelect(String(subcategory.id))}
              className={styles.subcategory}
              key={subcategory.id}
              style={{
                background:
                  requestState.category === String(subcategory.id)
                    ? "#F70115"
                    : "",
              }}
            >
              {subcategory.title}
            </button>
          ))}
        </>
      )}
    </>
  );
};
