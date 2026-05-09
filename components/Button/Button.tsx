import React from "react";
import { ButtonProps } from "./types";

const availableVariants: Record<string, string> = {
  primary:
    "bg-primary border-primary text-white hover:bg-primary-hover hover:border-primary-hover",
  secondary:
    "bg-white border-secondary text-primary hover:bg-secondary-hover hover:border-primary",
  tertiary:
    "bg-white border-b-primary text-primary hover:border-b-primary-hover hover:text-primary-hover",
};

const disabledStyles: Record<string, string> = {
  primary: "bg-zinc-500 border-zinc-500 text-white cursor-not-allowed",
  secondary: "bg-white border-zinc-500 text-zinc-500 cursor-not-allowed",
  tertiary: "bg-white border-b-zinc-500 text-zinc-500 cursor-not-allowed",
};

const availableSizes: Record<string, string> = {
  small: "text-[14px] leading-[16px] rounded-[25px] py-[11px] px-[16px]",
  medium: "text-[16px] leading-[18px] rounded-[25px] py-[12px] px-[24px]",
  big: "text-[18px] leading-[24px] rounded-[34px] py-[16px] px-[32px]",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullwidth = false,
  size = "medium",
  className = "",
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`font-sans font-semibold border transition-colors 
        ${fullwidth && variant !== "tertiary" ? "w-full" : ""}
        ${disabled ? disabledStyles[variant] : availableVariants[variant]}
        ${availableSizes[size]}
        ${className} cursor-pointer`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
