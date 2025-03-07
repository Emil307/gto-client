"use client";

import React from "react";
import Image from "next/image";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StartScreen() {
  const router = useRouter();

  function handleRedirectToSignIn() {
    router.push("/auth/signIn");
  }

  return (
    <div className={styles.page}>
      <Image
        className={styles.img}
        src={"/icons/logo.svg"}
        width={354}
        height={480}
        alt="gto"
        priority={true}
      />
      <div className={styles.buttons}>
        <ParallelogramButton onClick={handleRedirectToSignIn}>
          Войти
        </ParallelogramButton>
        <Link href="/auth/signUp" className={styles.reg}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
