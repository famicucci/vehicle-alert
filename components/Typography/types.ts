import { ReactNode } from "react";
import { typographies } from "./availableTypographies";
// export interface TypographyProps {
//   children: string | ReactNode
//   variant: Typographies
//   bold?: boolean
//   className?: string
// }
export type TypographyProps = {
  children: ReactNode;
  variant: keyof typeof typographies;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "success"
    | "warning"
    | "inherit";
  bold?: boolean;
  className?: string;
};

export type Typographies =
  | "h2"
  | "h3"
  | "h5"
  | "body small"
  | "body medium"
  | "body big";
