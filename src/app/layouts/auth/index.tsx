import { Header } from "@/src/widgets/header";
import styles from "./styles.module.scss";

export function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.page}>
      <Header />
      {children}
    </div>
  );
}
