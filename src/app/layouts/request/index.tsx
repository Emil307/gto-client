import { Header } from "@/src/widgets/header";
import styles from "./styles.module.scss";

export function RequestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.page}>
      <Header title="Новая заявка" />
      {children}
    </div>
  );
}
