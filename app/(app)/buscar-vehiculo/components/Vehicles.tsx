"use client";

import useVehicle from "@/store/vehicle/vehicle";
import { useVehicles } from "@/store/vehicle/vehicle.query";
import { VEHICLE_COLOR_META } from "@/store/vehicle/colors";
import { VEHICLE_BRAND_LABELS } from "@/store/vehicle/brands";
import { Search, Car, AlertCircle, Loader2 } from "lucide-react";
import { Typography } from "@/components/Typography";

const Vehicles = () => {
  const { search } = useVehicle();
  const { data, isLoading, error } = useVehicles(search);

  if (!search) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-500">
        <Search size={40} strokeWidth={1.5} />
        <Typography variant="body medium">Buscá un vehículo por patente, marca o color</Typography>
      </div>
    );
  }

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
        <Typography variant="body medium" color="error">Ocurrió un error al cargar los vehículos</Typography>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-500">
        <Car size={40} strokeWidth={1.5} />
        <Typography variant="body medium">No se encontraron vehículos para tu búsqueda</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.map((vehicle) => (
        <div key={vehicle.id} className="flex gap-2 items-center">
          <div className="flex-grow">
            {VEHICLE_BRAND_LABELS[vehicle.brand]} {VEHICLE_COLOR_META[vehicle.color].name}
          </div>
          <div className="font-bold">{vehicle.plateNumber}</div>
        </div>
      ))}
    </div>
  );
};

export default Vehicles;
