import React from "react";
import Select from "./Select";
import { SelectContainerProps } from "./types";
import { FieldValues, useController } from "react-hook-form";

const SelectContainer = <T extends FieldValues>({
  name,
  control,
  options,
  className,
  label,
  loadingOptions = false,
  hideErrorMessage,
  ...props
}: SelectContainerProps<T>) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Select
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      label={label}
      invalid={!hideErrorMessage && invalid}
      className={className}
      options={options}
      loadingOptions={loadingOptions}
      errorMessage={!hideErrorMessage ? error?.message : undefined}
      {...props}
    />
  );
};

export default SelectContainer;
