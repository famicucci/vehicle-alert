"use client";

import { useMyVehicles } from "@/store/vehicle/vehicle.query";
import { VEHICLE_COLOR_META } from "@/store/vehicle/colors";
import { VEHICLE_BRAND_LABELS } from "@/store/vehicle/brands";
import { Car, AlertCircle, Loader2 } from "lucide-react";
import { Typography } from "@/components/Typography";

const MyVehicles = () => {
  const { data, isLoading, error } = useMyVehicles();

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
          <div className="flex gap-2 items-center py-3">
            <div className="flex-grow">
              {VEHICLE_BRAND_LABELS[vehicle.brand]}{" "}
              {VEHICLE_COLOR_META[vehicle.color].name}
            </div>
            <div className="text-xs text-gray-500 capitalize">{vehicle.status}</div>
            <div className="font-bold">{vehicle.plateNumber}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyVehicles;
