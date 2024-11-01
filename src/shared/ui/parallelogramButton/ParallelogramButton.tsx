import React from "react";
import { Button, ButtonProps } from "@mantine/core";
import styles from "./styles.module.scss";

export const ParallelogramButton: React.FC<
  ButtonProps | React.ComponentPropsWithoutRef<"button">
> = ({ children, ...props }) => {
  return (
    <Button {...props} classNames={styles}>
      {children}
    </Button>
  );
};
