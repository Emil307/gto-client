import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.scss";
import Image from "next/image";
import { Button } from "@/src/shared";
import {
  getCateriesDocument,
  getParticipationDocument,
} from "@/src/entities/documnets";
import Link from "next/link";

export const Event: React.FC = () => {
  const [categoriesDocument, setCategoriesDocument] = useState("");
  const [positionDocument, setPositionDocument] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    handleGetDocuments();
  }, []);

  function handleGetDocuments() {
    getParticipationDocument()
      .then((res) => {
        setPositionDocument(res.data.pdf);
      })
      .catch((e) => {
        console.log(e);
      });
    getCateriesDocument()
      .then((res) => {
        setCategoriesDocument(res.data.pdf);
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
            <Link href={`/pdf?url=${API}${positionDocument}`}>
              <Button>Положение</Button>
            </Link>
            <Link href={`/pdf?url=${API}${categoriesDocument}`}>
              <Button>Категории</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
