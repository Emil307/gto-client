"use client";

import React, { useEffect, useState } from "react";
import { FlushedInput } from "@/src/shared/ui/flushedInput";
import styles from "../../styles/styles.module.scss";
import { useForm } from "react-hook-form";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import authState from "@/src/entities/auth/store/authState";
import { useRouter, useSearchParams } from "next/navigation";
import { requestEmailVerificationCode } from "@/src/entities/auth";

interface IFormFileds {
  code: string;
}

export const SignInConfirmForm: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<IFormFileds>();

  const [timeToRequestNewCode, setTimeToRequestNewCode] = useState(15);

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = String(searchParams.get("email"));

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.code?.length === 4) {
        authState.login({ email: email, code: Number(value.code) }, router);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  function handleGetNewCode() {
    requestEmailVerificationCode(email)
      .then(() => {
        setTimeToRequestNewCode(15);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function second() {
    setTimeout(() => {
      setTimeToRequestNewCode(timeToRequestNewCode - 1);
    }, 1000);
  }

  useEffect(() => {
    if (timeToRequestNewCode > 0) {
      second();
    }
  }, [timeToRequestNewCode]);

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <FlushedInput
          id="code"
          register={register}
          required
          name="code"
          isInvalid={Boolean(errors.code)}
          label="Код в письме"
        />
      </div>
      <div className={styles.bottom}>
        <ParallelogramButton
          disabled={Boolean(timeToRequestNewCode)}
          onClick={handleGetNewCode}
        >
          Запросить снова
        </ParallelogramButton>
        {timeToRequestNewCode > 0 && (
          <span className={styles.timer}>{timeToRequestNewCode} c</span>
        )}
      </div>
    </form>
  );
};
