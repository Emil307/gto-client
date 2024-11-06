import React from "react";
import styles from "../styles/styles.module.scss";
import Link from "next/link";
import Image from "next/image";

export const Navbar: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link href="/lk" className={styles.link} style={{ opacity: 1 }}>
        <Image
          src="/icons/home.svg"
          width={24}
          height={24}
          alt="Главная страница"
        />
        <span>Главная</span>
      </Link>
      <Link href="/lk/request" className={styles.request}>
        <div className={styles.link}>
          <Image src="/icons/plus.svg" width={24} height={24} alt="Заявка" />
          <span>Заявка</span>
        </div>
      </Link>
      <Link href="/profile" className={styles.link} style={{ opacity: 0.5 }}>
        {" "}
        <Image src="/icons/profile.svg" width={24} height={24} alt="Профиль" />
        <span>Профиль</span>
      </Link>
    </div>
  );
};
