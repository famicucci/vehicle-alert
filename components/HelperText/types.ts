import { ReactNode } from "react";

export interface HelperTextProps {
  children: ReactNode;
  color?: "default" | "error" | "success";
  className?: string;
}
