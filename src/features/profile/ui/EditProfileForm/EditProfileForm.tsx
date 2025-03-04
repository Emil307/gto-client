"use client";

import { FlushedInput } from "@/src/shared/ui/flushedInput";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../styles/styles.module.scss";
import datepickerStyles from "../../styles/datepicker/styles.module.scss";
import { FlushedSelect } from "@/src/shared/ui/FlushedSelect";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import {
  getMe,
  getCities,
  getRegions,
  editProfile,
  uploadAvatar,
} from "@/src/entities/profile";
import userState, { genders, IUser } from "@/src/entities/user";
import { observer } from "mobx-react-lite";
import { Loader } from "@/src/shared";
import { useRouter } from "next/navigation";
import { editProfileDto } from "@/src/entities/profile/api";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";

interface IFormFileds {
  name: string;
  surname: string;
  patronymic: string;
  region: string;
  city: string | null;
  age: string;
}

export const EditProfileForm: React.FC = observer(() => {
  const { register, handleSubmit } = useForm<IFormFileds>();

  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(
    userState.user?.sex as string
  );
  const [dob, setDob] = useState<Date | null>(
    userState.user?.birthDate ? new Date(userState.user?.birthDate) : null
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    userState.user?.region as string
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(
    userState.user?.city as string
  );
  const [fileBin, setFileBin] = useState<any>("");
  const [files, setFiles] = useState<any>([]);
  useEffect(() => {
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
    setSelectedGender(String(userState.user?.sex));
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
      setSelectedCity(null);

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

  function fileUploadHandler(event: any) {
    const files = event.target.files;

    setFiles([...event.target.files]);

    const reader = new FileReader();

    reader.readAsText(files[0]);

    reader.onload = function () {
      setFileBin(reader.result);
      console.log(fileBin);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  const onSubmit: SubmitHandler<IFormFileds> = async (data) => {
    data.region = String(selectedRegion);
    data.city = selectedCity;

    const editedProfile: editProfileDto = {
      name: data.name ? data.name : userState.user?.name,
      surname: data.surname ? data.surname : userState.user?.surname,
      patronymic: data.patronymic
        ? data.patronymic
        : userState.user?.patronymic,
      sex: selectedGender ? String(selectedGender) : userState.user?.sex,
      birthDate: dob
        ? new Date(String(dob))
        : new Date(String(userState.user?.birthDate)),
      region: selectedRegion ? String(selectedRegion) : userState.user?.region,
      city: selectedCity ? String(selectedCity) : null,
    };

    uploadAvatar(files[0])
      .then(() => {})
      .catch((e: any) => {
        console.log(e);
      });
    // .finally(() => {
    //   setIsAwait(false);
    // });

    editProfile(editedProfile)
      .then((res) => {
        userState.setUser(res.data);
        router.push("/profile");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <input
          className={styles.fileInput}
          multiple={false}
          id="fileInput"
          type="file"
          onChange={(event) => fileUploadHandler(event)}
          accept={".png, .jpg, .jpeg"}
        />
        <label htmlFor="fileInput" className={styles.uploadAvatar}></label>
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
        <FlushedSelect
          data={genders}
          label="Пол"
          value={selectedGender}
          onChange={setSelectedGender}
        />
        <DatePickerInput
          label="Дата рождения"
          classNames={datepickerStyles}
          value={dob}
          onChange={setDob}
          maxDate={new Date(dayjs().format("YYYY/MM/DD"))}
        />
        <FlushedSelect
          data={regions}
          label="Регион"
          value={selectedRegion}
          onChange={setSelectedRegion}
          searchable
        />
        <FlushedSelect
          data={cities}
          label="Город"
          value={selectedCity}
          onChange={setSelectedCity}
          placeholder="Не выбран"
          searchable
        />
      </div>
      <ParallelogramButton type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : <>Сохранить</>}
      </ParallelogramButton>
    </form>
  );
});
