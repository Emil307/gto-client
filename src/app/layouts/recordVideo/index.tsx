"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function RecordVideoLayout({
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
      <button onClick={handleClickBackButton} className={styles.back}>
        <Image
          src="/icons/arrow-left.svg"
          width={24}
          height={24}
          priority={true}
          alt="go back"
        />
      </button>
      {children}
    </div>
  );
}
