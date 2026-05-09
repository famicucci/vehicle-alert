type Size = "small" | "medium" | "big";

interface PrimarySecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullwidth?: boolean;
  size?: Size;
}

interface TertiaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "tertiary";
  fullwidth?: false;
  size?: Size;
}

export type ButtonProps = PrimarySecondaryButtonProps | TertiaryButtonProps;
