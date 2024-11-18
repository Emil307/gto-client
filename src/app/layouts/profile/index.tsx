"use client";

import styles from "./styles.module.scss";

export function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.page}>{children}</div>;
}
