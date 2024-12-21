import React from "react";
import styles from "../../styles/styles.module.scss";

interface IModalProps {
  onClose: () => void;
}

export const Modal: React.FC<IModalProps> = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      c cjd s <button onClick={onClose}>close</button>
    </div>
  );
};
