"use client";

import { FlushedInput } from "@/src/shared/ui/flushedInput";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../styles/styles.module.scss";
import { FlushedSelect } from "@/src/shared/ui/FlushedSelect";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import {
  getMe,
  getCities,
  getRegions,
  editProfile,
} from "@/src/entities/profile";
import userState, { IUser } from "@/src/entities/user";
import { observer } from "mobx-react-lite";
import { Loader } from "@/src/shared";

interface IFormFileds {
  name: string;
  surname: string;
  patronymic: string;
  region: string;
  city: string;
  age: string;
}

export const EditProfileForm: React.FC = observer(() => {
  const { register, handleSubmit } = useForm<IFormFileds>();

  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    userState.user?.region as string
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(
    userState.user?.city as string
  );

  useEffect(() => {
    if (userState.user) {
      setUser(userState.user);
      return;
    }

    getMe()
      .then((res) => {
        userState.setUser(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setSelectedRegion(String(userState.user?.region));
    setSelectedCity(String(userState.user?.city));
  }, [userState.user]);

  useEffect(() => {
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedRegion && selectedRegion !== "undefined") {
      if (userState.user?.city !== selectedCity) {
        setSelectedCity(null);
      }

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
    data.region = String(selectedRegion);
    data.city = String(selectedCity);

    editProfile(data)
      .then((res) => {
        userState.setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <FlushedInput
          id="surname"
          register={register}
          name="surname"
          label="Фамилия"
          placeholder="Иванов"
          type="text"
          defaultValue={user?.surname}
        />
        <div className={styles.inputsRow}>
          <FlushedInput
            id="name"
            register={register}
            name="name"
            label="Имя"
            placeholder="Иван"
            type="text"
            defaultValue={user?.name}
          />
          <FlushedInput
            id="patronymic"
            register={register}
            name="patronymic"
            label="Отчество"
            placeholder="Иванович"
            type="text"
            defaultValue={user?.patronymic}
          />
        </div>
        <FlushedInput
          id="age"
          register={register}
          name="age"
          label="Возраст"
          placeholder="Не указан"
          type="text"
          defaultValue={user?.age ? user?.age : ""}
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
      <ParallelogramButton type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : <>Сохранить</>}
      </ParallelogramButton>
    </form>
  );
});
