"use client";

import { Header } from "@/src/widgets/header";
import styles from "./styles.module.scss";

export function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.page}>
      <Header title="Профиль" />
      {children}
    </div>
  );
}
