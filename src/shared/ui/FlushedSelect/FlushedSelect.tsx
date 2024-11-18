import React, { Dispatch, SetStateAction } from "react";
import { Select, SelectProps } from "@mantine/core";
import styles from "./styles.module.scss";
import Image from "next/image";

interface IFlushedInputProps extends SelectProps {
  value: string | null;
  onChange: Dispatch<SetStateAction<string | null>>;
}

export const FlushedSelect: React.FC<IFlushedInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      withCheckIcon={false}
      allowDeselect={false}
      label={props.label}
      placeholder={props.placeholder}
      data={props.data}
      classNames={styles}
      rightSection={
        <Image
          src={"/icons/arrow-down.svg"}
          width={24}
          height={24}
          alt="open"
        />
      }
    />
  );
};
