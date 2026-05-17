"use client";

import { useModal } from "@/contexts/ModalContext";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { PlateNumber } from "@/components/PlateNumber/PlateNumber";

interface Props {
  plateNumber: string;
  onConfirm: () => void;
}

const ConfirmDeleteVehicle = ({ plateNumber, onConfirm }: Props) => {
  const { hide } = useModal();

  return (
    <div className="flex flex-col gap-6 p-4">
      <Typography variant="body medium" className="text-center">
        ¿Estás seguro que querés eliminar el vehículo{" "}
        <PlateNumber plate={plateNumber} className="font-bold" />?
      </Typography>
      <div className="flex flex-col gap-3">
        <Button variant="primary" fullwidth onClick={onConfirm}>
          Eliminar
        </Button>
        <Button variant="secondary" fullwidth onClick={hide}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDeleteVehicle;
