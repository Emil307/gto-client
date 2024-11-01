"use client";

import React from "react";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import styles from "../../styles/styles.module.scss";
import { FlushedInput } from "@/src/shared/ui/flushedInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import authState from "@/src/entities/auth/store/authState";

interface IFormFileds {
  email: string;
}

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFileds>();

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormFileds> = async (data) => {
    authState.setEmail(data.email);
    router.replace("/auth/signInConfirm");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <FlushedInput
          id="email"
          register={register}
          required
          name="email"
          isInvalid={Boolean(errors.email)}
          type="E-mail"
          placeholder="example@gmail.com"
          label="Ваш e-mail"
        />
      </div>
      <ParallelogramButton type="submit">Получить код</ParallelogramButton>
    </form>
  );
};
