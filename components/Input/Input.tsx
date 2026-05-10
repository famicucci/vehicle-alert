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
          <div className="pr-3 shrink-0">{rightElement}</div>
        )}
      </div>
      <HelperText color="error" className="mt-1">{errorMessage}</HelperText>
    </div>
  );
};

export default Input;
