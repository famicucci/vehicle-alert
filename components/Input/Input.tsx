"use client";
import React from "react";
import { InputProps } from "./types";
import { HelperText } from "../HelperText";

const styles = {
  container: "border border-gray-300 rounded-lg bg-white",
  input: "w-full px-4 py-3.5 border-none outline-none text-base font-normal font-sans placeholder:text-gray-400",
  invalid: "border border-error",
  focused: "border border-primary",
};

const Input = ({
  invalid,
  className,
  errorMessage,
  inputClassName,
  ...props
}: InputProps) => {
  return (
    <div className={`${className}`}>
      <div className={`${styles.container} ${invalid ? styles.invalid : ""}`}>
        <input
          className={`${styles.input} ${inputClassName ?? ''}`}
          {...props}
        />
      </div>
      <HelperText color="error">{errorMessage}</HelperText>
    </div>
  );
};

export default Input;
