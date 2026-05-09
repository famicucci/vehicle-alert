import React from "react";
import { FieldValues, useController } from "react-hook-form";
import Input from "./Input";
import { InputContainerProps } from "./types";

const InputContainer = <T extends FieldValues>({
  type,
  control,
  name,
  label,
  placeholder,
  className,
  ...props
}: InputContainerProps<T>) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Input
      type={type}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      label={label}
      placeholder={placeholder}
      invalid={invalid}
      className={className}
      errorMessage={error?.message}
      {...props}
    />
  );
};

export default InputContainer;
