"use client";

import { useVehicles } from "@/store/vehicle/vehicle.query";

const Vehicles = () => {
  const { data, isLoading, error } = useVehicles("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading vehicles</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.map((vehicle) => (
        <div key={vehicle.id} className="flex gap-2 items-center">
          <div className="flex-grow">
            {vehicle.brand.name} {vehicle.color.name}
          </div>
          <div className="font-bold">{vehicle.plateNumber}</div>
        </div>
      ))}
    </div>
  );
};

export default Vehicles;
