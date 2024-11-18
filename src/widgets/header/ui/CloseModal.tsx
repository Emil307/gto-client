"use client";

import React from "react";
import styles from "./styles.module.scss";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import { useRouter } from "next/navigation";

interface ICloseModalProps {
  onClose: () => void;
}

export const CloseModal: React.FC<ICloseModalProps> = ({ onClose }) => {
  const router = useRouter();

  function handleConfirm() {
    router.back();
  }

  return (
    <div className={styles.modal}>
      <h2 className={styles.modalTitle}>Вы точно хотите выйти?</h2>
      <p className={styles.modalText}>Вы точно хотите выйти?</p>
      <ParallelogramButton onClick={handleConfirm}>Выйти</ParallelogramButton>
      <ParallelogramButton onClick={onClose}>Остаться</ParallelogramButton>
    </div>
  );
};
