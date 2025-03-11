"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authState from "@/src/entities/auth/store/authState";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import styles from "../../styles/styles.module.scss";
import { Checkbox } from "@mantine/core";
import Link from "next/link";
import { getRegistrationDocument } from "@/src/entities/documnets";
import { Loader } from "@/src/shared";
import * as Sentry from "@sentry/nextjs";

export const PrivacyStep: React.FC = () => {
  const router = useRouter();
  const [firstChecked, setFirstChecked] = useState<boolean>(true);
  const [secondChecked, setSecondChecked] = useState<boolean>(true);
  const [document, setDocument] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    getRegistrationDocument()
      .then((res) => {
        setDocument(res.data.pdf);
      })
      .catch((e) => {
        console.log(e);
        Sentry.captureException(e);
      });
  }, []);

  function handleConfirm() {
    if (!firstChecked || !secondChecked) {
      return;
    }

    if (authState.registerDto) {
      setIsLoading(true);
      authState
        .registration(authState.registerDto)
        .then(() => {
          router.replace(
            `/auth/signInConfirm?email=${authState.registerDto?.email.toLowerCase()}`
          );
        })
        .finally(() => {
          setIsLoading(false);
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
          style={{ color: "var(--main-white)" }}
        />
        <Checkbox
          checked={secondChecked}
          onChange={(event) => setSecondChecked(event.currentTarget.checked)}
          label={
            <>
              Соглашаюсь с условиями{" "}
              <Link
                href={`/pdf?url=${API}${document}`}
                style={{ textDecoration: "underline" }}
              >
                Пользовательского соглашения
              </Link>
            </>
          }
          style={{ color: "var(--main-white)" }}
        />
      </div>
      <div className={styles.privacyBottom}>
        <ParallelogramButton onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? <Loader /> : <>Продолжить</>}
        </ParallelogramButton>
      </div>
    </form>
  );
};
