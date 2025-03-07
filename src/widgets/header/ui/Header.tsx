"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { closeModal, openModal } from "@mantine/modals";
import { CloseModal } from "./CloseModal";

import React from "react";

interface IHeaderProps {
  title?: string;
  confirmClose?: boolean;
  backButtonLink?: string;
}

export const Header: React.FC<IHeaderProps> = ({
  title,
  confirmClose,
  backButtonLink,
}) => {
  const router = useRouter();

  const handleClose = () => closeModal("DELETE_ADVANTAGE");

  function handleConfirmClose() {
    openModal({
      id: "DELETE_ADVANTAGE",
      withCloseButton: false,
      centered: true,
      children: <CloseModal onClose={handleClose} />,
    });
  }

  function handleClickBackButton() {
    if (confirmClose) {
      handleConfirmClose();
      return;
    }
    if (backButtonLink) {
      router.push(backButtonLink);
    }
    if (!backButtonLink) {
      router.back();
    }
  }

  return (
    <div className={styles.header}>
      <button onClick={handleClickBackButton}>
        <Image
          src="/icons/arrow-left.svg"
          width={24}
          height={24}
          priority={true}
          alt="go back"
        />
      </button>
      {title && <h4 className={styles.title}>{title}</h4>}
      <Image
        src="/img/logo.png"
        width={36}
        height={38}
        alt="GTO"
        priority={true}
      />
    </div>
  );
};
