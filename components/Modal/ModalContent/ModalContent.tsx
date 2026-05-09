import React from "react";
import { ModalContentProps } from "./types";

const ModalContent = ({ children, className }: ModalContentProps) => {
  return <div className={`px-4 py-6 ${className}`}>{children}</div>;
};

export default ModalContent;
