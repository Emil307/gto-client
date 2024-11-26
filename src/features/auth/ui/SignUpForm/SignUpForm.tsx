"use client";

import React, { useState } from "react";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import styles from "../../styles/styles.module.scss";
import { FlushedInput } from "@/src/shared/ui/flushedInput";
import { SubmitHandler, useForm } from "react-hook-form";
import authState from "@/src/entities/auth/store/authState";
import { validate } from "@/src/entities/auth";

interface IFormFileds {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
}

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<IFormFileds>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormFileds> = async (data) => {
    const newUser = {
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      email: data.email,
      birthDate: "2024-10-30",
      sex: "male",
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
        {error && <span className={styles.error}>{error}</span>}
      </div>
      <ParallelogramButton type="submit">Создать аккаунт</ParallelogramButton>
    </form>
  );
};
