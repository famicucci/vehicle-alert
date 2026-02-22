import React from "react";
import { HelperTextProps } from "./types";
import { Typography } from "../Typography";
import { availableColors } from "./utils";

const HelperText = ({ children, color, className }: HelperTextProps) => {
  return (
    <Typography
      variant="body small"
      className={`${className} ${availableColors[color || "default"]}`}
    >
      {children}
    </Typography>
  );
};

export default HelperText;
