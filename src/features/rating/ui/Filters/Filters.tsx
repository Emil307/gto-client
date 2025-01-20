"use client";

import React from "react";
import styles from "../../styles/styles.module.scss";
import { openModal, useModals } from "@mantine/modals";
import { Modal } from "./Modal";
import ratingState from "@/src/entities/rating/store/ratingState";
import { observer } from "mobx-react-lite";

export const Filters: React.FC = observer(() => {
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
      <span
        style={{
          backgroundColor: ratingState.filters.category_id
            ? "var(--main-red)"
            : "",
        }}
        className={styles.filterName}
      >
        Категории
      </span>
      {/* <span
        style={{
          backgroundColor: ratingState.filters.age ? "var(--main-red)" : "",
        }}
        className={styles.filterName}
      >
        Возраст
      </span> */}
      <span
        style={{
          backgroundColor: ratingState.filters.district
            ? "var(--main-red)"
            : "",
        }}
        className={styles.filterName}
      >
        Округ
      </span>
      <span
        style={{
          backgroundColor: ratingState.filters.region ? "var(--main-red)" : "",
        }}
        className={styles.filterName}
      >
        Регион
      </span>
      <span
        style={{
          backgroundColor: ratingState.filters.city ? "var(--main-red)" : "",
        }}
        className={styles.filterName}
      >
        Город
      </span>
    </button>
  );
});
