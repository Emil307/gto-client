import React from "react";
import { SignInForm } from "@/src/features/auth";
import Link from "next/link";
import styles from "../../styles/styles.module.scss";

export const SignIn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>Вход</h1>
        <SignInForm />
      </div>
      <div className={styles.bottom}>
        <span className={styles.another}>или</span>
        <Link href="/auth/signUp" className={styles.reg}>
          Создать аккаунт
        </Link>
      </div>
    </div>
  );
};
