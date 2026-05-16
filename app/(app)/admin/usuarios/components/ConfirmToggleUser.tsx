"use client";

import { useModal } from "@/contexts/ModalContext";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";

interface Props {
  email: string;
  enabled: boolean;
  onConfirm: () => void;
}

const ConfirmToggleUser = ({ email, enabled, onConfirm }: Props) => {
  const { hide } = useModal();
  const action = enabled ? "deshabilitar" : "habilitar";

  return (
    <div className="flex flex-col gap-6 p-4">
      <Typography variant="body medium" className="text-center">
        ¿Estás seguro que querés <span className="font-bold">{action}</span> al
        usuario <span className="font-bold">{email}</span>?
      </Typography>
      <div className="flex flex-col gap-3">
        <Button variant="primary" fullwidth onClick={onConfirm}>
          {enabled ? "Deshabilitar" : "Habilitar"}
        </Button>
        <Button variant="secondary" fullwidth onClick={hide}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default ConfirmToggleUser;
