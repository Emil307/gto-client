import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.scss";
import Image from "next/image";
import { Button } from "@/src/shared";
import { getCateriesDocument } from "@/src/entities/documnets";

export const Event: React.FC = () => {
  const [document, setDocument] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    handleGetDocuments();
  }, []);

  function handleGetDocuments() {
    getCateriesDocument()
      .then((res) => {
        setDocument(res.data.pdf);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <Image
          priority={true}
          src="/icons/event-logo.svg"
          width={100}
          height={24}
          alt="event logo"
        />
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <div className={styles.dates}>17 февраля – 31 марта 2025</div>
            <h3 className={styles.title}>Народные Игры ГТО. Сезон 2</h3>
          </div>
          <div className={styles.buttons}>
            <a href={`${API}${document}`}>
              <Button>Положение</Button>
            </a>
            <Button>Категории</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
