"use client";

import React from "react";
import styles from "../../styles/styles.module.scss";
import { openModal, useModals } from "@mantine/modals";
import { Modal } from "./Modal";

export const Filters: React.FC = () => {
  const modals = useModals();

  function handleOpenModal() {
    openModal({
      modalId: "FILTERS",
      withCloseButton: false,
      centered: true,
      children: (
        <Modal
          onClose={() => {
            modals.closeModal("FILTERS");
          }}
        />
      ),
    });
  }

  return (
    <button onClick={handleOpenModal} className={styles.popupTrigger}>
      <span className={styles.filterName}>Категории</span>
      <span className={styles.filterName}>Возраст</span>
      <span className={styles.filterName}>Округ</span>
      <span className={styles.filterName}>Регион</span>
      <span className={styles.filterName}>Город</span>
    </button>
  );
};
