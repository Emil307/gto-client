import React from "react";
import styles from "../../styles/styles.module.scss";
import Image from "next/image";
import toast from "react-hot-toast";

export const Trigger: React.FC = () => {
  return (
    <button
      onClick={() => toast("Рейтинг будет доступен после окончания судейства")}
      className={styles.container}
    >
      <Image
        priority={true}
        src="/icons/cup.svg"
        width={24}
        height={24}
        alt="Рейтинг атлетов"
      />
      <p>Рейтинг атлетов</p>
    </button>
  );
};
