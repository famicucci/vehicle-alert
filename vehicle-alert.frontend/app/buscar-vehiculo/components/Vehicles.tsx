"use client";

import useVehicle from "@/store/vehicle/vehicle";
import { useVehicles } from "@/store/vehicle/vehicle.query";
import { VEHICLE_COLOR_META } from "@/store/vehicle/colors";

const Vehicles = () => {
  const { search } = useVehicle();
  const { data, isLoading, error } = useVehicles(search);

  if (!search) {
    return <div>Realizar una búsqueda para encontrar vehículos</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los vehículos</div>;
  }

  if (data?.length === 0) {
    return <div>No se encontraron vehículos para tu búsqueda</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.map((vehicle) => (
        <div key={vehicle.id} className="flex gap-2 items-center">
          <div className="flex-grow">
            {vehicle.brand.name} {VEHICLE_COLOR_META[vehicle.color].name}
          </div>
          <div className="font-bold">{vehicle.plateNumber}</div>
        </div>
      ))}
    </div>
  );
};

export default Vehicles;
