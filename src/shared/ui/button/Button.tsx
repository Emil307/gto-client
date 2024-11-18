import React from "react";
import { Button as MButton, ButtonProps } from "@mantine/core";
import styles from "./styles.module.scss";

export const Button: React.FC<
  ButtonProps | React.ComponentPropsWithoutRef<"button">
> = ({ children, ...props }) => {
  return (
    <MButton {...props} classNames={styles}>
      {children}
    </MButton>
  );
};
