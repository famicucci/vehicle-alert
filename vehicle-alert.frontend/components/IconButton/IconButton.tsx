import React from "react";
import { ButtonProps } from "./types";

const availableVariants: Record<string, string> = {
  primary:
    "bg-violet-500 border-violet-300 text-white hover:bg-violet-700 hover:border-violet-700",
  secondary:
    "bg-white border-violet-300 text-violet-700 hover:bg-violet-200 hover:border-violet-500",
  tertiary:
    "bg-white border-b-violet-700 text-violet-700 hover:border-b-violet-500 hover:text-violet-500",
};

const disabledStyles: Record<string, string> = {
  primary: "bg-zinc-500 border-zinc-500 text-white cursor-not-allowed",
  secondary: "bg-white border-zinc-500 text-zinc-500 cursor-not-allowed",
  tertiary: "bg-white border-b-zinc-500 text-zinc-500 cursor-not-allowed",
};

const availableSizes: Record<string, string> = {
  small: "rounded-[25%] p-2",
  medium: "rounded-[25%] p-4",
  big: "rounded-[25%] p-10",
};

const IconButton: React.FC<ButtonProps> = ({
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
      className={`font-[Figtree] font-semibold border transition-colors 
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

export default IconButton;
