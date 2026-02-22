import React from "react";
import { ModalProps } from "./types";

const Modal = ({
  children,
  isOpen,
  position = "center",
  fullWidth,
  fullScreen,
  className,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <dialog
      open
      className="bg-transparent border-none max-w-[100dvh] overflow-hidden fixed inset-0 z-[9999]"
    >
      <div
        className={`fixed inset-0 bg-black/50 ${
          position === "center" ? "flex items-center justify-center" : ""
        }`}
      >
        <div
          className={`flex flex-col bg-white shadow-md rounded-lg max-w-[90%] max-h-full overflow-hidden 
          ${
            fullWidth
              ? "h-screen w-full rounded-none max-w-none tablet:h-auto tablet:rounded-lg tablet:max-w-[90%] tablet:w-auto"
              : ""
          }
          ${
            fullScreen
              ? "h-screen w-full rounded-none max-w-none max-h-none"
              : ""
          }
          ${className ?? ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
