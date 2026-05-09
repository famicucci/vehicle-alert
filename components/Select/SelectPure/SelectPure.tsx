import React from "react";
import { SelectPureProps } from "./types";

const baseStyles =
  "bg-transparent border-none cursor-pointer focus:outline-none";

const SelectPure = ({
  options,
  className,
  placeholder,
  value,
  ...props
}: SelectPureProps) => {
  const isPlaceholder = value === "" || value === undefined;
  return (
    <select
      className={`${baseStyles} ${isPlaceholder ? "text-gray-400" : "text-inherit"} ${className}`}
      value={value}
      {...props}
    >
      <option value="" hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectPure;
