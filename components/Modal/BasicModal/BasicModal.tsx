import React from "react";
import Modal from "../Modal";
import { ModalHeader } from "../ModalHeader";
import { Typography } from "../../Typography";

interface BasicModalProps {
  children: React.ReactNode;
  title: string;
  open: boolean;
  hide: () => void;
}

const BasicModal = ({ children, title, open, hide }: BasicModalProps) => {
  return (
    <Modal isOpen={open}>
      <ModalHeader onClose={hide}>
        <Typography variant="h5" className="m-0">
          {title}
        </Typography>
      </ModalHeader>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </Modal>
  );
};

export default BasicModal;
