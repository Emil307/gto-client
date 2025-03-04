"use client";

import React, { useEffect, useState } from "react";
import { FlushedSelect, getDistricts } from "@/src/shared";
import styles from "../../styles/styles.module.scss";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import { getCities, getRegions } from "@/src/entities/profile";
import ratingState from "@/src/entities/rating/store/ratingState";
import { RatingRequestDTO } from "@/src/entities/rating";
import { observer } from "mobx-react-lite";
import { getCategories } from "@/src/entities/categories";

interface IModalProps {
  onClose: () => void;
}

export const Modal: React.FC<IModalProps> = observer(({ onClose }) => {
  // const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    String(ratingState.filters.category_id)
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(
    ratingState.filters.district as string
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    ratingState.filters.region as string
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(
    ratingState.filters.city as string
  );

  useEffect(() => {
    handleGetCategories();
    handleGetRegions();
    handleGetDistricts();
  }, []);

  useEffect(() => {
    if (selectedRegion && selectedRegion !== "undefined") {
      getCities(selectedRegion)
        .then((res) => {
          const searchedCities: any = [];

          res.data.forEach((city: any) => {
            searchedCities.push({
              label: city.title,
              value: city.title,
            });
          });

          setCities(searchedCities);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [selectedRegion]);

  function handleGetCategories() {
    getCategories()
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

  function handleGetRegions() {
    getRegions()
      .then((res) => {
        const searchedRegions: any = [];

        res.data.forEach((region: any) => {
          searchedRegions.push({
            label: region.title,
            value: region.title,
          });
        });

        setRegions(searchedRegions);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleGetDistricts() {
    getDistricts()
      .then((res) => {
        const searchedDistricts: any = [];

        res.data.forEach((region: any) => {
          searchedDistricts.push({
            label: region.title,
            value: region.title,
          });
        });

        setDistricts(searchedDistricts);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleSave() {
    const data: RatingRequestDTO = {
      filters: {
        // age?: number;
        // gender?: TGender;
        category_id: Number(selectedCategory),
        region: selectedRegion,
        city: selectedCity,
        district: selectedDistrict,
      },
    };
    ratingState.getRating(data);

    onClose();
  }

  return (
    <div className={styles.modal}>
      <h2 className={styles.modalTitle}>Фильтры</h2>
      {/* <FlushedSelect
        data={genders}
        placeholder="Пол"
        value={selectedGender}
        onChange={setSelectedGender}
      /> */}
      <FlushedSelect
        data={categories}
        placeholder="Категория"
        value={selectedCategory}
        onChange={setSelectedCategory}
        searchable
      />
      <FlushedSelect
        data={districts}
        placeholder="Округ"
        value={selectedDistrict}
        onChange={setSelectedDistrict}
        searchable
      />
      <FlushedSelect
        data={regions}
        placeholder="Регион"
        value={selectedRegion}
        onChange={setSelectedRegion}
      />
      <FlushedSelect
        data={cities}
        placeholder="Город"
        value={selectedCity}
        onChange={setSelectedCity}
        searchable
      />
      <div className={styles.modalButtons}>
        <ParallelogramButton onClick={handleSave}>
          Сохранить
        </ParallelogramButton>
        <ParallelogramButton
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          onClick={onClose}
        >
          Отмена
        </ParallelogramButton>
      </div>
    </div>
  );
});
