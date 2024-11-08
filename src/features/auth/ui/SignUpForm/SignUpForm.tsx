"use client";

import React from "react";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import styles from "../../styles/styles.module.scss";
import { FlushedInput } from "@/src/shared/ui/flushedInput";
import { SubmitHandler, useForm } from "react-hook-form";
import authState from "@/src/entities/auth/store/authState";

interface IFormFileds {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
}

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFileds>();

  const onSubmit: SubmitHandler<IFormFileds> = async (data) => {
    const newUser = {
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      email: data.email,
      birthDate: "2024-10-30",
      sex: "male",
    };

    authState.setRegisterDto(newUser);
    authState.setStep("privacy");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <FlushedInput
          id="surname"
          register={register}
          required
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
            required
            name="name"
            isInvalid={Boolean(errors.name)}
            label="Имя"
            placeholder="Иван"
            type="text"
          />
          <FlushedInput
            id="patronymic"
            register={register}
            required
            name="patronymic"
            isInvalid={Boolean(errors.patronymic)}
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
          isInvalid={Boolean(errors.email)}
          label="E-mail"
          placeholder="example@gmail.com"
          type="E-mail"
        />
      </div>
      <ParallelogramButton type="submit">Создать аккаунт</ParallelogramButton>
    </form>
  );
};
