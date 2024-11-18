"use client";

import React from "react";
import { PrivacyStep, SignUpForm } from "@/src/features/auth";
import Link from "next/link";
import styles from "../../styles/styles.module.scss";
import { observer } from "mobx-react-lite";
import authState from "@/src/entities/auth/store/authState";

export const SignUp = observer(() => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {authState.step === "info" && (
          <>
            <h1 className={styles.title}>Регистрация</h1>
            <SignUpForm />
          </>
        )}
        {authState.step === "privacy" && (
          <>
            <h1 className={styles.title}>Последние шаги</h1>
            <PrivacyStep />
          </>
        )}
      </div>
      <div className={styles.bottom}>
        <span className={styles.another}>или</span>
        <Link href="/auth/signIn" className={styles.reg}>
          Войти в аккаунт
        </Link>
      </div>
    </div>
  );
});
