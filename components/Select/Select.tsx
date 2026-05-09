import React from "react";
import { SelectProps } from "./types";
import SelectPure from "./SelectPure/SelectPure";
import { HelperText } from "../HelperText";

const styles = {
  container: "border border-gray-300 rounded-lg bg-white",
  select:
    "w-full px-4 py-3.5 appearance-none bg-transparent text-base font-normal font-sans",
  loading: "pl-12",
  invalid: "border border-error",
};

const Select = ({
  options,
  className,
  invalid,
  loadingOptions,
  errorMessage,
  ...props
}: SelectProps) => {
  return loadingOptions ? (
    <div className={`${className}`}>
      <div
        className={`${styles.container} ${
          invalid ? styles.invalid : ""
        } flex items-center`}
      >
        <span className="w-full p-3 text-sm font-normal leading-[120%] font-sans text-gray-400 select-none">
          Cargando...
        </span>
      </div>
    </div>
  ) : (
    <div className={`${className}`}>
      <div className={`${styles.container} ${invalid && styles.invalid}`}>
        <SelectPure options={options} {...props} className={styles.select} />
      </div>
      <HelperText color="error">{errorMessage}</HelperText>
    </div>
  );
};

export default Select;
