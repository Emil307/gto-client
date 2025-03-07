"use client";

import React, { useEffect, useState } from "react";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import styles from "../../styles/styles.module.scss";
import { FlushedInput } from "@/src/shared/ui/flushedInput";
import { SubmitHandler, useForm } from "react-hook-form";
import authState from "@/src/entities/auth/store/authState";
import { validate } from "@/src/entities/auth";
import { FlushedSelect } from "@/src/shared";
import { genders } from "@/src/entities/user";
import { DatePickerInput } from "@mantine/dates";
import datepickerStyles from "../../styles/datepicker/styles.module.scss";
import dayjs from "dayjs";
import { Checkbox } from "@mantine/core";
import { getRegistrationDocument } from "@/src/entities/documnets";
import Link from "next/link";

interface IFormFileds {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
}

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<IFormFileds>();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [dob, setDob] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [acceptProccessing, setAcceptProccessing] = useState<boolean>(false);
  const [document, setDocument] = useState("");
  const [isCreateDisabled, setIsCreateDisabled] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    getRegistrationDocument()
      .then((res) => {
        setDocument(res.data.pdf);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (selectedGender && acceptProccessing && dob) {
      setIsCreateDisabled(false);
      return;
    }
    setIsCreateDisabled(true);
    return;
  }, [selectedGender, dob, acceptProccessing]);

  const onSubmit: SubmitHandler<IFormFileds> = async (data) => {
    if (!dob) {
      setError("Укажите дату рождения");
      return;
    }

    if (!selectedGender) {
      setError("Выберите пол");
      return;
    }

    const newUser = {
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      email: data.email.toLowerCase(),
      birthDate: new Date(String(dob)),
      sex: selectedGender,
    };

    validate(newUser)
      .then(() => {
        authState.setRegisterDto(newUser);
        authState.setStep("privacy");
      })
      .catch((error) => {
        if (!error.response) {
          setError("Ошибка сервера");
        } else if (!error.response.data) {
          setError("Неизвестная ошибка");
        } else {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <FlushedInput
          id="surname"
          register={register}
          required
          name="surname"
          label="Фамилия"
          placeholder="Иванов"
          type="text"
        />
        <div className={styles.inputsRow}>
          <FlushedInput
            id="name"
            register={register}
            required
            name="name"
            label="Имя"
            placeholder="Иван"
            type="text"
          />
          <FlushedInput
            id="patronymic"
            register={register}
            name="patronymic"
            label="Отчество"
            placeholder="Иванович"
            type="text"
          />
        </div>
        <FlushedInput
          id="email"
          register={register}
          required
          name="email"
          label="E-mail"
          placeholder="example@gmail.com"
          type="E-mail"
        />
        <DatePickerInput
          placeholder="Не указана"
          label="Дата рождения"
          classNames={datepickerStyles}
          value={dob}
          onChange={setDob}
          maxDate={new Date(dayjs().format("YYYY/MM/DD"))}
        />
        <FlushedSelect
          placeholder="Не выбрано"
          data={genders}
          label="Пол"
          value={selectedGender}
          onChange={setSelectedGender}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
      <div className={styles.documents}>
        <Checkbox
          checked={acceptProccessing}
          onChange={(event) =>
            setAcceptProccessing(event.currentTarget.checked)
          }
          label=""
          style={{ color: "var(--main-white)" }}
        />
        <p>
          <Link href={`/pdf?url=${API}${document}&origin=/auth/signUp`}>
            Согласен с пользовательским соглашением
          </Link>
        </p>
      </div>
      <ParallelogramButton type="submit" disabled={isCreateDisabled}>
        Создать аккаунт
      </ParallelogramButton>
    </form>
  );
};
