import React from "react";
import { ModalHeaderProps } from "./types";
import { IconButton } from "../../IconButton";
import { X } from "react-feather";

const ModalHeader = ({ children, onClose }: ModalHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center border-b border-gray-200 p-3 md:px-6 md:py-5">
      {children}
      {onClose && (
        <IconButton
          variant="secondary"
          size="small"
          className="ml-5"
          onClick={onClose}
        >
          <X size={20} />
        </IconButton>
      )}
    </div>
  );
};

export default ModalHeader;
