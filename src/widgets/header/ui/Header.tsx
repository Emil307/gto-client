"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

import React from "react";

interface IHeaderProps {
  title?: string;
}

export const Header: React.FC<IHeaderProps> = ({ title }) => {
  const router = useRouter();

  function handleClickBackButton() {
    router.back();
  }

  return (
    <div className={styles.header}>
      <button onClick={handleClickBackButton}>
        <Image
          src="/icons/arrow-left.svg"
          width={24}
          height={24}
          alt="go back"
        />
      </button>
      {title && <h4 className={styles.title}>{title}</h4>}
      <Image src="/img/logo.png" width={48} height={53} alt="GTO" />
    </div>
  );
};
