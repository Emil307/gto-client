"use client";

import React from "react";
import styles from "../../styles/styles.module.scss";
import { ProfileInfo } from "@/src/features/profile";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import authState from "@/src/entities/auth/store/authState";
import { useRouter } from "next/navigation";

export const Profile: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <ProfileInfo />
      <div className={styles.buttons}>
        <ParallelogramButton onClick={() => authState.logout(router)}>
          Выход
        </ParallelogramButton>
      </div>
    </div>
  );
};
