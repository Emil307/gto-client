import React from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import styles from "./styles.module.scss";

interface ReactHookFormInputProps
  extends Omit<React.ComponentProps<"input">, "ref"> {
  register?: any;
  error?: React.ReactNode;
}

export const FlushedInput: React.FC<
  TextInputProps & ReactHookFormInputProps
> = ({ name, register, required, error, ...props }) => {
  return (
    <>
      {register && (
        <TextInput
          classNames={{
            root: styles.root,
            input: styles.input,
            label: styles.label,
            error: styles.error,
          }}
          {...register(name, {
            required: required,
          })}
          error={error}
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
