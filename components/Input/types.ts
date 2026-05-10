import { Control, FieldValues, Path } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
  placeholder?: string;
  errorMessage?: string;
  inputClassName?: string;
  rightElement?: React.ReactNode;
}

export interface InputContainerProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  rightElement?: React.ReactNode;
}
