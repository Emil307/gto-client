"use client";

import React, { useEffect, useState } from "react";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import styles from "../../styles/styles.module.scss";
import { FlushedInput } from "@/src/shared/ui/flushedInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { requestEmailVerificationCode } from "@/src/entities/auth";
import { Loader } from "@/src/shared";
import * as Sentry from "@sentry/nextjs";

interface IFormFileds {
  email: string;
}

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormFileds>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const { unsubscribe } = watch(() => {
      setError(null);
    });
    return () => unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<IFormFileds> = async (data) => {
    setIsLoading(true);
    requestEmailVerificationCode(data.email.toLocaleLowerCase())
      .then(() => {
        router.push(`/auth/signInConfirm?email=${data.email.toLowerCase()}`);
      })
      .catch((error) => {
        if (error.status === 404) {
          setError("Пользователь с таким E-mail не найден");
        } else {
          Sentry.captureException(error);
        }
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
          type="E-mail"
          placeholder="example@gmail.com"
          label="Ваш e-mail"
          error={errors.email?.message || error}
        />
      </div>
      <ParallelogramButton
        type="submit"
        disabled={isLoading || Boolean(errors.email) || Boolean(error)}
      >
        {isLoading ? <Loader /> : <>Получить код</>}
      </ParallelogramButton>
    </form>
  );
};
