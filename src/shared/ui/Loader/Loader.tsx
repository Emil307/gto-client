import React from "react";
import styles from "./styles.module.scss";

interface LoaderProps {
  width?: string;
  height?: string;
}

export const Loader: React.FC<LoaderProps> = ({ width, height }) => {
  return <span className={styles.span} style={{ width, height }}></span>;
};
