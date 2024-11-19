"use client";

import React, { useState } from "react";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import styles from "../../styles/styles.module.scss";
import { FlushedInput } from "@/src/shared/ui/flushedInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { requestEmailVerificationCode } from "@/src/entities/auth";
import { Loader } from "@/src/shared";

interface IFormFileds {
  email: string;
}

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFileds>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormFileds> = async (data) => {
    setIsLoading(true);
    requestEmailVerificationCode(data.email)
      .then(() => {
        router.push(`/auth/signInConfirm?email=${data.email}`);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <ParallelogramButton type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : <>Получить код</>}
      </ParallelogramButton>
    </form>
  );
};
