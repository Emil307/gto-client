import React from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import styles from "./styles.module.scss";

interface ReactHookFormInputProps
  extends Omit<React.ComponentProps<"input">, "ref"> {
  isInvalid?: boolean;
  register?: any;
}

export const FlushedInput: React.FC<
  TextInputProps & ReactHookFormInputProps
> = ({ name, register, isInvalid, required, ...props }) => {
  return (
    <>
      {register && (
        <TextInput
          classNames={{
            root: styles.root,
            input: styles.input,
            label: styles.label,
          }}
          {...register(name, {
            required: required,
          })}
          error={isInvalid}
          {...props}
        />
      )}
      {!register && (
        <TextInput
          classNames={{
            root: styles.root,
            input: styles.input,
            label: styles.label,
          }}
          {...props}
        />
      )}
    </>
  );
};
