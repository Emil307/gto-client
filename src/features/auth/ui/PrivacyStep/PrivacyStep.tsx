"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import authState from "@/src/entities/auth/store/authState";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import styles from "../../styles/styles.module.scss";
import { Checkbox } from "@mantine/core";

export const PrivacyStep: React.FC = () => {
  const router = useRouter();
  const [firstChecked, setFirstChecked] = useState<boolean>(true);
  const [secondChecked, setSecondChecked] = useState<boolean>(true);

  function handleConfirm() {
    if (!firstChecked || !secondChecked) {
      return;
    }
    if (authState.registerDto) {
      authState.registration(authState.registerDto).then(() => {
        router.replace(
          `/auth/signInConfirm?email=${authState.registerDto?.email.toLowerCase()}`
        );
      });
    }
  }

  return (
    <form className={styles.form}>
      <div className={styles.checkboxes}>
        <Checkbox
          checked={firstChecked}
          onChange={(event) => setFirstChecked(event.currentTarget.checked)}
          label="Подтверждаю, что предоставленные мной сведения являются достоверными"
        />
        <Checkbox
          checked={secondChecked}
          onChange={(event) => setSecondChecked(event.currentTarget.checked)}
          label="Даю согласие на сбор и обработку персональных данных*"
        />
      </div>
      <div className={styles.privacyBottom}>
        <ParallelogramButton onClick={handleConfirm}>
          Продолжить
        </ParallelogramButton>
        <div>
          <p className={styles.credits}>
            Нажимая «Продолжить», вы соглашаетесь с условиями
            <br />
            <a>Пользовательского соглашения</a>
          </p>
        </div>
      </div>
    </form>
  );
};
