import React from "react";
import { SelectPureProps } from "./types";

const styles =
  "bg-transparent border-none text-inherit cursor-pointer focus:outline-none";

const SelectPure = ({
  options,
  className,
  placeholder,
  ...props
}: SelectPureProps) => {
  return (
    <select className={`${styles} ${className}`} {...props}>
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
