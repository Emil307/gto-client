"use client";

import React from "react";
import styles from "../../styles/styles.module.scss";
import { closeModal, openModal } from "@mantine/modals";
import { Modal } from "./Modal";

export const Filters: React.FC = () => {
  const handleClose = () => closeModal("FILTERS");

  function handleOpenModal() {
    openModal({
      id: "FILTERS",
      withCloseButton: false,
      centered: true,
      children: <Modal onClose={handleClose} />,
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
