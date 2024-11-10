"use client";

import { FlushedInput } from "@/src/shared/ui/flushedInput";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../styles/styles.module.scss";
import { FlushedSelect } from "@/src/shared/ui/FlushedSelect";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import { getCities, getRegions } from "@/src/entities/profile";

interface IFormFileds {
  name: string;
  surname: string;
  patronymic: string;
  gender: string;
  sex: number;
  birthDate: string;
  region: string;
  city: string;
  age: string;
}

export const EditProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFileds>();

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>("");
  const [selectedCity, setSelectedCity] = useState<string | null>("");

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (selectedRegion) {
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

  const onSubmit: SubmitHandler<IFormFileds> = async (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {" "}
      <div className={styles.inputs}>
        <FlushedInput
          id="surname"
          register={register}
          name="surname"
          isInvalid={Boolean(errors.surname)}
          label="Фамилия"
          placeholder="Иванов"
          type="text"
        />
        <div className={styles.inputsRow}>
          <FlushedInput
            id="name"
            register={register}
            name="name"
            isInvalid={Boolean(errors.name)}
            label="Имя"
            placeholder="Иван"
            type="text"
          />
          <FlushedInput
            id="patronymic"
            register={register}
            name="patronymic"
            isInvalid={Boolean(errors.patronymic)}
            label="Отчество"
            placeholder="Иванович"
            type="text"
          />
        </div>
        {/* <FlushedSelect data={["Мужской", "Женский", "Не выбран"]} label="Пол" /> */}
        <FlushedInput
          id="age"
          register={register}
          name="age"
          isInvalid={Boolean(errors.age)}
          label="Возраст"
          placeholder="18"
          type="text"
        />
        <FlushedSelect
          data={regions}
          label="Регион"
          value={selectedRegion}
          onChange={setSelectedRegion}
        />
        <FlushedSelect
          data={cities}
          label="Город"
          value={selectedCity}
          onChange={setSelectedCity}
        />
      </div>
      <ParallelogramButton>Сохранить</ParallelogramButton>
    </form>
  );
};
