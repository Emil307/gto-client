"use client";

import React from "react";
import { SignInConfirmForm } from "@/src/features/auth/ui/SignInConfirmForm";
import styles from "../../styles/styles.module.scss";
import authState from "@/src/entities/auth/store/authState";
import { observer } from "mobx-react-lite";

export const SignInConfirm = observer(() => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={styles.message}>
          Отправили письмо с кодом для подтверждения на {" "}
          <span className={styles.bold}>{authState.email}</span>
        </p>
        <SignInConfirmForm />
      </div>
    </div>
  );
});
