import { SelectHTMLAttributes } from "react";

export interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectPureProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
}
