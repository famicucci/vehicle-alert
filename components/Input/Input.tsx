"use client";
import React from "react";
import { InputProps } from "./types";
import { HelperText } from "../HelperText";

const styles = {
  container: "border border-gray-300 rounded-lg bg-white px-4 py-3.5",
  input: "w-full border-none outline-none text-base font-normal font-sans placeholder:text-gray-400",
  invalid: "border border-error",
  focused: "border border-primary",
};

const Input = ({
  invalid,
  className,
  errorMessage,
  inputClassName,
  rightElement,
  ...props
}: InputProps) => {
  return (
    <div className={`${className}`}>
      <div className={`${styles.container} ${invalid ? styles.invalid : ""} flex items-center`}>
        <input
          className={`${styles.input} ${inputClassName ?? ''}`}
          {...props}
        />
        {rightElement && (
          <div className="ml-2 shrink-0 flex items-center">{rightElement}</div>
        )}
      </div>
      <HelperText color="error" className="mt-1">{errorMessage}</HelperText>
    </div>
  );
};

export default Input;
