"use client";

import React from "react";
import { SignInConfirmForm } from "@/src/features/auth/ui/SignInConfirmForm";
import styles from "../../styles/styles.module.scss";
import { useSearchParams } from "next/navigation";

export const SignInConfirm = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={styles.message}>
          Отправили письмо с кодом для подтверждения на {" "}
          <span className={styles.bold}>{email}</span>
        </p>
        <SignInConfirmForm />
      </div>
    </div>
  );
};
