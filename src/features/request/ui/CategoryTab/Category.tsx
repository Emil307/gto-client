import { getCategoryInfo, ICategory } from "@/src/entities/categories";
import requestState from "@/src/entities/request/store/requestState";
import React, { useState } from "react";
import styles from "../../styles/styles.module.scss";
import Image from "next/image";

interface CategoryProps {
  category: ICategory;
  setAgeCategory: (category: string) => void;
}

export const Category: React.FC<CategoryProps> = ({
  category,
  setAgeCategory,
}) => {
  const [isShowingSubcategories, setIsShowingSubcategories] = useState(false);

  function handleSelect(category: ICategory) {
    getCategoryInfo(
      String(category.id),
      requestState.infoData?.birthDate ? requestState.infoData?.birthDate : null
    )
      .then((res) => {
        setAgeCategory(res.data.age_category);

        requestState.setGuideType(res.data.type);
        requestState.setGuide(res.data.guide);
        requestState.setRules(res.data.rules_json);
        requestState.setCategoryDocument(res.data.pdf);

        requestState.setCategory(category);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleSelectCategory(category: ICategory) {
    if (!category.is_able_to_choice) {
      setIsShowingSubcategories(!isShowingSubcategories);
      return;
    }

    handleSelect(category);
  }

  return (
    <>
      <button
        style={{
          background:
            requestState.category?.id === category.id ? "#F70115" : "",
        }}
        onClick={() => handleSelectCategory(category)}
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
              onClick={() => handleSelect(subcategory)}
              className={styles.subcategory}
              key={subcategory.id}
              style={{
                background:
                  requestState.category?.id === subcategory.id ? "#F70115" : "",
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
