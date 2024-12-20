import React from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import styles from "./styles.module.scss";

export interface ISearchInputProps extends Omit<TextInputProps, "value"> {
  value: string;
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  onChange,
  ...rest
}) => {
  return (
    <TextInput
      {...rest}
      value={value}
      onChange={onChange}
      classNames={styles}
    />
  );
};
