"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.scss";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import authState from "@/src/entities/auth/store/authState";
import { useRouter, useSearchParams } from "next/navigation";
import { requestEmailVerificationCode } from "@/src/entities/auth";
import { PinInput } from "@mantine/core";

export const SignInConfirmForm: React.FC = () => {
  const [code, setCode] = useState("");
  const [timeToRequestNewCode, setTimeToRequestNewCode] = useState(15);

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = String(searchParams.get("email"));

  useEffect(() => {
    if (code.length === 4) {
      authState.login({ email: email, code: Number(code) }, router);
    }
  }, [code]);

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
        <PinInput
          value={code}
          onChange={setCode}
          placeholder=""
          type="number"
          classNames={{
            root: styles.root,
            pinInput: styles.pinInput,
            input: styles.input,
          }}
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
