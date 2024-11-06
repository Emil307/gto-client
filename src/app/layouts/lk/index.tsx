import styles from "./styles.module.scss";

export function LkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.page}>{children}</div>;
}
