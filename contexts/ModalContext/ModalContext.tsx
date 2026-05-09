"use client";
import React, { createContext, useState, ReactNode } from "react";
import { ModalContextProps } from "./types";
import { BasicModal } from "@/components/Modal/BasicModal";
import { Modal } from "@/components/Modal";

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined,
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState("");

  const show = <P extends object>(
    title: string | "customModal" | "fullScreenModal",
    Component: React.ComponentType<P>,
    props: P | undefined,
  ) => {
    if (title === "customModal") {
      setModalType("customModal");
    } else if (title === "fullScreenModal") {
      setModalType("fullScreenModal");
    } else {
      setModalType("basicModal");
    }

    setModalTitle(title);
    setModalContent(<Component {...(props || ({} as P))} />);
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ show, hide }}>
      {children}
      {open && (
        <>
          {modalType === "basicModal" && (
            <BasicModal title={modalTitle} open={open} hide={hide}>
              {modalContent}
            </BasicModal>
          )}
          {modalType === "customModal" && (
            <Modal isOpen={open}>{modalContent}</Modal>
          )}
          {modalType === "fullScreenModal" && (
            <Modal isOpen={open} fullScreen>
              {modalContent}
            </Modal>
          )}
        </>
      )}
    </ModalContext.Provider>
  );
};
