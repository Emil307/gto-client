import React from "react";
import styles from "../../styles/styles.module.scss";
import Image from "next/image";
import Link from "next/link";

export const Trigger: React.FC = () => {
  return (
    <Link href="/lk/rating" className={styles.container}>
      <Image
        priority={true}
        src="/icons/cup.svg"
        width={24}
        height={24}
        alt="Рейтинг спортсменов"
      />
      <p>Рейтинг спортсменов</p>
    </Link>
  );
};
