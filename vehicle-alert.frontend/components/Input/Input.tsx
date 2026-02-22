"use client";
import React from "react";
import { InputProps } from "./types";
import { HelperText } from "../HelperText";

const styles = {
  container: "border border-gray-300 rounded-lg p-2 bg-white",
  input: "w-full border-none outline-none",
  placeholder: "text-sm font-normal leading-[120%] font-sans",
  invalid: "border border-orange-500",
  focused: "border border-blue-300",
};

const Input = ({
  label,
  invalid,
  className,
  errorMessage,
  inputClassName,
  ...props
}: InputProps) => {
  return (
    <div className={`${className}`}>
      <div className={`${styles.container}`}>
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
