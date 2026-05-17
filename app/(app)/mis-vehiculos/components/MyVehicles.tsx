"use client";

import { useMyVehicles, useDeleteVehicle } from "@/store/vehicle/vehicle.query";
import { VEHICLE_COLOR_META } from "@/store/vehicle/colors";
import { VEHICLE_BRAND_LABELS } from "@/store/vehicle/brands";
import { Car, AlertCircle, Loader2, Trash2 } from "lucide-react";
import { Typography } from "@/components/Typography";
import { PlateNumber } from "@/components/PlateNumber/PlateNumber";
import { useModal } from "@/contexts/ModalContext";
import ConfirmDeleteVehicle from "./ConfirmDeleteVehicle";

const MyVehicles = () => {
  const { data, isLoading, error } = useMyVehicles();
  const { mutate: deleteVehicle } = useDeleteVehicle();
  const { show, hide } = useModal();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-500">
        <Loader2 size={40} strokeWidth={1.5} className="animate-spin" />
        <Typography variant="body medium">Cargando...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <AlertCircle size={40} strokeWidth={1.5} className="text-error" />
        <Typography variant="body medium" color="error">
          Ocurrió un error al cargar los vehículos
        </Typography>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-500">
        <Car size={40} strokeWidth={1.5} />
        <Typography variant="body medium">
          Todavía no tenés vehículos registrados
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {data.map((vehicle, index) => (
        <div key={vehicle.id}>
          {index !== 0 && <hr className="mx-4 border-gray-100" />}
          <div className="flex gap-3 items-center py-3">
            <div className="flex-grow min-w-0">
              <p className="truncate">
                {VEHICLE_BRAND_LABELS[vehicle.brand]}{" "}
                {VEHICLE_COLOR_META[vehicle.color].name}
              </p>
              <p className="text-xs text-gray-400 capitalize">{vehicle.status}</p>
            </div>
            <div className="shrink-0 text-right">
              <PlateNumber plate={vehicle.plateNumber} className="text-lg font-bold tracking-wide" />
            </div>
            <button
              className="p-3 text-gray-400 hover:text-red-500 transition-colors shrink-0"
              onClick={() =>
                show("Eliminar vehículo", ConfirmDeleteVehicle, {
                  plateNumber: vehicle.plateNumber,
                  onConfirm: () => {
                    deleteVehicle(vehicle.id);
                    hide();
                  },
                })
              }
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyVehicles;
