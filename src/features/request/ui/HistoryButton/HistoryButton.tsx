import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";

export const HistoryButton: React.FC = () => {
  return (
    <Link href="/lk/history" className={styles.container}>
      <Image
        priority={true}
        src="/icons/history.svg"
        width={24}
        height={24}
        alt="История заявок"
      />
      <p>Моя история заявок</p>
    </Link>
  );
};
