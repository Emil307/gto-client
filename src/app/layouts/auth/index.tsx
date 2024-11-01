"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

export function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  function handleClickBackButton() {
    router.back();
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button onClick={handleClickBackButton}>
          <Image
            src="/icons/arrow-left.svg"
            width={24}
            height={24}
            alt="go back"
          />
        </button>
        <Image src="/img/logo.png" width={48} height={53} alt="GTO" />
      </div>
      {children}
    </div>
  );
}
