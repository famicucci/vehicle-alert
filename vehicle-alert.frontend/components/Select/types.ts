import { SelectHTMLAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
  label?: string;
  invalid?: boolean;
  loadingOptions?: boolean;
  errorMessage?: string | undefined;
}

export interface SelectContainerProps<T extends FieldValues>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
  label?: string;
  loadingOptions?: boolean;
  hideErrorMessage?: boolean;
}
