import React from "react";
import { SignUpForm } from "@/src/features/auth";
import Link from "next/link";
import styles from "../../styles/styles.module.scss";

export const SignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>Регистрация</h1>
        <SignUpForm />
      </div>
      <div className={styles.bottom}>
        <span className={styles.another}>или</span>
        <Link href="/auth/signIn" className={styles.reg}>
          Войти в аккаунт
        </Link>
      </div>
    </div>
  );
};
