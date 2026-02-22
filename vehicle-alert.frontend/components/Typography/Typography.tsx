import React from "react";
import { typographies } from "./availableTypographies";
import { TypographyProps } from "./types";
import { availableColors } from "./availableColors";

const Typography = ({
  children,
  variant,
  color = "inherit",
  bold = false,
  className,
}: TypographyProps) => {
  const Tag = typographies[variant].tag;
  const font = typographies[variant].styles;

  return React.createElement(
    Tag,
    {
      className: `${font} ${bold ? "font-bold" : ""} ${
        color ? availableColors[color] : ""
      } ${className || ""}`.trim(),
    },
    children
  );
};

export default Typography;
